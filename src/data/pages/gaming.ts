// src/data/pages/gaming.ts — all editorial copy for "The Play Room" (gaming.md)
import type { GamingContent } from "@/types";

export const gamingContent: GamingContent = {
  hero: {
    label: { number: "01", text: "THE PLAY ROOM" },
    headline: [
      [{ text: "Play," }, { text: "framed.", italic: true, accent: true, delay: 0.3 }],
    ],
    sub: "A screening wall of gameplay from the channel, and a shelf of the games that shaped how I think about systems, feedback, and flow.",
    sculpture: {
      src: "/sculpt-glass.webp",
      alt: "Frosted glass abstract polyhedral sculpture with soft inner glow",
    },
    plaque: { title: "Nº 04 — Frozen Dice", medium: "Frosted glass, inner light", year: "2026" },
  },

  screening: {
    cornerPlaque: "Now showing",
    title: "Amreet Aint",
    subtitle: "Gameplay, walkthroughs & the occasional rage-quit · YouTube",
    channelLabel: "Open channel",
  },

  shelf: {
    label: { number: "02", text: "THE SHELF" },
    note: "FOUR THAT SHAPED THE SYSTEMS THINKING",
  },

  returnBand: { label: "Back to —", pre: "The", em: "Atrium", to: "/" },
};
