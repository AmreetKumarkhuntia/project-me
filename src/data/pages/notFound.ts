// src/data/pages/notFound.ts — the 404 "missing exhibit" room
import type { NotFoundContent } from "@/types";

export const notFoundContent: NotFoundContent = {
  label: { number: "404", text: "UNCHARTED" },
  headline: [
    [
      { text: "This" },
      { text: "room", italic: true, accent: true, delay: 0.25 },
      { text: "isn't" },
      { text: "on" },
      { text: "the" },
      { text: "map." },
    ],
  ],
  body: "The piece you're looking for was never hung. Retrace your steps to the atrium.",
  plaque: { title: "Nº ∅ — Missing Exhibit", medium: "Empty pedestal, dust", year: "2026" },
  returnBand: { label: "Back to —", pre: "The", em: "Atrium", to: "/" },
};
