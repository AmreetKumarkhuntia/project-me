// src/components/home/Hero.tsx — S0 strip + S1 hero "The Centerpiece" (home.md)
// The sculpture itself lives in SceneBackdrop (Layout) — this hero floats
// text, plaque, and meta table over it.
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import GalleryPlaque from "@/components/GalleryPlaque";
import MetaTable from "@/components/MetaTable";
import WordReveal from "@/components/home/WordReveal";
import { homeContent } from "@/data/pages/home";
import { site } from "@/data/site";
import { toMaskWords } from "@/lib/headline";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** S0 — pre-hero strip (static, not a scrolling marquee). */
function PreHeroStrip() {
  const items: (string | null)[] = [...homeContent.preHeroStrip, null /* status cluster */];
  return (
    <div
      className="hairline-b flex h-10 items-center justify-between font-mono text-micro-10 uppercase text-ink-faint px-gutter"
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
              {site.statusLine}
            </span>
          )}
        </motion.span>
      ))}
    </div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  // scroll parallax: headline 0.6× (home.md §S1)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -180]);

  return (
    <section ref={sectionRef} className="relative" aria-label="Intro">
      <PreHeroStrip />

      <div
        className="mx-auto grid min-h-[calc(100dvh-104px)] max-w-[1440px] grid-cols-1 items-center gap-12 py-16 lg:grid-cols-12 lg:py-0 px-gutter"
      >
        {/* left (7 cols): label + mega headline + bio */}
        <motion.div style={{ y: headlineY }} className="relative z-10 lg:col-span-7">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.9, ease: EASE }}
            className="micro-label mb-8"
          >
            — <span className="text-chartreuse">{homeContent.hero.label.number}</span> /{" "}
            {homeContent.hero.label.text}
          </motion.p>

          <h1 className="font-display text-display-xl font-normal leading-display text-ink">
            {homeContent.hero.headline.map((line, i) => (
              <span key={i} className="block">
                <WordReveal words={toMaskWords(line)} baseDelay={0.6 + i * 0.12} />
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1.0, ease: EASE }}
            className="mt-10 max-w-[46ch] font-sans text-[16px] leading-body text-ink-dim md:text-[17px]"
          >
            <span className="font-medium text-ink">{homeContent.hero.bio.lead}</span>{" "}
            {homeContent.hero.bio.body}
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
            <span className="relative h-10 w-px overflow-hidden bg-hairline">
              <span className="animate-scroll-line absolute inset-x-0 h-full bg-chartreuse" />
            </span>
          </motion.div>
        </motion.div>

        {/* right (5 cols): plaque + meta table floating over the backdrop sculpture */}
        <div className="relative z-10 flex flex-col items-center gap-10 lg:col-span-5 lg:items-end lg:self-end lg:pb-16">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 1.8 } } }}
            className="w-full max-w-[360px] bg-bg/55 p-4 backdrop-blur-[2px]"
          >
            <MetaTable rows={homeContent.hero.metaRows} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.9, ease: EASE }}
          >
            <GalleryPlaque
              title={homeContent.hero.plaque.title}
              medium={homeContent.hero.plaque.medium}
              year={homeContent.hero.plaque.year}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
