import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX = 4000;

const RATE_LIMIT = { max: 5, windowMs: 10 * 60_000 };
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

const str = (v: unknown, max = MAX) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(request: Request) {
  if (rateLimited(clientIp(request))) {
    return NextResponse.json({ error: "too_many_requests" }, { status: 429 });
  }

  let payload: Record<string, unknown>;
  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  // Honeypot — real users never see this field, bots fill everything in.
  if (str(payload.website, 200)) {
    return NextResponse.json({ ok: true });
  }

  const name = str(payload.name, 120);
  const email = str(payload.email, 200);
  const subject = str(payload.subject, 200);
  const message = str(payload.message, MAX);

  if (name.length < 2 || !EMAIL_RE.test(email) || message.length < 10) {
    return NextResponse.json({ error: "validation_failed" }, { status: 400 });
  }

  const to = process.env.CONTACT_TO_EMAIL ?? "info@healthrootngo.org";
  const from = process.env.CONTACT_FROM_EMAIL ?? "website@healthrootngo.org";
  const notification = {
    from,
    to: [to],
    replyTo: email,
    subject: `[Website] ${subject || "New contact message"}`,
    text: `From: ${name} <${email}>\n\n${message}`,
  };

  if (!process.env.RESEND_API_KEY) {
    // Refuse rather than silently discarding the message. Reporting success
    // here would tell the sender it arrived when it never left the browser.
    console.error("[contact] RESEND_API_KEY not set — rejecting submission:", notification);
    return NextResponse.json(
      {
        error: "not_configured",
        message: "Message delivery is not configured on this server.",
      },
      { status: 503 },
    );
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: notification.from,
        to: notification.to,
        replyTo: notification.replyTo,
        subject: notification.subject,
        text: notification.text,
      }),
    });
    if (!res.ok) throw new Error(`resend ${res.status}`);
  } catch (error) {
    console.error("[contact] delivery failed:", error);
    return NextResponse.json(
      {
        error: "delivery_failed",
        message: "We could not send your message. Please email or call us directly.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
