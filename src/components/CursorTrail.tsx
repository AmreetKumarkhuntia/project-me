// src/components/CursorTrail.tsx — fading chartreuse comet trail behind the
// cursor dot (design-v2 §5). Canvas 2D on a fixed layer; same gating as
// Cursor: fine pointers only, disabled under reduced motion.
import { useEffect, useRef, useState } from "react";

function trailSupported(): boolean {
  return (
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

const LIFE_MS = 450; // how long a trail point survives
const MAX_POINTS = 64;

interface TrailPoint {
  x: number;
  y: number;
  t: number;
}

export default function CursorTrail() {
  const [enabled] = useState(trailSupported);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const pts: TrailPoint[] = [];
    let raf = 0;
    let running = false;

    const draw = () => {
      const now = performance.now();
      while (pts.length && now - (pts[0] as TrailPoint).t > LIFE_MS) pts.shift();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (pts.length < 2) {
        // trail fully faded — stop the loop until the pointer moves again
        running = false;
        return;
      }
      raf = requestAnimationFrame(draw);

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      // midpoint-to-midpoint quadratics: smooth ribbon, no beading at joints
      for (let i = 1; i < pts.length - 1; i++) {
        const prev = pts[i - 1] as TrailPoint;
        const curr = pts[i] as TrailPoint;
        const next = pts[i + 1] as TrailPoint;
        const age = (now - curr.t) / LIFE_MS; // 0 fresh → 1 dead
        const fade = (1 - age) * (1 - age);
        ctx.strokeStyle = `rgba(212, 255, 0, ${fade * 0.35})`;
        ctx.lineWidth = 0.5 + fade * 2.5;
        ctx.beginPath();
        ctx.moveTo((prev.x + curr.x) / 2, (prev.y + curr.y) / 2);
        ctx.quadraticCurveTo(curr.x, curr.y, (curr.x + next.x) / 2, (curr.y + next.y) / 2);
        ctx.stroke();
      }
      ctx.restore();
    };

    const onMove = (e: MouseEvent) => {
      pts.push({ x: e.clientX, y: e.clientY, t: performance.now() });
      if (pts.length > MAX_POINTS) pts.shift();
      if (!running) {
        running = true;
        raf = requestAnimationFrame(draw);
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[75] h-full w-full"
    />
  );
}
