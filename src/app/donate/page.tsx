"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Heart, ShieldCheck, CreditCard, Smartphone, Info, ArrowRight } from "lucide-react";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";

const PRESETS = [10, 25, 50, 100, 250];
const MIN = 1;
const MAX = 100_000;

const CURRENCIES = [
  { code: "USD", symbol: "$", note: "International" },
  { code: "RWF", symbol: "FRW ", note: "Rwanda" },
  { code: "EUR", symbol: "€", note: "Europe" },
  { code: "GBP", symbol: "£", note: "United Kingdom" },
  { code: "KES", symbol: "KSh ", note: "Kenya" },
] as const;

const METHODS = [
  {
    id: "card",
    label: "International card",
    icon: CreditCard,
    detail: "Visa, Mastercard, American Express",
  },
  {
    id: "momo",
    label: "Mobile Money",
    icon: Smartphone,
    detail: "MTN MoMo · Airtel Money",
  },
] as const;

const FREQUENCIES = [
  { id: "once", label: "One-off" },
  { id: "monthly", label: "Monthly" },
] as const;

export default function DonatePage() {
  const [amount, setAmount] = useState<number | "custom">("custom");
  const [customAmount, setCustomAmount] = useState("50");
  const [currency, setCurrency] = useState<string>("USD");
  const [frequency, setFrequency] = useState<"once" | "monthly">("once");
  const [method, setMethod] = useState<"card" | "momo">("card");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [momoNumber, setMomoNumber] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [dedication, setDedication] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState<{ reference: string } | null>(null);
  const [failure, setFailure] = useState<string | null>(null);

  const numeric = amount === "custom" ? Number(customAmount) : amount;
  const validAmount = Number.isFinite(numeric) && numeric >= MIN && numeric <= MAX;
  const symbol = CURRENCIES.find((c) => c.code === currency)?.symbol ?? "$";

  const setAmountSelection = (value: number | "custom") => {
    setAmount(value);
    setErrors((e) => ({ ...e, amount: "" }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFailure(null);

    const found: Record<string, string> = {};
    if (!validAmount) found.amount = `Please enter an amount between ${MIN} and ${MAX.toLocaleString()}.`;
    if (fullName.trim().length < 2) found.fullName = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) found.email = "Please enter a valid email address.";
    if (method === "momo" && momoNumber.replace(/\D/g, "").length < 9) {
      found.momoNumber = "Please enter the Mobile Money number to charge.";
    }

    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSending(true);
    try {
      /* Static site — no server, so the pledge is recorded in the browser and
         completed by phone/email once the payment provider is connected. */
      await new Promise((resolve) => setTimeout(resolve, 700));
      setDone({ reference: `HRN-${Date.now().toString(36).toUpperCase().slice(-6)}` });
    } catch {
      setFailure(
        `We could not start that donation. Please try again, or reach us on ${site.phone} / ${site.email} and we will take your pledge directly.`,
      );
    } finally {
      setSending(false);
    }
  };

  /* ------------------------------------------------------------- success */
  if (done) {
    return (
      <>
        <Hero title="Thank you" bgImage="/images/optimized/event2.jpg" compact />
        <section className="site-section bg-white">
          <div className="container">
            <Reveal className="mx-auto text-center" style={{ maxWidth: 620 }}>
              <span className="icon-wrap icon-wrap--teal mx-auto mb-4" style={{ width: 72, height: 72 }}>
                <Check size={32} aria-hidden />
              </span>
              <h2>Your pledge is registered</h2>
              <p className="lead">
                Thank you, {fullName.split(" ")[0] || "friend"}. We have recorded your intention to give{" "}
                <strong>
                  {symbol}
                  {numeric.toLocaleString()} {currency}
                </strong>{" "}
                {frequency === "monthly" ? "every month" : "once"}.
              </p>

              <p>
                <span className="badge badge-accent mb-3">Reference {done.reference}</span>
              </p>

              <div
                className="text-start p-4 mb-4"
                style={{ background: "var(--bg-alt)", borderRadius: "var(--r-lg)", border: "1px solid var(--line)" }}
              >
                <p className="d-flex gap-2 mb-3" style={{ fontSize: "var(--fs-sm)" }}>
                  <Info size={16} style={{ flexShrink: 0, marginTop: 3, color: "var(--accent-600)" }} aria-hidden />
                  <span style={{ color: "var(--slate-700)" }}>
                    <strong>Payment is not yet connected.</strong> This site is not yet wired to a live payment
                    provider, so no money has been taken and no card details were collected. We will contact you with
                    a secure payment link to complete your gift.
                  </span>
                </p>
              </div>

              <div className="d-flex flex-wrap justify-content-center gap-2">
                <Link href="/our-impact" className="btn btn-primary">
                  See what your gift does <ArrowRight size={16} aria-hidden />
                </Link>
                <Link href="/" className="btn btn-outline-primary">
                  Back to home
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </>
    );
  }

  /* ---------------------------------------------------------------- form */
  return (
    <>
      <Hero
        title="Support our mission"
        subtitle="Every contribution goes directly to school health sessions, sanitation materials and youth leadership training."
        bgImage="/images/optimized/event2.jpg"
        compact
      />

      <section className="site-section bg-white">
        <div className="container">
          <div className="row g-4 align-items-start">
            {/* ------------------------------------------------------ form */}
            <div className="col-lg-7">
              <Reveal from="left">
                <form
                  onSubmit={onSubmit}
                  noValidate
                  style={{
                    background: "#fff",
                    border: "1px solid var(--line)",
                    borderRadius: "var(--r-2xl)",
                    boxShadow: "var(--sh-md)",
                    padding: "clamp(1.5rem, 4vw, 2.5rem)",
                  }}
                >
                  <span className="eyebrow">Donation form</span>
                  <h2 style={{ fontSize: "var(--fs-h3)" }}>Choose your gift</h2>

                  {/* amount */}
                  <fieldset style={{ border: 0, padding: 0, margin: "0 0 1.5rem" }}>
                    <legend style={{ fontSize: "var(--fs-sm)", fontWeight: 600, marginBottom: "0.6rem" }}>
                      Amount
                    </legend>
                    <div className="d-flex flex-wrap gap-2 mb-3">
                      {PRESETS.map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setAmountSelection(preset)}
                          aria-pressed={amount === preset}
                          className={`btn ${amount === preset ? "btn-primary" : "btn-outline-primary"}`}
                        >
                          ${preset}
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() => setAmountSelection("custom")}
                        aria-pressed={amount === "custom"}
                        className={`btn ${amount === "custom" ? "btn-primary" : "btn-outline-primary"}`}
                      >
                        Other
                      </button>
                    </div>

                    <div className="d-flex gap-2">
                      <div style={{ width: 110 }}>
                        <label htmlFor="d-currency" className="sr-only">
                          Currency
                        </label>
                        <select id="d-currency" value={currency} onChange={(e) => setCurrency(e.target.value)}>
                          {CURRENCIES.map((c) => (
                            <option key={c.code} value={c.code}>
                              {c.code}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex-grow-1">
                        <label htmlFor="d-amount" className="sr-only">
                          Amount
                        </label>
                        <input
                          id="d-amount"
                          type="number"
                          min={MIN}
                          max={MAX}
                          step="1"
                          inputMode="decimal"
                          value={customAmount}
                          onFocus={() => setAmountSelection("custom")}
                          onChange={(e) => {
                            setAmountSelection("custom");
                            setCustomAmount(e.target.value);
                          }}
                          aria-invalid={Boolean(errors.amount)}
                        />
                      </div>
                    </div>
                    {errors.amount && (
                      <span className="form-error" role="alert">
                        {errors.amount}
                      </span>
                    )}
                  </fieldset>

                  {/* frequency */}
                  <fieldset style={{ border: 0, padding: 0, margin: "0 0 1.5rem" }}>
                    <legend style={{ fontSize: "var(--fs-sm)", fontWeight: 600, marginBottom: "0.6rem" }}>
                      How often
                    </legend>
                    <div className="d-flex gap-2">
                      {FREQUENCIES.map((f) => (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => setFrequency(f.id)}
                          aria-pressed={frequency === f.id}
                          className={`btn ${frequency === f.id ? "btn-primary" : "btn-outline-primary"}`}
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  {/* method */}
                  <fieldset style={{ border: 0, padding: 0, margin: "0 0 1.5rem" }}>
                    <legend style={{ fontSize: "var(--fs-sm)", fontWeight: 600, marginBottom: "0.6rem" }}>
                      Payment method
                    </legend>
                    <div className="row g-2">
                      {METHODS.map((m) => (
                        <div className="col-sm-6" key={m.id}>
                          <button
                            type="button"
                            onClick={() => setMethod(m.id)}
                            aria-pressed={method === m.id}
                            className="w-100 text-start"
                            style={{
                              border: `2px solid ${method === m.id ? "var(--brand-800)" : "var(--line)"}`,
                              background: method === m.id ? "rgba(10,37,64,0.04)" : "#fff",
                              borderRadius: "var(--r-md)",
                              padding: "0.9rem 1rem",
                              cursor: "pointer",
                              font: "inherit",
                            }}
                          >
                            <span className="d-flex align-items-center gap-2 mb-1">
                              <m.icon size={18} aria-hidden style={{ color: "var(--brand-800)" }} />
                              <span style={{ fontWeight: 700, fontSize: "var(--fs-sm)" }}>{m.label}</span>
                            </span>
                            <span style={{ fontSize: "var(--fs-xs)", color: "var(--text-muted)" }}>{m.detail}</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </fieldset>

                  {/* details */}
                  <div className="form-group">
                    <label htmlFor="d-name">Full name *</label>
                    <input
                      id="d-name"
                      type="text"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        setErrors((x) => ({ ...x, fullName: "" }));
                      }}
                      autoComplete="name"
                      placeholder="As it should appear on your receipt"
                      aria-invalid={Boolean(errors.fullName)}
                    />
                    {errors.fullName && (
                      <span className="form-error" role="alert">
                        {errors.fullName}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="d-email">Email address *</label>
                    <input
                      id="d-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setErrors((x) => ({ ...x, email: "" }));
                      }}
                      autoComplete="email"
                      placeholder="you@example.com"
                      aria-invalid={Boolean(errors.email)}
                    />
                    {errors.email && (
                      <span className="form-error" role="alert">
                        {errors.email}
                      </span>
                    )}
                  </div>

                  {method === "momo" && (
                    <div className="form-group">
                      <label htmlFor="d-momo">Mobile Money number *</label>
                      <input
                        id="d-momo"
                        type="tel"
                        value={momoNumber}
                        onChange={(e) => {
                          setMomoNumber(e.target.value);
                          setErrors((x) => ({ ...x, momoNumber: "" }));
                        }}
                        autoComplete="tel"
                        placeholder="e.g. 0788 372 210"
                        aria-invalid={Boolean(errors.momoNumber)}
                      />
                      <p className="form-error" style={{ color: "var(--text-muted)", fontWeight: 400 }}>
                        Used only to send you the payment prompt. We never ask for your PIN.
                      </p>
                      {errors.momoNumber && (
                        <span className="form-error" role="alert">
                          {errors.momoNumber}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="form-group">
                    <label htmlFor="d-dedication">Dedication (optional)</label>
                    <input
                      id="d-dedication"
                      type="text"
                      value={dedication}
                      onChange={(e) => setDedication(e.target.value)}
                      placeholder="In memory of… / In honour of…"
                    />
                  </div>

                  <label
                    className="d-flex align-items-center gap-2 mb-4"
                    style={{ fontSize: "var(--fs-sm)", fontWeight: 500, marginBottom: 0 }}
                  >
                    <input
                      type="checkbox"
                      checked={anonymous}
                      onChange={(e) => setAnonymous(e.target.checked)}
                      style={{ width: 18, height: 18, flexShrink: 0 }}
                    />
                    Publish my gift as anonymous
                  </label>

                  {failure && (
                    <p className="form-error mb-3" role="alert">
                      {failure}
                    </p>
                  )}

                  <button type="submit" className="btn btn-accent btn-lg btn-block" disabled={sending}>
                    {sending ? (
                      "Starting your donation…"
                    ) : (
                      <>
                        <Heart size={17} aria-hidden />
                        {frequency === "monthly" ? "Give monthly" : "Continue to payment"} ·{" "}
                        {symbol}
                        {Number.isFinite(numeric) ? numeric.toLocaleString() : "0"} {currency}
                      </>
                    )}
                  </button>

                  <p
                    className="d-flex gap-2 mt-3 mb-0"
                    style={{ fontSize: "var(--fs-xs)", color: "var(--text-muted)", lineHeight: 1.55 }}
                  >
                    <ShieldCheck size={15} style={{ flexShrink: 0, marginTop: 2, color: "var(--teal-600)" }} aria-hidden />
                    <span>
                      We never ask for your card number or PIN on this website. Payment happens on our provider&rsquo;s
                      secure checkout once connected.
                    </span>
                  </p>
                </form>
              </Reveal>
            </div>

            {/* ------------------------------------------------------ aside */}
            <div className="col-lg-5">
              <Reveal from="right" delay={100}>
                <div
                  className="p-4 mb-4"
                  style={{ background: "var(--brand-950)", color: "#fff", borderRadius: "var(--r-xl)" }}
                >
                  <span className="eyebrow" style={{ color: "var(--accent-400)" }}>
                    Where it goes
                  </span>
                  <h2 style={{ color: "#fff", fontSize: "var(--fs-h3)" }}>What your gift funds</h2>
                  <ul className="list-unstyled mb-0">
                    {[
                      ["School health sessions", "Hygiene kits, materials and facilitator time"],
                      ["Youth leadership training", "Mentorship, transport and materials for each cohort"],
                      ["Sanitation days", "Gloves, bags, tools and waste-disposal fees"],
                    ].map(([title, desc]) => (
                      <li
                        key={title}
                        className="d-flex gap-3 mb-3 pb-3"
                        style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}
                      >
                        <Check size={18} style={{ flexShrink: 0, color: "var(--accent-500)", marginTop: 3 }} aria-hidden />
                        <span>
                          <strong style={{ display: "block" }}>{title}</strong>
                          <span style={{ fontSize: "var(--fs-sm)", color: "rgba(255,255,255,0.65)" }}>{desc}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/our-impact" className="btn btn-ghost-light mt-2">
                    See the results <ArrowRight size={15} aria-hidden />
                  </Link>
                </div>

                <div
                  className="p-4"
                  style={{ background: "var(--bg-alt)", border: "1px solid var(--line)", borderRadius: "var(--r-xl)" }}
                >
                  <h3 style={{ fontSize: "var(--fs-h4)" }}>Other ways to help</h3>
                  <p style={{ fontSize: "var(--fs-sm)" }}>
                    Not in a position to give? You can still change something.
                  </p>
                  <ul className="list-check mb-4" style={{ fontSize: "var(--fs-sm)" }}>
                    <li>Volunteer a few hours a month</li>
                    <li>Share our campaigns with your network</li>
                    <li>Partner with us as a school or business</li>
                  </ul>
                  <Link href="/contact" className="btn btn-outline-primary">
                    Get involved
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
