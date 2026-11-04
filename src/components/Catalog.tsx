"use client";

import Image, { type StaticImageData } from "next/image";
import { useMemo, useState } from "react";
import { ArrowUpRight, Plus, SlidersHorizontal } from "lucide-react";
import { motion } from "motion/react";
import bottlesImg from "@/assets/images/bottles-warm.jpg";
import pinkImg from "@/assets/images/bottle-pink.jpg";
import vialsImg from "@/assets/images/vials-amber.jpg";
import colorImg from "@/assets/images/bottles-color.jpg";

type Brand = "Armaf" | "Afnan" | "Lattafa" | "Rasasi";

type Product = {
  brand: Brand;
  name: string;
  size: string;
  type: string;
  notes: string;
  image: StaticImageData;
  tone: string;
};

const products: Product[] = [
  { brand: "Armaf", name: "Club de Nuit Intense", size: "105 ml", type: "EDT · Men", notes: "Fresh / Woody", image: bottlesImg, tone: "from-slate-950/70" },
  { brand: "Afnan", name: "9PM", size: "100 ml", type: "EDP · Men", notes: "Amber / Vanilla", image: pinkImg, tone: "from-fuchsia-950/40" },
  { brand: "Armaf", name: "Club de Nuit Milestone", size: "105 ml", type: "EDP · Men", notes: "Fresh / Fruity", image: vialsImg, tone: "from-amber-950/40" },
  { brand: "Afnan", name: "Turathi Blue", size: "90 ml", type: "EDP · Unisex", notes: "Fresh / Amber", image: colorImg, tone: "from-blue-950/50" },
  { brand: "Lattafa", name: "Khamrah", size: "100 ml", type: "EDP · Unisex", notes: "Spicy / Gourmand", image: pinkImg, tone: "from-rose-950/40" },
  { brand: "Rasasi", name: "Hawas", size: "100 ml", type: "EDP · Men", notes: "Fresh / Aquatic", image: colorImg, tone: "from-cyan-950/50" },
];

const filters: Array<"All" | Brand> = ["All", "Lattafa", "Armaf", "Rasasi", "Afnan"];

export function Catalog() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("All");
  const visibleProducts = useMemo(
    () => (activeFilter === "All" ? products : products.filter((product) => product.brand === activeFilter)),
    [activeFilter]
  );

  return (
    <section id="catalog" className="relative overflow-hidden bg-[#050505] py-24 text-white sm:py-32">
      <div className="absolute left-1/2 top-0 h-80 w-[42rem] -translate-x-1/2 rounded-full bg-blue/15 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-sky">
              <span className="h-1.5 w-1.5 rounded-full bg-sky" />
              The fast-moving edit
            </p>
            <h2 className="display mt-5 text-5xl sm:text-6xl lg:text-7xl">
              What moves <span className="text-gradient">fastest.</span>
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/55 sm:text-base">
              A live shortlist of the fragrances buyers ask for most. Build your next order around
              proven demand, not guesswork.
            </p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <SlidersHorizontal className="mr-2 h-4 w-4 flex-none text-white/40" />
            {filters.map((filter) => {
              const isActive = filter === activeFilter;
              return (
                <button
                  key={filter}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full border px-4 py-2 text-xs font-medium transition ${
                    isActive
                      ? "border-white bg-white text-black"
                      : "border-white/15 bg-white/[0.03] text-white/55 hover:border-white/35 hover:text-white"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>

        <motion.div layout className="mt-14 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {visibleProducts.map((product) => (
            <motion.article
              layout
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              key={product.name}
              className="group overflow-hidden rounded-[1.7rem] border border-white/10 bg-[#111111] shadow-2xl shadow-black/20"
            >
              <div className="relative aspect-[1.05/1] overflow-hidden bg-[#ececec]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${product.tone} mix-blend-multiply opacity-20`} />
                <span className="absolute left-4 top-4 rounded-full bg-black/85 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
                  {product.brand}
                </span>
                <button
                  type="button"
                  aria-label={`View ${product.name}`}
                  className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-black opacity-0 transition group-hover:opacity-100"
                >
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
              <div className="p-5">
                <h3 className="text-base font-semibold tracking-tight">{product.name}</h3>
                <p className="mt-1 text-xs text-white/45">{product.size} · {product.type}</p>
                <p className="mt-2 text-xs font-medium text-sky">{product.notes}</p>
                <button
                  type="button"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-full border border-white/15 px-4 py-3 text-xs font-semibold transition hover:border-sky/60 hover:bg-sky/10"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add to enquiry
                </button>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-5 text-xs text-white/40">
          <span>{visibleProducts.length} of {products.length} fast movers</span>
          <a href="#apply" className="font-semibold text-white transition hover:text-sky">
            Need the full catalogue <ArrowUpRight className="ml-1 inline h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
