import Image from "next/image";
import Link from "next/link";
import { ArrowRight, HeartHandshake, GraduationCap, Leaf, Brain, Scale, Home as HomeIcon, Users } from "lucide-react";
import Hero from "@/components/Hero";
import CTASection from "@/components/CTASection";
import Reveal from "@/components/Reveal";
import { impactStats } from "@/lib/site";

const OBJECTIVES = [
  { icon: HeartHandshake, title: "Health education", desc: "Teaching young people about hygiene, nutrition and disease prevention — in schools and community halls." },
  { icon: GraduationCap, title: "Youth empowerment", desc: "Building leadership, public speaking and confidence so young people can lead their own development." },
  { icon: Leaf, title: "Sanitation & environment", desc: "Clean-up drives, tree planting and waste education that make shared spaces genuinely healthier." },
  { icon: Brain, title: "Mental wellness", desc: "Safe, stigma-free conversations about mental health and emotional wellbeing for young people." },
  { icon: HomeIcon, title: "Social responsibility", desc: "Volunteering and teamwork that turn good intentions into consistent community action." },
  { icon: Scale, title: "Equality & respect", desc: "Health information and support for everyone, regardless of background, gender or income." },
] as const;

const PILLARS = [
  {
    img: "/images/optimized/event1.jpg",
    tag: "Health education",
    title: "Community health awareness",
    desc: "Campaigns on personal hygiene, nutrition and disease prevention delivered directly in Kigali schools.",
    href: "/what-we-do#health-education",
  },
  {
    img: "/images/ga6.jpg",
    tag: "Sanitation",
    title: "Environmental clean-up",
    desc: "Monthly sanitation days that give neighbourhoods shared ownership of their own environment.",
    href: "/what-we-do#sanitation-environment",
  },
  {
    img: "/images/ga8.jpg",
    tag: "Youth leadership",
    title: "Leadership training",
    desc: "Equipping young people with communication and organisational skills to run their own campaigns.",
    href: "/what-we-do#youth-empowerment",
  },
] as const;

