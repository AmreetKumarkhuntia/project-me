// src/data/pages/home.ts — all editorial copy for "The Atrium" (home.md)
import type { HomeContent } from "@/types";
import { profile } from "@/data/profile";

export const homeContent: HomeContent = {
  preHeroStrip: [profile.role, "Vol. 02 — The Atelier"],

  hero: {
    label: { number: "01", text: "AMREET KHUNTIA" },
    headline: [
      [{ text: "I" }, { text: "build" }],
      [{ text: "resilient", italic: true }],
      [{ text: "systems" }, { text: "&" }],
      [{ text: "automate" }, { text: "the" }],
      [{ text: "infrastructure", italic: true, accent: true, delay: 0.3 }],
      [{ text: "they" }, { text: "run" }, { text: "on." }],
    ],
    bio: {
      lead: "Software & DevOps Engineer.",
      body: "I build robust backend systems, automate CI/CD pipelines, and run cloud infrastructure that ships without drama. I care about simplicity, observability, and making the predictable boring.",
    },
    sculpture: { src: "/sculpt-atrium.png", alt: "Warm-stone clay displaced torus sculpture" },
    plaque: { title: "Nº 01 — Untitled (System)", medium: "Displaced clay, studio light", year: "2026" },
    metaRows: [
      { label: "Role", value: "SWE · DevOps" },
      { label: "Currently", value: profile.company },
      { label: "Based", value: profile.based },
      { label: "Focus", value: profile.focus },
      { label: "Status", value: profile.status, accentDot: true },
    ],
  },

  metrics: { label: { number: "02", text: "MEASURED" } },

  wings: {
    label: { number: "03", text: "THE WINGS" },
    entries: [
      {
        index: "W.01",
        name: "Engineering",
        descriptor: "Resilient systems, boring deploys",
        to: "/work",
        preview: "/sculpt-bronze.png",
      },
      {
        index: "W.02",
        name: "Music",
        descriptor: "Five pieces, one listening room",
        to: "/music",
        preview: "/cover-midnight-compile.png",
      },
      {
        index: "W.03",
        name: "Gaming",
        descriptor: "A small game, framed",
        to: "/gaming",
        preview: "/sculpt-glass.png",
      },
    ],
  },

  featured: {
    label: { number: "04", text: "SELECTED WORK" },
    note: "FULL EXHIBITION → /WORK",
    impactFigure: "Top 10",
    impactCaption: "Ranked segments per run",
  },

  artist: {
    label: { number: "05", text: "ETHOS" },
    portrait: { src: "/portrait.png", alt: "Fine-art portrait of Amreet Khuntia" },
    caption: "The Artist — Bengaluru, IN",
    ethos: {
      pre: "“The best system is the one you can hold in your head — and the",
      accent: "boring deploy",
      post: "is the good deploy.”",
    },
  },
};
