// src/data/placeholders.ts — THE single source for every not-yet-real value.
// Only the Play Room shelf games remain placeholders; social and project
// links are real (see src/data/socials.ts and src/data/projects.ts).
import type { Game } from "@/types";

/** Placeholder favorites for the Play Room shelf — swap in real games, ranks and hours. */
export const placeholderGames: Game[] = [
  {
    id: "game-1",
    title: "UNTITLED DARK FANTASY",
    genre: "Dark Fantasy RPG",
    cover: "/game-cover-1.webp",
    rank: "NG+3",
    hours: "340H",
    blurb: "A brooding world that punishes haste and rewards patience. Where I learned that every system has a rhythm.",
  },
  {
    id: "game-2",
    title: "UNTITLED PUZZLE",
    genre: "Puzzle Game",
    cover: "/game-cover-2.webp",
    rank: "100% COMPLETION",
    hours: "85H",
    blurb: "Impossible architecture, elegant rules. Proof that constraint is the highest form of design.",
  },
  {
    id: "game-3",
    title: "UNTITLED SPACE SIM",
    genre: "Space Sim",
    cover: "/game-cover-3.webp",
    rank: "ELITE",
    hours: "190H",
    blurb: "Long quiet hauls between stations. The closest thing to meditation with a throttle.",
  },
  {
    id: "game-4",
    title: "UNTITLED STRATEGY",
    genre: "Strategy Game",
    cover: "/game-cover-4.webp",
    rank: "MASTER TIER",
    hours: "260H",
    blurb: "Six turns ahead or dead on arrival. Tradeoffs, positioning, and the beauty of a clean line of play.",
  },
];
