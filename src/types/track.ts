// src/types/track.ts — music track shape

export interface Track {
  id: string;
  index: string;
  title: string;
  src: string; // audio file path
  cover: string;
  duration: string; // display duration
  genre: string; // italic Playfair genre under the title
  moodNote: string; // mono caption, e.g. "DUSK HIGHWAY, LONG EXPOSURE"
  mood: string; // longer sentence in the detail strip
}
