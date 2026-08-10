// src/types/game.ts — favorite-game shape + Dust Catcher phases

export interface Game {
  id: string;
  title: string;
  genre: string;
  cover: string;
  rank: string;
  hours: string;
  blurb: string;
}

export type GamePhase = "idle" | "playing" | "paused" | "gameover";
