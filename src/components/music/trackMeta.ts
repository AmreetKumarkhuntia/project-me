// src/components/music/trackMeta.ts — presentational copy for the five
// pieces (music.md §S2 verbatim table). Files/titles/covers/durations live
// in src/data/tracks.ts; only genre + mood-note captions live here.

export interface TrackMeta {
  genre: string;
  moodNote: string;
}

export const TRACK_META: Record<string, TrackMeta> = {
  "neon-drift": { genre: "synthwave", moodNote: "DUSK HIGHWAY, LONG EXPOSURE" },
  "static-bloom": { genre: "dark ambient", moodNote: "INK DIFFUSING AT NIGHT" },
  "midnight-compile": { genre: "lo-fi", moodNote: "DESK LAMP, WARM STATIC" },
  "latency-zero": { genre: "EDM", moodNote: "CONCENTRIC, PRECISE" },
  "signal-lost": { genre: "sci-fi ambient", moodNote: "ONE LIGHT, VERY FAR" },
};

export function trackMeta(id: string): TrackMeta {
  return TRACK_META[id] ?? { genre: "", moodNote: "" };
}
