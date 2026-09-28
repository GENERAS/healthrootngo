import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, Phone } from "lucide-react";
import Hero from "@/components/Hero";
import CTASection from "@/components/CTASection";
import Reveal from "@/components/Reveal";
import { team, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our team",
  description:
    "Meet the leadership team of Health Root NGO — the people directing our programmes, finances and community engagement in Rwanda.",
};

export default function Team() {
  return (
    <>
      <Hero
        title="Our team"
        subtitle="A leadership group drawn entirely from the communities we serve — young, accountable, and hands-on in the field."
        bgImage="/images/hom1.jpg"
        compact
        primaryLabel="Work with us"
        primaryHref="/contact"
        secondaryLabel="What we do"
        secondaryHref="/what-we-do"
      />

      {/* ------------------------------------------------------------ intro */}
      <section className="site-section bg-white">
        <div className="container">
          <div className="row align-items-center g-5 pb-5" style={{ borderBottom: "1px solid var(--line)" }}>
            <Reveal className="col-lg-6 order-lg-2" from="right">
              <div
                className="position-relative overflow-hidden"
                style={{ borderRadius: "var(--r-2xl)", boxShadow: "var(--sh-lg)", aspectRatio: "4 / 3" }}
              >
                <Image
                  src="/images/optimized/all.jpg"
                  alt="Group photograph of the Health Root NGO team"
                  fill
                  priority
                  sizes="(max-width: 992px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </Reveal>

            <Reveal className="col-lg-6 order-lg-1" from="left" delay={100}>
              <span className="eyebrow">The people behind the work</span>
              <h2>Dedicated to positive change</h2>
              <p className="lead">
                Our leadership brings together real field experience, professional expertise and a shared commitment to
                youth empowerment.
              </p>
              <p>
                We believe health is the foundation of community development. By equipping young people with knowledge,
                mentorship and genuine leadership opportunities, we help a responsible generation drive sustainable
                health solutions — not as an aspiration, but as our operating method.
              </p>
              <div className="d-flex flex-wrap gap-2 mt-3">
                <Link href="/about" className="btn btn-primary">
                  Our mission
                </Link>
                <Link href="/contact" className="btn btn-outline-primary">
                  Contact us
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- team */}
      <section className="site-section bg-light">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow eyebrow--center">Leadership</span>
            <h2>Meet our leaders</h2>
            <p>The core management team directing Health Root NGO&rsquo;s operations and community impact.</p>
          </Reveal>

          <div className="row g-4 justify-content-center">
            {team.map((member, i) => (
              <Reveal className="col-sm-6 col-lg-3" key={member.name} delay={(i % 4) * 70}>
                <article className="team-card">
                  <div className="team-card__photo">
                    <Image
                      src={member.image}
                      alt={`Portrait of ${member.name}, ${member.role}`}
                      fill
                      sizes="(max-width: 576px) 100vw, (max-width: 992px) 50vw, 25vw"
                      style={{ objectFit: "cover", objectPosition: "top center" }}
                    />
                  </div>
                  <div className="team-card__body">
                    <h3 className="team-card__name">{member.name}</h3>
                    <span className="team-card__role">{member.role}</span>
                    <p className="team-card__bio">{member.bio}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ reach */}
      <section className="site-section bg-white">
        <div className="container">
          <Reveal className="mx-auto text-center" style={{ maxWidth: 720 }}>
            <h2>Want to reach one of us directly?</h2>
            <p>
              For partnerships, media requests or programme questions, write to us and we will route it to the right
              person — usually within two working days.
            </p>
            <div className="d-flex flex-wrap justify-content-center gap-2 mt-4">
              <a href={site.phoneHref} className="btn btn-outline-primary">
                <Phone size={16} aria-hidden /> {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="btn btn-outline-primary">
                <Mail size={16} aria-hidden /> {site.email}
              </a>
            </div>
            <Link href="/what-we-do" className="btn-link d-inline-flex align-items-center gap-2 mt-4">
              Explore our programmes <ArrowRight size={15} aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>

      <CTASection
        title="We are growing — and we need more hands"
        text="Whether you bring skills, time or funding, there is a real role for you in what we do next."
        buttonText="Get involved"
        buttonHref="/contact"
        secondaryText="Donate"
        secondaryHref="/donate"
      />
    </>
  );
}
