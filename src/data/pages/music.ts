// src/data/pages/music.ts — all editorial copy for "The Listening Room" (music.md)
import type { MusicContent } from "@/types";

export const musicContent: MusicContent = {
  hero: {
    label: { number: "01", text: "THE LISTENING ROOM" },
    headline: [
      [
        { text: "Sound," },
        { text: "hung", italic: true, accent: true, delay: 0.24 },
        { text: "on" },
        { text: "walls." },
      ],
    ],
    sub: "Five pieces written between deploys — synths, ambience, and slow compilations. Press play; the room dims.",
    sculpture: {
      src: "/sculpt-ceramic.png",
      alt: "Black ceramic sound-wave sculpture with concentric ripples",
    },
    plaque: { title: "Nº 03 — Frozen Waveform", medium: "Glazed ceramic, sound-reactive" },
  },

  notes: {
    label: { number: "02", text: "NOTES" },
    quote: "“Made between deploys.”",
    body: "Every piece here was produced late at night in Bengaluru — a counterpoint to the day job: unpredictable on purpose. The room tone toggle lowers the lights, the way a gallery does for video work.",
  },

  nextRoom: { label: "NEXT ROOM —", pre: "The", em: "Play", post: "Room", to: "/gaming" },

  keyboardMap: [
    "Space — Play / Pause",
    "← → — Seek 5s",
    "↑ ↓ — Volume",
    "M — Mute",
    "N — Next",
    "P — Previous",
  ],
};
