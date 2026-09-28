import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import ContactForm, { ContactCards, OfficeHours } from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact us",
  description:
    "Get in touch with Health Root NGO in Kigali, Rwanda. Call, email, WhatsApp or send us a message — we reply within two working days.",
};

const MAP_SRC = `https://www.openstreetmap.org/export/embed.html?bbox=30.0219%2C-1.9841%2C30.1019%2C-1.9041&layer=mapnik&marker=${site.address.lat}%2C${site.address.lng}`;

export default function Contact() {
  const mapLink = `https://www.openstreetmap.org/?mlat=${site.address.lat}&mlon=${site.address.lng}#map=13/${site.address.lat}/${site.address.lng}`;

  return (
    <>
      <Hero
        title="Get in touch"
        subtitle="We read everything and we reply to everything. Choose whichever route suits you — form, phone, email or WhatsApp."
        bgImage="/images/hom1.jpg"
        compact
        primaryLabel="Send a message"
        primaryHref="#contact-form"
        secondaryLabel="Call us"
        secondaryHref={site.phoneHref}
      />

      {/* ------------------------------------------------------------ cards */}
      <section className="site-section bg-white">
        <div className="container">
          <Reveal>
            <ContactCards />
          </Reveal>
          <Reveal delay={80}>
            <div className="text-center mt-4">
              <OfficeHours />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ----------------------------------------------- form + map */}
      <section className="site-section bg-light" id="contact-form" style={{ scrollMarginTop: "90px" }}>
        <div className="container">
          <div className="row g-4 align-items-start">
            <Reveal className="col-lg-6" from="left">
              <ContactForm />
            </Reveal>

            <Reveal className="col-lg-6" from="right" delay={100}>
              <div
                className="overflow-hidden h-100 d-flex flex-column"
                style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "var(--r-xl)", minHeight: 420 }}
              >
                <div style={{ position: "relative", flex: 1, minHeight: 340 }}>
                  <iframe
                    title={`Map showing ${site.name} location in ${site.address.city}`}
                    src={MAP_SRC}
                    width="100%"
                    height="100%"
                    style={{ border: 0, display: "block", minHeight: 340 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <div style={{ padding: "1.25rem 1.5rem", borderTop: "1px solid var(--line)" }}>
                  <h2 style={{ fontSize: "var(--fs-h4)", marginBottom: "0.35rem" }}>Our office</h2>
                  <p style={{ fontSize: "var(--fs-sm)", margin: "0 0 0.75rem" }}>
                    {site.address.street}, {site.address.countryName}. Visits by appointment — please call or WhatsApp us
                    first so someone is available.
                  </p>
                  <a
                    href={mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-primary btn-sm"
                  >
                    Open in maps
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ faq */}
      <section className="site-section bg-white">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow eyebrow--center">Before you write</span>
            <h2>Quick answers</h2>
            <p>The four questions we get most often — and their answers.</p>
          </Reveal>

          <div className="row g-4 justify-content-center">
            {[
              {
                q: "How quickly will I hear back?",
                a: "Within two working days for messages left through this form or by email. Phone and WhatsApp are usually answered the same day during office hours.",
              },
              {
                q: "Can my organisation partner with you?",
                a: "Yes. We work with schools, churches, companies and other NGOs on health education, sanitation and youth training. Send us a short outline of what you have in mind.",
              },
              {
                q: "Can I visit the office?",
                a: "Yes, by appointment. Please call or WhatsApp ahead so the right person is available to meet you.",
              },
              {
                q: "Do you accept donations by Mobile Money?",
                a: "Yes. The donate page supports both international cards and Mobile Money (MTN MoMo and Airtel Money), one-off or monthly.",
              },
            ].map((item, i) => (
              <Reveal className="col-md-6 col-lg-3" key={item.q} delay={i * 70}>
                <div className="h-100" style={{ borderTop: "3px solid var(--accent-500)", paddingTop: "1.25rem" }}>
                  <h3 style={{ fontSize: "var(--fs-base)", fontWeight: 700, marginBottom: "0.5rem" }}>{item.q}</h3>
                  <p style={{ fontSize: "var(--fs-sm)", margin: 0 }}>{item.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
