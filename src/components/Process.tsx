"use client";

import { motion } from "motion/react";
import { AnimatedTitle, Eyebrow } from "./fx/AnimatedTitle";

const steps = [
  { n: "01", title: "Capture", body: "Every enquiry lands in one place with source, country, volume and licence status.", ai: "AI tags the source and drafts the first reply." },
  { n: "02", title: "Qualify in 24h", body: "Volume, buyer type, payment terms and import eligibility, checked against the market.", ai: "Compliance checklist pulled per destination country." },
  { n: "03", title: "Quote", body: "A templated price sheet with a validity window, so buyers can act fast.", ai: "Auto-quote from the current price sheet." },
  { n: "04", title: "Sample and call", body: "Paid sample shipment, refundable against the first order, followed by a call.", ai: "Stalled leads are chased automatically." },
  { n: "05", title: "Close and dispatch", body: "Proforma invoice, 30 to 50 percent advance for new accounts, then dispatch.", ai: "Documents and batch codes bundled with the shipment." },
];

export function Process() {
  return (
    <section id="process" className="relative overflow-hidden bg-bg">
      <div className="absolute left-1/2 top-20 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-blue/10 blur-[130px]" />
      <div className="relative mx-auto max-w-7xl px-5 pt-28 sm:px-6 sm:pt-36">
        <Eyebrow>04 · How it works</Eyebrow>
        <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <AnimatedTitle
            className="max-w-3xl text-4xl sm:text-5xl lg:text-7xl"
            lines={["Enquiry to dispatch", "in *five* steps"]}
          />
          <p className="max-w-md text-sm leading-relaxed text-fg-muted sm:text-base">
            Keep scrolling. The AI layer drafts replies, auto-quotes from the price sheet and
            chases stalled leads so nothing goes cold.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-16">
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 flex origin-left items-center gap-4"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-fg-muted">Workflow</span>
          <div className="h-px flex-1 bg-gradient-to-r from-blue via-cyan to-transparent" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-fg-muted">Dispatch</span>
        </motion.div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {steps.map((s, i) => (
            <StepCard key={s.n} s={s} i={i} />
          ))}
          <motion.a
            href="#apply"
            initial={{ opacity: 0, y: 44 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="group flex min-h-56 items-center justify-center rounded-[2rem] border border-dashed border-line-strong bg-surface/40 p-8 text-center transition hover:border-blue hover:bg-blue/5 sm:min-h-0"
          >
            <span className="display text-2xl text-fg-muted transition group-hover:text-blue sm:text-3xl">
              Start your workflow <span className="text-blue">→</span>
            </span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}

function StepCard({ s, i }: { s: (typeof steps)[number]; i: number }) {
  const dark = i % 2 === 1;
  return (
    <motion.article
      initial={{ opacity: 0, y: 44, rotateX: 8 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformPerspective: 900 }}
      className={`group relative flex min-h-[27rem] w-full flex-col justify-between overflow-hidden rounded-[2rem] border p-7 shadow-[0_24px_70px_-45px_var(--glow)] transition-transform duration-500 hover:-translate-y-2 sm:p-8 ${
        dark ? "border-transparent bg-fg text-bg" : "border-line bg-surface"
      }`}
    >
      <div className={`absolute -right-10 -top-10 h-52 w-52 rounded-full blur-3xl transition-transform duration-700 group-hover:scale-150 ${dark ? "bg-cyan/40" : "bg-blue/20"}`} />
      <div className="relative">
        <div className="flex items-start justify-between">
          <span className={`display text-7xl leading-none ${dark ? "text-bg/15" : "text-fg/10"}`}>{s.n}</span>
          <span className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] ${dark ? "border-bg/15 text-bg/55" : "border-line text-fg-muted"}`}>
            Step {i + 1}
          </span>
        </div>
        <h3 className="display mt-5 text-2xl sm:text-3xl">{s.title}</h3>
        <p className={`mt-4 text-sm leading-relaxed sm:text-base ${dark ? "text-bg/70" : "text-fg-muted"}`}>{s.body}</p>
      </div>
      <div className={`relative rounded-2xl border p-4 ${dark ? "border-bg/10 bg-bg/10" : "border-line bg-bg-2"}`}>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-sky shadow-[0_0_12px_var(--sky)]" />
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-blue">AI layer</p>
        </div>
        <p className="mt-2 text-sm leading-relaxed">{s.ai}</p>
      </div>
    </motion.article>
  );
}
