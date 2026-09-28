import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Target, Eye, Compass } from "lucide-react";
import Hero from "@/components/Hero";
import CTASection from "@/components/CTASection";
import Reveal from "@/components/Reveal";
import { coreValues, impactStats, site } from "@/lib/site";
import { Shield, Handshake, Users, Sparkles, Heart, Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Health Root NGO is a youth-led organisation in Kigali, Rwanda. Read our vision, mission, core values and the story behind how we work.",
};

const MISSION = [
  "Promote health education and awareness.",
  "Support youth empowerment and leadership.",
  "Encourage disease prevention and healthy living.",
  "Improve community participation in health activities.",
];

const VALUE_ICONS = { shield: Shield, handshake: Handshake, users: Users, sparkles: Sparkles, heart: Heart, scale: Scale };

const MILESTONES = [
  { year: "2023", title: "Founded in Kigali", desc: "Health Root NGO is registered by a group of young Rwandans who wanted their peers to have access to real health information." },
  { year: "2024", title: "First school outreach", desc: "Hygiene and nutrition sessions delivered in partner schools, reaching our first 2,000 young people." },
  { year: "2025", title: "Leadership academy", desc: "A six-month mentorship track launched, producing our first cohort of youth programme leads." },
  { year: "2026", title: "10,000+ reached", desc: "Now active across 18 districts with more than 120 trained volunteers." },
];

