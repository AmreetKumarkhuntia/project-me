// src/data/tracks.ts — track list (design.md §14)
// Swap real songs here: set `src` to an mp3 path or a Spotify/SoundCloud embed URL.

export interface Track {
  id: string;
  index: string;
  title: string;
  src: string; // audio file path
  cover: string;
  duration: string; // display duration
  mood: string;
}

export const tracks: Track[] = [
  {
    id: "neon-drift",
    index: "01",
    title: "Neon Drift",
    src: "/track-01.mp3",
    cover: "/cover-neon-drift.png",
    duration: "3:24",
    mood: "Synthwave drive — magenta light trails, night highway energy",
  },
  {
    id: "static-bloom",
    index: "02",
    title: "Static Bloom",
    src: "/track-02.mp3",
    cover: "/cover-static-bloom.png",
    duration: "4:02",
    mood: "Dark ambient — plasma petals, slow unfurling textures",
  },
  {
    id: "midnight-compile",
    index: "03",
    title: "Midnight Compile",
    src: "/track-03.mp3",
    cover: "/cover-midnight-compile.png",
    duration: "3:47",
    mood: "Lo-fi late-night coding — data rain, terminal glow",
  },
  {
    id: "latency-zero",
    index: "04",
    title: "Latency Zero",
    src: "/track-04.mp3",
    cover: "/cover-latency-zero.png",
    duration: "3:15",
    mood: "High-energy EDM — tachyon burst, zero ping euphoria",
  },
  {
    id: "signal-lost",
    index: "05",
    title: "Signal Lost",
    src: "/track-05.mp3",
    cover: "/cover-signal-lost.png",
    duration: "4:38",
    mood: "Melancholic sci-fi — a transmission fading into deep space",
  },
];
