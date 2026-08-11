// src/sections/music/AlbumWall.tsx — S2 "The Wall": the discography as an
// exhibition — album rows expand into their track lists (music.md §S2,
// reshaped for a full catalogue). Long collections paginate. Everything
// renders from src/data/tracks.ts; playback flows through AudioProvider.
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play, Plus } from "lucide-react";
import { albums } from "@/data/tracks";
import type { Album, Track } from "@/types";
import { useAudio } from "@/hooks/useAudio";
import FreqBars from "@/components/music/FreqBars";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const PAGE_SIZE = 8;

const pad2 = (n: number) => String(n).padStart(2, "0");

interface AlbumWallProps {
  onQueue: (track: Track) => void;
  queuedIds: string[];
}

export default function AlbumWall({ onQueue, queuedIds }: AlbumWallProps) {
  const { currentTrack, isPlaying, play, pause } = useAudio();
  const [openId, setOpenId] = useState<string | null>(albums[0]?.id ?? null);
  const [pages, setPages] = useState<Record<string, number>>({});

  const handleTrackClick = (track: Track) => {
    if (currentTrack?.id === track.id && isPlaying) pause();
    else play(track);
  };

  const setPage = (albumId: string, page: number) =>
    setPages((p) => ({ ...p, [albumId]: page }));

  return (
    <section aria-label="The Wall — discography" className="pb-32">
      <div className="mx-auto max-w-[1440px] px-gutter">
        <ul role="list">
          {albums.map((album) => {
            const open = openId === album.id;
            const playingHere = album.tracks.some((t) => t.id === currentTrack?.id);
            return (
              <motion.li
                key={album.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.9, ease: EASE }}
                className="hairline-t last:border-b last:border-b-hairline"
              >
                {/* album row */}
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : album.id)}
                  aria-expanded={open}
                  data-cursor="OPEN"
                  className={`group relative grid w-full grid-cols-12 items-center gap-4 py-6 text-left transition-colors duration-500 hover:bg-bg-2 ${
                    open ? "bg-bg-2" : ""
                  }`}
                >
                  {playingHere && isPlaying && (
                    <span
                      aria-hidden
                      className="absolute left-0 top-0 h-full w-[3px] bg-chartreuse"
                    />
                  )}
                  <div className="col-span-3 pl-4 sm:col-span-2 sm:pl-6">
                    <div className="h-[72px] w-[72px] overflow-hidden border border-hairline-strong bg-bg-2 p-1 sm:h-[96px] sm:w-[96px]">
                      <img
                        src={album.cover}
                        alt={`${album.title} cover art`}
                        className="h-full w-full object-cover transition-transform duration-700 ease-gallery group-hover:scale-[1.06]"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="col-span-6 sm:col-span-7">
                    <p
                      className={`font-display text-title-s leading-tight transition-all duration-500 ${
                        open ? "italic text-chartreuse" : "text-ink group-hover:italic"
                      }`}
                    >
                      {album.title}
                    </p>
                    <p className="mt-1 font-display text-[15px] italic text-ink-dim">
                      {album.kind === "album" ? "album" : "singles"} · {album.year}
                    </p>
                    <p className="mt-2 font-mono text-micro-10 uppercase text-ink-faint">
                      {album.note}
                    </p>
                  </div>
                  <div className="col-span-3 flex items-center justify-end gap-5 pr-4 sm:pr-6">
                    <Plus
                      size={18}
                      aria-hidden
                      className={`text-ink-faint transition-transform duration-500 ease-gallery ${
                        open ? "rotate-45 text-chartreuse" : "group-hover:text-ink"
                      }`}
                    />
                  </div>
                </button>

                {/* expanded track list */}
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      key="tracks"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.6, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <AlbumTracks
                        album={album}
                        page={pages[album.id] ?? 0}
                        onPage={(p) => setPage(album.id, p)}
                        currentTrackId={currentTrack?.id}
                        isPlaying={isPlaying}
                        onTrack={handleTrackClick}
                        onQueue={onQueue}
                        queuedIds={queuedIds}
                      />
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

interface AlbumTracksProps {
  album: Album;
  page: number;
  onPage: (page: number) => void;
  currentTrackId?: string;
  isPlaying: boolean;
  onTrack: (track: Track) => void;
  onQueue: (track: Track) => void;
  queuedIds: string[];
}

function AlbumTracks({
  album,
  page,
  onPage,
  currentTrackId,
  isPlaying,
  onTrack,
  onQueue,
  queuedIds,
}: AlbumTracksProps) {
  const pageCount = Math.ceil(album.tracks.length / PAGE_SIZE);
  const safePage = Math.min(page, pageCount - 1);
  const visible = album.tracks.slice(safePage * PAGE_SIZE, (safePage + 1) * PAGE_SIZE);

  return (
    <div className="bg-bg-2 px-4 pb-6 sm:px-10">
      <ul role="list">
        {visible.map((track, i) => {
          const isActive = currentTrackId === track.id;
          const queued = queuedIds.includes(track.id);
          const number = safePage * PAGE_SIZE + i + 1;
          return (
            <li key={track.id} className="hairline-t first:border-t-0">
              <div className="group grid grid-cols-12 items-center gap-4 py-3">
                <span className="col-span-2 font-mono text-micro-10 text-ink-faint sm:col-span-1">
                  T.{pad2(number)}
                </span>
                <button
                  type="button"
                  onClick={() => onTrack(track)}
                  data-cursor="LISTEN"
                  aria-label={`${isActive && isPlaying ? "Pause" : "Play"} ${track.title}`}
                  aria-pressed={isActive && isPlaying}
                  className="col-span-7 flex items-center gap-3 text-left sm:col-span-8"
                >
                  <span
                    aria-hidden
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-500 ${
                      isActive && isPlaying
                        ? "border-chartreuse text-chartreuse"
                        : "border-hairline-strong text-ink-dim group-hover:border-chartreuse group-hover:text-chartreuse"
                    }`}
                  >
                    {isActive && isPlaying ? (
                      <Pause size={11} />
                    ) : (
                      <Play size={11} className="ml-0.5" />
                    )}
                  </span>
                  {album.kind === "singles" && (
                    <img
                      src={track.cover}
                      alt=""
                      loading="lazy"
                      className="hidden h-9 w-9 border border-hairline object-cover sm:block"
                    />
                  )}
                  <span className="min-w-0">
                    <span
                      className={`block truncate font-sans text-[15px] md:text-[16px] ${
                        isActive ? "text-chartreuse" : "text-ink-dim group-hover:text-ink"
                      }`}
                    >
                      {track.title}
                    </span>
                    {album.kind === "singles" && (
                      <span className="mt-0.5 block font-mono text-micro-10 uppercase text-ink-faint">
                        {track.year} · {track.genre}
                      </span>
                    )}
                  </span>
                  {isActive && isPlaying && (
                    <FreqBars bars={6} live opacity={0.8} className="h-4 w-7 shrink-0" />
                  )}
                </button>
                <span className="col-span-3 flex items-center justify-end gap-4 sm:col-span-3">
                  <span className="font-mono text-micro-10 text-ink-faint">{track.duration}</span>
                  <button
                    type="button"
                    disabled={queued}
                    onClick={() => onQueue(track)}
                    aria-label={queued ? `${track.title} queued` : `Add ${track.title} to queue`}
                    className="flex h-7 w-7 items-center justify-center border border-hairline-strong text-ink-dim transition-colors duration-500 hover:border-chartreuse hover:text-chartreuse disabled:cursor-default disabled:border-hairline disabled:text-ink-faint"
                  >
                    <Plus size={11} aria-hidden />
                  </button>
                </span>
              </div>
            </li>
          );
        })}
      </ul>

      {/* pagination — only when the collection overflows a page */}
      {pageCount > 1 && (
        <div className="hairline-t mt-2 flex items-center justify-between pt-4">
          <button
            type="button"
            onClick={() => onPage(Math.max(0, safePage - 1))}
            disabled={safePage === 0}
            aria-label="Previous page"
            className="flex h-8 w-8 items-center justify-center border border-hairline-strong text-ink-dim transition-colors duration-500 hover:border-chartreuse hover:text-chartreuse disabled:cursor-default disabled:border-hairline disabled:text-ink-faint"
          >
            <ChevronLeft size={13} aria-hidden />
          </button>
          <span className="font-mono text-micro-10 uppercase text-ink-faint">
            Page {pad2(safePage + 1)} — {pad2(pageCount)}
          </span>
          <button
            type="button"
            onClick={() => onPage(Math.min(pageCount - 1, safePage + 1))}
            disabled={safePage >= pageCount - 1}
            aria-label="Next page"
            className="flex h-8 w-8 items-center justify-center border border-hairline-strong text-ink-dim transition-colors duration-500 hover:border-chartreuse hover:text-chartreuse disabled:cursor-default disabled:border-hairline disabled:text-ink-faint"
          >
            <ChevronRight size={13} aria-hidden />
          </button>
        </div>
      )}
    </div>
  );
}
