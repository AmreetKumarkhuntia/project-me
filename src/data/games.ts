// src/data/games.ts — favorite games (design-v2 §10, The Play Room)
// Placeholder favorites — swap in real games, ranks and hours.

export interface Game {
  id: string;
  title: string; // TODO_EDIT: real game title
  genre: string;
  cover: string;
  rank: string; // TODO_EDIT: real rank
  hours: string; // TODO_EDIT: real hours
  blurb: string; // TODO_EDIT: real blurb
}

export const games: Game[] = [
  {
    id: "game-1",
    title: "UNTITLED DARK FANTASY", // TODO_EDIT
    genre: "Dark Fantasy RPG",
    cover: "/game-cover-1.png",
    rank: "NG+3", // TODO_EDIT
    hours: "340H", // TODO_EDIT
    blurb: "A brooding world that punishes haste and rewards patience. Where I learned that every system has a rhythm.", // TODO_EDIT
  },
  {
    id: "game-2",
    title: "UNTITLED PUZZLE", // TODO_EDIT
    genre: "Puzzle Game",
    cover: "/game-cover-2.png",
    rank: "100% COMPLETION", // TODO_EDIT
    hours: "85H", // TODO_EDIT
    blurb: "Impossible architecture, elegant rules. Proof that constraint is the highest form of design.", // TODO_EDIT
  },
  {
    id: "game-3",
    title: "UNTITLED SPACE SIM", // TODO_EDIT
    genre: "Space Sim",
    cover: "/game-cover-3.png",
    rank: "ELITE", // TODO_EDIT
    hours: "190H", // TODO_EDIT
    blurb: "Long quiet hauls between stations. The closest thing to meditation with a throttle.", // TODO_EDIT
  },
  {
    id: "game-4",
    title: "UNTITLED STRATEGY", // TODO_EDIT
    genre: "Strategy Game",
    cover: "/game-cover-4.png",
    rank: "MASTER TIER", // TODO_EDIT
    hours: "260H", // TODO_EDIT
    blurb: "Six turns ahead or dead on arrival. Tradeoffs, positioning, and the beauty of a clean line of play.", // TODO_EDIT
  },
];
