// src/sections/gaming/RoomHeader.tsx — S1 room header + frosted-glass sculpture (gaming-v2 §S1)
import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import GalleryPlaque from "@/components/GalleryPlaque";
import WordReveal from "@/components/home/WordReveal";
import WebGLFallback from "@/components/three/WebGLFallback";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useWebGLSupport } from "@/hooks/useWebGLSupport";
import { gamingContent } from "@/data/pages/gaming";
import { toMaskWords } from "@/lib/headline";

const PlayScene = lazy(() => import("@/sections/gaming/PlayScene"));

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function RoomHeader() {
  const sectionRef = useRef<HTMLElement>(null);
  const webgl = useWebGLSupport();
  const reduced = useReducedMotion();

  // pause the render loop when the sculpture scrolls off-screen (design-v2 §6)
  const [onScreen, setOnScreen] = useState(true);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setOnScreen(Boolean(entry?.isIntersecting)), {
      threshold: 0,
    });
    io.observe(el);
    const onVis = () => setOnScreen(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  // scroll: sculpture parallax 1.15×, out by 60vh (gaming-v2 §S1)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const sculptY = useTransform(scrollYProgress, [0, 1], [0, 115]);

  const showLive = webgl && !reduced;

  return (
    <section
      ref={sectionRef}
      className="mx-auto max-w-[1440px] pt-24 md:pt-40 px-gutter"
      aria-label="The Play Room"
    >
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
        {/* left (8 cols): label + Display L + sub */}
        <div className="lg:col-span-8">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.9, ease: EASE }}
            className="micro-label mb-8"
          >
            — <span className="text-chartreuse">{gamingContent.hero.label.number}</span> /{" "}
            {gamingContent.hero.label.text}
          </motion.p>

          <h1 className="font-display text-display-l font-normal leading-[1.0] text-ink">
            <WordReveal words={toMaskWords(gamingContent.hero.headline[0] ?? [])} baseDelay={0.5} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 1.0, ease: EASE }}
            className="mt-8 max-w-[44ch] font-sans text-[16px] leading-body text-ink-dim md:text-[17px]"
          >
            {gamingContent.hero.sub}
          </motion.p>
        </div>

        {/* right (4 cols): frosted-glass polyhedron + plaque */}
        <motion.div style={{ y: reduced ? 0 : sculptY }} className="lg:col-span-4">
          {/* sculpture fades in tumbling from 12° rotation offset (gaming-v2 §S1) */}
          <motion.div
            initial={reduced ? { opacity: 0 } : { opacity: 0, rotate: 12, scale: 0.96 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, rotate: 0, scale: 1 }}
            transition={{ delay: 0.9, duration: 1.6, ease: EASE }}
            className="relative mx-auto aspect-[4/3] w-full max-w-[420px]"
          >
            {showLive ? (
              <Suspense fallback={<WebGLFallback src={gamingContent.hero.sculpture.src} />}>
                <PlayScene paused={!onScreen} />
              </Suspense>
            ) : (
              <WebGLFallback
                src={gamingContent.hero.sculpture.src}
                alt={gamingContent.hero.sculpture.alt}
              />
            )}
            <div aria-hidden className="vignette pointer-events-none absolute inset-0" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.9, ease: EASE }}
            className="-mt-4 flex justify-center lg:justify-start"
          >
            <GalleryPlaque
              title={gamingContent.hero.plaque.title}
              medium={gamingContent.hero.plaque.medium}
              year={gamingContent.hero.plaque.year}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
