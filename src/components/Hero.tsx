"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { ArrowDown, ShieldCheck } from "lucide-react";
import { SlideButton } from "./fx/Magnetic";
import heroImg from "@/assets/images/hero-amber.jpg";
import bottlesImg from "@/assets/images/bottles-warm.jpg";

const words = ["Middle", "Eastern", "fragrance,"];
const words2 = ["distributed", "intelligently."];

const flip = {
  hidden: { y: "110%", rotateX: -60, opacity: 0 },
  show: (i: number) => ({
    y: "0%",
    rotateX: 0,
    opacity: 1,
    transition: { duration: 1, delay: 0.3 + i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });

  // Zentry-style: the hero frame shrinks into a skewed polygon as you scroll away.
  const clip = useTransform(
    smooth,
    [0, 1],
    ["polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", "polygon(10% 0%, 82% 5%, 94% 88%, 3% 96%)"]
  );
  const radius = useTransform(smooth, [0, 1], ["0rem", "3rem"]);
  const scale = useTransform(smooth, [0, 1], [1, 0.9]);
  const textY = useTransform(smooth, [0, 1], [0, -160]);
  const textOpacity = useTransform(smooth, [0, 0.6], [1, 0]);
  const imgY = useTransform(smooth, [0, 1], [0, 120]);
  const img2Y = useTransform(smooth, [0, 1], [0, -80]);

  return (
    <section ref={ref} id="top" className="relative h-[115vh] min-h-[780px]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          style={{ clipPath: clip, borderRadius: radius, scale }}
          className="grain relative h-full w-full overflow-hidden bg-bg-2"
        >
          {/* Gradient mesh */}
          <div className="absolute inset-0">
            <div className="absolute -left-[10%] top-[-10%] h-[60vmax] w-[60vmax] bg-blue/35 blur-[130px] animate-blob" />
            <div
              className="absolute right-[-15%] top-[5%] h-[55vmax] w-[55vmax] bg-cyan/40 blur-[130px] animate-blob"
              style={{ animationDelay: "-6s" }}
            />
            <div
              className="absolute bottom-[-20%] left-[30%] h-[45vmax] w-[45vmax] bg-sky/30 blur-[120px] animate-blob"
              style={{ animationDelay: "-11s" }}
            />
          </div>
          <div className="dots absolute inset-0" />

          <div className="relative z-10 mx-auto grid h-full max-w-7xl grid-cols-1 items-end gap-10 px-5 pb-24 pt-28 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:pb-20">
            {/* Copy */}
            <motion.div style={{ y: textY, opacity: textOpacity }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="mb-8 inline-flex w-fit items-center gap-3 rounded-full border border-line-strong bg-surface/50 px-4 py-2 text-xs font-medium backdrop-blur"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-sky animate-pulse-ring" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-sky" />
                </span>
                Onboarding wholesale partners for 2027
              </motion.div>

              <h1
                className="display text-[12.5vw] leading-[0.9] sm:text-[9vw] lg:text-[5.6vw]"
                style={{ perspective: 1000 }}
              >
                <span className="flex flex-wrap gap-x-[0.2em]">
                  {words.map((w, i) => (
                    <span key={w} className="inline-block overflow-hidden pb-[0.06em]">
                      <motion.span
                        custom={i}
                        variants={flip}
                        initial="hidden"
                        animate="show"
                        style={{ display: "inline-block", transformOrigin: "50% 100%" }}
                      >
                        {w}
                      </motion.span>
                    </span>
                  ))}
                </span>
                <span className="flex flex-wrap gap-x-[0.2em]">
                  {words2.map((w, i) => (
                    <span key={w} className="inline-block overflow-hidden pb-[0.08em]">
                      <motion.span
                        custom={i + words.length}
                        variants={flip}
                        initial="hidden"
                        animate="show"
                        style={{ display: "inline-block", transformOrigin: "50% 100%" }}
                        className={i === 0 ? "text-gradient" : "outline-text"}
                      >
                        {w}
                      </motion.span>
                    </span>
                  ))}
                </span>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="mt-8 max-w-md text-base leading-relaxed text-fg-muted sm:text-lg"
              >
                Karoh House takes Lattafa, Afnan, Armaf and Rasasi to wholesale buyers beyond
                their home markets, with an AI layer that makes sourcing, compliance and selling
                cheap and repeatable.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.05, duration: 0.8 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <SlideButton href="#apply">Apply for a trade account</SlideButton>
                <SlideButton href="#wholesale" variant="ghost">
                  See the wholesale offer
                </SlideButton>
              </motion.div>
            </motion.div>

            {/* Imagery */}
            <div className="relative hidden h-[70vh] max-h-[640px] lg:block">
              <motion.div
                style={{ y: imgY }}
                initial={{ clipPath: "inset(100% 0 0 0 round 2rem)", opacity: 0 }}
                animate={{ clipPath: "inset(0% 0 0 0 round 2rem)", opacity: 1 }}
                transition={{ duration: 1.3, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
                className="absolute inset-x-6 bottom-0 top-0 overflow-hidden rounded-[2rem] shadow-[var(--shadow)]"
              >
                <Image
                  src={heroImg}
                  alt="Amber fragrance bottle catching warm light"
                  fill
                  priority
                  placeholder="blur"
                  sizes="(min-width: 1024px) 40vw, 0px"
                  className="img-cover ken-burns"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-fg/60 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-bg">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan-2">
                      Now shipping
                    </p>
                    <p className="display mt-1 text-2xl">Lattafa · Khamrah</p>
                  </div>
                  <span className="flex items-center gap-1.5 rounded-full bg-bg/90 px-3 py-1.5 text-[11px] font-semibold text-fg">
                    <ShieldCheck className="h-3.5 w-3.5 text-sky" /> Batch verified
                  </span>
                </div>
              </motion.div>

              <motion.div
                style={{ y: img2Y }}
                initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
                animate={{ opacity: 1, scale: 1, rotate: -6 }}
                transition={{ duration: 1, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -left-10 top-10 h-44 w-36 overflow-hidden rounded-3xl border-4 border-bg shadow-[var(--shadow)]"
              >
                <Image
                  src={bottlesImg}
                  alt="Assorted Arabian perfume bottles"
                  fill
                  placeholder="blur"
                  sizes="160px"
                  className="img-cover"
                />
              </motion.div>

              {/* Rotating ring badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4, duration: 0.8 }}
                className="absolute -right-4 -top-6 h-28 w-28"
              >
                <svg viewBox="0 0 100 100" className="h-full w-full animate-spin-slow">
                  <defs>
                    <path id="circ" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
                  </defs>
                  <text className="fill-fg text-[9.5px] font-semibold uppercase tracking-[0.28em]">
                    <textPath href="#circ">Authentic · Wholesale · Dubai · AI-powered ·</textPath>
                  </text>
                </svg>
                <span className="absolute inset-0 m-auto h-3 w-3 rounded-full bg-blue" />
              </motion.div>
            </div>
          </div>

          {/* Scroll cue */}
          <motion.a
            href="#marquee"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-fg-muted"
          >
            Scroll
            <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
              <ArrowDown className="h-3.5 w-3.5" />
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
