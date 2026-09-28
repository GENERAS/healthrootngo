"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Check,
  MessageCircle,
} from "lucide-react";
import { FacebookIcon, XIcon, InstagramIcon, LinkedinIcon } from "@/components/BrandIcons";
import Logo from "@/components/Logo";
import { navLinks, site } from "@/lib/site";

const SOCIAL_ICONS = {
  facebook: FacebookIcon,
  twitter: XIcon,
  instagram: InstagramIcon,
  linkedin: LinkedinIcon,
} as const;

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const year = new Date().getFullYear();

  const onSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    // Wire this to your mailing-list provider (Buttondown, Mailchimp, Resend…).
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="row gy-5">
          {/* Brand + newsletter */}
          <div className="col-lg-4 col-md-6">
            <h2 className="footer-brand__title">
              <Logo variant="mark" size={26} className="footer-brand__mark" />
              {site.shortName}
              <span> NGO</span>
            </h2>
            <p style={{ maxWidth: 340 }}>
              {site.tagline}. We empower young people with health education, leadership training and the tools to
              improve their own communities.
            </p>

            <div className="footer-newsletter">
              <h3>Stay informed</h3>
              <p style={{ marginBottom: 0 }}>Activity updates and impact reports. No spam, ever.</p>
              {subscribed ? (
                <p className="form-success d-flex align-items-center gap-2 mt-3 mb-0" role="status">
                  <Check size={16} aria-hidden /> You&rsquo;re on the list. Thank you.
                </p>
              ) : (
                <form className="footer-newsletter__form" onSubmit={onSubscribe}>
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                  />
                  <button type="submit" className="btn btn-accent" aria-label="Subscribe to the newsletter">
                    <ArrowRight size={17} aria-hidden />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Quick links */}
          <div className="col-lg-2 col-md-6 col-6">
            <h3>Explore</h3>
            <ul className="list-unstyled footer-links">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.name}</Link>
                </li>
              ))}
              <li>
                <Link href="/donate">Donate</Link>
              </li>
            </ul>
          </div>

          {/* Programmes */}
          <div className="col-lg-3 col-md-6">
            <h3>Our programmes</h3>
            <ul className="list-unstyled footer-links">
              <li>
                <Link href="/what-we-do#health-education">Health education &amp; awareness</Link>
              </li>
              <li>
                <Link href="/what-we-do#youth-empowerment">Youth leadership training</Link>
              </li>
              <li>
                <Link href="/what-we-do#sanitation-environment">Sanitation &amp; environment</Link>
              </li>
              <li>
                <Link href="/our-impact">Impact reports</Link>
              </li>
              <li>
                <Link href="/blog">Stories &amp; news</Link>
              </li>
              <li>
                <Link href="/gallery">Photo gallery</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-lg-3 col-md-6 col-6">
            <h3>Get in touch</h3>
            <ul className="list-unstyled footer-contact">
              <li>
                <MapPin size={16} aria-hidden />
                <span>
                  {site.address.street}
                  <br />
                  {site.address.countryName}
                </span>
              </li>
              <li>
                <Phone size={16} aria-hidden />
                <a href={site.phoneHref}>{site.phone}</a>
              </li>
              <li>
                <Mail size={16} aria-hidden />
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>
                <MessageCircle size={16} aria-hidden />
                <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer">
                  WhatsApp {site.whatsapp}
                </a>
              </li>
            </ul>

            <div className="d-flex gap-2 mt-3">
              {site.socials.map((social) => {
                const Icon = SOCIAL_ICONS[social.icon];
                return (
                  <a
                    key={social.label}
                    className="social-link"
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${site.name} on ${social.label}`}
                  >
                    <Icon size={17} aria-hidden />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {year} {site.name}. All rights reserved. Registered {site.registration}.
          </p>
          <p>{site.tagline}.</p>
        </div>
      </div>
    </footer>
  );
}
