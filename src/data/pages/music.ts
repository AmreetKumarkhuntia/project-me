// src/data/pages/music.ts — all editorial copy for "The Listening Room" (music.md)
import type { MusicContent } from "@/types";
import { spotifyArtistUrl } from "@/data/socials";

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
    sub: "Two albums and a run of singles — the full Amreet K catalogue. Press play for a preview; the room dims.",
    sculpture: {
      src: "/sculpt-ceramic.png",
      alt: "Black ceramic sound-wave sculpture with concentric ripples",
    },
    plaque: { title: "Nº 03 — Frozen Waveform", medium: "Glazed ceramic, sound-reactive" },
  },

  notes: {
    label: { number: "02", text: "NOTES" },
    quote: "“Made between deploys.”",
    body: "Released independently as Amreet K — the debut album ME (2021), Caught In Between (2026), and a run of 2026 singles. What plays in this room are 30-second previews; the full records hang on Spotify. The room tone toggle lowers the lights, the way a gallery does for video work.",
    link: { label: "FULL DISCOGRAPHY", href: spotifyArtistUrl },
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
