// src/sections/work/WingHeader.tsx — S1 wing header: headline over the backdrop sculpture (work.md §S1)
// The bronze scene renders full-viewport in SceneBackdrop (Layout); this
// header floats the headline and the museum plaque above it.
import { motion } from "framer-motion";
import GalleryPlaque from "@/components/GalleryPlaque";
import WordReveal from "@/components/home/WordReveal";
import { workContent } from "@/data/pages/work";
import { toMaskWords } from "@/lib/headline";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function WingHeader() {
  return (
    <section
      aria-label="The Engineering Wing"
      className="mx-auto max-w-[1440px] pt-8 md:pt-24 px-gutter"
    >
      <div className="grid grid-cols-1 items-center gap-12 lg:min-h-[70svh] lg:grid-cols-12">
        {/* left (8): label + headline + sub-line */}
        <div className="lg:col-span-8">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.9, ease: EASE }}
            className="micro-label mb-8"
          >
            — <span className="text-chartreuse">{workContent.hero.label.number}</span> /{" "}
            {workContent.hero.label.text}
          </motion.p>

          <h1 className="font-display text-display-l font-normal leading-[1.0] text-ink">
            {workContent.hero.headline.map((line, i) => (
              <span key={i} className="block">
                <WordReveal words={toMaskWords(line)} baseDelay={0.3 + i * 0.12} />
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1.0, ease: EASE }}
            className="mt-10 max-w-[44ch] font-sans text-[16px] leading-body text-ink-dim md:text-[17px]"
          >
            {workContent.hero.sub}
          </motion.p>
        </div>

        {/* right (4): museum plaque labeling the backdrop sculpture */}
        <div className="flex justify-center lg:col-span-4 lg:justify-end lg:self-end lg:pb-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.9, ease: EASE }}
          >
            <GalleryPlaque
              title={workContent.hero.plaque.title}
              medium={workContent.hero.plaque.medium}
              year={workContent.hero.plaque.year}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
