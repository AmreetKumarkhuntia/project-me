// src/sections/gaming/dustCatcherEngine.ts — DUST CATCHER game engine (gaming-v2 §S2)
// Raw canvas + requestAnimationFrame. A minimalist kinetic study in drift and
// timing: move an off-white ring along the bottom, catch falling dust motes,
// avoid the shards. Gallery-minimal palette only — no neon, no grid.
import type { GamePhase } from "@/types";

export interface EngineOptions {
  onPhase?: (phase: GamePhase) => void;
  onScore?: (score: number) => void;
  onBest?: (best: number) => void;
  isMuted?: () => boolean;
  reducedMotion?: () => boolean;
}

export interface GameEngine {
  press: (dir: "left" | "right", down: boolean) => void;
  /** pointer drag (touch) — logical x coordinate */
  dragTo: (x: number) => void;
  start: () => void;
  togglePause: () => void;
  setVisible: (visible: boolean) => void;
  getBest: () => number;
  destroy: () => void;
}

const BEST_KEY = "dust-catcher-best";

const LW = 800; // logical width
const LH = 450; // logical height (16:9)

const RING_R = 14;
const RING_Y = LH - 42;
const RING_SPEED = 560; // px/s

const COLORS = {
  bg: "#121110",
  ink: "#EDEAE3",
  inkFaint: "#6E6A61",
  accent: "#D4FF00",
  hairline: "rgba(237,234,227,0.10)",
};

interface Mote {
  x: number;
  baseX: number;
  y: number;
  vy: number;
  r: number;
  swayPhase: number;
  swaySpeed: number;
  swayAmp: number;
  accent: boolean; // chartreuse, worth 3x
}

interface Shard {
  x: number;
  y: number;
  vy: number;
  size: number;
  rot: number;
  vr: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  accent: boolean;
}

interface Ripple {
  x: number;
  y: number;
  life: number;
  maxLife: number;
}

interface FloatScore {
  x: number;
  y: number;
  value: number;
  life: number;
  maxLife: number;
}

interface AmbientDot {
  x: number;
  y: number;
  r: number;
  phase: number;
  speed: number;
}

const rand = (min: number, max: number) => min + Math.random() * (max - min);

function loadBest(): number {
  try {
    const raw = window.localStorage.getItem(BEST_KEY);
    const n = raw ? Math.floor(Number(raw)) : 0;
    return Number.isFinite(n) && n > 0 ? n : 0;
  } catch {
    return 0;
  }
}

function saveBest(best: number) {
  try {
    window.localStorage.setItem(BEST_KEY, String(Math.max(0, Math.floor(best))));
  } catch {
    /* storage unavailable */
  }
}

