"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, RotateCcw, Siren } from "lucide-react";
import Logo from "@/components/Logo";
import { site } from "@/lib/site";

/* -------------------------------------------------------------------------- */
/* Types                                                                       */
/* -------------------------------------------------------------------------- */
type Role = "user" | "model";

interface Turn {
  role: Role;
  text: string;
}

interface ChatResponse {
  reply: string;
  followUps?: string[];
  mode?: "live" | "offline" | "fallback" | "emergency";
  emergency?: string;
  error?: string;
}

const STORAGE_KEY = "hrn.chat.v1";
const HISTORY_LIMIT = 20;
const STORE_EVENT = "hrn.chat.change";

/* -------------------------------------------------------------------------- */
/* Chat history store                                                         */
/*                                                                             */
/* localStorage is an external store, so it is read through                    */
/* useSyncExternalStore rather than mirrored into useState by an effect. This  */
/* removes the hydration mismatch, the write-back effect, and keeps multiple  */
/* tabs in sync.                                                               */
/* -------------------------------------------------------------------------- */

const EMPTY_TURNS: Turn[] = [];

/* getSnapshot must return a referentially stable value or React loops forever,
   so the parsed result is memoised against the exact stored string. */
let cachedRaw: string | null = null;
let cachedTurns: Turn[] = EMPTY_TURNS;

function readStoredTurns(): Turn[] {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    /* storage unavailable (private mode, blocked cookies) */
    return EMPTY_TURNS;
  }

  if (raw === cachedRaw) return cachedTurns;
  cachedRaw = raw;

  if (!raw) {
    cachedTurns = EMPTY_TURNS;
    return cachedTurns;
  }

  try {
    const parsed = JSON.parse(raw) as Turn[];
    cachedTurns = Array.isArray(parsed) ? parsed.slice(-HISTORY_LIMIT) : EMPTY_TURNS;
  } catch {
    cachedTurns = EMPTY_TURNS;
  }
  return cachedTurns;
}

function writeStoredTurns(turns: Turn[]): void {
  const trimmed = turns.slice(-HISTORY_LIMIT);
  try {
    if (trimmed.length === 0) window.localStorage.removeItem(STORAGE_KEY);
    else window.localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch {
    /* ignore - history simply will not persist */
  }
  cachedRaw = null; // force the next read to re-parse
  window.dispatchEvent(new Event(STORE_EVENT));
}

function subscribeToTurns(onChange: () => void): () => void {
  const handler = () => onChange();
  window.addEventListener("storage", handler);
  window.addEventListener(STORE_EVENT, handler);
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener(STORE_EVENT, handler);
  };
}

const getTurnsServerSnapshot = () => EMPTY_TURNS;

/**
 * Returns the persisted conversation plus an updater that mirrors the
 * `useState` setter signature, so call sites read exactly as before.
 */
function useStoredTurns(): [Turn[], (next: Turn[] | ((prev: Turn[]) => Turn[])) => void] {
  const turns = useSyncExternalStore(subscribeToTurns, readStoredTurns, getTurnsServerSnapshot);

  const setTurns = useCallback((next: Turn[] | ((prev: Turn[]) => Turn[])) => {
    const value = typeof next === "function" ? (next as (prev: Turn[]) => Turn[])(readStoredTurns()) : next;
    writeStoredTurns(value);
  }, []);

  return [turns, setTurns];
}

/* -------------------------------------------------------------------------- */
/* Page-aware quick replies — reduces the "how do I find this?" tax            */
/* -------------------------------------------------------------------------- */
const ROUTE_SUGGESTIONS: Record<string, { greeting: string; chips: string[] }> = {
  "/": {
    greeting:
      "Hi — I'm the **Health Root assistant**. I can explain health questions in plain language, and answer anything about our work. **I'm not a clinician** — I can't diagnose you or tell you what to take.",
    chips: [
      "What causes a fever?",
      "How do I treat a headache?",
      "What are the warning signs of malaria?",
      "How do I prevent diarrhoea?",
      "What do you do?",
    ],
  },
  "/donate": {
    greeting:
      "Hi — I can walk you through giving. Ask about amounts, payment methods, or where your money goes.",
    chips: ["How do I donate?", "What payment methods do you accept?", "Where does my money go?", "Can I give monthly?"],
  },
  "/what-we-do": {
    greeting: "Hi — ask me about any of our programmes, projects or activities, or any health question.",
    chips: ["What do you do?", "Tell me about the current projects", "Which programme helps schools?"],
  },
  "/our-impact": {
    greeting: "Hi — I can explain any of our results and the story behind them.",
    chips: ["What impact have you had?", "How many young people have you reached?", "What do you do?"],
  },
  "/gallery": {
    greeting: "Hi — I can help you find things across the site, or answer a health question.",
    chips: ["What do you do?", "How can I contact you?", "Who leads the organisation?"],
  },
  "/team": {
    greeting: "Hi — ask me about our leadership, roles or how we are organised.",
    chips: ["Who leads the organisation?", "What does the Treasurer do?", "How can I volunteer?"],
  },
  "/contact": {
    greeting: "Hi — I can help you reach the right person, fast.",
    chips: ["How can I contact you?", "What are your office hours?", "How can I volunteer?"],
  },
  default: {
    greeting:
      "Hi — I'm the **Health Root assistant**. Ask me a health question or anything about our work. **I'm not a clinician** — I can explain and help you prepare, but I can't diagnose you or tell you what to take.",
    chips: [
      "What causes a fever?",
      "How do I treat a headache?",
      "What are the warning signs of malaria?",
      "How do I prevent diarrhoea?",
      "What do you do?",
    ],
  },
};


