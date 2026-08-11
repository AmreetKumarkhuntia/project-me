// src/types/video.ts — YouTube video shapes for the screening wall

export interface Video {
  id: string;
  index: string;
  /** YouTube video id, e.g. "geKbyJzcdRo" */
  youtubeId: string;
  title: string;
  duration: string; // display duration, e.g. "6:08"
  published: string; // display date, e.g. "JUL 2026"
}

export interface VideoChannel {
  name: string;
  url: string;
}
