// src/pages/Home.tsx — "The Atrium" (design-v2 home.md)
import Hero from "@/components/home/Hero";
import MetricsFrieze from "@/components/home/MetricsFrieze";
import Wings from "@/components/home/Wings";
import FeaturedWork from "@/components/home/FeaturedWork";
import Artist from "@/components/home/Artist";

export default function Home() {
  return (
    <>
      {/* full-bleed hero opts out of the Layout nav offset */}
      <div className="-mt-16">
        <Hero />
      </div>
      <MetricsFrieze />
      <Wings />
      <FeaturedWork />
      <Artist />
      {/* S6 contact lives in the shared Footer component */}
    </>
  );
}
