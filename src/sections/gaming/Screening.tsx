// src/sections/gaming/Screening.tsx — S2 the screening wall: real uploads from
// the YouTube channel in a framed vitrine panel. Click a row to swap the
// featured player; everything renders from src/data/videos.ts.
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";
import { videos, videoChannel } from "@/data/videos";
import { gamingContent } from "@/data/pages/gaming";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Screening() {
  const [activeId, setActiveId] = useState(videos[0]?.id ?? "");
  const active = videos.find((v) => v.id === activeId) ?? videos[0];

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

        {/* the reel — click a row to swap the featured player */}
        <ul role="list" className="mt-4">
          {videos.map((video, i) => {
            const isActive = video.id === active.id;
            return (
              <motion.li
                key={video.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
                className="hairline-t"
              >
                <button
                  type="button"
                  onClick={() => setActiveId(video.id)}
                  data-cursor="PLAY"
                  aria-current={isActive || undefined}
                  className={`group relative grid w-full grid-cols-12 items-center gap-4 py-4 text-left transition-colors duration-500 hover:bg-bg-3 ${
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
                  <span className="col-span-2 pl-4 font-mono text-micro text-ink-faint sm:col-span-1">
                    V.{video.index}
                  </span>
                  <span className="col-span-7 flex items-center gap-3 sm:col-span-8">
                    <span
                      aria-hidden
                      className={`hidden h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-500 sm:flex ${
                        isActive
                          ? "border-chartreuse text-chartreuse"
                          : "border-hairline-strong text-ink-dim group-hover:border-chartreuse group-hover:text-chartreuse"
                      }`}
                    >
                      <Play size={11} className="ml-0.5" />
                    </span>
                    <span
                      className={`font-display text-[17px] leading-snug md:text-[19px] ${
                        isActive ? "italic text-chartreuse" : "text-ink"
                      }`}
                    >
                      {video.title}
                    </span>
                  </span>
                  <span className="col-span-3 pr-4 text-right font-mono text-micro-10 uppercase text-ink-faint">
                    {video.published} · {video.duration}
                  </span>
                </button>
              </motion.li>
            );
          })}
        </ul>
      </motion.div>
    </section>
  );
}
