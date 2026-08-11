// src/components/home/Artist.tsx — S5 portrait + ethos teaser (home.md)
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { principles } from "@/data/profile";
import { homeContent } from "@/data/pages/home";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Artist() {
  const portraitRef = useRef<HTMLDivElement>(null);
  const portraitInView = useInView(portraitRef, { once: true, amount: 0.4 });
  const reduced = useReducedMotion();
  const portraitShown = reduced || portraitInView;

  return (
    <section
      className="mx-auto grid max-w-[1440px] grid-cols-1 gap-16 py-24 md:py-36 lg:grid-cols-12 px-gutter"
      aria-label="The artist"
    >
      {/* left (5 cols): framed portrait. The in-view observer sits on the
          (unclipped) column — a fully clip-path-clipped element reports a 0%
          intersection ratio, so observing the frame itself would never fire
          the reveal (and blocks the browser's lazy image load too). */}
      <div ref={portraitRef} className="lg:col-span-5">
        <motion.div
          initial={reduced ? false : { clipPath: "inset(100% 0 0 0)", scale: 1.05 }}
          animate={
            portraitShown
              ? { clipPath: "inset(0% 0 0 0)", scale: 1 }
              : { clipPath: "inset(100% 0 0 0)", scale: 1.05 }
          }
          transition={reduced ? { duration: 0 } : { duration: 1.2, ease: EASE }}
          className="border bg-bg-2 p-2 border-hairline"
        >
          <img
            src={homeContent.artist.portrait.src}
            alt={homeContent.artist.portrait.alt}
            className="aspect-[4/5] w-full object-cover"
            loading="lazy"
          />
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.9, ease: EASE }}
          className="micro-label mt-4"
        >
          {homeContent.artist.caption}
        </motion.p>
      </div>

      {/* right (7 cols): ethos quote + principles */}
      <div className="flex flex-col justify-center lg:col-span-7">
        <p className="micro-label mb-10">
          — <span className="text-chartreuse">{homeContent.artist.label.number}</span> /{" "}
          {homeContent.artist.label.text}
        </p>

        <blockquote className="font-display text-[28px] italic leading-[1.3] text-ink md:text-[40px]">
          <WordSpan text={homeContent.artist.ethos.pre} />
          <em className="italic text-chartreuse"> {homeContent.artist.ethos.accent} </em>
          <WordSpan text={homeContent.artist.ethos.post} />
        </blockquote>

        <div className="mt-16">
          {principles.map((p, i) => (
            <motion.div
              key={p.index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ delay: i * 0.12, duration: 0.8, ease: EASE }}
              className="hairline-b grid grid-cols-12 items-baseline gap-4 py-5"
            >
              <span className="col-span-2 font-mono text-micro text-ink-faint md:col-span-1">
                {p.index}
              </span>
              <span className="col-span-10 font-mono text-micro uppercase text-ink md:col-span-3">
                {p.name}
              </span>
              <span className="col-span-10 col-start-3 font-sans text-[15px] leading-body text-ink-dim md:col-span-8 md:col-start-5">
                {p.description}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** small helper: words rise with stagger inside the quote.
 * Observes its own (unclipped) wrapper \u2014 the masked words themselves never
 * intersect the viewport while fully clipped. */
function WordSpan({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const shown = reduced || inView;
  return (
    <span ref={ref}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: reduced ? "0%" : "110%" }}
            animate={{ y: shown ? "0%" : "110%" }}
            transition={reduced ? { duration: 0 } : { duration: 0.9, ease: EASE, delay: i * 0.03 }}
          >
            {w}
          </motion.span>
          {"\u00A0"}
        </span>
      ))}
    </span>
  );
}
