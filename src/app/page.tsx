import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Catalog } from "@/components/Catalog";
import { Platform } from "@/components/Platform";
import { Wholesale } from "@/components/Wholesale";
import { Buyers } from "@/components/Buyers";
import { Process } from "@/components/Process";
import { Operations } from "@/components/Operations";
import { TradeForm } from "@/components/TradeForm";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex-1">
      <Navbar />
      <Hero />
      <Marquee />
      <Catalog />
      <Platform />
      <Wholesale />
      <Buyers />
      <Process />
      <Operations />
      <TradeForm />
      <Footer />
    </main>
  );
}
