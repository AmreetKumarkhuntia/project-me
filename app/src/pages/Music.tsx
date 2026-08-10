// src/pages/Music.tsx — "The Listening Room" (design-v2 music.md)
// S1 room header + ceramic waveform sculpture · S2 the Wall (5 playable
// pieces) · S3 persistent player bar · S4 notes · S5 next-room band.
import { useCallback, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Track } from "@/data/tracks";
import MusicHero from "@/sections/music/MusicHero";
import TrackWall from "@/sections/music/TrackWall";
import PlayerBar from "@/sections/music/PlayerBar";
import RoomNotes from "@/sections/music/RoomNotes";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Music() {
  // pieces explicitly added via "ADD TO QUEUE" lead the queue drawer order
  const [queuedIds, setQueuedIds] = useState<string[]>([]);
  const handleQueue = useCallback((track: Track) => {
    setQueuedIds((ids) => (ids.includes(track.id) ? ids : [...ids, track.id]));
  }, []);

  return (
    <>
      <MusicHero />
      <TrackWall onQueue={handleQueue} queuedIds={queuedIds} />
      <RoomNotes />

      {/* S5 — next-room band */}
      <section aria-label="Next room" className="pb-40">
        <div className="mx-auto max-w-[1440px]" style={{ paddingInline: "clamp(24px, 6vw, 96px)" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="hairline-t pt-16"
          >
            <p className="micro-label mb-6">NEXT ROOM —</p>
            <Link
              to="/gaming"
              data-cursor="VIEW"
              className="group inline-flex items-baseline gap-4 font-display text-display-m font-normal leading-display-m text-ink transition-colors duration-500 hover:text-chartreuse"
            >
              <span>
                The <em className="italic">Play</em> Room
              </span>
              <ArrowUpRight
                aria-hidden
                className="h-[0.7em] w-[0.7em] shrink-0 transition-transform duration-500 ease-gallery group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* S3 — persistent player (renders once playback starts, never leaves) */}
      <PlayerBar queuedIds={queuedIds} />
    </>
  );
}
