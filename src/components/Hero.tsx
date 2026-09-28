"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, HeartHandshake } from "lucide-react";

interface HeroStat {
  value: string;
  label: string;
}

interface HeroProps {
  title: string;
  subtitle?: string;
  bgImage?: string;
  compact?: boolean;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  stats?: HeroStat[];
  priority?: boolean;
}

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero({
  title,
  subtitle,
  bgImage = "/images/optimized/event2.jpg",
  compact = false,
  primaryLabel = "Donate now",
  primaryHref = "/donate",
  secondaryLabel,
  secondaryHref,
  stats,
  priority = true,
}: HeroProps) {
  const reduceMotion = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : delay, ease },
  });

  return (
    <header className={`hero${compact ? " hero--compact" : ""}`}>
      <div className="hero__media">
        <Image
          src={bgImage}
          alt=""
          fill
          priority={priority}
          quality={90}
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="hero__scrim" />

      <div className="container position-relative">
        <div className="hero__inner">
          {!compact && (
            <motion.span
              {...rise(0.05)}
              className="badge badge-accent mb-4"
              style={{ fontSize: "0.7rem", letterSpacing: "0.12em" }}
            >
              <HeartHandshake size={13} aria-hidden />
              Youth-led · Kigali, Rwanda
            </motion.span>
          )}

          <motion.h1 {...rise(0.14)} className="hero__title">
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p {...rise(0.24)} className="hero__sub">
              {subtitle}
            </motion.p>
          )}

          {(primaryLabel || secondaryLabel) && (
            <motion.div {...rise(0.34)} className="hero__actions">
              {primaryLabel && (
                <Link href={primaryHref ?? "/donate"} className="btn btn-accent btn-lg">
                  {primaryLabel}
                  <ArrowRight size={17} aria-hidden />
                </Link>
              )}
              {secondaryLabel && secondaryHref && (
                <Link href={secondaryHref} className="btn btn-ghost-light btn-lg">
                  {secondaryLabel}
                </Link>
              )}
            </motion.div>
          )}

          {stats && stats.length > 0 && (
            <motion.dl {...rise(0.46)} className="hero__stats">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dd className="hero__stat-value m-0">{stat.value}</dd>
                  <dt className="stat-label m-0 mt-2">{stat.label}</dt>
                </div>
              ))}
            </motion.dl>
          )}
        </div>
      </div>
    </header>
  );
}
