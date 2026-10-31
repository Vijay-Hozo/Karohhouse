"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { BarChart3, ClipboardCheck, Send, Wand2, Boxes, ArrowUpRight } from "lucide-react";
import { AnimatedTitle, Eyebrow, Reveal } from "./fx/AnimatedTitle";
import { TiltCard } from "./fx/TiltCard";
import bottlesImg from "@/assets/images/bottles-warm.jpg";
import pinkImg from "@/assets/images/bottle-pink.jpg";
import vialsImg from "@/assets/images/vials-amber.jpg";

const outreach = [
  { who: "Al Noor Perfumes · Riyadh", via: "WhatsApp", state: "Replied" },
  { who: "ScentBazaar · Mumbai", via: "Email", state: "Catalogue sent" },
  { who: "Oud & Co · Lagos", via: "LinkedIn", state: "Call booked" },
  { who: "Parfumeria 24 · Almaty", via: "WhatsApp", state: "Sample paid" },
];

export function Platform() {
  return (
    <section id="platform" className="relative bg-bg py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <Eyebrow>01 · The AI platform</Eyebrow>
            <AnimatedTitle
              className="mt-6 text-4xl sm:text-5xl lg:text-6xl"
              lines={["From reseller to", "*distribution* _platform_"]}
            />
          </div>
          <Reveal delay={0.3}>
            <p className="max-w-md text-sm leading-relaxed text-fg-muted sm:text-base lg:ml-auto">
              Most perfume distributors are manual and relationship-driven. Karoh&apos;s AI layer
              makes market entry, compliance and wholesale selling cheap and repeatable.
            </p>
          </Reveal>
        </div>

        {/* Bento */}
        <div className="mt-16 grid auto-rows-[minmax(220px,auto)] gap-4 md:grid-cols-6">
          {/* Demand intelligence, big, with image */}
          <Reveal className="md:col-span-4 md:row-span-2">
            <TiltCard className="p-0">
              <div className="grid h-full md:grid-cols-[1.1fr_0.9fr]">
                <div className="flex flex-col justify-between gap-10 p-8 sm:p-10">
                  <div>
                    <Tag icon={BarChart3}>Demand and assortment intelligence</Tag>
                    <h3 className="display mt-5 text-2xl sm:text-3xl">
                      Know which SKUs to import <span className="text-blue">before</span> you
                      commit capital
                    </h3>
                    <p className="mt-4 max-w-md text-sm text-fg-muted sm:text-base">
                      Bestsellers, pricing and stock-outs tracked across marketplaces and
                      retailers, so every import decision is backed by live demand.
                    </p>
                  </div>
                  <Bars />
                </div>
                <div className="relative hidden min-h-[260px] md:block">
                  <Image
                    src={bottlesImg}
                    alt="Perfume bottles lined up in warm light"
                    fill
                    placeholder="blur"
                    sizes="(min-width: 768px) 30vw, 0px"
                    className="img-cover transition-transform duration-[1.5s] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-surface via-transparent to-transparent" />
                  <div className="absolute bottom-5 right-5 rounded-2xl bg-bg/85 px-4 py-3 backdrop-blur">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-fg-muted">Top mover · GCC</p>
                    <p className="display mt-1 text-xl">Armaf Club de Nuit</p>
                    <p className="text-xs text-sky">+31% sell-through, 30d</p>
                  </div>
                </div>
              </div>
            </TiltCard>
          </Reveal>

          {/* Compliance */}
          <Reveal delay={0.1} className="md:col-span-2">
            <TiltCard className="p-7">
              <Tag icon={ClipboardCheck}>Compliance automation</Tag>
              <h3 className="mt-4 text-lg font-semibold leading-snug">
                Every country launch becomes a checklist, not a research project.
              </h3>
              <ul className="mt-5 space-y-2 text-xs text-fg-muted">
                {["Labelling and allergens", "EU CPNP notification", "Responsible Person", "HS codes for GCC and India"].map(
                  (c, i) => (
                    <motion.li
                      key={c}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="flex items-center gap-2"
                    >
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-sky text-[9px] font-bold text-on-accent">
                        ✓
                      </span>
                      {c}
                    </motion.li>
                  )
                )}
              </ul>
            </TiltCard>
          </Reveal>

          {/* Discovery assistant with image background */}
          <Reveal delay={0.15} className="md:col-span-2">
            <TiltCard tone="ink" className="p-0 text-white">
              <div className="relative h-full min-h-[300px]">
                <Image
                  src={pinkImg}
                  alt="Minimal perfume bottle on a soft background"
                  fill
                  placeholder="blur"
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="img-cover transition-transform duration-[1.5s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/70 to-blue/20" />
                <div className="relative flex h-full flex-col justify-end p-7">
                  <Tag icon={Wand2} light>
                    Discovery assistant
                  </Tag>
                  <h3 className="mt-3 text-lg font-semibold leading-snug">
                    &ldquo;Something like Baccarat Rouge, but for a warm evening.&rdquo;
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {["Lattafa Khamrah", "Armaf CDN", "Afnan 9pm"].map((s) => (
                      <span key={s} className="rounded-full bg-white/15 px-3 py-1 text-xs backdrop-blur">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </TiltCard>
          </Reveal>

          {/* Outreach / Monsoon */}
          <Reveal delay={0.1} className="md:col-span-3">
            <TiltCard className="p-7 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Tag icon={Send}>B2B outreach · built on Monsoon</Tag>
                  <h3 className="mt-4 text-lg font-semibold leading-snug">
                    Company names in. Verified decision makers out, routed to WhatsApp, email or
                    LinkedIn.
                  </h3>
                </div>
                <ArrowUpRight className="h-5 w-5 flex-none text-fg-muted transition group-hover:text-blue" />
              </div>
              <ul className="mt-6 divide-y divide-line text-sm">
                {outreach.map((o, i) => (
                  <motion.li
                    key={o.who}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="flex items-center justify-between gap-3 py-2.5"
                  >
                    <span className="truncate">{o.who}</span>
                    <span className="hidden text-xs text-fg-muted sm:block">{o.via}</span>
                    <span className="rounded-full bg-sky/20 px-2.5 py-0.5 text-[11px] font-semibold text-fg">
                      {o.state}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </TiltCard>
          </Reveal>

          {/* Operations with vial image */}
          <Reveal delay={0.2} className="md:col-span-3">
            <TiltCard tone="ink" className="p-0">
              <div className="grid h-full sm:grid-cols-[1fr_0.7fr]">
                <div className="p-7 sm:p-8">
                  <Tag icon={Boxes} light>
                    Operations
                  </Tag>
                  <h3 className="display mt-4 text-2xl">
                    Forecast. Reorder. <span className="text-sky">Onboard.</span>
                  </h3>
                  <p className="mt-3 text-sm text-bg/70">
                    Inventory forecasting, reorder triggers and distributor onboarding for a small
                    team running a multi-market business.
                  </p>
                  <div className="mt-6 grid grid-cols-3 gap-2 text-center">
                    {[
                      ["Reorder", "auto"],
                      ["Forecast", "90d"],
                      ["Onboard", "48h"],
                    ].map(([k, v]) => (
                      <div key={k} className="rounded-2xl border border-bg/15 py-3">
                        <p className="display text-xl text-cyan-2">{v}</p>
                        <p className="text-[10px] uppercase tracking-widest text-bg/60">{k}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative hidden min-h-[220px] sm:block">
                  <Image
                    src={vialsImg}
                    alt="Amber fragrance vials in a row"
                    fill
                    placeholder="blur"
                    sizes="(min-width: 640px) 20vw, 0px"
                    className="img-cover transition-transform duration-[1.5s] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-fg to-transparent" />
                </div>
              </div>
            </TiltCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Tag({
  icon: Icon,
  children,
  light = false,
}: {
  icon: typeof BarChart3;
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <p
      className={`inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] ${
        light ? "text-white/80" : "text-blue"
      }`}
    >
      <Icon className="h-4 w-4" />
      {children}
    </p>
  );
}

function Bars() {
  const data = [38, 62, 48, 80, 70, 96, 84, 58, 90, 72, 100, 88];
  return (
    <div className="flex h-24 items-end gap-1.5 sm:gap-2">
      {data.map((h, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          whileInView={{ height: `${h}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
          className={`flex-1 rounded-t-md transition-colors ${i === 10 ? "bg-blue" : "bg-fg/15 group-hover:bg-cyan/50"}`}
        />
      ))}
    </div>
  );
}
