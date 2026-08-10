// src/sections/work/WingHeader.tsx — S1 wing header: headline + bronze sculpture (work.md §S1)
import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import GalleryPlaque from "@/components/GalleryPlaque";
import WordReveal from "@/components/home/WordReveal";
import WebGLFallback, { useReducedMotion, useWebGLSupport } from "@/components/three/WebGLFallback";
import { workContent } from "@/data/pages/work";
import { toMaskWords } from "@/lib/headline";

const BronzeScene = lazy(() => import("@/sections/work/BronzeScene"));

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function WingHeader() {
  const sectionRef = useRef<HTMLElement>(null);
  const sculptRef = useRef<HTMLDivElement>(null);
  const webgl = useWebGLSupport();
  const reduced = useReducedMotion();

  // pause the render loop when the sculpture is off-screen or the tab is hidden
  const [inView, setInView] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);
  useEffect(() => {
    const el = sculptRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(Boolean(entry?.isIntersecting)));
    io.observe(el);
    const onVis = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  // scroll: sculpture parallaxes 1.15× and fades out by 60vh (work.md §S1)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const sculptY = useTransform(scrollYProgress, [0, 0.6], [0, 180]);
  const sculptOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const showLive = webgl && !reduced;

  return (
    <section
      ref={sectionRef}
      aria-label="The Engineering Wing"
      className="mx-auto max-w-[1440px] pt-8 md:pt-24 px-gutter"
    >
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
        {/* left (8): label + headline + sub-line */}
        <div className="lg:col-span-8">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.9, ease: EASE }}
            className="micro-label mb-8"
          >
            — <span className="text-chartreuse">{workContent.hero.label.number}</span> /{" "}
            {workContent.hero.label.text}
          </motion.p>

          <h1 className="font-display text-display-l font-normal leading-[1.0] text-ink">
            {workContent.hero.headline.map((line, i) => (
              <span key={i} className="block">
                <WordReveal words={toMaskWords(line)} baseDelay={0.3 + i * 0.12} />
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1.0, ease: EASE }}
            className="mt-10 max-w-[44ch] font-sans text-[16px] leading-body text-ink-dim md:text-[17px]"
          >
            {workContent.hero.sub}
          </motion.p>
        </div>

        {/* right (4): bronze ribbon sculpture + plaque */}
        <div className="lg:col-span-4">
          <motion.div style={{ y: sculptY, opacity: sculptOpacity }}>
            <motion.div
              ref={sculptRef}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 1.4, ease: EASE }}
              className="relative mx-auto aspect-[4/3] w-full"
            >
              {showLive ? (
                <Suspense fallback={<WebGLFallback src={workContent.hero.sculpture.src} />}>
                  <BronzeScene paused={!inView || !tabVisible} />
                </Suspense>
              ) : (
                <WebGLFallback
                  src={workContent.hero.sculpture.src}
                  alt={workContent.hero.sculpture.alt}
                />
              )}
              <div aria-hidden className="vignette pointer-events-none absolute inset-0" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.9, ease: EASE }}
              className="-mt-4 flex justify-center lg:justify-start"
            >
              <GalleryPlaque
                title={workContent.hero.plaque.title}
                medium={workContent.hero.plaque.medium}
                year={workContent.hero.plaque.year}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
