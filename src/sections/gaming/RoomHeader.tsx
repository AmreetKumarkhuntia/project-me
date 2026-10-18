// src/sections/gaming/RoomHeader.tsx — S1 room header (gaming-v2 §S1)
// The frosted-glass polyhedron renders full-viewport in SceneBackdrop
// (Layout); this header floats the headline and the museum plaque above it.
import { motion } from "framer-motion";
import GalleryPlaque from "@/components/GalleryPlaque";
import WordReveal from "@/components/home/WordReveal";
import { gamingContent } from "@/data/pages/gaming";
import { toMaskWords } from "@/lib/headline";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function RoomHeader() {
  return (
    <section
      className="mx-auto max-w-[1440px] pt-24 md:pt-40 px-gutter"
      aria-label="The Play Room"
    >
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
        {/* left (8 cols): label + Display L + sub */}
        <div className="lg:col-span-8">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.9, ease: EASE }}
            className="micro-label mb-8"
          >
            — <span className="text-chartreuse">{gamingContent.hero.label.number}</span> /{" "}
            {gamingContent.hero.label.text}
          </motion.p>

          <h1 className="font-display text-display-l font-normal leading-[1.0] text-ink">
            <WordReveal words={toMaskWords(gamingContent.hero.headline[0] ?? [])} baseDelay={0.5} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 1.0, ease: EASE }}
            className="mt-8 max-w-[44ch] font-sans text-[16px] leading-body text-ink-dim md:text-[17px]"
          >
            {gamingContent.hero.sub}
          </motion.p>
        </div>

        {/* right (4 cols): museum plaque labeling the backdrop sculpture */}
        <div className="flex justify-center lg:col-span-4 lg:justify-end lg:self-end">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.9, ease: EASE }}
          >
            <GalleryPlaque
              title={gamingContent.hero.plaque.title}
              medium={gamingContent.hero.plaque.medium}
              year={gamingContent.hero.plaque.year}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
