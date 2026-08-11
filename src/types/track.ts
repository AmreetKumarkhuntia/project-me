// src/types/track.ts — music catalogue shapes

export interface Track {
  id: string;
  title: string;
  src: string; // audio file path or streaming preview URL
  cover: string;
  duration: string; // display duration of the full track
  genre: string; // italic display genre, e.g. "dance"
  year: string; // release year, e.g. "2026"
  listenUrl: string; // external link to the full track/catalogue
}

export interface Album {
  id: string;
  title: string;
  kind: "album" | "singles";
  year: string; // "2026" or a range like "2021 — 2026"
  cover: string;
  /** mono caption under the title, e.g. "7 TRACKS · DANCE" */
  note: string;
  tracks: Track[];
}
