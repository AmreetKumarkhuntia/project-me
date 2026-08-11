// src/types/track.ts — music track shape

export interface Track {
  id: string;
  index: string;
  title: string;
  src: string; // audio file path or streaming preview URL
  cover: string;
  duration: string; // display duration of the full track
  genre: string; // italic Playfair genre under the title
  moodNote: string; // mono caption, e.g. "CAUGHT IN BETWEEN · 2026"
  mood: string; // longer sentence in the detail strip
  listenUrl: string; // external link to the full track/catalogue
}
