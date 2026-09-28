"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";

interface CTASectionProps {
  title?: string;
  text?: string;
  buttonText?: string;
  buttonHref?: string;
  secondaryText?: string;
  secondaryHref?: string;
  bgImage?: string;
}

export default function CTASection({
  title = "Healthy young people build a healthy community. That takes all of us.",
  text = "Whether you give, volunteer, or simply share our work — you decide how you show up. Pick the way that fits you.",
  buttonText = "Donate now",
  buttonHref = "/donate",
  secondaryText = "Volunteer with us",
  secondaryHref = "/contact",
  bgImage = "/images/optimized/event3.jpg",
}: CTASectionProps) {
  return (
    <section className="cta">
      <div className="cta__media">
        <Image src={bgImage} alt="" fill quality={85} sizes="100vw" style={{ objectFit: "cover" }} />
      </div>
      <div className="cta__scrim" />

      <div className="container position-relative">
        <Reveal className="text-center mx-auto" from="up">
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <span className="eyebrow eyebrow--center" style={{ color: "var(--accent-400)" }}>
              Take action
            </span>
            <h2 className="cta__title">{title}</h2>
            <p className="cta__text">{text}</p>
            <div className="cta__actions">
              <Link href={buttonHref} className="btn btn-accent btn-lg">
                {buttonText}
                <ArrowRight size={17} aria-hidden />
              </Link>
              {secondaryText && secondaryHref && (
                <Link href={secondaryHref} className="btn btn-ghost-light btn-lg">
                  {secondaryText}
                </Link>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
