"use client";

import { motion } from "motion/react";
import { Monogram } from "./Navbar";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-bg pt-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <Monogram size={32} />
            <span className="text-sm font-bold tracking-[0.28em] uppercase">
              Karoh<span className="text-blue">.</span>
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-fg-muted">
            Middle Eastern fragrance distribution for wholesale buyers worldwide. Dubai, UAE.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-14 gap-y-3 text-sm">
          {[
            ["#platform", "Platform"],
            ["#wholesale", "Wholesale"],
            ["#buyers", "Buyers"],
            ["#process", "Process"],
            ["#apply", "Trade account"],
            ["mailto:hello@karoh.house", "hello@karoh.house"],
          ].map(([href, label]) => (
            <a key={href} href={href} className="btn-slide text-fg-muted hover:text-fg">
              <span className="lbl lbl-1">{label}</span>
              <span className="lbl lbl-2 !justify-start text-blue" aria-hidden>{label}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-2 px-5 text-xs text-fg-muted sm:px-6 md:flex-row md:justify-between">
        <p>© 2026 Karoh House. All rights reserved.</p>
        <p>Lattafa, Afnan, Armaf and Rasasi are trademarks of their respective owners.</p>
      </div>

      {/* Giant wordmark that fills on hover */}
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="mt-10 select-none overflow-hidden px-2 leading-none"
      >
        <p className="wordmark text-center text-[17vw] leading-none text-transparent [-webkit-text-stroke:1.5px_var(--line-strong)]">
          {"Karoh".split("").map((character, index) => (
            <span
              key={`${character}-${index}`}
              className="inline-block transition-[color,-webkit-text-stroke] duration-300 hover:text-fg hover:[-webkit-text-stroke:0px]"
            >
              {character}
            </span>
          ))}
        </p>
      </motion.div>
    </footer>
  );
}
