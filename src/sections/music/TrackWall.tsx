// src/sections/music/TrackWall.tsx — S2 "The Wall": five playable pieces,
// hairline-separated exhibition rows (music.md §S2). Everything rendered here
// comes from src/data/tracks.ts.
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Pause, Play, Plus } from "lucide-react";
import { tracks } from "@/data/tracks";
import type { Track } from "@/types";
import { useAudio } from "@/hooks/useAudio";
import FreqBars from "@/components/music/FreqBars";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface TrackWallProps {
  onQueue: (track: Track) => void;
  queuedIds: string[];
}

export default function TrackWall({ onQueue, queuedIds }: TrackWallProps) {
  const { currentTrack, isPlaying, play, pause } = useAudio();
  const [openId, setOpenId] = useState<string | null>(null);

  const handleRowClick = (track: Track) => {
    if (currentTrack?.id === track.id && isPlaying) pause();
    else play(track);
  };

  return (
    <section aria-label="The Wall — five pieces" className="pb-32">
      <div className="mx-auto max-w-[1440px] px-gutter">
        <ul role="list">
          {tracks.map((track, i) => {
            const isActive = currentTrack?.id === track.id;
            const open = openId === track.id;
            const queued = queuedIds.includes(track.id);

            return (
              <motion.li
                key={track.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.9, ease: EASE, delay: i * 0.1 }}
                className="hairline-t last:border-b last:border-b-hairline"
              >
                {/* row */}
                <div
                  role="button"
                  tabIndex={0}
                  data-cursor="LISTEN"
                  aria-label={`${isActive && isPlaying ? "Pause" : "Play"} ${track.title}`}
                  aria-pressed={isActive && isPlaying}
                  onClick={() => handleRowClick(track)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleRowClick(track);
                    }
                  }}
                  className={`group relative grid cursor-pointer grid-cols-12 items-center gap-4 py-6 transition-colors duration-500 hover:bg-bg-2 ${
                    isActive ? "bg-bg-2" : ""
                  }`}
                >
                  {/* active accent bar — draws top→bottom on track change */}
                  {isActive && (
                    <motion.span
                      layoutId="trackwall-active-bar"
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="absolute left-0 top-0 h-full w-[3px] origin-top bg-chartreuse"
                      aria-hidden
                    />
                  )}

                  {/* index */}
                  <span className="col-span-2 pl-4 font-mono text-micro text-ink-faint sm:col-span-1 sm:pl-6">
                    T.{track.index}
                  </span>

                  {/* cover / live mini visualizer */}
                  <div className="col-span-3 sm:col-span-2 md:col-span-1">
                    <div
                      className="relative h-[72px] w-[72px] overflow-hidden border bg-bg-2 p-1 sm:h-[96px] sm:w-[96px] border-hairline-strong"
                    >
                      <img
                        src={track.cover}
                        alt={`${track.title} cover art`}
                        className={`h-full w-full object-cover transition-all duration-700 ease-gallery ${
                          isActive ? "opacity-30" : "opacity-100 group-hover:scale-[1.06]"
                        }`}
                        loading="lazy"
                      />
                      {isActive && (
                        <FreqBars
                          bars={10}
                          live={isPlaying}
                          opacity={0.6}
                          className="absolute inset-1 h-[calc(100%-8px)] w-[calc(100%-8px)]"
                        />
                      )}
                    </div>
                  </div>

                  {/* title + genre */}
                  <div className="col-span-7 sm:col-span-5">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.p
                        key={isActive ? "active" : "idle"}
                        initial={{ opacity: 0.4 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, ease: EASE }}
                        className={`font-display text-title-s leading-tight ${
                          isActive ? "italic text-chartreuse" : "text-ink"
                        }`}
                      >
                        {track.title}
                      </motion.p>
                    </AnimatePresence>
                    <p className="mt-1 font-display text-[15px] italic text-ink-dim">{track.genre}</p>
                  </div>

                  {/* mood note */}
                  <span className="col-span-3 hidden font-mono text-micro-10 uppercase text-ink-faint lg:block">
                    {track.moodNote}
                  </span>

                  {/* duration + controls */}
                  <div className="col-span-12 flex items-center justify-end gap-5 pr-4 sm:col-span-4 md:col-span-3 sm:pr-6">
                    <span className="font-mono text-micro text-ink-faint">{track.duration}</span>
                    <span
                      aria-hidden
                      className={`flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-500 ${
                        isActive && isPlaying
                          ? "border-chartreuse text-chartreuse"
                          : "border-hairline-strong text-ink-dim group-hover:border-chartreuse group-hover:text-chartreuse"
                      }`}
                    >
                      {isActive && isPlaying ? (
                        <Pause size={15} />
                      ) : (
                        <Play size={15} className="ml-0.5" />
                      )}
                    </span>
                    <button
                      type="button"
                      aria-label={open ? `Close details for ${track.title}` : `Open details for ${track.title}`}
                      aria-expanded={open}
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenId(open ? null : track.id);
                      }}
                      className="flex h-8 w-8 items-center justify-center text-ink-faint transition-all duration-500 hover:text-ink"
                    >
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-500 ease-gallery ${open ? "rotate-180" : ""}`}
                      />
                    </button>
                  </div>
                </div>

                {/* expandable detail strip */}
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      key="detail"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.6, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-1 gap-8 bg-bg-2 px-6 py-8 sm:px-10 md:grid-cols-12 md:items-center">
                        <div className="md:col-span-6">
                          <FreqBars
                            bars={48}
                            live={isActive && isPlaying}
                            opacity={0.5}
                            className="h-24 w-full"
                          />
                        </div>
                        <div className="md:col-span-4">
                          <p className="font-mono text-micro-10 uppercase text-ink-faint">
                            {track.moodNote}
                          </p>
                          <p className="mt-3 font-sans text-[15px] leading-body text-ink-dim">
                            {track.mood}
                          </p>
                        </div>
                        <div className="flex flex-col items-start gap-4 md:col-span-2 md:items-end md:justify-self-end">
                          <button
                            type="button"
                            disabled={queued}
                            onClick={() => onQueue(track)}
                            className="flex items-center gap-2 border px-5 py-2.5 font-mono text-micro uppercase text-ink transition-colors duration-500 hover:border-chartreuse hover:text-chartreuse disabled:cursor-default disabled:text-ink-faint border-hairline-strong"
                          >
                            <Plus size={12} aria-hidden />
                            {queued ? "Queued" : "Add to queue"}
                          </button>
                          <a
                            href={track.listenUrl}
                            target="_blank"
                            rel="noreferrer"
                            data-cursor="LISTEN"
                            className="font-mono text-micro-10 uppercase text-chartreuse transition-opacity hover:opacity-70"
                          >
                            Full track <span aria-hidden>↗</span>
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
