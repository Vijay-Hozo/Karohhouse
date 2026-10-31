"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { FileText, BadgeCheck, Package, ClipboardList } from "lucide-react";
import { AnimatedTitle, Eyebrow, Reveal } from "./fx/AnimatedTitle";
import { SlideButton } from "./fx/Magnetic";
import heroImg from "@/assets/images/hero-amber.jpg";

const offer = [
  { icon: FileText, n: "01", title: "Wholesale catalogue", body: "PDF plus a gated page with SKUs, MOQ, tiered pricing, lead times and Incoterms." },
  { icon: BadgeCheck, n: "02", title: "Why Karoh, on one page", body: "Authenticity guarantee, batch codes, documentation and ship-from location." },
  { icon: Package, n: "03", title: "Sample pack policy", body: "Paid samples, refundable against the first order. It filters out time-wasters." },
  { icon: ClipboardList, n: "04", title: "Trade-account application", body: "Company, trade licence, country, expected volume and categories in one form." },
];

export function Wholesale() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 90%", "start 15%"] });
  // Zentry "about" effect: a small clipped panel grows to full width as you scroll.
  const clip = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(18% 30% 18% 30% round 3rem)", "inset(0% 0% 0% 0% round 1.75rem)"]
  );
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.3, 1]);

  return (
    <section id="wholesale" className="relative bg-bg py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow className="justify-center">02 · The wholesale offer</Eyebrow>
          <AnimatedTitle
            className="mt-6 text-4xl sm:text-5xl lg:text-6xl [&>span]:justify-center"
            lines={["Enquiries convert when", "*what do I get?* is clear"]}
          />
        </div>

        <div ref={ref} className="mt-16">
          <motion.div style={{ clipPath: clip, scale }} className="relative overflow-hidden bg-fg text-bg">
            {/* Photo backdrop */}
            <motion.div style={{ scale: imgScale }} className="absolute inset-0">
              <Image
                src={heroImg}
                alt=""
                fill
                placeholder="blur"
                sizes="100vw"
                className="img-cover opacity-30"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-r from-fg via-fg/85 to-fg/40" />
            <div className="absolute -right-20 bottom-0 h-80 w-80 bg-blue/40 blur-[110px] animate-blob" />

            <div className="relative z-10 grid gap-10 p-8 sm:p-12 lg:grid-cols-[0.8fr_1.2fr] lg:p-16">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-sky">
                  Built before the outreach
                </p>
                <h3 className="display display-strong mt-4 text-3xl sm:text-4xl">One documented package. Every buyer.</h3>
                <p className="mt-5 max-w-sm text-sm text-bg/70 sm:text-base">
                  Qualification and quoting take hours, not weeks, because the answer to every
                  buyer&apos;s first four questions is already written down.
                </p>
                <div className="mt-8">
                  <SlideButton href="#apply" variant="sky">
                    Request the catalogue
                  </SlideButton>
                </div>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2">
                {offer.map((o, i) => (
                  <Reveal key={o.n} delay={0.1 + i * 0.08}>
                    <li className="group h-full rounded-3xl border border-bg/15 bg-bg/5 p-6 backdrop-blur-md transition-colors hover:bg-bg/10">
                      <div className="flex items-center justify-between">
                        <o.icon className="h-5 w-5 text-cyan-2" />
                        <span className="display text-2xl text-bg/30 transition-colors group-hover:text-sky">
                          {o.n}
                        </span>
                      </div>
                      <h4 className="mt-5 text-base font-semibold">{o.title}</h4>
                      <p className="mt-2 text-sm text-bg/65">{o.body}</p>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
