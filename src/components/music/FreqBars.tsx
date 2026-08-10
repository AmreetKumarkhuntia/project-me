// src/components/music/FreqBars.tsx — 2D canvas frequency-bar visualizer
// (design-v2 music.md §S2/§S3). Driven by the AudioProvider's shared
// AnalyserNode; chartreuse bars, buttery lerp. When the analyser is
// unavailable (or nothing plays) a gentle CSS-like sine motion is drawn
// instead — the "graceful no-WebAudio fallback" (music.md §Interactions).
import { useEffect, useRef } from "react";
import { useAudio } from "@/providers/AudioProvider";
import { ensureGainWiring } from "@/components/music/audioGain";

interface FreqBarsProps {
  bars?: number;
  /** draw live FFT data; otherwise ease to a flat 8% baseline */
  live: boolean;
  className?: string;
  /** 0..1 bar opacity — 0.25 behind player controls, 0.6 over active cover */
  opacity?: number;
  /** pause drawing when off-screen */
  active?: boolean;
}

export default function FreqBars({
  bars = 24,
  live,
  className,
  opacity = 0.25,
  active = true,
}: FreqBarsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { getAnalyser } = useAudio();
  const liveRef = useRef(live);
  useEffect(() => {
    liveRef.current = live;
  }, [live]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let disposed = false;
    const values = new Float32Array(bars).fill(0.08);
    let freq = new Uint8Array(new ArrayBuffer(0));

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(canvas.clientWidth * dpr));
      canvas.height = Math.max(1, Math.floor(canvas.clientHeight * dpr));
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = (now: number) => {
      if (disposed) return;
      raf = requestAnimationFrame(draw);
      const w = canvas.width;
      const h = canvas.height;
      if (w === 0 || h === 0) return;
      const analyser = getAnalyser();
      ensureGainWiring(analyser); // keep the volume gain inserted (no-op once wired)

      let targets: number[] | null = null;
      if (analyser && liveRef.current) {
        const bins = analyser.frequencyBinCount;
        if (freq.length !== bins) freq = new Uint8Array(bins);
        analyser.getByteFrequencyData(freq);
        targets = [];
        const usable = Math.floor(bins * 0.72); // upper bins are usually empty
        for (let i = 0; i < bars; i++) {
          const from = 1 + Math.floor((i / bars) * usable);
          const to = Math.max(from + 1, 1 + Math.floor(((i + 1) / bars) * usable));
          let sum = 0;
          for (let b = from; b < to && b < bins; b++) sum += freq[b] ?? 0;
          targets.push(Math.min(1, (sum / (to - from) / 255) * 1.4));
        }
      }

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = `rgba(212, 255, 0, ${opacity})`;

      const t = now / 1000;
      const gap = w / bars;
      const bw = Math.max(1, gap * 0.4);
      for (let i = 0; i < bars; i++) {
        let target: number;
        if (targets) {
          target = targets[i] ?? 0.08;
        } else if (liveRef.current) {
          // sine fallback: gentle breathing bars when no analyser exists
          target = 0.14 + 0.08 * Math.sin(t * 1.1 + i * 0.55) * Math.sin(t * 0.6 + i * 0.2);
        } else {
          target = 0.08;
        }
        const prev = values[i] ?? 0.08;
        // snap up fast, fall/ease slow (museum pace)
        const next = prev + (target - prev) * (targets ? 0.35 : 0.07);
        values[i] = next;
        const bh = Math.max(1, next * h * 0.92);
        ctx.fillRect(i * gap + (gap - bw) / 2, h - bh, bw, bh);
      }
    };
    if (active) raf = requestAnimationFrame(draw);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [bars, getAnalyser, opacity, active]);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
