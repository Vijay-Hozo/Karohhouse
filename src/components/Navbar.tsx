"use client";

import { useState } from "react";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme/ThemeToggle";
import { SlideButton } from "./fx/Magnetic";

const links = [
  { href: "#platform", label: "Platform" },
  { href: "#wholesale", label: "Wholesale" },
  { href: "#buyers", label: "Buyers" },
  { href: "#process", label: "Process" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 160 && !open);
    setScrolled(y > 40);
  });

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: hidden ? -120 : 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-4 sm:px-6"
    >
      <div
        className={`mx-auto mt-4 flex max-w-7xl items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-500 sm:px-5 ${
          scrolled
            ? "border-line bg-bg/70 shadow-[var(--shadow)] backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <a href="#top" className="flex items-center gap-3">
          <Monogram />
          <span className="text-sm font-bold tracking-[0.28em] uppercase">
            Karoh<span className="text-blue">.</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="btn-slide rounded-full px-4 py-2 text-sm font-medium text-fg-muted transition hover:text-fg"
            >
              <span className="lbl lbl-1">{l.label}</span>
              <span className="lbl lbl-2 text-blue" aria-hidden>
                {l.label}
              </span>
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <div className="hidden md:block">
            <SlideButton href="#apply" className="!px-5 !py-2.5">
              Trade account
            </SlideButton>
          </div>
          <button
            aria-label="Toggle menu"
            onClick={() => {
              setOpen((v) => !v);
              setHidden(false);
            }}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            className="mx-auto mt-2 max-w-7xl rounded-3xl border border-line bg-bg/90 p-6 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setOpen(false)}
                  className="display py-2 text-2xl"
                >
                  {l.label}
                </motion.a>
              ))}
              <a
                href="#apply"
                onClick={() => setOpen(false)}
                className="mt-4 rounded-full bg-fg px-5 py-3.5 text-center text-sm font-semibold text-bg"
              >
                Apply for a trade account
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export function Monogram({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <defs>
        <linearGradient id="kg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--blue)" />
          <stop offset="100%" stopColor="var(--cyan)" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="38" height="38" rx="12" fill="url(#kg)" />
      <path
        d="M13 10v20M13 20l11-10M13 20l12 10"
        fill="none"
        stroke="#fff"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
