"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Plus } from "lucide-react";
import { AnimatedTitle, Eyebrow, Reveal } from "./fx/AnimatedTitle";
import portImg from "@/assets/images/port.jpg";

const ops = [
  { title: "Sourcing", body: "Authorised supply or distributor agreements with the brands. Buyers ask for proof of authenticity, so we lead with it on every quote." },
  { title: "Compliance and logistics", body: "EU CPNP and Responsible Person for Europe. Import documentation and HS codes for GCC and India. Alcohol restrictions checked country by country." },
  { title: "Payments and trust", body: "Bank transfer, letter of credit for large orders, and a payment link for samples. Advance of 30 to 50 percent for new accounts." },
  { title: "Fulfilment", body: "Ship from Dubai with a freight forwarder or through a 3PL partner. Free zone storage such as JAFZA supports re-export." },
];

export function Operations() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-bg-2 py-28 sm:py-36">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow>05 · Operations</Eyebrow>
          <AnimatedTitle className="mt-6 text-4xl sm:text-5xl" lines={["The unglamorous", "work, *done* _properly_"]} />
          <Reveal delay={0.3}>
            <p className="mt-6 max-w-sm text-base text-fg-muted">
              Distribution is won on sourcing, paperwork and payment terms. Four things we get
              right before a single pallet moves.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="group relative mt-8 aspect-[16/10] max-w-md overflow-hidden rounded-3xl">
              <Image
                src={portImg}
                alt="Container port seen from above"
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="img-cover transition-transform duration-[1.6s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/80 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan-2">Ship from</p>
                  <p className="display mt-1 text-xl">Jebel Ali · Dubai</p>
                </div>
                <span className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold backdrop-blur">
                  Free-zone re-export
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        <ul className="divide-y divide-line border-y border-line">
          {ops.map((o, i) => {
            const on = open === i;
            return (
              <li key={o.title}>
                <button
                  onClick={() => setOpen(on ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-7 text-left"
                >
                  <span className="flex items-center gap-6">
                    <span className="display text-lg text-fg-muted">0{i + 1}</span>
                    <span className="display text-xl sm:text-2xl">{o.title}</span>
                  </span>
                  <motion.span
                    animate={{ rotate: on ? 45 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={`flex h-10 w-10 flex-none items-center justify-center rounded-full border transition-colors duration-300 ${
                      on ? "border-blue bg-blue text-white" : "border-line-strong"
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-xl pb-7 pl-[4.25rem] text-sm leading-relaxed text-fg-muted sm:text-base">{o.body}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
