// src/data/tracks.ts — the real Amreet K catalogue (design.md §14)
// Five curated releases. `src` streams Apple's official 30-second previews
// (CORS-enabled, so the WebAudio visualizers work); `listenUrl` points at the
// full catalogue on Spotify. Swap or reorder tracks freely — the Listening
// Room renders whatever is here.
import type { Track } from "@/types";
import { spotifyArtistUrl } from "@/data/socials";

export const tracks: Track[] = [
  {
    id: "time",
    index: "01",
    title: "Time",
    src: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/ad/f2/a9/adf2a99c-8198-1923-1543-23ac25748872/mzaf_9252672469790810494.plus.aac.p.m4a",
    cover:
      "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/a3/ef/0a/a3ef0ac8-af8f-4ab8-3ae6-f83ba5d0be90/8721416091049.jpg/600x600bb.jpg",
    duration: "3:22",
    genre: "dance",
    moodNote: "CAUGHT IN BETWEEN · 2026",
    mood: "From the album Caught In Between (2026). A 30-second preview plays here — the full track lives on Spotify.",
    listenUrl: spotifyArtistUrl,
  },
  {
    id: "lucid-dreams",
    index: "02",
    title: "Lucid Dreams",
    src: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/33/6e/4d/336e4d35-7d81-3e26-dcd9-0e739600a518/mzaf_8134290586856005489.plus.aac.p.m4a",
    cover:
      "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/83/a6/c5/83a6c538-6278-76aa-4a8c-7f2210486288/8721253391722.jpg/600x600bb.jpg",
    duration: "3:26",
    genre: "dance",
    moodNote: "SINGLE · 2026",
    mood: "Single, released May 2026. A 30-second preview plays here — the full track lives on Spotify.",
    listenUrl: spotifyArtistUrl,
  },
  {
    id: "y-lock",
    index: "03",
    title: "Y Lock",
    src: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/53/76/08/53760808-c8c4-4af8-48b5-772f5415c35e/mzaf_15494187273670687969.plus.aac.p.m4a",
    cover:
      "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/17/4c/a0/174ca0ca-0937-7b82-fe52-e1c38e27229c/8721253436805.jpg/600x600bb.jpg",
    duration: "2:27",
    genre: "electronic",
    moodNote: "SINGLE · 2026",
    mood: "Single, released May 2026. A 30-second preview plays here — the full track lives on Spotify.",
    listenUrl: spotifyArtistUrl,
  },
  {
    id: "omnify",
    index: "04",
    title: "Omnify",
    src: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/17/ca/ce/17cace0b-9d51-3cb6-1e14-e3dc8d597458/mzaf_14032885888210651065.plus.aac.p.m4a",
    cover:
      "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/8c/8c/bb/8c8cbb02-7185-8df6-8bdd-21152aecf4c1/5059806796315_cover.jpg/600x600bb.jpg",
    duration: "4:01",
    genre: "electronic",
    moodNote: "ME · 2021",
    mood: "From the debut album ME (2021). A 30-second preview plays here — the full track lives on Spotify.",
    listenUrl: spotifyArtistUrl,
  },
  {
    id: "city-lights",
    index: "05",
    title: "City lights",
    src: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/c1/3d/1b/c13d1be2-6fd7-178f-7b67-8b65e098b77c/mzaf_9754457276283430192.plus.aac.p.m4a",
    cover:
      "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/8c/8c/bb/8c8cbb02-7185-8df6-8bdd-21152aecf4c1/5059806796315_cover.jpg/600x600bb.jpg",
    duration: "3:22",
    genre: "electronic",
    moodNote: "ME · 2021",
    mood: "From the debut album ME (2021). A 30-second preview plays here — the full track lives on Spotify.",
    listenUrl: spotifyArtistUrl,
  },
];
