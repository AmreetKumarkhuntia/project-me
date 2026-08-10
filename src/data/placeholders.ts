// src/data/placeholders.ts — THE single source for every not-yet-real value.
// Replace TODO_EDIT (and the placeholder games below) with real content here;
// nothing else in src/ hard-codes a placeholder.
import type { Game } from "@/types";

export const TODO_EDIT = "TODO_EDIT";

export const placeholderLinks = {
  github: `https://github.com/${TODO_EDIT}`,
  linkedin: `https://linkedin.com/in/${TODO_EDIT}`,
  twitter: `https://twitter.com/${TODO_EDIT}`,
  /** all four project repos point here until the real URLs exist */
  projectRepo: `https://github.com/${TODO_EDIT}`,
} as const;

/** Placeholder favorites for the Play Room shelf — swap in real games, ranks and hours. */
export const placeholderGames: Game[] = [
  {
    id: "game-1",
    title: "UNTITLED DARK FANTASY",
    genre: "Dark Fantasy RPG",
    cover: "/game-cover-1.png",
    rank: "NG+3",
    hours: "340H",
    blurb: "A brooding world that punishes haste and rewards patience. Where I learned that every system has a rhythm.",
  },
  {
    id: "game-2",
    title: "UNTITLED PUZZLE",
    genre: "Puzzle Game",
    cover: "/game-cover-2.png",
    rank: "100% COMPLETION",
    hours: "85H",
    blurb: "Impossible architecture, elegant rules. Proof that constraint is the highest form of design.",
  },
  {
    id: "game-3",
    title: "UNTITLED SPACE SIM",
    genre: "Space Sim",
    cover: "/game-cover-3.png",
    rank: "ELITE",
    hours: "190H",
    blurb: "Long quiet hauls between stations. The closest thing to meditation with a throttle.",
  },
  {
    id: "game-4",
    title: "UNTITLED STRATEGY",
    genre: "Strategy Game",
    cover: "/game-cover-4.png",
    rank: "MASTER TIER",
    hours: "260H",
    blurb: "Six turns ahead or dead on arrival. Tradeoffs, positioning, and the beauty of a clean line of play.",
  },
];
