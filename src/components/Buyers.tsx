"use client";

import { useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Globe, Store, ShoppingCart, Plane, ArrowUpRight } from "lucide-react";
import { AnimatedTitle, Eyebrow, Reveal } from "./fx/AnimatedTitle";
import dubaiImg from "@/assets/images/dubai-skyline.jpg";
import bottlesImg from "@/assets/images/bottles-warm.jpg";
import colorImg from "@/assets/images/bottles-color.jpg";
import wingImg from "@/assets/images/wing.jpg";

type Buyer = {
  icon: typeof Globe;
  name: string;
  regions: string;
  headline: string;
  points: string[];
  img: StaticImageData;
  alt: string;
};

const buyers: Buyer[] = [
  {
    icon: Globe,
    name: "Regional distributors",
    regions: "GCC · India · Africa · CIS",
    headline: "Pallet volumes with territory or exclusivity options.",
    points: ["Pallet and container quantities", "Territory and exclusivity discussions", "Letter of credit for large orders", "Re-export from Dubai free zone"],
    img: dubaiImg,
    alt: "Dubai skyline at dusk",
  },
  {
    icon: Store,
    name: "Retail chains and boutiques",
    regions: "Mid-size, repeat orders",
    headline: "Curated assortments that keep shelves moving.",
    points: ["Bestseller-led assortment advice", "Repeat-order scheduling", "Point-of-sale documentation", "Batch-coded stock on every delivery"],
    img: bottlesImg,
    alt: "Perfume bottles on a boutique counter",
  },
  {
    icon: ShoppingCart,
    name: "Online resellers",
    regions: "Amazon · Noon · Shopify",
    headline: "Small MOQs and fast dispatch for marketplace sellers.",
    points: ["Low minimum order quantities", "Fast dispatch windows", "Listing-ready product data", "Authenticity proof for marketplace gating"],
    img: colorImg,
    alt: "Colourful fragrance bottles",
  },
  {
    icon: Plane,
    name: "Duty-free and travel retail",
    regions: "Longer cycle, large volume",
    headline: "Structured programmes for high-volume travel retail.",
    points: ["Long-cycle planning support", "Volume pricing tiers", "Full compliance documentation", "Dedicated account management"],
    img: wingImg,
    alt: "Aircraft wing above the clouds",
  },
];

export function Buyers() {
  const [active, setActive] = useState(0);
  const current = buyers[active];

  return (
    <section id="buyers" className="relative overflow-hidden bg-bg-2 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <Eyebrow>03 · Who we serve</Eyebrow>
        <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:items-end">
          <AnimatedTitle className="text-5xl sm:text-6xl lg:text-7xl" lines={["Four buyer types,", "_one_ *offer*"]} />
          <Reveal delay={0.3}>
            <p className="max-w-md text-base text-fg-muted sm:text-lg lg:ml-auto">
              Wholesale covers several buyer types with different needs. We start with one or two
              per market and expand from there. Hover or tap to explore.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <ul className="flex flex-col divide-y divide-line border-y border-line">
            {buyers.map((b, i) => {
              const on = i === active;
              return (
                <li key={b.name}>
                  <button
                    onMouseEnter={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className="group flex w-full items-center gap-5 py-6 text-left"
                  >
                    <span className="display w-10 text-xl text-fg-muted">0{i + 1}</span>
                    <span className="flex-1">
                      <motion.span
                        animate={{ x: on ? 12 : 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 26 }}
                        className={`display block text-2xl transition-colors sm:text-3xl ${on ? "text-fg" : "text-fg-muted group-hover:text-fg"}`}
                      >
                        {b.name}
                      </motion.span>
                      <span className="mt-1 block text-xs text-fg-muted">{b.regions}</span>
                    </span>
                    <motion.span
                      animate={{ rotate: on ? 45 : 0, scale: on ? 1 : 0.8, opacity: on ? 1 : 0.4 }}
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${on ? "bg-blue text-white" : "border border-line"}`}
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </motion.span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="relative min-h-[460px] overflow-hidden rounded-[2rem] bg-fg text-white">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.name}
                initial={{ clipPath: "inset(0 0 100% 0)" }}
                animate={{ clipPath: "inset(0 0 0% 0)" }}
                exit={{ clipPath: "inset(100% 0 0 0)" }}
                transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                className="absolute inset-0"
              >
                <motion.div
                  initial={{ scale: 1.15 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={current.img}
                    alt={current.alt}
                    fill
                    placeholder="blur"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="img-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/70 to-[#000000]/20" />

                <div className="relative flex h-full flex-col p-8 sm:p-10">
                  <current.icon className="h-8 w-8 text-cyan-2" />
                  <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/60">
                    {current.regions}
                  </p>
                  <h3 className="display mt-3 text-3xl sm:text-4xl">{current.headline}</h3>
                  <ul className="mt-auto grid gap-2 pt-8 sm:grid-cols-2">
                    {current.points.map((p, i) => (
                      <motion.li
                        key={p}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.07 }}
                        className="flex items-start gap-3 rounded-2xl border border-white/15 bg-white/5 p-3.5 text-sm backdrop-blur-sm"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-sky" />
                        {p}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
