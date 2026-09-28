import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import Hero from "@/components/Hero";
import CTASection from "@/components/CTASection";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Stories & news",
  description:
    "Field updates, activity write-ups and youth leadership stories from Health Root NGO in Rwanda — health education, sanitation and community outreach.",
};

interface Post {
  img: string;
  alt: string;
  date: string;
  iso: string;
  title: string;
  category: string;
  excerpt: string;
  featured?: boolean;
}

const POSTS: Post[] = [
  {
    img: "/images/wed7.jpg",
    alt: "Students in a school health outreach session",
    date: "12 May 2026",
    iso: "2026-05-12",
    title: "Why personal hygiene still decides school health outcomes",
    category: "Health education",
    excerpt:
      "We ran sessions in four partner schools this term. The pattern was consistent: the schools that got supplies *and* follow-up teaching saw the biggest drop in hygiene-related absences.",
    featured: true,
  },
  {
    img: "/images/ga8.jpg",
    alt: "Young people at a leadership training session",
    date: "10 May 2026",
    iso: "2026-05-10",
    title: "Empowering young leaders through mentorship",
    category: "Youth",
    excerpt:
      "Our six-month leadership track has graduated its third cohort. The most useful part is not the curriculum — it is that each participant has to run a real campaign in their own community.",
  },
  {
    img: "/images/ga6.jpg",
    alt: "Volunteers during a community clean-up",
    date: "8 May 2026",
    iso: "2026-05-08",
    title: "Building a cleaner Kigali, one street at a time",
    category: "Environment",
    excerpt:
      "Monthly sanitation days now run in 18 districts. What changed this year is ownership: local groups now plan and lead the clean-ups themselves.",
  },
  {
    img: "/images/ga4.jpg",
    alt: "A facilitator leading a mental wellness session",
    date: "5 May 2026",
    iso: "2026-05-05",
    title: "Breaking the stigma around youth mental health",
    category: "Wellness",
    excerpt:
      "Thirty-four peer facilitators are now running mental wellness sessions in schools and churches. For young people, hearing it from a peer changes everything.",
  },
  {
    img: "/images/ga11.jpg",
    alt: "Volunteers planting trees",
    date: "3 May 2026",
    iso: "2026-05-03",
    title: "What our tree planting initiative actually changed",
    category: "Environment",
    excerpt:
      "Beyond the greenery, the tree planting drives created 40 young people trained in nursery management who now maintain the sites without us.",
  },
  {
    img: "/images/ga3.jpg",
    alt: "Families at a nutrition workshop",
    date: "1 May 2026",
    iso: "2026-05-01",
    title: "Nutrition tips for growing communities",
    category: "Nutrition",
    excerpt:
      "A practical workshop on balanced diets built around foods families can actually afford and grow locally — not imported supplements.",
  },
];

export default function Blog() {
  const [featured, ...rest] = POSTS;

  return (
    <>
      <Hero
        title="Stories & news"
        subtitle="Field notes from the communities we work in — what we did, what we learned, and what we are changing as a result."
        bgImage="/images/hom1.jpg"
        compact
        primaryLabel="Support this work"
        primaryHref="/donate"
        secondaryLabel="See the gallery"
        secondaryHref="/gallery"
      />

      {/* --------------------------------------------------------- featured */}
      <section className="site-section bg-white">
        <div className="container">
          <Reveal>
            <Link
              href="/blog"
              className="row g-0 align-items-stretch text-decoration-none overflow-hidden"
              style={{ background: "var(--bg-alt)", borderRadius: "var(--r-2xl)", boxShadow: "var(--sh-md)" }}
            >
              <div className="col-lg-7 position-relative" style={{ minHeight: 300, background: "var(--slate-100)" }}>
                <Image
                  src={featured.img}
                  alt={featured.alt}
                  fill
                  priority
                  sizes="(max-width: 992px) 100vw, 58vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="col-lg-5" style={{ padding: "clamp(1.75rem, 4vw, 2.75rem)" }}>
                <span className="badge badge-accent mb-3">Latest · {featured.category}</span>
                <h2 style={{ fontSize: "var(--fs-h2)" }}>{featured.title}</h2>
                <p style={{ fontSize: "var(--fs-base)" }}>{featured.excerpt}</p>
                <p className="d-flex align-items-center gap-2 mb-0" style={{ fontSize: "var(--fs-sm)", color: "var(--text-muted)" }}>
                  <Calendar size={14} aria-hidden />
                  <time dateTime={featured.iso}>{featured.date}</time>
                </p>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------ posts */}
      <section className="site-section bg-light">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow eyebrow--center">Archive</span>
            <h2>More from the field</h2>
            <p>Updates from our programmes in Kigali and beyond.</p>
          </Reveal>

          <div className="row g-4">
            {rest.map((post, i) => (
              <Reveal className="col-md-6 col-lg-4" key={post.title} delay={(i % 3) * 80}>
                <article className="card h-100 hover-shadow overflow-hidden">
                  <div className="position-relative overflow-hidden" style={{ aspectRatio: "16 / 10" }}>
                    <Image
                      src={post.img}
                      alt={post.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                    <span className="badge badge-secondary position-absolute" style={{ top: 14, left: 14 }}>
                      {post.category}
                    </span>
                  </div>
                  <div className="card-body d-flex flex-column" style={{ padding: "1.5rem" }}>
                    <p
                      className="d-flex align-items-center gap-2 mb-3"
                      style={{ fontSize: "var(--fs-xs)", color: "var(--text-muted)", fontWeight: 600 }}
                    >
                      <Calendar size={13} aria-hidden />
                      <time dateTime={post.iso}>{post.date}</time>
                    </p>
                    <h3 style={{ fontSize: "var(--fs-h4)", marginBottom: "0.6rem" }}>
                      <Link href="/blog" className="text-decoration-none">
                        {post.title}
                      </Link>
                    </h3>
                    <p style={{ fontSize: "var(--fs-sm)", marginBottom: "1.25rem" }}>{post.excerpt}</p>
                    <Link href="/blog" className="btn-link d-inline-flex align-items-center gap-2 mt-auto">
                      Read more <ArrowRight size={15} aria-hidden />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Get the next story in your inbox"
        text="Activity updates and impact reports, roughly once a month. No noise, no spam."
        buttonText="Support our work"
        secondaryText="Browse the gallery"
        secondaryHref="/gallery"
      />
    </>
  );
}