export default function Home() {
  return (
    <>
      <Hero
        title="Healthy young people build a healthy community"
        subtitle="Health Root NGO is a youth-led organisation in Kigali, Rwanda. We deliver health education, leadership training and sanitation programmes that young people run themselves."
        bgImage="/images/optimized/event2.jpg"
        primaryLabel="Support our mission"
        primaryHref="/donate"
        secondaryLabel="See our impact"
        secondaryHref="/our-impact"
        stats={[
          { value: "10,000+", label: "Young people reached" },
          { value: "120+", label: "Active volunteers" },
          { value: "18", label: "Districts engaged" },
        ]}
      />

      {/* ---------------------------------------------------------- welcome */}
      <section className="site-section bg-white">
        <div className="container">
          {/* g-4/g-lg-5 rather than a flat g-5: the vendored bootstrap row
              pulls itself out by half the gutter on each side, so a flat 3rem
              gutter is wider than the container padding on narrow screens and
              pushes the row past the viewport. Stepping the gutter down below
              lg trims the overflow; the remaining sub-lg overflow on this page
              is a separate, still-open issue. */}
          <div className="row align-items-center g-4 g-lg-5">
            <Reveal className="col-lg-5" from="left">
              <div
                style={{
                  background: "linear-gradient(140deg, var(--brand-800), var(--brand-950))",
                  color: "#fff",
                  borderRadius: "var(--r-2xl)",
                  padding: "clamp(2rem, 4vw, 2.75rem)",
                  boxShadow: "var(--sh-lg)",
                }}
              >
                <span className="eyebrow" style={{ color: "var(--accent-400)" }}>
                  Our reach
                </span>
                <p className="stat-value mb-1">10,000+</p>
                <p style={{ color: "rgba(255,255,255,0.72)", marginBottom: "1.75rem" }}>
                  young people reached across Kigali and beyond — through schools, churches and community groups.
                </p>
                <dl className="mb-0" style={{ display: "grid", gap: "1.1rem" }}>
                  {impactStats.slice(1).map((stat) => (
                    <div key={stat.label} style={{ display: "flex", alignItems: "baseline", gap: "0.85rem" }}>
                      <dt className="m-0" style={{ fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-0.03em" }}>
                        {stat.value}
                      </dt>
                      <dd className="m-0 stat-label">{stat.label}</dd>
                    </div>
                  ))}
                </dl>
                <Link href="/our-impact" className="btn btn-accent mt-4">
                  View our impact <ArrowRight size={16} aria-hidden />
                </Link>
              </div>
            </Reveal>

            <Reveal className="col-lg-7" from="right" delay={120}>
              <span className="eyebrow">Who we are</span>
              <h2>Health starts with the people who live in it</h2>
              <p className="lead">
                We are a community-based organisation focused on health awareness, youth empowerment and community
                development. Our conviction is simple: informed, confident young people are the fastest route to a
                healthier, stronger community.
              </p>
              <p>
                Everything we do is designed to be led by young people rather than delivered to them. Our members plan
                the campaigns, run the sessions, and hold each other to the standard.
              </p>
              <div className="d-flex flex-wrap gap-2 mt-4">
                <Link href="/about" className="btn btn-primary">
                  About us <ArrowRight size={16} aria-hidden />
                </Link>
                <Link href="/what-we-do" className="btn btn-outline-primary">
                  What we do
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- objectives */}
      <section className="site-section bg-light">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow eyebrow--center">What guides us</span>
            <h2>Six objectives, one outcome</h2>
            <p>
              Building a healthier, educated, responsible and empowered community — through these six commitments.
            </p>
          </Reveal>

          <div className="row g-4">
            {OBJECTIVES.map((item, i) => (
              <Reveal className="col-md-6 col-lg-4" key={item.title} delay={i * 70}>
                <div className="card h-100 hover-shadow" style={{ padding: "1.75rem" }}>
                  <span className="icon-wrap mb-4">
                    <item.icon size={24} aria-hidden />
                  </span>
                  <h3 style={{ fontSize: "var(--fs-h4)", marginBottom: "0.6rem" }}>{item.title}</h3>
                  <p style={{ margin: 0, fontSize: "var(--fs-sm)", lineHeight: 1.65 }}>{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- pillars */}
      <section className="site-section bg-white">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow eyebrow--center">In the field</span>
            <h2>Our latest activities</h2>
            <p>Health awareness campaigns, environmental action and youth training — happening across the community.</p>
          </Reveal>

          <div className="row g-4">
            {PILLARS.map((pillar, i) => (
              <Reveal className="col-md-6 col-lg-4" key={pillar.title} delay={i * 90}>
                <article className="card h-100 hover-shadow overflow-hidden">
                  <Link
                    href={pillar.href}
                    className="position-relative d-block overflow-hidden"
                    style={{ aspectRatio: "4 / 3" }}
                    tabIndex={-1}
                    aria-hidden
                  >
                    <Image
                      src={pillar.img}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                    <span
                      className="badge badge-secondary position-absolute"
                      style={{ top: 14, left: 14 }}
                    >
                      {pillar.tag}
                    </span>
                  </Link>
                  <div className="card-body" style={{ padding: "1.5rem" }}>
                    <h3 style={{ fontSize: "var(--fs-h4)", marginBottom: "0.6rem" }}>
                      <Link href={pillar.href} className="text-decoration-none">
                        {pillar.title}
                      </Link>
                    </h3>
                    <p style={{ fontSize: "var(--fs-sm)", marginBottom: "1.1rem" }}>{pillar.desc}</p>
                    <Link href={pillar.href} className="btn-link d-inline-flex align-items-center gap-2">
                      Learn more <ArrowRight size={15} aria-hidden />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className="text-center mt-5">
            <Link href="/gallery" className="btn btn-primary btn-lg">
              <Users size={17} aria-hidden />
              See the full photo gallery
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------ donate */}
      <section className="site-section bg-light">
        <div className="container">
          <Reveal>
            <div
              className="row g-0 align-items-center overflow-hidden"
              style={{ background: "#fff", borderRadius: "var(--r-2xl)", boxShadow: "var(--sh-lg)" }}
            >
              <div
                className="col-md-6 position-relative"
                style={{ minHeight: 320, background: "var(--slate-100)" }}
              >
                <Image
                  src="/images/ga11.jpg"
                  alt="Health Root NGO volunteers planting trees"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="col-md-6" style={{ padding: "clamp(2rem, 5vw, 3.25rem)" }}>
                <span className="eyebrow">Get involved</span>
                <h2>Be part of the change</h2>
                <p style={{ fontSize: "var(--fs-lg)" }}>
                  Healthy young people are the foundation of a healthy, successful community. Join us as a donor,
                  a volunteer, or an advocate — every one of those makes the work possible.
                </p>
                <div className="d-flex flex-wrap gap-2">
                  <Link href="/donate" className="btn btn-accent btn-lg">
                    Donate now <ArrowRight size={17} aria-hidden />
                  </Link>
                  <Link href="/contact" className="btn btn-outline-primary btn-lg">
                    Volunteer
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
