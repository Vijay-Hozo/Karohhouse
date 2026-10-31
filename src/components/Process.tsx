"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { AnimatedTitle, Eyebrow } from "./fx/AnimatedTitle";

const steps = [
  { n: "01", title: "Capture", body: "Every enquiry lands in one place with source, country, volume and licence status.", ai: "AI tags the source and drafts the first reply." },
  { n: "02", title: "Qualify in 24h", body: "Volume, buyer type, payment terms and import eligibility, checked against the market.", ai: "Compliance checklist pulled per destination country." },
  { n: "03", title: "Quote", body: "A templated price sheet with a validity window, so buyers can act fast.", ai: "Auto-quote from the current price sheet." },
  { n: "04", title: "Sample and call", body: "Paid sample shipment, refundable against the first order, followed by a call.", ai: "Stalled leads are chased automatically." },
  { n: "05", title: "Close and dispatch", body: "Proforma invoice, 30 to 50 percent advance for new accounts, then dispatch.", ai: "Documents and batch codes bundled with the shipment." },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // Horizontal scroll: translate the track as the tall section scrolls.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-72%"]);
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" className="bg-bg">
      <div className="mx-auto max-w-7xl px-5 pt-28 sm:px-6 sm:pt-36">
        <Eyebrow>04 · How it works</Eyebrow>
        <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <AnimatedTitle
            className="text-5xl sm:text-6xl lg:text-7xl"
            lines={["Enquiry to dispatch", "in *five* steps"]}
          />
          <p className="max-w-sm text-sm text-fg-muted sm:text-base">
            Keep scrolling. The AI layer drafts replies, auto-quotes from the price sheet and
            chases stalled leads so nothing goes cold.
          </p>
        </div>
      </div>

      {/* Desktop: pinned horizontal scroll */}
      <div ref={ref} className="relative hidden h-[320vh] lg:block">
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <div className="mx-auto mb-8 h-px w-full max-w-7xl bg-line px-6">
            <motion.div style={{ width: progress }} className="h-px bg-gradient-to-r from-blue via-cyan to-sky" />
          </div>
          <motion.div style={{ x }} className="flex gap-6 pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]">
            {steps.map((s, i) => (
              <StepCard key={s.n} s={s} i={i} />
            ))}
            <div className="flex w-[28rem] flex-none items-center justify-center rounded-[2rem] border border-dashed border-line-strong">
              <a href="#apply" className="display text-4xl text-fg-muted transition hover:text-blue">
                Start →
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile: vertical stack */}
      <div className="mx-auto grid max-w-7xl gap-4 px-5 py-14 sm:grid-cols-2 lg:hidden">
        {steps.map((s, i) => (
          <StepCard key={s.n} s={s} i={i} />
        ))}
      </div>
    </section>
  );
}

function StepCard({ s, i }: { s: (typeof steps)[number]; i: number }) {
  const dark = i % 2 === 1;
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: i * 0.05 }}
      className={`group relative flex h-[26rem] w-full flex-none flex-col justify-between overflow-hidden rounded-[2rem] border p-8 lg:w-[30rem] ${
        dark ? "border-transparent bg-fg text-bg" : "border-line bg-surface"
      }`}
    >
      <div className={`absolute -right-10 -top-10 h-44 w-44 rounded-full blur-3xl transition-transform duration-700 group-hover:scale-150 ${dark ? "bg-cyan/50" : "bg-blue/25"}`} />
      <div className="relative">
        <span className={`display text-7xl ${dark ? "text-bg/15" : "text-fg/10"}`}>{s.n}</span>
        <h3 className="display mt-2 text-3xl sm:text-4xl">{s.title}</h3>
        <p className={`mt-4 text-sm leading-relaxed sm:text-base ${dark ? "text-bg/70" : "text-fg-muted"}`}>{s.body}</p>
      </div>
      <div className={`relative rounded-2xl p-4 ${dark ? "bg-bg/10" : "bg-bg-2"}`}>
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-blue">AI layer</p>
        <p className="mt-1 text-sm">{s.ai}</p>
      </div>
    </motion.article>
  );
}
