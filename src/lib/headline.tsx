// src/lib/headline.tsx — map data-file HeadlineWord entries to WordReveal's
// MaskWord nodes. Emphasis rendering (italic / chartreuse accent) lives here
// so the data files stay JSX-free.
import type { HeadlineWord } from "@/types";
import type { MaskWord } from "@/components/home/WordReveal";

export function toMaskWords(words: HeadlineWord[]): MaskWord[] {
  return words.map((w) => ({
    node: w.accent ? (
      <em className="italic text-chartreuse">{w.text}</em>
    ) : w.italic ? (
      <em className="italic">{w.text}</em>
    ) : (
      w.text
    ),
    delay: w.delay,
  }));
}
