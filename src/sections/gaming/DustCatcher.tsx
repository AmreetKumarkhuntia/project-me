// src/sections/gaming/DustCatcher.tsx — S2 the vitrine: playable "Dust Catcher" (gaming-v2 §S2)
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Pause, Play, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { useAudio } from "@/providers/AudioProvider";
import { useReducedMotion } from "@/components/three/WebGLFallback";
import { PrimaryButton } from "@/components/Buttons";
import {
  createDustCatcher,
  LOGICAL_H,
  LOGICAL_W,
} from "@/sections/gaming/dustCatcherEngine";
import type { GamePhase } from "@/types";
import type { GameEngine } from "@/sections/gaming/dustCatcherEngine";
import { gamingContent } from "@/data/pages/gaming";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const pad3 = (n: number) => String(Math.max(0, Math.floor(n))).padStart(3, "0");

type UiState = "idle" | "countdown" | "playing" | "paused" | "gameover";

export default function DustCatcher() {
  const { muted: globalMuted } = useAudio();
  const reduced = useReducedMotion();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<GameEngine | null>(null);
  const phaseRef = useRef<GamePhase>("idle");

  const [ui, setUi] = useState<UiState>("idle");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [count, setCount] = useState(3);
  const [localMuted, setLocalMuted] = useState(false);
  const [beaten, setBeaten] = useState(false);
  const startBestRef = useRef(0);

  const mutedRef = useRef(true);
  mutedRef.current = globalMuted || localMuted;
  const reducedRef = useRef(reduced);
  reducedRef.current = reduced;

  // engine lifecycle
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const engine = createDustCatcher(canvas, {
      onPhase: (p) => {
        phaseRef.current = p;
        setUi((cur) => (cur === "countdown" ? cur : p));
      },
      onScore: (s) => setScore(s),
      onBest: (b) => {
        setBest(b);
        if (phaseRef.current === "playing" && b > startBestRef.current) setBeaten(true);
      },
      isMuted: () => mutedRef.current,
      reducedMotion: () => reducedRef.current,
    });
    engineRef.current = engine;

    const wrap = wrapRef.current;
    const io = wrap
      ? new IntersectionObserver(([e]) => engine.setVisible(Boolean(e?.isIntersecting)), {
          threshold: 0.1,
        })
      : null;
    if (wrap && io) io.observe(wrap);
    const onVis = () => engine.setVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);

    return () => {
      io?.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      engine.destroy();
      engineRef.current = null;
    };
  }, []);

  // start a run via the 3 · 2 · 1 countdown
  const beginCountdown = useCallback(() => {
    if (ui === "countdown") return;
    startBestRef.current = engineRef.current?.getBest() ?? 0;
    setBeaten(false);
    setCount(3);
    setUi("countdown");
  }, [ui]);

  // keyboard controls (design-v2 §8: not pointer-only)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      const engine = engineRef.current;
      if (!engine) return;
      switch (e.key) {
        case "ArrowLeft":
        case "a":
        case "A":
          if (phaseRef.current === "playing") e.preventDefault();
          engine.press("left", true);
          break;
        case "ArrowRight":
        case "d":
        case "D":
          if (phaseRef.current === "playing") e.preventDefault();
          engine.press("right", true);
          break;
        case "Escape":
          engine.togglePause();
          break;
        case " ":
        case "Enter": {
          const p = phaseRef.current;
          if (p === "idle" || p === "gameover") {
            e.preventDefault();
            beginCountdown();
          }
          break;
        }
        default:
          break;
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      const engine = engineRef.current;
      if (!engine) return;
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") engine.press("left", false);
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") engine.press("right", false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [beginCountdown]);

  // countdown 3 · 2 · 1, 0.5s each (gaming-v2 §S2)
  useEffect(() => {
    if (ui !== "countdown") return;
    if (count <= 0) {
      engineRef.current?.start();
      return;
    }
    const t = window.setTimeout(() => setCount((c) => c - 1), 500);
    return () => window.clearTimeout(t);
  }, [ui, count]);

  // pointer drag (touch) — map to logical x
  const pointerToLogical = useCallback((clientX: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return 0;
    const rect = canvas.getBoundingClientRect();
    return ((clientX - rect.left) / rect.width) * LOGICAL_W;
  }, []);

  const draggingRef = useRef(false);
  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    draggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    engineRef.current?.dragTo(pointerToLogical(e.clientX));
  };
  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!draggingRef.current) return;
    engineRef.current?.dragTo(pointerToLogical(e.clientX));
  };
  const onPointerUp = () => {
    draggingRef.current = false;
  };

  const togglePause = () => engineRef.current?.togglePause();

  // "BEST" ribbon only when this run beat the stored best (gaming-v2 §S2)
  const showBestRibbon = ui === "gameover" && beaten;
  const soundMuted = localMuted || globalMuted;

  return (
    <section
      className="mx-auto max-w-[1440px] py-24 md:py-40"
      style={{ paddingInline: "clamp(24px, 6vw, 96px)" }}
      aria-label="Dust Catcher — playable piece"
    >
      {/* panel fades + rises 40px at 80% viewport (gaming-v2 §S2) */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.2, ease: EASE }}
        className="relative border bg-bg-2 p-4 md:p-6"
        style={{ borderColor: "var(--hairline)" }}
      >
        {/* corner plaque — inverts the museum rule */}
        <div className="absolute -top-3 right-4 bg-bg px-3 font-mono text-micro-10 uppercase text-chartreuse md:right-6">
          {gamingContent.vitrine.cornerPlaque}
        </div>

        {/* header row */}
        <div className="flex flex-wrap items-end justify-between gap-4 px-1 pb-5 pt-2 md:px-2">
          <div>
            <h2 className="font-display text-title-s text-ink">{gamingContent.vitrine.title}</h2>
            <p className="mt-1 font-mono text-micro-10 uppercase text-ink-faint">
              {gamingContent.vitrine.subtitle}
            </p>
          </div>
          <div className="flex items-center gap-6" aria-live="polite">
            <span className="font-mono text-micro uppercase text-ink-faint">
              Score <span className="text-ink">{pad3(score)}</span>
            </span>
            <span className="font-mono text-micro uppercase text-ink-faint">
              Best <span className="text-ink">{pad3(best)}</span>
            </span>
          </div>
        </div>

        {/* the playfield, revealed with a clip-path inset on first view */}
        <motion.div
          ref={wrapRef}
          initial={reduced ? false : { clipPath: "inset(0% 50% 0% 50%)" }}
          whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.0, ease: EASE, delay: 0.2 }}
          className="relative border"
          style={{ borderColor: "var(--hairline)", backgroundColor: "var(--bg)" }}
          data-cursor="PLAY"
        >
          <canvas
            ref={canvasRef}
            width={LOGICAL_W}
            height={LOGICAL_H}
            role="img"
            aria-label="Dust Catcher game playfield. Move the ring with left and right arrow keys or A and D, or drag on touch. Catch the falling dust motes, avoid the dark shards."
            className="block aspect-video max-h-[70vh] w-full touch-none select-none"
            style={{ width: "100%", height: "auto" }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          />

          {/* state overlays */}
          <AnimatePresence>
            {ui === "idle" && (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-[rgba(18,17,16,0.72)]"
              >
                <p className="font-display text-display-m italic text-ink">
                  {gamingContent.vitrine.idleHeading}
                </p>
                <PrimaryButton onClick={beginCountdown} data-cursor="PLAY">
                  Start
                </PrimaryButton>
              </motion.div>
            )}

            {ui === "countdown" && (
              <motion.div
                key="countdown"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-center bg-[rgba(18,17,16,0.72)]"
                aria-live="assertive"
              >
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={count}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -18 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="font-display text-display-l italic text-chartreuse"
                  >
                    {count}
                  </motion.span>
                </AnimatePresence>
              </motion.div>
            )}

            {ui === "paused" && (
              <motion.div
                key="paused"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-[rgba(18,17,16,0.72)]"
              >
                <p className="font-display text-display-m italic text-ink">
                  {gamingContent.vitrine.pausedHeading}
                </p>
                <PrimaryButton onClick={togglePause}>Resume</PrimaryButton>
              </motion.div>
            )}

            {ui === "gameover" && (
              <motion.div
                key="gameover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-[rgba(18,17,16,0.78)]"
                aria-live="assertive"
              >
                <p className="micro-label">{gamingContent.vitrine.gameOverLabel}</p>
                <p className="font-display text-display-m text-ink">{pad3(score)}</p>
                {showBestRibbon && (
                  <motion.p
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ delay: 0.4, duration: 0.6, ease: EASE }}
                    className="bg-chartreuse px-3 py-1 font-mono text-micro uppercase text-bg"
                  >
                    Best
                  </motion.p>
                )}
                <PrimaryButton onClick={beginCountdown} className="mt-2">
                  <span className="inline-flex items-center gap-2">
                    <RotateCcw size={12} aria-hidden /> Restart
                  </span>
                </PrimaryButton>
              </motion.div>
            )}
          </AnimatePresence>

          {/* in-vitrine controls: pause + sound toggle */}
          <div className="absolute right-3 top-3 flex gap-2">
            {(ui === "playing" || ui === "paused") && (
              <button
                type="button"
                onClick={togglePause}
                aria-label={ui === "playing" ? "Pause game" : "Resume game"}
                className="flex h-9 w-9 items-center justify-center border bg-[rgba(18,17,16,0.6)] text-ink transition-colors duration-300 hover:border-chartreuse"
                style={{ borderColor: "var(--hairline-strong)" }}
              >
                {ui === "playing" ? <Pause size={14} /> : <Play size={14} />}
              </button>
            )}
            <button
              type="button"
              onClick={() => setLocalMuted((m) => !m)}
              aria-label={soundMuted ? "Unmute game sounds" : "Mute game sounds"}
              aria-pressed={soundMuted}
              className="flex h-9 w-9 items-center justify-center border bg-[rgba(18,17,16,0.6)] text-ink transition-colors duration-300 hover:border-chartreuse"
              style={{ borderColor: "var(--hairline-strong)" }}
            >
              {soundMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>
          </div>
        </motion.div>

        {/* HTML text alternative (gaming-v2 interactions checklist) */}
        <p className="sr-only">{gamingContent.vitrine.srDescription}</p>
      </motion.div>
    </section>
  );
}
