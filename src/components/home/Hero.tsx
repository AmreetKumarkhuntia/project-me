// src/components/home/Hero.tsx — S0 strip + S1 hero "The Centerpiece" (home.md)
import { Suspense, lazy, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import GalleryPlaque from "@/components/GalleryPlaque";
import MetaTable from "@/components/MetaTable";
import WordReveal from "@/components/home/WordReveal";
import WebGLFallback, { useReducedMotion, useWebGLSupport } from "@/components/three/WebGLFallback";

const AtriumScene = lazy(() => import("@/components/home/AtriumScene"));

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** S0 — pre-hero strip (static, not a scrolling marquee). */
function PreHeroStrip() {
  const items = [
    "Software & DevOps Engineer",
    "Vol. 02 — The Atelier",
    null, // status cluster
  ];
  return (
    <div
      className="hairline-b flex h-10 items-center justify-between font-mono text-micro-10 uppercase text-ink-faint"
      style={{ paddingInline: "clamp(24px, 6vw, 96px)" }}
    >
      {items.map((item, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + i * 0.15, duration: 0.7, ease: EASE }}
          className={i === 1 ? "hidden sm:block" : ""}
        >
          {item ?? (
            <span className="flex items-center gap-2">
              <span aria-hidden className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-chartreuse" />
              Bengaluru, IN · Open to work
            </span>
          )}
        </motion.span>
      ))}
    </div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const webgl = useWebGLSupport();
  const reduced = useReducedMotion();

  // scroll parallax: headline 0.6×, sculpture 1.2× + slight scale (home.md §S1)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const sculptY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const sculptScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  const showLive = webgl && !reduced;

  return (
    <section ref={sectionRef} className="relative" aria-label="Intro">
      <PreHeroStrip />

      <div
        className="mx-auto grid min-h-[calc(100dvh-104px)] max-w-[1440px] grid-cols-1 items-center gap-12 py-16 lg:grid-cols-12 lg:py-0"
        style={{ paddingInline: "clamp(24px, 6vw, 96px)" }}
      >
        {/* left (7 cols): label + mega headline + bio */}
        <motion.div style={{ y: headlineY }} className="relative z-10 lg:col-span-7">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.9, ease: EASE }}
            className="micro-label mb-8"
          >
            — <span className="text-chartreuse">01</span> / AMREET KHUNTIA
          </motion.p>

          <h1 className="font-display text-display-xl font-normal leading-display text-ink">
            <span className="block">
              <WordReveal words={[{ node: "I" }, { node: "build" }]} baseDelay={0.6} />
            </span>
            <span className="block">
              <WordReveal words={[{ node: <em className="italic">resilient</em> }]} baseDelay={0.72} />
            </span>
            <span className="block">
              <WordReveal words={[{ node: "systems" }, { node: "&" }]} baseDelay={0.84} />
            </span>
            <span className="block">
              <WordReveal words={[{ node: "automate" }, { node: "the" }]} baseDelay={0.96} />
            </span>
            <span className="block">
              <WordReveal
                words={[{ node: <em className="italic text-chartreuse">infrastructure</em>, delay: 0.3 }]}
                baseDelay={1.08}
              />
            </span>
            <span className="block">
              <WordReveal words={[{ node: "they" }, { node: "run" }, { node: "on." }]} baseDelay={1.2} />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1.0, ease: EASE }}
            className="mt-10 max-w-[46ch] font-sans text-[16px] leading-body text-ink-dim md:text-[17px]"
          >
            <span className="font-medium text-ink">Software & DevOps Engineer.</span> I build
            robust backend systems, automate CI/CD pipelines, and run cloud infrastructure that
            ships without drama. I care about simplicity, observability, and making the
            predictable boring.
          </motion.p>

          {/* scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.0, duration: 1 }}
            className="mt-16 flex items-center gap-4"
            aria-hidden
          >
            <span className="font-mono text-micro-10 uppercase text-ink-faint">Scroll</span>
            <span className="relative h-10 w-px overflow-hidden bg-[var(--hairline)]">
              <span className="animate-scroll-line absolute inset-x-0 h-full bg-chartreuse" />
            </span>
          </motion.div>
        </motion.div>

        {/* right (5 cols): sculpture + plaque + meta table */}
        <motion.div style={{ y: sculptY, scale: sculptScale }} className="relative lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1, duration: 1.6, ease: EASE }}
            className="relative mx-auto aspect-square w-full max-w-[480px]"
          >
            {showLive ? (
              <Suspense fallback={<WebGLFallback src="/sculpt-atrium.png" />}>
                <AtriumScene />
              </Suspense>
            ) : (
              <WebGLFallback src="/sculpt-atrium.png" alt="Warm-stone clay displaced torus sculpture" />
            )}
            <div aria-hidden className="vignette pointer-events-none absolute inset-0" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.9, ease: EASE }}
            className="-mt-6 flex justify-center lg:justify-start"
          >
            <GalleryPlaque
              title="Nº 01 — Untitled (System)"
              medium="Displaced clay, studio light"
              year="2026"
            />
          </motion.div>

          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 1.8 } } }}
            className="mt-10 max-w-[360px]"
          >
            <MetaTable
              rows={[
                { label: "Role", value: "SWE · DevOps" },
                { label: "Based", value: "Bengaluru, India" },
                { label: "Focus", value: "Backend · Platform" },
                { label: "Status", value: "Available", accentDot: true },
              ]}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