export default function About() {
  return (
    <>
      <Hero
        title="About Health Root NGO"
        subtitle={site.tagline}
        bgImage="/images/hom1.jpg"
        compact
        primaryLabel="See our impact"
        primaryHref="/our-impact"
        secondaryLabel="Meet the team"
        secondaryHref="/team"
      />

      {/* ------------------------------------------------------------- story */}
      <section className="site-section bg-white">
        <div className="container">
          <div className="row align-items-center g-5">
            <Reveal className="col-md-6" from="left">
              <div className="position-relative">
                <div
                  className="position-relative overflow-hidden"
                  style={{ borderRadius: "var(--r-2xl)", boxShadow: "var(--sh-lg)", aspectRatio: "4 / 3" }}
                >
                  <Image
                    src="/images/optimized/work.jpg"
                    alt="The Health Root NGO team in a working session"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div
                  className="position-absolute d-none d-md-flex flex-column justify-content-center"
                  style={{
                    right: -28,
                    bottom: -28,
                    width: 190,
                    padding: "1.5rem",
                    background: "var(--accent-500)",
                    borderRadius: "var(--r-xl)",
                    boxShadow: "var(--sh-lg)",
                  }}
                >
                  <span style={{ fontSize: "2rem", fontWeight: 800, lineHeight: 1, letterSpacing: "-0.04em" }}>
                    10,000+
                  </span>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--brand-950)", opacity: 0.75, marginTop: "0.4rem" }}>
                    Young people reached
                  </span>
                </div>
              </div>
            </Reveal>

            <Reveal className="col-md-6" from="right" delay={100}>
              <span className="eyebrow">Who we are</span>
              <h2>Built by young people, for young people</h2>
              <p className="lead">
                Health Root NGO is a youth-centred organisation focused on health education, leadership and community
                development.
              </p>
              <p>
                We believe healthy young people are the foundation of a healthy, successful community. Through education,
                campaigns, training and volunteer activity, we support positive change and encourage genuine
                participation in community health — not as an audience, but as the people doing the work.
              </p>
              <p style={{ marginBottom: 0 }}>
                Registered in Rwanda as <strong>{site.registration}</strong>, we work with schools, churches, local
                government and other NGOs to make health information practical and available to everyone.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- vision & mission */}
      <section className="site-section bg-light">
        <div className="container">
          <div className="row g-4">
            <Reveal className="col-lg-6" from="up">
              <div
                className="h-100"
                style={{ background: "#fff", borderRadius: "var(--r-xl)", padding: "clamp(1.75rem,4vw,2.5rem)", boxShadow: "var(--sh-sm)" }}
              >
                <span className="icon-wrap icon-wrap--teal mb-4">
                  <Eye size={24} aria-hidden />
                </span>
                <h2>Our vision</h2>
                <p style={{ fontSize: "var(--fs-lg)", marginBottom: 0 }}>
                  To build a healthier, educated, responsible and empowered community where young people actively
                  contribute to positive health and social development.
                </p>
              </div>
            </Reveal>

            <Reveal className="col-lg-6" from="up" delay={110}>
              <div
                className="h-100"
                style={{ background: "var(--brand-800)", color: "#fff", borderRadius: "var(--r-xl)", padding: "clamp(1.75rem,4vw,2.5rem)", boxShadow: "var(--sh-md)" }}
              >
                <span className="icon-wrap mb-4" style={{ background: "rgba(255,255,255,0.12)" }}>
                  <Target size={24} aria-hidden />
                </span>
                <h2 style={{ color: "#fff" }}>Our mission</h2>
                <ul className="list-check mb-0" style={{ color: "rgba(255,255,255,0.82)" }}>
                  {MISSION.map((item) => (
                    <li key={item} style={{ color: "inherit" }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- timeline */}
      <section className="site-section bg-white">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow eyebrow--center">Our journey</span>
            <h2>How we got here</h2>
            <p>From a small idea in Kigali to a youth movement across 18 districts.</p>
          </Reveal>

          <div className="row g-4">
            {MILESTONES.map((m, i) => (
              <Reveal className="col-sm-6 col-lg-3" key={m.year} delay={i * 80}>
                <div className="h-100" style={{ borderLeft: "3px solid var(--accent-500)", paddingLeft: "1.25rem" }}>
                  <span className="badge badge-accent mb-3">{m.year}</span>
                  <h3 style={{ fontSize: "var(--fs-h4)", marginBottom: "0.5rem" }}>{m.title}</h3>
                  <p style={{ fontSize: "var(--fs-sm)", margin: 0 }}>{m.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ values */}
      <section className="site-section bg-light">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow eyebrow--center">Core values</span>
            <h2>The principles behind our work</h2>
            <p>Six commitments we hold ourselves accountable to, in the field and in the boardroom.</p>
          </Reveal>

          <div className="row g-4">
            {coreValues.map((value, i) => {
              const Icon = VALUE_ICONS[value.icon];
              return (
                <Reveal className="col-md-6 col-lg-4" key={value.title} delay={i * 60}>
                  <div className="card h-100 hover-shadow" style={{ padding: "1.75rem" }}>
                    <span className="icon-wrap icon-wrap--soft mb-4">
                      <Icon size={22} aria-hidden />
                    </span>
                    <h3 style={{ fontSize: "var(--fs-h4)", marginBottom: "0.5rem" }}>{value.title}</h3>
                    <p style={{ fontSize: "var(--fs-sm)", margin: 0 }}>{value.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- stats */}
      <section className="site-section bg-white">
        <div className="container">
          <Reveal>
            <div
              className="px-4 py-5 text-center"
              style={{ background: "var(--brand-950)", borderRadius: "var(--r-2xl)" }}
            >
              <Compass size={26} className="mb-3" style={{ color: "var(--accent-500)" }} aria-hidden />
              <h2 style={{ color: "#fff" }}>Where we stand today</h2>
              <div className="row g-4 mt-3">
                {impactStats.map((stat) => (
                  <div className="col-6 col-lg-3" key={stat.label}>
                    <p className="stat-value">{stat.value}</p>
                    <p className="stat-label mt-2 mb-0">{stat.label}</p>
                  </div>
                ))}
              </div>
              <Link href="/our-impact" className="btn btn-accent mt-4">
                Read our impact stories <ArrowRight size={16} aria-hidden />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Want to be part of what happens next?"
        text="We are always looking for volunteers, donors and partner organisations who share how we work."
        buttonText="Donate now"
        secondaryText="Become a volunteer"
      />
    </>
  );
}
