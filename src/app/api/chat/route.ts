import { NextResponse } from "next/server";
import { SYSTEM_INSTRUCTION, localAnswer } from "@/lib/chatKnowledge";
import { detectEmergency } from "@/lib/healthEmergency";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const GEMINI_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

const MAX_MESSAGES = 12;
const MAX_MESSAGE_CHARS = 2000;

/* -------------------------------------------------------------------------
   Lightweight in-memory rate limit (per IP, sliding window).
   Sufficient for a single-instance deploy; swap for Redis/Upstash at scale.
   ---------------------------------------------------------------------- */
const RATE_LIMIT = { max: 20, windowMs: 60_000 };
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);
  recent.push(now);
  hits.set(ip, recent);

  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_LIMIT.windowMs)) hits.delete(key);
    }
  }

  return recent.length > RATE_LIMIT.max;
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "anonymous";
}

type Turn = { role: "user" | "model"; text: string };

function sanitiseTurns(body: unknown): Turn[] {
  if (!Array.isArray(body)) return [];
  return body
    .filter(
      (m): m is { role: unknown; text: unknown } =>
        !!m && typeof m === "object" && "role" in m && "text" in m,
    )
    .map((m) => ({
      role: m.role === "model" ? ("model" as const) : ("user" as const),
      text: typeof m.text === "string" ? m.text.slice(0, MAX_MESSAGE_CHARS).trim() : "",
    }))
    .filter((m) => m.text.length > 0)
    .slice(-MAX_MESSAGES);
}

export async function POST(request: Request) {
  if (rateLimited(clientIp(request))) {
    return NextResponse.json(
      { error: "too_many_requests", reply: "You're sending questions a little too quickly. Please wait a moment and try again." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "bad_request", reply: "That request could not be read." }, { status: 400 });
  }

  const messages = sanitiseTurns((body as { messages?: unknown })?.messages);
  const last = messages[messages.length - 1];

  if (!last || last.role !== "user") {
    return NextResponse.json(
      { error: "empty_message", reply: "Please type a question first." },
      { status: 400 },
    );
  }

  /* ---------------------------------------------------------------------
     Emergency triage. Deterministic, and deliberately the very first thing
     that happens — before the model, before the offline library, before the
     rate limit matters. A crisis message must never depend on Gemini being
     reachable, and must never be answered with a knowledge-base paragraph.
     ------------------------------------------------------------------ */
  const emergency = detectEmergency(last.text);

  if (emergency) {
    console.warn(`[chat] emergency rule matched: ${emergency.id}`);
    return NextResponse.json({
      reply: emergency.reply,
      followUps: ["How do I prevent this?", "Where is the nearest health centre?", "How can I contact you?"],
      mode: "emergency",
      emergency: emergency.id,
    });
  }

  const apiKey = process.env.GEMINI_API_KEY ?? process.env.GOOGLE_API_KEY;

  // No key configured -> answer deterministically from the knowledge base so
  // the assistant is never dead in the water.
  if (!apiKey) {
    const local = localAnswer(last.text);
    return NextResponse.json({
      reply: local.answer,
      followUps: local.followUps,
      kind: local.kind,
      mode: "offline",
    });
  }

  const contents = messages.map((m) => ({
    role: m.role,
    parts: [{ text: m.text }],
  }));

  try {
    const response = await fetch(`${GEMINI_ENDPOINT}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents,
        systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
        generationConfig: {
          temperature: 0.35,
          topP: 0.9,
          maxOutputTokens: 700,
        },
        safetySettings: [
          { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_ONLY_HIGH" },
          { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_ONLY_HIGH" },
          { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_ONLY_HIGH" },
          { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_ONLY_HIGH" },
        ],
      }),
      signal: AbortSignal.timeout(15_000),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.error(`[chat] upstream ${response.status}: ${detail.slice(0, 400)}`);

      // Degrade to the local knowledge base rather than showing an error.
      const local = localAnswer(last.text);
      return NextResponse.json({
        reply: local.answer,
        followUps: local.followUps,
        kind: local.kind,
        mode: "fallback",
      });
    }

    const data = (await response.json()) as {
      candidates?: { content?: { parts?: { text?: string }[] } }[];
    };

    const reply =
      data.candidates?.[0]?.content?.parts?.map((p) => p.text ?? "").join("").trim() ?? "";

    if (!reply) {
      const local = localAnswer(last.text);
      return NextResponse.json({
        reply: local.answer,
        followUps: local.followUps,
        kind: local.kind,
        mode: "fallback",
      });
    }

    return NextResponse.json({ reply, followUps: undefined, kind: "live" as const, mode: "live" });
  } catch (error) {
    console.error("[chat] request failed:", error);
    const local = localAnswer(last.text);
    return NextResponse.json({
      reply: local.answer,
      followUps: local.followUps,
      kind: local.kind,
      mode: "fallback",
    });
  }
}

export function GET() {
  return NextResponse.json({ status: "ok", powered: Boolean(apiKeyConfigured()) });
}

function apiKeyConfigured(): boolean {
  return Boolean(process.env.GEMINI_API_KEY ?? process.env.GOOGLE_API_KEY);
}
