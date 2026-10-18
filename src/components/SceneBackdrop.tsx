// src/components/SceneBackdrop.tsx — full-viewport sculpture backdrop behind the page.
// Lives in Layout OUTSIDE #main: the hero motion transforms and the room-dim
// overlay would otherwise re-anchor this fixed layer. Content (z-10) stacks
// above it; readability comes from the scrims below plus a scroll-driven dim.
import { Suspense, lazy, useEffect, useState, type ComponentType } from "react";
import { useLocation } from "react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useWebGLSupport } from "@/hooks/useWebGLSupport";
import { homeContent } from "@/data/pages/home";
import { workContent } from "@/data/pages/work";
import { musicContent } from "@/data/pages/music";
import { gamingContent } from "@/data/pages/gaming";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

type SceneComponent = ComponentType<{ paused?: boolean }>;

const SCENES: Record<string, ReturnType<typeof lazy<SceneComponent>>> = {
  "/": lazy(() => import("@/components/home/AtriumScene")),
  "/work": lazy(() => import("@/sections/work/BronzeScene")),
  "/music": lazy(() => import("@/sections/music/CeramicWaveScene")),
  "/gaming": lazy(() => import("@/sections/gaming/PlayScene")),
};

const FALLBACKS: Record<string, string> = {
  "/": homeContent.hero.sculpture.src,
  "/work": workContent.hero.sculpture.src,
  "/music": musicContent.hero.sculpture.src,
  "/gaming": gamingContent.hero.sculpture.src,
};

/** Static PNG variant for no-WebGL / reduced motion — framed like the live scene. */
function BackdropFallback({ src }: { src: string }) {
  return (
    <img
      src={src}
      alt=""
      loading="eager"
      className="animate-ken-burns absolute inset-0 h-full w-full object-cover opacity-40"
      style={{ objectPosition: "72% center" }}
    />
  );
}

export default function SceneBackdrop() {
  const { pathname } = useLocation();
  const webgl = useWebGLSupport();
  const reduced = useReducedMotion();

  // one tab-visibility gate for whichever scene is active
  const [tabVisible, setTabVisible] = useState(true);
  useEffect(() => {
    const onVis = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  // scroll: prominent behind the hero, ~15% ghost after one viewport, slow push-in.
  // Compositor-only (opacity/transform on wrappers) — no React re-render per frame.
  const { scrollY } = useScroll();
  const dimOpacity = useTransform(scrollY, (v) => Math.min(v / (0.9 * window.innerHeight), 1) * 0.85);
  const bgScale = useTransform(scrollY, (v) => 1 + Math.min(v / window.innerHeight, 1) * 0.07);

  const Scene = SCENES[pathname];
  const fallbackSrc = FALLBACKS[pathname];
  if (!Scene || !fallbackSrc) return null; // e.g. NotFound

  const showLive = webgl && !reduced;

  return (
    <div aria-hidden className="scene-backdrop pointer-events-none fixed inset-0 z-0">
      {/* canvas slot — keyed by route so swaps fade in under the PageTransition sweep */}
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE }}
        style={{ scale: bgScale }}
        className="absolute inset-0"
      >
        {showLive ? (
          <Suspense fallback={<BackdropFallback src={fallbackSrc} />}>
            <Scene paused={!tabVisible} />
          </Suspense>
        ) : (
          <BackdropFallback src={fallbackSrc} />
        )}
      </motion.div>

      {/* readability scrims: text-side gradient (desktop), veil (mobile),
          bottom fade into content, and the house vignette */}
      <div className="hidden lg:block absolute inset-y-0 left-0 w-[60%] bg-gradient-to-r from-bg via-bg/40 to-transparent" />
      <div className="lg:hidden absolute inset-0 bg-bg/45" />
      <div className="absolute inset-x-0 bottom-0 h-[30vh] bg-gradient-to-t from-bg to-transparent" />
      <div className="vignette absolute inset-0" />

      {/* scroll-driven dim */}
      <motion.div style={{ opacity: dimOpacity }} className="absolute inset-0 bg-bg" />
    </div>
  );
}
