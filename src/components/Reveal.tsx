"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Stagger in milliseconds */
  delay?: number;
  /** Direction the content travels in from */
  from?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  style?: CSSProperties;
  as?: "div" | "section" | "li" | "article";
}

const OFFSET: Record<NonNullable<RevealProps["from"]>, { x: number; y: number }> = {
  up: { x: 0, y: 26 },
  down: { x: 0, y: -26 },
  left: { x: 30, y: 0 },
  right: { x: -30, y: 0 },
  none: { x: 0, y: 0 },
};

export default function Reveal({
  children,
  delay = 0,
  from = "up",
  className,
  style,
  as = "div",
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const offset = OFFSET[from];

  const MotionTag = motion[as];

  const variants: Variants = {
    hidden: { opacity: 0, x: offset.x, y: offset.y },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.62,
        delay: reduceMotion ? 0 : delay / 1000,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <MotionTag
      className={className}
      style={style}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </MotionTag>
  );
}
