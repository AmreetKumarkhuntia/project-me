// src/hooks/useReducedMotion.ts — live prefers-reduced-motion subscription
import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void): () => void {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getSnapshot(): boolean {
  return window.matchMedia(QUERY).matches;
}

export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot);
}
