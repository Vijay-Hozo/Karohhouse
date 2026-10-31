const brands = ["Lattafa", "Afnan", "Armaf", "Rasasi", "Ajmal", "Swiss Arabian"];
const promises = [
  "Batch codes on every unit",
  "Ships from Dubai free zone",
  "EU CPNP ready",
  "24-hour qualification",
  "Paid samples, refundable",
];

export function Marquee() {
  return (
    <section id="marquee" className="relative -mt-[15vh] overflow-hidden border-y border-line bg-bg py-8">
      <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap">
        {[...brands, ...brands, ...brands].map((b, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="display text-5xl text-fg sm:text-7xl">{b}</span>
            <span className="h-3 w-3 rotate-45 bg-blue" />
          </span>
        ))}
      </div>
      <div className="mt-6 flex w-max animate-marquee-rev items-center gap-10 whitespace-nowrap">
        {[...promises, ...promises, ...promises].map((p, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="display outline-text text-3xl sm:text-5xl">{p}</span>
            <span className="h-2 w-2 rounded-full bg-cyan" />
          </span>
        ))}
      </div>
    </section>
  );
}
