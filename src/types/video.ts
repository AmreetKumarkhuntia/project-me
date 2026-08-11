// src/types/video.ts — YouTube screening-wall shapes

export interface Video {
  id: string;
  /** YouTube video id, e.g. "geKbyJzcdRo" */
  youtubeId: string;
  title: string;
  duration: string; // display duration, e.g. "6:08"
  published: string; // display date, e.g. "JUL 2026"
}

/** one expandable group on the screening wall (a series or the latest reel) */
export interface VideoSection {
  id: string;
  label: string;
  /** mono caption after the label, e.g. "WALKTHROUGH SERIES" */
  note?: string;
  videos: Video[];
}

export interface VideoChannel {
  name: string;
  url: string;
}
