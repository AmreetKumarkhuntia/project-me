// src/components/music/audioGain.ts — volume control for the Listening Room.
// The shared AudioProvider exposes no volume API (only mute), so we re-route
// its shared AnalyserNode through a GainNode owned here — without touching
// the provider (same approach as v1). If Web Audio is unavailable the
// slider still renders; only mute then has an audible effect.

const KEY = "atelier:music:volume";

let gainNode: GainNode | null = null;
let wiredFor: AnalyserNode | null = null;

export function getStoredVolume(): number {
  try {
    const raw = localStorage.getItem(KEY);
    const v = raw === null ? NaN : Number(raw);
    if (Number.isFinite(v)) return Math.min(100, Math.max(0, Math.round(v)));
  } catch {
    /* storage unavailable */
  }
  return 80;
}

export function storeVolume(v: number): void {
  try {
    localStorage.setItem(KEY, String(v));
  } catch {
    /* storage unavailable */
  }
}

let current = typeof window === "undefined" ? 0.8 : getStoredVolume() / 100;

export function getGainVolume(): number {
  return current;
}

/**
 * Inserts our GainNode between the provider's analyser and the destination
 * (once per analyser). Safe to call every frame — no-ops once wired.
 */
export function ensureGainWiring(analyser: AnalyserNode | null): GainNode | null {
  if (!analyser) return null;
  if (wiredFor === analyser && gainNode) {
    if (gainNode.gain.value !== current) gainNode.gain.value = current;
    return gainNode;
  }
  try {
    const ctx = analyser.context;
    const gain = ctx.createGain();
    gain.gain.value = current;
    analyser.disconnect();
    analyser.connect(gain);
    gain.connect(ctx.destination);
    gainNode = gain;
    wiredFor = analyser;
    return gain;
  } catch {
    return null;
  }
}

/** v: 0..1 — applies immediately if wired, otherwise on next wiring. */
export function setGainVolume(v: number): void {
  current = Math.min(1, Math.max(0, v));
  if (gainNode) gainNode.gain.value = current;
}
