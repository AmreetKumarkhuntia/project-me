// src/sections/music/MusicHero.tsx — S1 room header (music.md §S1)
import { Suspense, lazy, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import GalleryPlaque from "@/components/GalleryPlaque";
import WordReveal from "@/components/home/WordReveal";
import WebGLFallback from "@/components/three/WebGLFallback";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useWebGLSupport } from "@/hooks/useWebGLSupport";
import { musicContent } from "@/data/pages/music";
import { toMaskWords } from "@/lib/headline";

const CeramicWaveScene = lazy(() => import("@/sections/music/CeramicWaveScene"));

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function MusicHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const webgl = useWebGLSupport();
  const reduced = useReducedMotion();

  // scroll: sculpture scales up 1 → 1.08 and exits at 70vh parallax (music.md §S1)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const sculptY = useTransform(scrollYProgress, [0, 0.7], [0, 140]);
  const sculptScale = useTransform(scrollYProgress, [0, 0.7], [1, 1.08]);

  const showLive = webgl && !reduced;

  return (
    <section ref={sectionRef} className="relative pt-[160px]" aria-label="The Listening Room">
      <div
        className="mx-auto grid max-w-[1440px] grid-cols-1 gap-16 pb-24 lg:grid-cols-12 lg:items-center px-gutter"
      >
        {/* left (8 cols): section number + headline + sub */}
        <div className="lg:col-span-8">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.9, ease: EASE }}
            className="micro-label mb-8"
          >
            — <span className="text-chartreuse">{musicContent.hero.label.number}</span> /{" "}
            {musicContent.hero.label.text}
          </motion.p>

          <h1 className="font-display text-display-l font-normal leading-[1.0] text-ink">
            <WordReveal
              words={toMaskWords(musicContent.hero.headline[0] ?? [])}
              baseDelay={0.55}
              stagger={0.06}
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 1.0, ease: EASE }}
            className="mt-10 max-w-[44ch] font-sans text-[16px] leading-body text-ink-dim md:text-[17px]"
          >
            {musicContent.hero.sub}
          </motion.p>
        </div>

        {/* right (4 cols): sculpture + plaque */}
        <motion.div style={{ y: sculptY, scale: sculptScale }} className="relative lg:col-span-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1.4, ease: EASE }}
            className="relative mx-auto aspect-square w-full max-w-[420px]"
          >
            {showLive ? (
              <Suspense fallback={<WebGLFallback src={musicContent.hero.sculpture.src} alt="" />}>
                <CeramicWaveScene />
              </Suspense>
            ) : (
              <WebGLFallback
                src={musicContent.hero.sculpture.src}
                alt={musicContent.hero.sculpture.alt}
              />
            )}
            <div aria-hidden className="vignette pointer-events-none absolute inset-0" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.9, ease: EASE }}
            className="-mt-6 flex justify-center lg:justify-start"
          >
            <GalleryPlaque
              title={musicContent.hero.plaque.title}
              medium={musicContent.hero.plaque.medium}
              year={musicContent.hero.plaque.year}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
