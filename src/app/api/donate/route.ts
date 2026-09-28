import { NextResponse } from "next/server";
import { randomBytes } from "crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MIN = 1;
const MAX = 100_000;
const CURRENCIES = new Set(["USD", "RWF", "EUR", "GBP", "KES"]);

const RATE_LIMIT = { max: 10, windowMs: 10 * 60_000 };
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT.max;
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "anonymous";
}

export async function POST(request: Request) {
  if (rateLimited(clientIp(request))) {
    return NextResponse.json({ error: "too_many_requests" }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  // Never accept raw card data at this endpoint. Checked first so it can never
  // be masked by an unrelated validation failure.
  for (const forbidden of ["cardNumber", "cvc", "cvv", "pin", "expiry", "password"]) {
    if (body[forbidden] !== undefined) {
      return NextResponse.json(
        { error: "raw_payment_data_rejected", message: "This endpoint does not accept card details." },
        { status: 400 },
      );
    }
  }

  const amount = Number(body.amount);
  const currency = typeof body.currency === "string" ? body.currency.toUpperCase() : "USD";
  const frequency = body.frequency === "monthly" ? "monthly" : "once";
  const method = body.method === "momo" ? "momo" : "card";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const fullName = typeof body.fullName === "string" ? body.fullName.trim().slice(0, 120) : "";
  const momoNumber = typeof body.momoNumber === "string" ? body.momoNumber.trim().slice(0, 40) : "";
  const dedication = typeof body.dedication === "string" ? body.dedication.trim().slice(0, 200) : "";

  if (!Number.isFinite(amount) || amount < MIN || amount > MAX || !CURRENCIES.has(currency)) {
    return NextResponse.json({ error: "invalid_amount" }, { status: 400 });
  }
  if (fullName.length < 2 || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "validation_failed" }, { status: 400 });
  }
  if (method === "momo" && momoNumber.replace(/\D/g, "").length < 9) {
    return NextResponse.json({ error: "validation_failed" }, { status: 400 });
  }

  const reference = `HRN-${randomBytes(4).toString("hex").toUpperCase()}`;
  const pledge = {
    reference,
    amount,
    currency,
    frequency,
    method,
    fullName,
    email,
    momoNumber: method === "momo" ? momoNumber : undefined,
    anonymous: body.anonymous === true,
    dedication: dedication || undefined,
    createdAt: new Date().toISOString(),
  };

  /* ------------------------------------------------------------------
     1. If a payment provider is configured, create the checkout session
        and hand the donor off. Card data is then collected by the
        provider's own hosted page — never by us.
     ------------------------------------------------------------------ */
  const pspUrl = process.env.DONATION_CHECKOUT_URL;
  if (pspUrl) {
    try {
      const res = await fetch(pspUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.DONATION_API_KEY ?? ""}`,
        },
        body: JSON.stringify({
          reference,
          success_url: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://healthrootngo.org"}/donate?ref=${reference}`,
          cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://healthrootngo.org"}/donate`,
          customer: { email, name: fullName },
          line_items: [
            {
              quantity: 1,
              price_data: {
                currency,
                unit_amount: Math.round(amount * 100),
                product_data: {
                  name: frequency === "monthly" ? "Monthly donation to Health Root NGO" : "Donation to Health Root NGO",
                },
              },
            },
          ],
          metadata: pledge,
        }),
      });

      if (!res.ok) throw new Error(`psp ${res.status}`);
      const session = (await res.json()) as { url?: string };
      if (session.url) return NextResponse.json({ reference, paymentUrl: session.url });
    } catch (error) {
      console.error("[donate] checkout session failed:", error);
      return NextResponse.json({ error: "checkout_failed" }, { status: 502 });
    }
  }

  /* ------------------------------------------------------------------
     2. No provider configured — record the pledge so nothing is lost and
        confirm by email. No money is taken.
     ------------------------------------------------------------------ */
  if (process.env.RESEND_API_KEY) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "website@healthrootngo.org",
          to: ["info@healthrootngo.org"],
          replyTo: email,
          subject: `[Donation pledge] ${reference} — ${currency} ${amount} (${frequency})`,
          text: JSON.stringify(pledge, null, 2),
        }),
      });
    } catch (error) {
      console.error("[donate] pledge notification failed:", error);
    }
  } else {
    console.info("[donate] no PSP or RESEND_API_KEY configured — pledge recorded:", pledge);
  }

  return NextResponse.json({ reference, status: "pledged" });
}
