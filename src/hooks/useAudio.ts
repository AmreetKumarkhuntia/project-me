// src/hooks/useAudio.ts — consume the shared audio player
import { useContext } from "react";
import { AudioPlayerContext } from "@/providers/audioContext";
import type { AudioState } from "@/types";

export function useAudio(): AudioState {
  const ctx = useContext(AudioPlayerContext);
  if (!ctx) throw new Error("useAudio must be used inside <AudioProvider>");
  return ctx;
}
