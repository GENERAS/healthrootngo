import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, HeartPulse, Users, Leaf, Sparkles } from "lucide-react";
import Hero from "@/components/Hero";
import CTASection from "@/components/CTASection";
import Reveal from "@/components/Reveal";
import { programs, projects } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our programmes",
  description:
    "Explore Health Root NGO's programmes — health education, youth leadership training, and sanitation & environment work in Rwanda.",
};

const PROGRAM_ICONS = { "heart-pulse": HeartPulse, users: Users, leaf: Leaf } as const;

const TRAITS = ["Community-led", "Youth-focused", "Measurable", "Sustainable"];

export default function WhatWeDo() {
  return (
    <>
      <Hero
        title="Our programmes"
        subtitle="Three programmes, one goal: give young people the knowledge, skills and confidence to make their own community healthier."
        bgImage="/images/hom1.jpg"
        compact
        primaryLabel="Support a programme"
        primaryHref="/donate"
        secondaryLabel="See our impact"
        secondaryHref="/our-impact"
      />

      {/* -------------------------------------------------------- programmes */}
      <section className="site-section bg-white">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow eyebrow--center">Core programmes</span>
            <h2>What we run</h2>
            <p>
              Every programme is designed with young people, delivered by young people, and measured against outcomes
              we publish.
            </p>
          </Reveal>

          <div className="row g-4">
            {programs.map((program, i) => {
              const Icon = PROGRAM_ICONS[program.icon];
              return (
                <Reveal className="col-lg-4" key={program.slug} delay={i * 90} from="up">
                  <article
                    id={program.slug}
                    className="card h-100 hover-shadow"
                    style={{ padding: "clamp(1.75rem, 3vw, 2.25rem)", scrollMarginTop: "110px" }}
                  >
                    <div className="d-flex align-items-center justify-content-between mb-4">
                      <span className="icon-wrap">
                        <Icon size={24} aria-hidden />
                      </span>
                      <span style={{ fontSize: "2.25rem", fontWeight: 800, letterSpacing: "-0.05em", color: "var(--slate-200)", lineHeight: 1 }}>
                        {program.num}
                      </span>
                    </div>

                    <h3 style={{ fontSize: "var(--fs-h3)", marginBottom: "0.75rem" }}>{program.title}</h3>
                    <p style={{ fontSize: "var(--fs-sm)" }}>{program.desc}</p>

                    <ul className="list-unstyled mb-4 mt-4">
                      {program.points.map((point) => (
                        <li
                          key={point}
                          className="d-flex align-items-start gap-2 mb-2"
                          style={{ fontSize: "var(--fs-sm)", color: "var(--slate-700)" }}
                        >
                          <Check size={16} style={{ color: "var(--teal-600)", flexShrink: 0, marginTop: 4 }} aria-hidden />
                          {point}
                        </li>
                      ))}
                    </ul>

                    <div className="d-flex flex-wrap gap-2 mt-auto pt-3" style={{ borderTop: "1px solid var(--line)" }}>
                      {TRAITS.map((trait) => (
                        <span className="badge badge-teal" key={trait}>
                          {trait}
                        </span>
                      ))}
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- projects */}
      <section className="site-section bg-light">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow eyebrow--center">In progress</span>
            <h2>Our projects</h2>
            <p>
              Live initiatives across Kigali and the surrounding districts — updated as each one progresses.
            </p>
          </Reveal>

          <div className="row g-4">
            {projects.map((project, i) => (
              <Reveal className="col-md-6 col-lg-4" key={project.title} delay={(i % 3) * 80}>
                <article className="card h-100 hover-shadow overflow-hidden">
                  <div className="position-relative overflow-hidden" style={{ aspectRatio: "16 / 10" }}>
                    <Image
                      src={project.img}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                    <span
                      className={`badge position-absolute ${project.status === "ongoing" ? "badge-accent" : "badge-teal"}`}
                      style={{ top: 14, right: 14 }}
                    >
                      {project.status}
                    </span>
                  </div>
                  <div className="card-body" style={{ padding: "1.5rem" }}>
                    <h3 style={{ fontSize: "var(--fs-h4)", marginBottom: "0.6rem" }}>{project.title}</h3>
                    <p style={{ fontSize: "var(--fs-sm)", marginBottom: "1.25rem" }}>{project.desc}</p>
                    <Link href="/contact" className="btn btn-outline-primary btn-sm">
                      Support this project <ArrowRight size={14} aria-hidden />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Every programme here is funded by people like you"
        text="A gift of any size goes directly to school sessions, clean-up materials, and youth training."
        buttonText="Donate now"
        secondaryText="Volunteer instead"
        bgImage="/images/optimized/event3.jpg"
      />

      <section className="site-section bg-white">
        <div className="container">
          <Reveal className="text-center mx-auto" style={{ maxWidth: 680 }}>
            <Sparkles size={24} className="mb-3" style={{ color: "var(--accent-500)" }} aria-hidden />
            <h2>Not sure which programme to support?</h2>
            <p>
              Ask our assistant — it knows every project, the budget priorities, and how to get involved. Or just tell us
              what you care about and we&rsquo;ll point you to the right place.
            </p>
            <Link href="/contact" className="btn btn-primary">
              Talk to us <ArrowRight size={16} aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
