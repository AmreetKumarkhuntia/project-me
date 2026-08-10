// src/providers/AudioProvider.tsx — global audio context (design.md §9)
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import { tracks } from "@/data/tracks";
import type { Track } from "@/data/tracks";

interface AudioState {
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

const AudioContext = createContext<AudioState | null>(null);

export function AudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ctxRef = useRef<globalThis.AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceWiredRef = useRef(false);

  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMutedState] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  // single shared <audio> element
  useEffect(() => {
    const el = new Audio();
    el.preload = "metadata";
    el.crossOrigin = "anonymous";
    audioRef.current = el;

    const onTime = () => setProgress(el.currentTime);
    const onMeta = () => setDuration(el.duration || 0);
    const onEnded = () => {
      // auto-advance
      setCurrentTrack((cur) => {
        if (!cur) return cur;
        const i = tracks.findIndex((t) => t.id === cur.id);
        const nxt = tracks[(i + 1) % tracks.length]!;
        el.src = nxt.src;
        void el.play().catch(() => setIsPlaying(false));
        return nxt;
      });
    };
    el.addEventListener("timeupdate", onTime);
    el.addEventListener("loadedmetadata", onMeta);
    el.addEventListener("ended", onEnded);
    return () => {
      el.pause();
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("loadedmetadata", onMeta);
      el.removeEventListener("ended", onEnded);
      audioRef.current = null;
    };
  }, []);

  const ensureGraph = useCallback(() => {
    const el = audioRef.current;
    if (!el || sourceWiredRef.current) return;
    try {
      const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctx) return;
      const ctx = new Ctx();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      const src = ctx.createMediaElementSource(el);
      src.connect(analyser);
      analyser.connect(ctx.destination);
      ctxRef.current = ctx;
      analyserRef.current = analyser;
      sourceWiredRef.current = true;
    } catch {
      // Web Audio unavailable — playback still works without analyser
    }
  }, []);

  const play = useCallback(
    (track: Track) => {
      const el = audioRef.current;
      if (!el) return;
      ensureGraph();
      void ctxRef.current?.resume().catch(() => undefined);
      if (currentTrack?.id !== track.id) {
        el.src = track.src;
        setCurrentTrack(track);
        setProgress(0);
      }
      void el
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    },
    [currentTrack, ensureGraph],
  );

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) pause();
    else if (currentTrack) play(currentTrack);
    else play(tracks[0]!);
  }, [isPlaying, currentTrack, play, pause]);

  const skip = useCallback(
    (dir: 1 | -1) => {
      const cur = currentTrack ?? tracks[0]!;
      const i = tracks.findIndex((t) => t.id === cur.id);
      const nxt = tracks[(i + dir + tracks.length) % tracks.length]!;
      play(nxt);
    },
    [currentTrack, play],
  );

  const next = useCallback(() => skip(1), [skip]);
  const prev = useCallback(() => skip(-1), [skip]);

  const seek = useCallback((seconds: number) => {
    const el = audioRef.current;
    if (!el) return;
    el.currentTime = seconds;
    setProgress(seconds);
  }, []);

  const setMuted = useCallback((m: boolean) => {
    setMutedState(m);
    if (audioRef.current) audioRef.current.muted = m;
  }, []);

  const getAnalyser = useCallback(() => analyserRef.current, []);

  const value = useMemo<AudioState>(
    () => ({
      currentTrack,
      isPlaying,
      muted,
      progress,
      duration,
      play,
      toggle,
      pause,
      next,
      prev,
      seek,
      setMuted,
      getAnalyser,
    }),
    [currentTrack, isPlaying, muted, progress, duration, play, toggle, pause, next, prev, seek, setMuted, getAnalyser],
  );

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
}

export function useAudio(): AudioState {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error("useAudio must be used inside <AudioProvider>");
  return ctx;
}
