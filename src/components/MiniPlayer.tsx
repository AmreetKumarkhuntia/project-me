// src/components/MiniPlayer.tsx — global mini-player, gallery language (design-v2 §7)
// Consumes AudioProvider — do not change its logic/API.
import { useLocation, useNavigate } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Pause, Play, SkipForward, Maximize2 } from "lucide-react";
import { useAudio } from "@/hooks/useAudio";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function MiniPlayer() {
  const { currentTrack, isPlaying, toggle, next } = useAudio();
  const location = useLocation();
  const navigate = useNavigate();

  const show = currentTrack !== null && location.pathname !== "/music";

  return (
    <AnimatePresence>
      {show && currentTrack && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="fixed bottom-5 right-5 z-[60] flex items-center gap-3 border bg-bg-2 py-2 pl-2 pr-3 border-hairline-strong"
          data-cursor="LISTEN"
        >
          <img src={currentTrack.cover} alt="" className="h-9 w-9 object-cover" />
          <div className="hidden flex-col leading-tight sm:flex">
            <span className="font-mono text-micro uppercase text-ink">{currentTrack.title}</span>
            <span className="mt-0.5 font-mono text-micro-10 uppercase text-ink-faint">
              {isPlaying ? "Now playing" : "Paused"}
            </span>
          </div>
          <button
            type="button"
            onClick={toggle}
            aria-label={isPlaying ? "Pause" : "Play"}
            className="flex h-8 w-8 items-center justify-center text-chartreuse transition-colors hover:text-ink"
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next track"
            className="flex h-8 w-8 items-center justify-center text-ink-faint transition-colors hover:text-chartreuse"
          >
            <SkipForward size={14} />
          </button>
          <button
            type="button"
            onClick={() => navigate("/music")}
            aria-label="Open the Listening Room"
            className="flex h-8 w-8 items-center justify-center text-ink-faint transition-colors hover:text-chartreuse"
          >
            <Maximize2 size={13} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