export function createDustCatcher(canvas: HTMLCanvasElement, opts: EngineOptions): GameEngine {
  const ctx = canvas.getContext("2d");

  let raf = 0;
  let last = performance.now();
  let visible = true;
  let destroyed = false;

  let phase: GamePhase = "idle";

  // input
  const keys = { left: false, right: false };
  let dragX: number | null = null;

  // world
  let ringX = LW / 2;
  const motes: Mote[] = [];
  const shards: Shard[] = [];
  const particles: Particle[] = [];
  const ripples: Ripple[] = [];
  const floats: FloatScore[] = [];
  const ambient: AmbientDot[] = [];

  // run state
  let score = 0;
  let best = loadBest();
  let elapsed = 0;
  let moteTimer = 0.4;
  let shardTimer = 4.5;

  // audio (lazy, created on first user gesture)
  let audioCtx: AudioContext | null = null;

  const reduced = () => opts.reducedMotion?.() ?? false;
  const muted = () => opts.isMuted?.() ?? true;

  for (let i = 0; i < 64; i++) {
    ambient.push({
      x: rand(0, LW),
      y: rand(0, LH),
      r: rand(0.6, 1.6),
      phase: rand(0, Math.PI * 2),
      speed: rand(0.15, 0.6),
    });
  }

  function setPhase(next: GamePhase) {
    phase = next;
    opts.onPhase?.(next);
  }

  function ensureAudio() {
    if (audioCtx) return;
    try {
      const Ctor =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return;
      audioCtx = new Ctor();
    } catch {
      audioCtx = null;
    }
  }

  /** soft sine blip on catch (gaming-v2 §S2) */
  function blip(accent: boolean) {
    if (muted()) return;
    ensureAudio();
    const ac = audioCtx;
    if (!ac) return;
    void ac.resume().catch(() => undefined);
    try {
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      const t = ac.currentTime;
      osc.type = "sine";
      osc.frequency.setValueAtTime(accent ? 880 : 660, t);
      osc.frequency.exponentialRampToValueAtTime(accent ? 1180 : 860, t + 0.09);
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(0.06, t + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
      osc.connect(gain);
      gain.connect(ac.destination);
      osc.start(t);
      osc.stop(t + 0.18);
    } catch {
      /* audio unavailable */
    }
  }

  /** low thud on shard (gaming-v2 §S2) */
  function thud() {
    if (muted()) return;
    ensureAudio();
    const ac = audioCtx;
    if (!ac) return;
    void ac.resume().catch(() => undefined);
    try {
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      const t = ac.currentTime;
      osc.type = "sine";
      osc.frequency.setValueAtTime(120, t);
      osc.frequency.exponentialRampToValueAtTime(48, t + 0.28);
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(0.14, t + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.34);
      osc.connect(gain);
      gain.connect(ac.destination);
      osc.start(t);
      osc.stop(t + 0.36);
    } catch {
      /* audio unavailable */
    }
  }

  function resetRun() {
    motes.length = 0;
    shards.length = 0;
    particles.length = 0;
    ripples.length = 0;
    floats.length = 0;
    ringX = LW / 2;
    score = 0;
    elapsed = 0;
    moteTimer = 0.3;
    shardTimer = 4.5;
    opts.onScore?.(0);
  }

  function start() {
    ensureAudio();
    resetRun();
    setPhase("playing");
  }

  function togglePause() {
    if (phase === "playing") setPhase("paused");
    else if (phase === "paused") setPhase("playing");
  }

  function burst(x: number, y: number, accent: boolean) {
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2 + rand(-0.3, 0.3);
      const sp = rand(40, 110);
      particles.push({
        x,
        y,
        vx: Math.cos(a) * sp,
        vy: Math.sin(a) * sp - 30,
        life: 0,
        maxLife: rand(0.35, 0.6),
        accent,
      });
    }
    if (!reduced()) {
      ripples.push({ x, y, life: 0, maxLife: 0.55 });
    }
  }

  function gameOver() {
    thud();
    burst(ringX, RING_Y, false);
    if (score > best) {
      best = score;
      saveBest(best);
      opts.onBest?.(best);
    }
    setPhase("gameover");
  }

  function update(dt: number) {
    if (phase !== "playing") return;
    elapsed += dt;

    // player movement: keys or direct drag
    if (dragX != null) {
      const diff = dragX - ringX;
      const step = RING_SPEED * 1.6 * dt;
      ringX += Math.abs(diff) < step ? diff : Math.sign(diff) * step;
    } else {
      if (keys.left) ringX -= RING_SPEED * dt;
      if (keys.right) ringX += RING_SPEED * dt;
    }
    ringX = Math.max(RING_R + 6, Math.min(LW - RING_R - 6, ringX));

    // difficulty: fall speed rises with score (gaming-v2 §S2)
    const speedBase = 96 + Math.min(220, score * 2.2);
    const spawnEvery = Math.max(0.42, 1.05 - score * 0.008);

    moteTimer -= dt;
    if (moteTimer <= 0) {
      moteTimer = spawnEvery * rand(0.7, 1.3);
      const accent = Math.random() < 0.14;
      motes.push({
        x: 0,
        baseX: rand(30, LW - 30),
        y: -12,
        vy: speedBase * rand(0.8, 1.2),
        r: rand(1.8, 2.6), // visual glow 3–5px diameter
        swayPhase: rand(0, Math.PI * 2),
        swaySpeed: rand(1.2, 2.4),
        swayAmp: rand(14, 34),
        accent,
      });
    }

    // sparse shards (skip the first seconds of a run)
    shardTimer -= dt;
    if (shardTimer <= 0 && elapsed > 3) {
      shardTimer = rand(3.2, 5.2) * Math.max(0.55, 1 - score * 0.004);
      shards.push({
        x: rand(40, LW - 40),
        y: -16,
        vy: speedBase * rand(0.9, 1.15),
        size: rand(9, 13),
        rot: rand(0, Math.PI),
        vr: rand(-2.4, 2.4),
      });
    }

    // motes
    for (let i = motes.length - 1; i >= 0; i--) {
      const m = motes[i]!;
      m.y += m.vy * dt;
      m.swayPhase += m.swaySpeed * dt;
      m.x = m.baseX + Math.sin(m.swayPhase) * m.swayAmp;
      if (m.y > LH + 16) {
        motes.splice(i, 1);
        continue;
      }
      // catch: mote reaches the ring plane within the ring radius
      const dx = m.x - ringX;
      const dy = m.y - RING_Y;
      if (Math.abs(dy) < RING_R + m.r + 4 && Math.hypot(dx, dy) < RING_R + m.r + 2) {
        const value = m.accent ? 3 : 1;
        score += value;
        floats.push({ x: m.x, y: m.y - 10, value, life: 0, maxLife: 0.8 });
        burst(m.x, m.y, m.accent);
        blip(m.accent);
        opts.onScore?.(score);
        if (score > best) {
          best = score;
          opts.onBest?.(best);
        }
        motes.splice(i, 1);
      }
    }

    // shards — one catch ends the run
    for (let i = shards.length - 1; i >= 0; i--) {
      const s = shards[i]!;
      s.y += s.vy * dt;
      s.rot += s.vr * dt;
      if (s.y > LH + 24) {
        shards.splice(i, 1);
        continue;
      }
      const dx = s.x - ringX;
      const dy = s.y - RING_Y;
      if (Math.hypot(dx, dy) < RING_R + s.size * 0.7) {
        shards.splice(i, 1);
        gameOver();
        return;
      }
    }

    // juice
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i]!;
      p.life += dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vy += 160 * dt;
      if (p.life >= p.maxLife) particles.splice(i, 1);
    }
    for (let i = ripples.length - 1; i >= 0; i--) {
      const r = ripples[i]!;
      r.life += dt;
      if (r.life >= r.maxLife) ripples.splice(i, 1);
    }
    for (let i = floats.length - 1; i >= 0; i--) {
      const f = floats[i]!;
      f.life += dt;
      f.y -= 34 * dt;
      if (f.life >= f.maxLife) floats.splice(i, 1);
    }
  }

  function draw() {
    if (!ctx) return;
    ctx.clearRect(0, 0, LW, LH);
    ctx.fillStyle = COLORS.bg;
    ctx.fillRect(0, 0, LW, LH);

    // ambient dust field — the gallery air (skipped for reduced motion)
    if (!reduced()) {
      const t = performance.now() / 1000;
      for (const d of ambient) {
        const ax = d.x + Math.sin(t * d.speed * 0.4 + d.phase) * 12;
        const ay = d.y + Math.sin(t * d.speed * 0.5 + d.phase * 1.7) * 10;
        ctx.globalAlpha = 0.16 + Math.sin(t * d.speed + d.phase) * 0.06;
        ctx.fillStyle = COLORS.ink;
        ctx.beginPath();
        ctx.arc(ax, ay, d.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    // hairline floor rule
    ctx.strokeStyle = COLORS.hairline;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, RING_Y + RING_R + 14);
    ctx.lineTo(LW, RING_Y + RING_R + 14);
    ctx.stroke();

    // falling motes — warm white dust, occasional chartreuse
    for (const m of motes) {
      const glowR = m.r + 2.4;
      const grad = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, glowR);
      if (m.accent) {
        grad.addColorStop(0, "rgba(212,255,0,0.95)");
        grad.addColorStop(0.5, "rgba(212,255,0,0.35)");
        grad.addColorStop(1, "rgba(212,255,0,0)");
      } else {
        grad.addColorStop(0, "rgba(237,234,227,0.95)");
        grad.addColorStop(0.5, "rgba(237,234,227,0.28)");
        grad.addColorStop(1, "rgba(237,234,227,0)");
      }
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(m.x, m.y, glowR, 0, Math.PI * 2);
      ctx.fill();
    }

    // shards — sparse dark-gray rotating squares
    for (const s of shards) {
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.rotate(s.rot);
      ctx.fillStyle = COLORS.inkFaint;
      ctx.globalAlpha = 0.85;
      ctx.fillRect(-s.size / 2, -s.size / 2, s.size, s.size);
      ctx.globalAlpha = 1;
      ctx.restore();
    }

    // catch ripples — soft chartreuse ring
    for (const r of ripples) {
      const k = r.life / r.maxLife;
      ctx.globalAlpha = (1 - k) * 0.5;
      ctx.strokeStyle = COLORS.accent;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(r.x, r.y, 4 + k * 26, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    // burst particles
    for (const p of particles) {
      const k = 1 - p.life / p.maxLife;
      ctx.globalAlpha = k * 0.9;
      ctx.fillStyle = p.accent ? COLORS.accent : COLORS.ink;
      ctx.fillRect(p.x - 1, p.y - 1, 2, 2);
    }
    ctx.globalAlpha = 1;

    // float-up score numbers
    for (const f of floats) {
      const k = 1 - f.life / f.maxLife;
      ctx.globalAlpha = k;
      ctx.fillStyle = f.value > 1 ? COLORS.accent : COLORS.ink;
      ctx.font = "500 13px 'IBM Plex Mono', monospace";
      ctx.textAlign = "center";
      ctx.fillText(`+${f.value}`, f.x, f.y);
    }
    ctx.globalAlpha = 1;

    // player ring — 14px radius, 2px off-white stroke
    ctx.strokeStyle = phase === "gameover" ? COLORS.inkFaint : COLORS.ink;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(ringX, RING_Y, RING_R, 0, Math.PI * 2);
    ctx.stroke();
    // faint inner catch dot
    ctx.fillStyle = phase === "gameover" ? COLORS.inkFaint : COLORS.accent;
    ctx.globalAlpha = 0.9;
    ctx.beginPath();
    ctx.arc(ringX, RING_Y, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  function frame(now: number) {
    if (destroyed) return;
    raf = window.requestAnimationFrame(frame);
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    if (!visible) return;
    update(dt);
    draw();
  }

  function setVisible(v: boolean) {
    visible = v;
    if (v) last = performance.now();
    // auto-pause when scrolled away mid-run
    if (!v && phase === "playing") setPhase("paused");
  }

  function press(dir: "left" | "right", down: boolean) {
    keys[dir] = down;
    if (down) dragX = null;
  }

  function dragTo(x: number) {
    dragX = Math.max(0, Math.min(LW, x));
  }

  last = performance.now();
  raf = window.requestAnimationFrame(frame);
  opts.onBest?.(best);

  return {
    press,
    dragTo,
    start,
    togglePause,
    setVisible,
    getBest: () => best,
    destroy() {
      destroyed = true;
      window.cancelAnimationFrame(raf);
      if (audioCtx) void audioCtx.close().catch(() => undefined);
      audioCtx = null;
    },
  };
}

/** logical width/height exported for coordinate mapping in the component */
export const LOGICAL_W = LW;
export const LOGICAL_H = LH;
