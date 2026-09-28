import Link from "next/link";
import { Home, Search, MessageCircle, ArrowRight, Compass } from "lucide-react";
import { navLinks } from "@/lib/site";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="site-section bg-white" style={{ paddingTop: "calc(var(--nav-h) + 5rem)" }}>
      <div className="container">
        <div className="mx-auto text-center" style={{ maxWidth: 620 }}>
          <span className="eyebrow eyebrow--center">Error 404</span>
          <p
            style={{
              fontSize: "clamp(4rem, 14vw, 7.5rem)",
              fontWeight: 800,
              lineHeight: 0.9,
              letterSpacing: "-0.05em",
              color: "var(--slate-200)",
              margin: 0,
            }}
          >
            404
          </p>
          <h1 style={{ marginTop: "1.5rem" }}>We couldn&rsquo;t find that page</h1>
          <p className="lead">
            The link may be out of date, or the page may have moved. Here is the fastest way back to what you need.
          </p>

          <div className="d-flex flex-wrap justify-content-center gap-2 mt-4">
            <Link href="/" className="btn btn-primary">
              <Home size={16} aria-hidden />
              Back to home
            </Link>
            <Link href="/gallery" className="btn btn-outline-primary">
              <Search size={16} aria-hidden />
              Browse the gallery
            </Link>
          </div>
        </div>

        <div className="row g-3 mt-5 justify-content-center">
          {navLinks.map((link) => (
            <div className="col-6 col-md-4 col-lg-2" key={link.href}>
              <Link
                href={link.href}
                className="d-flex align-items-center justify-content-center gap-2 h-100"
                style={{
                  background: "var(--bg-alt)",
                  border: "1px solid var(--line)",
                  borderRadius: "var(--r-md)",
                  padding: "0.85rem 1rem",
                  fontSize: "var(--fs-sm)",
                  fontWeight: 600,
                }}
              >
                {link.name}
                <ArrowRight size={14} aria-hidden />
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-5">
          <p style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--text-muted)" }}>
            <MessageCircle size={16} aria-hidden style={{ color: "var(--accent-500)" }} />
            Or just ask — our assistant can find the right page for you.
          </p>
          <p>
            <Link href="/contact" className="btn-link d-inline-flex align-items-center gap-2">
              <Compass size={15} aria-hidden />
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
