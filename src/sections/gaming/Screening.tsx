// src/sections/gaming/Screening.tsx — S2 the screening wall: uploads from the
// YouTube channel grouped into series sections (latest reel first). Click a
// section to expand it, click a row to swap the featured player. Everything
// renders from src/data/videos.ts.
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Play, Plus } from "lucide-react";
import { videoSections, videoChannel } from "@/data/videos";
import { gamingContent } from "@/data/pages/gaming";
import type { Video } from "@/types";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const pad2 = (n: number) => String(n).padStart(2, "0");

export default function Screening() {
  const firstVideo = videoSections[0]?.videos[0];
  const [active, setActive] = useState<Video | undefined>(firstVideo);
  const [openId, setOpenId] = useState<string | null>(videoSections[0]?.id ?? null);

  if (!active) return null;

  return (
    <section
      className="mx-auto max-w-[1440px] py-24 md:py-40 px-gutter"
      aria-label="The Screening — videos from the channel"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1.2, ease: EASE }}
        className="relative border bg-bg-2 p-4 md:p-6 border-hairline"
      >
        {/* corner plaque — the gallery's screening notice */}
        <div className="absolute -top-3 right-4 bg-bg px-3 font-mono text-micro-10 uppercase text-chartreuse md:right-6">
          {gamingContent.screening.cornerPlaque}
        </div>

        {/* header row */}
        <div className="flex flex-wrap items-end justify-between gap-4 px-1 pb-5 pt-2 md:px-2">
          <div>
            <h2 className="font-display text-title-s text-ink">{gamingContent.screening.title}</h2>
            <p className="mt-1 font-mono text-micro-10 uppercase text-ink-faint">
              {gamingContent.screening.subtitle}
            </p>
          </div>
          <a
            href={videoChannel.url}
            target="_blank"
            rel="noreferrer"
            data-cursor="VIEW"
            className="flex items-center gap-1.5 font-mono text-micro uppercase text-chartreuse transition-opacity hover:opacity-70"
          >
            {gamingContent.screening.channelLabel} <ArrowUpRight size={14} aria-hidden />
          </a>
        </div>

        {/* featured player */}
        <div className="relative aspect-video w-full overflow-hidden border border-hairline bg-bg">
          <iframe
            key={active.youtubeId}
            src={`https://www.youtube-nocookie.com/embed/${active.youtubeId}`}
            title={active.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>

        {/* series sections — single-open accordion */}
        <div className="mt-4">
          {videoSections.map((section) => {
            const open = openId === section.id;
            return (
              <div key={section.id} className="hairline-t">
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : section.id)}
                  aria-expanded={open}
                  data-cursor="OPEN"
                  className="group grid w-full grid-cols-12 items-center gap-4 py-5 text-left transition-colors duration-500 hover:bg-bg-3"
                >
                  <span className="col-span-8 flex items-baseline gap-4 pl-4 sm:col-span-6">
                    <span
                      className={`font-display text-[19px] leading-snug transition-all duration-500 md:text-[22px] ${
                        open ? "italic text-chartreuse" : "text-ink group-hover:italic"
                      }`}
                    >
                      {section.label}
                    </span>
                    <span className="hidden font-mono text-micro-10 uppercase text-ink-faint sm:inline">
                      {section.note}
                    </span>
                  </span>
                  <span className="col-span-4 flex items-center justify-end gap-5 pr-4 sm:col-span-6">
                    <span className="font-mono text-micro-10 uppercase text-ink-faint">
                      {pad2(section.videos.length)} FILMS
                    </span>
                    <Plus
                      size={16}
                      aria-hidden
                      className={`text-ink-faint transition-transform duration-500 ease-gallery ${
                        open ? "rotate-45 text-chartreuse" : "group-hover:text-ink"
                      }`}
                    />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      key="rows"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.6, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <ul role="list" className="pb-3">
                        {section.videos.map((video, i) => {
                          const isActive = video.youtubeId === active.youtubeId;
                          return (
                            <li key={video.id}>
                              <button
                                type="button"
                                onClick={() => setActive(video)}
                                data-cursor="PLAY"
                                aria-current={isActive || undefined}
                                className={`group relative grid w-full grid-cols-12 items-center gap-4 py-3 text-left transition-colors duration-500 hover:bg-bg-3 ${
                                  isActive ? "bg-bg-3" : ""
                                }`}
                              >
                                {isActive && (
                                  <motion.span
                                    layoutId="screening-active-bar"
                                    className="absolute left-0 top-0 h-full w-[3px] bg-chartreuse"
                                    aria-hidden
                                  />
                                )}
                                <span className="col-span-2 pl-6 font-mono text-micro-10 text-ink-faint sm:col-span-1">
                                  V.{pad2(i + 1)}
                                </span>
                                <span className="col-span-7 flex items-center gap-3 sm:col-span-8">
                                  <span
                                    aria-hidden
                                    className={`hidden h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-colors duration-500 sm:flex ${
                                      isActive
                                        ? "border-chartreuse text-chartreuse"
                                        : "border-hairline-strong text-ink-dim group-hover:border-chartreuse group-hover:text-chartreuse"
                                    }`}
                                  >
                                    <Play size={10} className="ml-0.5" />
                                  </span>
                                  <span
                                    className={`font-sans text-[15px] leading-snug md:text-[16px] ${
                                      isActive ? "text-chartreuse" : "text-ink-dim group-hover:text-ink"
                                    }`}
                                  >
                                    {video.title}
                                  </span>
                                </span>
                                <span className="col-span-3 pr-4 text-right font-mono text-micro-10 uppercase text-ink-faint">
                                  {video.published} · {video.duration}
                                </span>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