/* -------------------------------------------------------------------------- */
/* Minimal, safe markdown renderer (no dangerouslySetInnerHTML)                 */
/* -------------------------------------------------------------------------- */
type Inline = { type: "bold" | "link" | "text"; value: string; href?: string };

function parseInline(input: string): Inline[] {
  const out: Inline[] = [];
  // **bold** and [label](href)
  const pattern = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(input)) !== null) {
    if (match.index > last) out.push({ type: "text", value: input.slice(last, match.index) });

    if (match[1] !== undefined) {
      out.push({ type: "bold", value: match[1] });
    } else {
      out.push({ type: "link", value: match[2], href: match[3] });
    }
    last = match.index + match[0].length;
  }

  if (last < input.length) out.push({ type: "text", value: input.slice(last) });
  return out;
}

function isInternal(href: string): boolean {
  return href.startsWith("/") || href.startsWith("#");
}

function InlineNodes({ parts }: { parts: Inline[] }) {
  return (
    <>
      {parts.map((part, i) => {
        if (part.type === "bold") return <strong key={i}>{part.value}</strong>;
        if (part.type === "link" && part.href) {
          return isInternal(part.href) ? (
            <Link key={i} href={part.href as never}>
              {part.value}
            </Link>
          ) : (
            <a key={i} href={part.href} target="_blank" rel="noopener noreferrer">
              {part.value}
            </a>
          );
        }
        return <span key={i}>{part.value}</span>;
      })}
    </>
  );
}

const BULLET = /^\s*[-*]\s+/;
const NUMBERED = /^\s*\d+[.)]\s+/;

