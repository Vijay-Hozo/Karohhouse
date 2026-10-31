"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const wordVariants: Variants = {
  hidden: { opacity: 0, y: "110%", rotateX: -70, rotateY: 12 },
  show: (i: number) => ({
    opacity: 1,
    y: "0%",
    rotateX: 0,
    rotateY: 0,
    transition: { duration: 0.9, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
  }),
};

/**
 * Zentry-style title: each word flips up in 3D with a stagger when the heading scrolls into view.
 * The IntersectionObserver sits on the heading, not on the words, because a word translated
 * out of its overflow-hidden wrapper is clipped to zero area and would never register as visible.
 * Wrap a word in `*word*` for the gradient accent or `_word_` for the outline style.
 */
export function AnimatedTitle({
  lines,
  className = "",
  as = "h2",
  delay = 0,
}: {
  lines: string[];
  className?: string;
  as?: "h1" | "h2" | "h3";
  delay?: number;
}) {
  const Tag = motion[as];
  let i = 0;
  return (
    <Tag
      className={`display ${className}`}
      style={{ perspective: "1000px" }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      {lines.map((line, li) => (
        <span key={li} className="flex flex-wrap gap-x-[0.22em]">
          {line.split(" ").map((word, wi) => {
            const idx = i++;
            const accent = word.startsWith("*") && word.endsWith("*");
            const outline = word.startsWith("_") && word.endsWith("_");
            const text = accent || outline ? word.slice(1, -1) : word;
            return (
              <span key={wi} className="inline-block overflow-hidden pb-[0.08em]">
                <motion.span
                  variants={wordVariants}
                  custom={idx + delay / 0.06}
                  style={{ transformOrigin: "50% 100%", display: "inline-block" }}
                  className={accent ? "text-gradient" : outline ? "outline-text" : ""}
                >
                  {text}
                </motion.span>
              </span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.p
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-blue ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-blue" />
      {children}
    </motion.p>
  );
}

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
