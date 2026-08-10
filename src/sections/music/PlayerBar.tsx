// src/sections/music/PlayerBar.tsx — S3 persistent bottom player bar
// (music.md §S3): transport, scrub, queue drawer, volume, room-tone toggle,
// analyser-driven bars, full keyboard map. All playback flows through the
// shared AudioProvider; volume is layered on via audioGain (no provider edits).
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ListMusic, Pause, Play, SkipBack, SkipForward, Volume1, Volume2, VolumeX, X } from "lucide-react";
import { tracks } from "@/data/tracks";
import type { Track } from "@/types";
import { useAudio } from "@/providers/AudioProvider";
import FreqBars from "@/components/music/FreqBars";
import { musicContent } from "@/data/pages/music";
import { ensureGainWiring, getGainVolume, getStoredVolume, setGainVolume, storeVolume } from "@/components/music/audioGain";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function formatTime(s: number): string {
  if (!Number.isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${String(sec).padStart(2, "0")}`;
}

function isEditableTarget(el: EventTarget | null): boolean {
  if (!(el instanceof HTMLElement)) return false;
  return Boolean(
    el.closest("input, textarea, select, [contenteditable='true'], button, a, [role='button'], [role='switch']"),
  );
}

interface PlayerBarProps {
  queuedIds: string[];
}

export default function PlayerBar({ queuedIds }: PlayerBarProps) {
  const {
    currentTrack,
    isPlaying,
    muted,
    progress,
    duration,
    play,
    toggle,
    next,
    prev,
    seek,
    setMuted,
    getAnalyser,
  } = useAudio();

  const [queueOpen, setQueueOpen] = useState(false);
  const [roomTone, setRoomTone] = useState(true); // on by default (music.md §S3)
  const [volume, setVolume] = useState<number>(() => getStoredVolume());

  // —— progress smoothing: rAF-driven DOM writes, resynced to provider ——
  const fillRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef<HTMLSpanElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const displayedRef = useRef(0);
  const scrubbingRef = useRef(false);
  const stateRef = useRef({ progress, duration, isPlaying });
  useEffect(() => {
    stateRef.current = { progress, duration, isPlaying };
    // resync on seek / track change (jump > 1.2s or backwards)
    if (Math.abs(progress - displayedRef.current) > 1.2 || progress < displayedRef.current - 1.2) {
      displayedRef.current = progress;
    }
  }, [progress, duration, isPlaying]);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = (now - last) / 1000;
      last = now;
      const s = stateRef.current;
      if (s.isPlaying && !scrubbingRef.current) displayedRef.current += dt;
      if (s.duration > 0) displayedRef.current = Math.min(displayedRef.current, s.duration);
      const ratio = s.duration > 0 ? displayedRef.current / s.duration : 0;
      if (fillRef.current) fillRef.current.style.transform = `scaleX(${ratio})`;
      if (headRef.current) headRef.current.style.left = `${ratio * 100}%`;
      if (timeRef.current) timeRef.current.textContent = formatTime(displayedRef.current);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // —— scrub (pointer + keyboard via global map) ——
  const scrubTo = useCallback(
    (clientX: number) => {
      const el = trackRef.current;
      if (!el || duration <= 0) return;
      const rect = el.getBoundingClientRect();
      const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
      displayedRef.current = ratio * duration;
      seek(ratio * duration);
    },
    [duration, seek],
  );

  const onScrubPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    scrubbingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    scrubTo(e.clientX);
  };
  const onScrubPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (scrubbingRef.current) scrubTo(e.clientX);
  };
  const onScrubPointerUp = () => {
    scrubbingRef.current = false;
  };

  // —— volume via our own GainNode wrapper ——
  const applyVolume = useCallback(
    (v: number) => {
      const clamped = Math.min(100, Math.max(0, Math.round(v)));
      setVolume(clamped);
      setGainVolume(clamped / 100);
      storeVolume(clamped);
      ensureGainWiring(getAnalyser());
      if (clamped > 0 && muted) setMuted(false);
    },
    [getAnalyser, muted, setMuted],
  );
  useEffect(() => {
    setGainVolume(getStoredVolume() / 100);
  }, []);

  // —— keyboard map (music.md §S3): Space, ←/→ seek 5s, ↑/↓ volume, M, N/P ——
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const editable = isEditableTarget(e.target);
      switch (e.key) {
        case " ":
          if (editable) return; // let focused buttons/rows use Space natively
          e.preventDefault();
          toggle();
          break;
        case "ArrowLeft":
          if (editable) return;
          e.preventDefault();
          seek(Math.max(0, displayedRef.current - 5));
          displayedRef.current = Math.max(0, displayedRef.current - 5);
          break;
        case "ArrowRight":
          if (editable) return;
          e.preventDefault();
          seek(Math.min(duration || Infinity, displayedRef.current + 5));
          displayedRef.current = Math.min(duration || Infinity, displayedRef.current + 5);
          break;
        case "ArrowUp":
          if (editable) return;
          e.preventDefault();
          applyVolume(getGainVolume() * 100 + 5);
          break;
        case "ArrowDown":
          if (editable) return;
          e.preventDefault();
          applyVolume(getGainVolume() * 100 - 5);
          break;
        case "m":
        case "M":
          if (editable) return;
          setMuted(!muted);
          break;
        case "n":
        case "N":
          if (editable) return;
          next();
          break;
        case "p":
        case "P":
          if (editable) return;
          prev();
          break;
        case "Escape":
          setQueueOpen(false);
          break;
        default:
          break;
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [toggle, seek, next, prev, setMuted, muted, duration, applyVolume]);

  // —— room tone: lower the gallery lights (music.md §S3) ——
  const dimmed = roomTone && isPlaying;
  useEffect(() => {
    const main = document.getElementById("main");
    const footer = document.querySelector("footer");
    for (const el of [main, footer]) {
      if (!(el instanceof HTMLElement)) continue;
      el.style.filter = dimmed ? "brightness(0.85)" : "";
      el.style.transition = "filter 0.9s cubic-bezier(0.16, 1, 0.3, 1)";
    }
    return () => {
      for (const el of [main, footer]) {
        if (el instanceof HTMLElement) el.style.filter = "";
      }
    };
  }, [dimmed]);

  // —— shared Footer sits above the persistent player (music.md §S5) ——
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!(footer instanceof HTMLElement)) return;
    if (currentTrack) footer.style.paddingBottom = "88px";
    else footer.style.paddingBottom = "";
    return () => {
      footer.style.paddingBottom = "";
    };
  }, [currentTrack]);

  // queue drawer order: explicitly queued pieces first, then the wall order
  const orderedQueue: Track[] = [
    ...queuedIds.map((id) => tracks.find((t) => t.id === id)).filter((t): t is Track => Boolean(t)),
    ...tracks.filter((t) => !queuedIds.includes(t.id)),
  ];

  const VolumeIcon = muted || volume === 0 ? VolumeX : volume < 50 ? Volume1 : Volume2;

  return (
    <>
      {/* vignette overlay while the room is dimmed */}
      <AnimatePresence>
        {dimmed && (
          <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="vignette pointer-events-none fixed inset-0 z-[35]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {currentTrack && (
          <motion.div
            key="player"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.5, ease: EASE }}
            className="fixed inset-x-0 bottom-0 z-[70] border-t backdrop-blur-md"
            style={{ borderColor: "var(--hairline)", backgroundColor: "rgba(18, 17, 16, 0.85)" }}
            role="region"
            aria-label="Audio player"
          >
            {/* progress track — sits on the bar's top edge, full width */}
            <div
              ref={trackRef}
              role="slider"
              tabIndex={0}
              aria-label="Seek"
              aria-valuemin={0}
              aria-valuemax={Math.round(duration)}
              aria-valuenow={Math.round(progress)}
              aria-valuetext={`${formatTime(progress)} of ${formatTime(duration)}`}
              data-cursor="SEEK"
              onPointerDown={onScrubPointerDown}
              onPointerMove={onScrubPointerMove}
              onPointerUp={onScrubPointerUp}
              className="group/scrub relative h-[14px] w-full cursor-pointer touch-none"
            >
              <div className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 bg-[var(--hairline)] transition-[height] duration-300 group-hover/scrub:h-[3px]">
                <div
                  ref={fillRef}
                  className="h-full w-full origin-left bg-chartreuse"
                  style={{ transform: "scaleX(0)" }}
                />
              </div>
              <div
                ref={headRef}
                aria-hidden
                className="absolute top-1/2 h-[10px] w-[10px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-chartreuse opacity-0 transition-opacity duration-300 group-hover/scrub:opacity-100"
                style={{ left: "0%" }}
              />
            </div>

            <div
              className="relative grid h-[72px] grid-cols-12 items-center gap-3"
              style={{ paddingInline: "clamp(16px, 3vw, 48px)" }}
            >
              {/* analyser bars behind the center controls (24 thin bars, 25%) */}
              <FreqBars
                bars={24}
                live={isPlaying}
                opacity={0.25}
                className="pointer-events-none absolute inset-x-0 bottom-0 h-full w-full"
              />

              {/* left: cover + title */}
              <div className="relative z-10 col-span-5 flex min-w-0 items-center gap-3 sm:col-span-3">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.img
                    key={currentTrack.id}
                    src={currentTrack.cover}
                    alt=""
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="h-12 w-12 shrink-0 border object-cover"
                    style={{ borderColor: "var(--hairline)" }}
                  />
                </AnimatePresence>
                <div className="min-w-0 overflow-hidden">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.p
                      key={currentTrack.id}
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "-110%" }}
                      transition={{ duration: 0.45, ease: EASE }}
                      className="truncate font-display text-[16px] italic leading-tight text-ink"
                    >
                      {currentTrack.title}
                    </motion.p>
                  </AnimatePresence>
                  <p className="mt-0.5 truncate font-mono text-micro-10 uppercase text-ink-faint">
                    {currentTrack.genre}
                  </p>
                </div>
              </div>

              {/* center: transport + times */}
              <div className="relative z-10 col-span-4 flex items-center justify-center gap-3 sm:col-span-6">
                <span
                  ref={timeRef}
                  className="hidden w-10 text-right font-mono text-micro-10 text-ink-faint sm:block"
                >
                  0:00
                </span>
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous track (P)"
                  className="flex h-9 w-9 items-center justify-center text-ink-dim transition-colors duration-500 hover:text-ink"
                >
                  <SkipBack size={16} />
                </button>
                <button
                  type="button"
                  onClick={toggle}
                  aria-label={isPlaying ? "Pause (Space)" : "Play (Space)"}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-chartreuse text-bg transition-transform duration-500 hover:scale-[1.06]"
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next track (N)"
                  className="flex h-9 w-9 items-center justify-center text-ink-dim transition-colors duration-500 hover:text-ink"
                >
                  <SkipForward size={16} />
                </button>
                <span className="hidden w-10 font-mono text-micro-10 text-ink-faint sm:block">
                  {formatTime(duration)}
                </span>
              </div>

              {/* right: queue, volume, room tone */}
              <div className="relative z-10 col-span-3 flex items-center justify-end gap-1 sm:gap-2">
                <button
                  type="button"
                  onClick={() => setQueueOpen(true)}
                  aria-label="Open queue"
                  aria-expanded={queueOpen}
                  className="flex h-9 w-9 items-center justify-center text-ink-dim transition-colors duration-500 hover:text-ink"
                >
                  <ListMusic size={16} />
                </button>

                {/* volume: icon + vertical popover slider */}
                <div className="group/vol relative">
                  <button
                    type="button"
                    onClick={() => setMuted(!muted)}
                    aria-label={muted ? "Unmute (M)" : "Mute (M)"}
                    className="flex h-9 w-9 items-center justify-center text-ink-dim transition-colors duration-500 hover:text-ink"
                  >
                    <VolumeIcon size={16} />
                  </button>
                  <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 border bg-bg-2 px-3 py-4 opacity-0 transition-opacity duration-300 group-hover/vol:pointer-events-auto group-hover/vol:opacity-100 sm:block"
                    style={{ borderColor: "var(--hairline-strong)" }}
                  >
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={muted ? 0 : volume}
                      onChange={(e) => applyVolume(Number(e.target.value))}
                      aria-label="Volume"
                      className="h-24 w-4 accent-[#D4FF00] [writing-mode:vertical-lr] [direction:rtl]"
                    />
                    <p className="mt-2 text-center font-mono text-micro-10 text-ink-faint">
                      {muted ? 0 : volume}
                    </p>
                  </div>
                </div>

                {/* room tone toggle */}
                <button
                  type="button"
                  role="switch"
                  aria-checked={roomTone}
                  onClick={() => setRoomTone((v) => !v)}
                  className={`ml-1 hidden items-center gap-2 border px-3 py-2 font-mono text-micro-10 uppercase transition-colors duration-500 sm:flex ${
                    roomTone ? "text-chartreuse" : "text-ink-faint hover:text-ink-dim"
                  }`}
                  style={{ borderColor: roomTone ? "var(--accent-dim)" : "var(--hairline-strong)" }}
                >
                  <span
                    aria-hidden
                    className={`h-1.5 w-1.5 rounded-full transition-colors duration-500 ${
                      roomTone ? "bg-chartreuse" : "bg-ink-faint"
                    }`}
                  />
                  Room tone
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* —— queue drawer (right side) —— */}
      <AnimatePresence>
        {queueOpen && (
          <>
            <motion.div
              key="queue-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              onClick={() => setQueueOpen(false)}
              className="fixed inset-0 z-[80] bg-black/50"
              aria-hidden
            />
            <motion.aside
              key="queue-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: EASE }}
              className="fixed bottom-0 right-0 top-0 z-[90] flex w-full max-w-[380px] flex-col border-l bg-bg-2"
              style={{ borderColor: "var(--hairline-strong)" }}
              role="dialog"
              aria-label="Play queue"
            >
              <div className="hairline-b flex items-center justify-between px-6 py-5">
                <p className="micro-label">— QUEUE</p>
                <button
                  type="button"
                  onClick={() => setQueueOpen(false)}
                  aria-label="Close queue"
                  className="flex h-8 w-8 items-center justify-center text-ink-faint transition-colors hover:text-ink"
                >
                  <X size={16} />
                </button>
              </div>

              <ul className="flex-1 overflow-y-auto" role="list">
                {orderedQueue.map((track, i) => {
                  const active = currentTrack?.id === track.id;
                  return (
                    <li key={track.id} className="hairline-b">
                      <button
                        type="button"
                        onClick={() => play(track)}
                        data-cursor="LISTEN"
                        className={`flex w-full items-center gap-4 px-6 py-4 text-left transition-colors duration-500 hover:bg-bg-3 ${
                          active ? "bg-bg-3" : ""
                        }`}
                        aria-current={active || undefined}
                      >
                        <span className="w-8 font-mono text-micro-10 text-ink-faint">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <img
                          src={track.cover}
                          alt=""
                          className={`h-10 w-10 border object-cover ${active ? "opacity-40" : ""}`}
                          style={{ borderColor: "var(--hairline)" }}
                        />
                        <span className="min-w-0 flex-1">
                          <span
                            className={`block truncate font-display text-[16px] leading-tight ${
                              active ? "italic text-chartreuse" : "text-ink"
                            }`}
                          >
                            {track.title}
                          </span>
                          <span className="mt-0.5 block truncate font-mono text-micro-10 uppercase text-ink-faint">
                            {track.genre} · {track.duration}
                          </span>
                        </span>
                        {active && isPlaying && (
                          <FreqBars bars={6} live opacity={0.8} className="h-5 w-8 shrink-0" />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>

              {/* keyboard map documentation (music.md §S3) */}
              <div className="border-t px-6 py-5" style={{ borderColor: "var(--hairline)" }}>
                <p className="micro-label mb-3">KEYBOARD</p>
                <ul className="grid grid-cols-2 gap-x-6 gap-y-2 font-mono text-micro-10 uppercase text-ink-faint">
                  {musicContent.keyboardMap.map((row) => (
                    <li key={row}>{row}</li>
                  ))}
                </ul>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
