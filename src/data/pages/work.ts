// src/data/pages/work.ts — all editorial copy for "The Engineering Wing" (work.md)
import type { WorkContent } from "@/types";

export const workContent: WorkContent = {
  hero: {
    label: { number: "01", text: "THE ENGINEERING WING" },
    headline: [
      [{ text: "Systems" }, { text: "that" }],
      [{ text: "stay up", italic: true, accent: true, delay: 0.25 }, { text: "." }],
    ],
    sub: "Four selected works — tools, libraries, and pipelines built to be boring in production.",
    sculpture: {
      src: "/sculpt-bronze.png",
      alt: "Dark-bronze metallic sculpture of interlocking geometric ribbons",
    },
    plaque: { title: "Nº 02 — Load-Bearing Ribbons", medium: "Cast bronze, kinetic" },
  },

  materials: { label: { number: "02", text: "MATERIALS" } },

  provenance: { label: { number: "03", text: "PROVENANCE" } },

  nextRoom: { label: "Next Room —", text: "The Listening Room", to: "/music" },
};
