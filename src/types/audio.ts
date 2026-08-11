// src/types/audio.ts — the shared audio player contract
import type { Track } from "./track";

export interface AudioState {
  currentTrack: Track | null;
  isPlaying: boolean;
  muted: boolean;
  progress: number; // seconds
  duration: number; // seconds
  play: (track: Track) => void;
  toggle: () => void;
  pause: () => void;
  next: () => void;
  prev: () => void;
  seek: (seconds: number) => void;
  setMuted: (muted: boolean) => void;
  /** Shared AnalyserNode for visualizers (created lazily after a user gesture). */
  getAnalyser: () => AnalyserNode | null;
}
