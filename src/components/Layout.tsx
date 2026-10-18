// src/components/Layout.tsx — content slot + global chrome (design-v2 §§4–7)
import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import CursorTrail from "@/components/CursorTrail";
import Preloader from "@/components/Preloader";
import PageTransition from "@/components/PageTransition";
import MiniPlayer from "@/components/MiniPlayer";
import SceneBackdrop from "@/components/SceneBackdrop";
import ScrollProgress from "@/components/ScrollProgress";

gsap.registerPlugin(ScrollTrigger);

export default function Layout() {
  const [booted, setBooted] = useState(false);

  // Lenis smooth scroll (design-v2 §4) — off for reduced motion
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1, touchMultiplier: 1 });
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  return (
    <div className="relative min-h-[100dvh] bg-bg">
      {/* full-viewport sculpture backdrop — z-0, below all content */}
      <SceneBackdrop />

      {/* site-wide grain texture (design-v2 §11) */}
      <div aria-hidden className="texture-grain pointer-events-none fixed inset-0 z-[55]" />

      <ScrollProgress />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:bg-chartreuse focus:px-4 focus:py-2 focus:font-mono focus:text-micro focus:uppercase focus:text-bg"
      >
        Skip to content
      </a>

      <CursorTrail />
      <Cursor />
      <Preloader onDone={() => setBooted(true)} />
      <PageTransition />
      <Navbar />

      {/* content slot: offset for the fixed 64px nav (react-dev.md layout contract).
          Full-bleed heroes opt out inside the page with -mt-16. */}
      <main id="main" className="relative z-10 pt-16" data-booted={booted || undefined}>
        <Outlet />
      </main>

      <div className="relative z-10">
        <Footer />
      </div>

      <MiniPlayer />
    </div>
  );
}
