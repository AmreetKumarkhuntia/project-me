// src/sections/music/MusicHero.tsx — S1 room header (music.md §S1)
// The ceramic waveform renders full-viewport in SceneBackdrop (Layout); this
// header floats the headline and the museum plaque above it.
import { motion } from "framer-motion";
import GalleryPlaque from "@/components/GalleryPlaque";
import WordReveal from "@/components/home/WordReveal";
import { musicContent } from "@/data/pages/music";
import { toMaskWords } from "@/lib/headline";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function MusicHero() {
  return (
    <section className="relative pt-[160px]" aria-label="The Listening Room">
      <div
        className="mx-auto grid max-w-[1440px] grid-cols-1 gap-16 pb-24 lg:min-h-[65svh] lg:grid-cols-12 lg:items-center px-gutter"
      >
        {/* left (8 cols): section number + headline + sub */}
        <div className="lg:col-span-8">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.9, ease: EASE }}
            className="micro-label mb-8"
          >
            — <span className="text-chartreuse">{musicContent.hero.label.number}</span> /{" "}
            {musicContent.hero.label.text}
          </motion.p>

          <h1 className="font-display text-display-l font-normal leading-[1.0] text-ink">
            <WordReveal
              words={toMaskWords(musicContent.hero.headline[0] ?? [])}
              baseDelay={0.55}
              stagger={0.06}
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 1.0, ease: EASE }}
            className="mt-10 max-w-[44ch] font-sans text-[16px] leading-body text-ink-dim md:text-[17px]"
          >
            {musicContent.hero.sub}
          </motion.p>
        </div>

        {/* right (4 cols): museum plaque labeling the backdrop sculpture */}
        <div className="flex justify-center lg:col-span-4 lg:justify-end lg:self-end lg:pb-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.9, ease: EASE }}
          >
            <GalleryPlaque
              title={musicContent.hero.plaque.title}
              medium={musicContent.hero.plaque.medium}
              year={musicContent.hero.plaque.year}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
