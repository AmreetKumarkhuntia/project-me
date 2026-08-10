// src/types/track.ts — music track shape

export interface Track {
  id: string;
  index: string;
  title: string;
  src: string; // audio file path
  cover: string;
  duration: string; // display duration
  mood: string;
}
