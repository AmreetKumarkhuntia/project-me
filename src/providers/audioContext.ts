// src/providers/audioContext.ts — the audio context object, separated from the
// provider component so each file exports one kind of thing (fast-refresh safe)
import { createContext } from "react";
import type { AudioState } from "@/types";

export const AudioPlayerContext = createContext<AudioState | null>(null);
