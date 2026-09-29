"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, MessageCircle, Send, Check, Clock } from "lucide-react";
import { site } from "@/lib/site";

interface Errors {
  name?: string;
  email?: string;
  message?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const update = (field: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): Errors => {
    const next: Errors = {};
    if (values.name.trim().length < 2) next.name = "Please tell us your name.";
    if (!EMAIL_RE.test(values.email.trim())) next.email = "Please enter a valid email address.";
    if (values.message.trim().length < 10) next.message = "Please add a little more detail (at least 10 characters).";
    return next;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    /* Static site — no server, so the message is composed in the sender's own
       email app via a pre-filled mailto link. */
    const subject = values.subject.trim() || "Message from the website";
    const body = [
      `Name: ${values.name.trim()}`,
      `Email: ${values.email.trim()}`,
      "",
      values.message.trim(),
    ].join("\n");

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setValues({ name: "", email: "", subject: "", message: "" });
    setSent(true);
  };

  if (sent) {
    return (
      <div className="p-5 text-center" style={{ background: "var(--bg-alt)", borderRadius: "var(--r-xl)" }}>
        <span className="icon-wrap icon-wrap--teal mx-auto mb-4">
          <Check size={26} aria-hidden />
        </span>
        <h2>Thanks — your email app is on its way</h2>
        <p>
          Your message should now be open in your email app, addressed to {site.email}. We reply to every message
          within two working days. If it is urgent, please call or WhatsApp us instead.
        </p>
        <button type="button" className="btn btn-outline-primary" onClick={() => setSent(false)}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="p-4 p-lg-5"
      style={{ background: "var(--bg-alt)", borderRadius: "var(--r-xl)" }}
    >
      <h2 style={{ fontSize: "var(--fs-h3)" }}>Send us a message</h2>
      <p style={{ fontSize: "var(--fs-sm)" }}>
        Tell us what you need and we&rsquo;ll route it to the right person on the team.
      </p>

      <div className="form-group">
        <label htmlFor="c-name">Your name *</label>
        <input
          id="c-name"
          type="text"
          value={values.name}
          onChange={update("name")}
          placeholder="e.g. John Doe"
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "c-name-error" : undefined}
          className={errors.name ? "is-invalid" : ""}
        />
        {errors.name && (
          <span className="form-error" id="c-name-error" role="alert">
            {errors.name}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="c-email">Email address *</label>
        <input
          id="c-email"
          type="email"
          value={values.email}
          onChange={update("email")}
          placeholder="you@example.com"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "c-email-error" : undefined}
        />
        {errors.email && (
          <span className="form-error" id="c-email-error" role="alert">
            {errors.email}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="c-subject">Subject</label>
        <input
          id="c-subject"
          type="text"
          value={values.subject}
          onChange={update("subject")}
          placeholder="How can we help?"
        />
      </div>

      <div className="form-group">
        <label htmlFor="c-message">Message *</label>
        <textarea
          id="c-message"
          rows={6}
          value={values.message}
          onChange={update("message")}
          placeholder="Write your message here…"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "c-message-error" : undefined}
        />
        {errors.message && (
          <span className="form-error" id="c-message-error" role="alert">
            {errors.message}
          </span>
        )}
      </div>

      {/* Honeypot — hidden from users, catches naive bots */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
        <label htmlFor="c-website">Website</label>
        <input id="c-website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <button type="submit" className="btn btn-primary btn-block btn-lg">
        <Send size={17} aria-hidden />
        Send message
      </button>
    </form>
  );
}

/* -------------------------------------------------------------------------- */

export function ContactCards() {
  const cards = [
    {
      icon: MapPin,
      title: "Visit us",
      lines: ["Health Root NGO", "Kigali, Rwanda"],
      href: null,
    },
    {
      icon: Phone,
      title: "Call us",
      lines: ["+250 780 676 289"],
      href: "tel:+250780676289",
    },
    {
      icon: Mail,
      title: "Email us",
      lines: ["info@healthrootngo.org"],
      href: "mailto:info@healthrootngo.org",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      lines: ["+250 788 372 210"],
      href: "https://wa.me/250788372210",
    },
  ];

  return (
    <div className="row g-3">
      {cards.map((card) => {
        const body = (
          <>
            <span className="icon-wrap mb-3" style={{ width: 48, height: 48 }}>
              <card.icon size={20} aria-hidden />
            </span>
            <h3 style={{ fontSize: "var(--fs-base)", fontWeight: 700, marginBottom: "0.25rem" }}>
              {card.title}
            </h3>
            {card.lines.map((line) => (
              <p key={line} style={{ fontSize: "var(--fs-sm)", margin: 0, wordBreak: "break-word" }}>
                {line}
              </p>
            ))}
          </>
        );

        return (
          <div className="col-sm-6 col-lg-3" key={card.title}>
            {card.href ? (
              <a
                href={card.href}
                target={card.href.startsWith("http") ? "_blank" : undefined}
                rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="d-block h-100 text-decoration-none hover-shadow"
                style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "var(--r-lg)", padding: "1.5rem" }}
              >
                {body}
              </a>
            ) : (
              <div
                className="h-100"
                style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "var(--r-lg)", padding: "1.5rem" }}
              >
                {body}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function OfficeHours() {
  return (
    <p className="d-flex align-items-center gap-2 mt-3 mb-0" style={{ fontSize: "var(--fs-sm)", color: "var(--text-muted)" }}>
      <Clock size={15} aria-hidden />
      Office hours: Monday to Friday, 08:00&ndash;17:00 (CAT)
    </p>
  );
}