function Markdown({ text }: { text: string }) {
  const blocks = useMemo(() => text.split(/\n{2,}/), [text]);

  return (
    <>
      {blocks.map((block, i) => {
        if (/^\s*(-{3,}|_{3,}|\*{3,})\s*$/.test(block)) return <hr key={i} />;

        const lines = block.split("\n").filter((l) => l.trim().length > 0);
        const isBullets = lines.length > 0 && lines.every((l) => BULLET.test(l));
        const isNumbered = lines.length > 0 && lines.every((l) => NUMBERED.test(l));

        if (isBullets || isNumbered) {
          const strip = (l: string) => l.replace(isNumbered ? NUMBERED : BULLET, "");
          const List = isNumbered ? "ol" : "ul";
          return (
            <List key={i}>
              {lines.map((line, j) => (
                <li key={j}>
                  <InlineNodes parts={parseInline(strip(line))} />
                </li>
              ))}
            </List>
          );
        }

        return (
          <p key={i}>
            {lines.map((line, j) => (
              <span key={j}>
                {j > 0 && <br />}
                <InlineNodes parts={parseInline(line)} />
              </span>
            ))}
          </p>
        );
      })}
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Component                                                                   */
/* -------------------------------------------------------------------------- */
export default function Chatbot() {
  const pathname = usePathname();
  const routeKey = Object.keys(ROUTE_SUGGESTIONS).find((r) => r !== "default" && r === pathname) ?? "default";
  const config = ROUTE_SUGGESTIONS[routeKey];

  const [open, setOpen] = useState(false);
  const [turns, setTurns] = useStoredTurns();
  const [chips, setChips] = useState<string[]>(config.chips);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);

  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  /* ---------------------------------------------- scroll to newest */
  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [turns, pending, open]);

  /* ---------------------------------------------- focus + esc */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => inputRef.current?.focus(), 320);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [open]);

  useEffect(() => {
    abortRef.current?.abort();
  }, []);

  /* ---------------------------------------------- ask */
  const ask = useCallback(
    async (question: string) => {
      const text = question.trim();
      if (!text || pending) return;

      const next: Turn[] = [...turns, { role: "user", text }];
      setTurns(next);
      setInput("");
      setChips([]);
      setPending(true);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: next.slice(-HISTORY_LIMIT) }),
          signal: controller.signal,
        });

        const data = (await res.json()) as ChatResponse;

        if (!res.ok && !data.reply) {
          throw new Error(data.error ?? "Request failed");
        }

        setTurns((prev) => [...prev, { role: "model", text: data.reply }]);
        if (data.followUps?.length) setChips(data.followUps);
        else if (data.mode === "fallback") setChips(config.chips);
      } catch (error) {
        if ((error as Error).name === "AbortError") return;
        setTurns((prev) => [
          ...prev,
          {
            role: "model",
            text: `Something went wrong on my side. Please try again, or reach us directly on **${site.phone}** or **${site.email}**.`,
          },
        ]);
        setChips(config.chips);
      } finally {
        setPending(false);
      }
    },
    [turns, pending, config.chips, setTurns],
  );

  const reset = useCallback(() => {
    abortRef.current?.abort();
    setTurns([]);
    setChips(config.chips);
    setInput("");
    setPending(false);
  }, [config.chips, setTurns]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void ask(input);
    }
  };

  const autoGrow = (el: HTMLTextAreaElement) => {
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  };

  return (
    <>
      {/* ------------------------------------------------------------- FAB */}
      <button
        type="button"
        className={`chat-fab${open ? " chat-fab--open" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="health-root-chat"
        aria-label={open ? "Close the Health Root assistant" : "Open the Health Root assistant"}
      >
        <span className="chat-fab__pulse" aria-hidden />
        {open ? <X size={24} aria-hidden /> : <MessageCircle size={24} aria-hidden />}
        <span className="chat-fab__label">{open ? "Close" : "Ask us anything"}</span>
      </button>

      {/* ---------------------------------------------------------- PANEL */}
      <AnimatePresence>
        {open && (
          <motion.section
            id="health-root-chat"
            className="chat-panel"
            role="dialog"
            aria-label="Health Root assistant"
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* header */}
            <header className="chat-panel__head">
              <span className="chat-panel__avatar">
                <Logo variant="mark" size={42} className="brand-mark" />
                <span className="chat-panel__status" aria-hidden />
              </span>
              <div>
                <h2 className="chat-panel__title">Health Root Assistant</h2>
                <p className="chat-panel__sub">
                  <span aria-hidden>●</span> Online · typically replies instantly
                </p>
              </div>
              <div className="chat-panel__head-actions">
                <button
                  type="button"
                  className="chat-icon-btn"
                  onClick={reset}
                  aria-label="Start a new conversation"
                  title="New conversation"
                >
                  <RotateCcw size={15} aria-hidden />
                </button>
              </div>
            </header>

            {/* log */}
            <div className="chat-log" ref={logRef} role="log" aria-live="polite" aria-atomic="false">
              <div className="chat-msg chat-msg--bot">
                <span className="chat-msg__avatar">
                  <Logo variant="mark" size={28} className="brand-mark" />
                </span>
                <div className="chat-msg__bubble">
                  <Markdown text={config.greeting} />
                </div>
              </div>

              {turns.map((turn, i) => (
                <div
                  key={i}
                  className={`chat-msg chat-msg--${turn.role === "user" ? "user" : "bot"}`}
                >
                  {turn.role === "model" && (
                    <span className="chat-msg__avatar">
                      <Logo variant="mark" size={28} className="brand-mark" />
                    </span>
                  )}
                  <div className="chat-msg__bubble">
                    <Markdown text={turn.text} />
                  </div>
                </div>
              ))}

              {pending && (
                <div className="chat-msg chat-msg--bot">
                  <span className="chat-msg__avatar">
                    <Logo variant="mark" size={28} className="brand-mark" />
                  </span>
                  <div className="chat-msg__bubble chat-typing" aria-label="Assistant is typing">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              )}
            </div>

            {/* quick replies */}
            {chips.length > 0 && !pending && (
              <div className="chat-chips">
                {chips.map((chip) => (
                  <button key={chip} type="button" className="chat-chip" onClick={() => void ask(chip)}>
                    {chip}
                  </button>
                ))}
              </div>
            )}

            {/* emergency strip - always visible, never more than one tap away */}
            <a className="chat-emergency" href={site.emergency.ambulanceHref}>
              <Siren size={14} aria-hidden />
              <span>
                <strong>Emergency?</strong> Call <strong>{site.emergency.ambulance}</strong> for an ambulance
              </span>
            </a>

            {/* input */}
            <form
              className="chat-form"
              onSubmit={(e) => {
                e.preventDefault();
                void ask(input);
              }}
            >
              <label htmlFor="chat-input" className="sr-only">
                Type your question
              </label>
              <textarea
                id="chat-input"
                ref={inputRef}
                rows={1}
                value={input}
                placeholder="Ask a health or general health question…"
                onChange={(e) => {
                  setInput(e.target.value);
                  autoGrow(e.target);
                }}
                onKeyDown={onKeyDown}
                disabled={pending}
              />
              <button type="submit" className="chat-send" disabled={!input.trim() || pending} aria-label="Send message">
                <Send size={17} aria-hidden />
              </button>
            </form>

            <p className="chat-disclaimer">
              <strong>Not medical advice.</strong> I can explain and help you prepare, but I can&rsquo;t diagnose you or
              tell you what to take — please don&rsquo;t change any treatment because of what I say. For anything urgent,
              call <a href={site.emergency.ambulanceHref}>{site.emergency.ambulance}</a> or go to {site.emergency.hospital}. Health questions: reach a clinician on{" "}
              <a href={site.phoneHref}>{site.phone}</a>.
            </p>

          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}
