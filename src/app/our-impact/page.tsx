import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Quote, TrendingUp, Target, Users } from "lucide-react";
import Hero from "@/components/Hero";
import CTASection from "@/components/CTASection";
import Reveal from "@/components/Reveal";
import { impactStats } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our impact",
  description:
    "Read Health Root NGO's impact stories and results — how many young people we have reached, what changed in partner schools, and where the work goes next.",
};

interface Story {
  title: string;
  img: string;
  alt: string;
  text: string;
  metric: { value: string; label: string };
  reverse?: boolean;
}

const STORIES: Story[] = [
  {
    title: "Healthy schools: a new standard for hygiene",
    img: "/images/wed7.jpg",
    alt: "Students taking part in a school health outreach session",
    text: "Our school outreach programme has reached thousands of students in Kigali with practical health education and hygiene supplies. Participating schools report a clear reduction in hygiene-related illness, and teachers tell us students now prompt each other rather than waiting to be told.",
    metric: { value: "2,400+", label: "Students reached in partner schools" },
    reverse: true,
  },
  {
    title: "Youth leadership: empowering future change-makers",
    img: "/images/ga8.jpg",
    alt: "Young people in a leadership training session",
    text: "Through our leadership track, young people who joined as participants now run their own health campaigns in their own neighbourhoods. This is the shift that matters most — we are not building an audience, we are building organisers.",
    metric: { value: "86", label: "Youth leaders trained" },
  },
  {
    title: "Clean communities: the impact of sanitation days",
    img: "/images/ga6.jpg",
    alt: "Volunteers during a community sanitation day",
    text: "Our monthly clean-up activities have changed how neighbourhoods relate to their shared spaces. Cleaner environments mean fewer vectors, less waste run-off, and a stronger sense that residents — not the council — are responsible for local health.",
    metric: { value: "18", label: "Districts with active clean-up groups" },
    reverse: true,
  },
  {
    title: "Mental wellness: breaking the silence",
    img: "/images/ga4.jpg",
    alt: "A facilitator leading a mental wellness session",
    text: "Mental health remains the hardest subject to raise openly in our communities. Our peer-facilitator model works because young people hear it from peers, not institutions. We have trained 34 peer facilitators who now run sessions in schools and churches.",
    metric: { value: "34", label: "Peer facilitators trained" },
  },
];

export default function OurImpact() {
  return (
    <>
      <Hero
        title="Our impact"
        subtitle="Every number here came from a community we work in — and every one of them started with someone deciding to show up."
        bgImage="/images/hom1.jpg"
        compact
        primaryLabel="Help us grow this"
        primaryHref="/donate"
        secondaryLabel="See the gallery"
        secondaryHref="/gallery"
      />

      {/* ------------------------------------------------------------ stats */}
      <section className="site-section bg-white">
        <div className="container">
          <Reveal>
            <div
              className="text-center px-4 py-5"
              style={{ background: "linear-gradient(140deg, var(--brand-800), var(--brand-950))", borderRadius: "var(--r-2xl)" }}
            >
              <span className="eyebrow eyebrow--center" style={{ color: "var(--accent-400)" }}>
                At a glance
              </span>
              <h2 style={{ color: "#fff" }}>Where we are today</h2>
              <div className="row g-4 mt-4">
                {impactStats.map((stat) => (
                  <div className="col-6 col-lg-3" key={stat.label}>
                    <p className="stat-value">{stat.value}</p>
                    <p className="stat-label mt-2 mb-0">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------- stories */}
      <section className="site-section bg-light">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow eyebrow--center">Stories of change</span>
            <h2>What the work actually looks like</h2>
            <p>
              Not case studies written from a distance — these are communities we are still working in, and the
              results are still moving.
            </p>
          </Reveal>

          {STORIES.map((story, i) => (
            <Reveal className="row align-items-center g-5 mb-5" key={story.title} delay={60}>
              <div className={`col-md-7 ${story.reverse ? "order-md-2" : ""}`}>
                <div
                  className="position-relative overflow-hidden"
                  style={{ borderRadius: "var(--r-2xl)", boxShadow: "var(--sh-md)", aspectRatio: "16 / 11" }}
                >
                  <Image
                    src={story.img}
                    alt={story.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 58vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>

              <div className={`col-md-5 ${story.reverse ? "order-md-1" : ""}`}>
                <span className="badge badge-accent mb-3">
                  <TrendingUp size={12} aria-hidden />
                  {story.metric.value}
                </span>
                <h2 style={{ fontSize: "var(--fs-h2)" }}>{story.title}</h2>
                <p style={{ fontSize: "var(--fs-lg)" }}>{story.text}</p>
                <p
                  className="mb-0"
                  style={{ fontSize: "var(--fs-sm)", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--teal-700)" }}
                >
                  {story.metric.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------ quote */}
      <section className="site-section bg-white">
        <div className="container">
          <Reveal className="mx-auto text-center" style={{ maxWidth: 800 }}>
            <Quote size={32} className="mb-4" style={{ color: "var(--accent-500)" }} aria-hidden />
            <blockquote style={{ fontSize: "var(--fs-h2)", marginBottom: "1.5rem" }}>
              “Before Health Root came to our school, nobody talked to us about mental health. Now there are students
              who help other students. That is the part nobody can measure, and it is the part that matters most.”
            </blockquote>
            <p style={{ fontWeight: 700, marginBottom: 0 }}>Keza, 21</p>
            <p className="stat-label" style={{ marginBottom: 0 }}>
              Youth leader, leadership academy graduate
            </p>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------- next */}
      <section className="site-section bg-light">
        <div className="container">
          <div className="row g-4">
            <Reveal className="col-md-4" from="up">
              <div className="card h-100 hover-shadow" style={{ padding: "1.75rem" }}>
                <span className="icon-wrap icon-wrap--teal mb-4">
                  <Target size={22} aria-hidden />
                </span>
                <h3 style={{ fontSize: "var(--fs-h4)", marginBottom: "0.5rem" }}>Our 2026 target</h3>
                <p style={{ fontSize: "var(--fs-sm)", margin: 0 }}>
                  Reach 20,000 young people and establish active clean-up groups in 30 districts.
                </p>
              </div>
            </Reveal>

            <Reveal className="col-md-4" from="up" delay={80}>
              <div className="card h-100 hover-shadow" style={{ padding: "1.75rem" }}>
                <span className="icon-wrap icon-wrap--teal mb-4">
                  <Users size={22} aria-hidden />
                </span>
                <h3 style={{ fontSize: "var(--fs-h4)", marginBottom: "0.5rem" }}>How we measure</h3>
                <p style={{ fontSize: "var(--fs-sm)", margin: 0 }}>
                  Pre- and post-session surveys, school attendance data, and quarterly field inspections by our Chief
                  Inspector.
                </p>
              </div>
            </Reveal>

            <Reveal className="col-md-4" from="up" delay={160}>
              <div className="card h-100 hover-shadow" style={{ padding: "1.75rem" }}>
                <span className="icon-wrap icon-wrap--teal mb-4">
                  <TrendingUp size={22} aria-hidden />
                </span>
                <h3 style={{ fontSize: "var(--fs-h4)", marginBottom: "0.5rem" }}>Accountability</h3>
                <p style={{ fontSize: "var(--fs-sm)", margin: 0 }}>
                  Our Treasurer publishes a financial summary for every reporting period. Ask us for it.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal className="text-center mt-5">
            <Link href="/gallery" className="btn btn-primary btn-lg">
              See the work in pictures <ArrowRight size={17} aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
