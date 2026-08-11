// src/pages/Home.tsx — "The Atrium" (design-v2 home.md)
import Hero from "@/components/home/Hero";
import MetricsFrieze from "@/components/home/MetricsFrieze";
import Wings from "@/components/home/Wings";
import FeaturedWork from "@/components/home/FeaturedWork";
import Artist from "@/components/home/Artist";

export default function Home() {
  return (
    <>
      {/* nav (64px) + pre-hero strip (40px) stack; the hero grid's
          min-h-[calc(100dvh-104px)] fills the remaining viewport (home.md §S0) */}
      <Hero />
      <MetricsFrieze />
      <Wings />
      <FeaturedWork />
      <Artist />
      {/* S6 contact lives in the shared Footer component */}
    </>
  );
}
