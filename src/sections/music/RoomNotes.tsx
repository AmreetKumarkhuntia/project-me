// src/sections/music/RoomNotes.tsx — S4 "About the room" editorial strip
// (music.md §S4): hairline top, 6/6 split.
import { motion } from "framer-motion";
import { musicContent } from "@/data/pages/music";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function RoomNotes() {
  return (
    <section aria-label="Notes about the room" className="pb-32">
      <div
        className="hairline-t mx-auto grid max-w-[1440px] grid-cols-1 gap-10 pt-16 md:grid-cols-12 px-gutter"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="md:col-span-6"
        >
          <p className="micro-label mb-6">
            — <span className="text-chartreuse">{musicContent.notes.label.number}</span> /{" "}
            {musicContent.notes.label.text}
          </p>
          <p className="font-display text-title-s italic leading-snug text-ink">
            {musicContent.notes.quote}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.12 }}
          className="md:col-span-6"
        >
          <p className="max-w-[52ch] font-sans text-[16px] leading-body text-ink-dim">
            {musicContent.notes.body}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
