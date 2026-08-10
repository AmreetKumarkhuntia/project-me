// src/data/pages/gaming.ts — all editorial copy for "The Play Room" (gaming.md)
import type { GamingContent } from "@/types";

export const gamingContent: GamingContent = {
  hero: {
    label: { number: "01", text: "THE PLAY ROOM" },
    headline: [
      [{ text: "Play," }, { text: "framed.", italic: true, accent: true, delay: 0.3 }],
    ],
    sub: "One playable piece and a shelf of the games that shaped how I think about systems, feedback, and flow.",
    sculpture: {
      src: "/sculpt-glass.png",
      alt: "Frosted glass abstract polyhedral sculpture with soft inner glow",
    },
    plaque: { title: "Nº 04 — Frozen Dice", medium: "Frosted glass, inner light", year: "2026" },
  },

  vitrine: {
    cornerPlaque: "Interactive — please touch",
    title: "Dust Catcher",
    subtitle: "A kinetic study in drift and timing · 2026",
    idleHeading: "Press to begin",
    pausedHeading: "Paused — the dust waits.",
    gameOverLabel: "Game over",
    srDescription:
      "Dust Catcher is a minimalist catching game. Press Start, then move the off-white ring along the bottom of the playfield with the left and right arrow keys, the A and D keys, or by dragging on touch screens. Catch the falling warm-white dust motes for one point and chartreuse motes for three points. Catching a dark-gray shard ends the run. Escape pauses the game. Your best score is saved locally on this device.",
  },

  shelf: {
    label: { number: "02", text: "THE SHELF" },
    note: "FOUR THAT SHAPED THE SYSTEMS THINKING",
  },

  controlsStrip: {
    left: "Controls — ←/→ or A/D move · Esc pause · Sound toggle in-vitrine",
    right: "Best score saved locally",
  },

  returnBand: { label: "Back to —", pre: "The", em: "Atrium", to: "/" },
};
