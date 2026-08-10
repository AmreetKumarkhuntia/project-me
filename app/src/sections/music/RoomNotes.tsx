// src/sections/music/RoomNotes.tsx — S4 "About the room" editorial strip
// (music.md §S4): hairline top, 6/6 split.
import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function RoomNotes() {
  return (
    <section aria-label="Notes about the room" className="pb-32">
      <div
        className="hairline-t mx-auto grid max-w-[1440px] grid-cols-1 gap-10 pt-16 md:grid-cols-12"
        style={{ paddingInline: "clamp(24px, 6vw, 96px)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="md:col-span-6"
        >
          <p className="micro-label mb-6">
            — <span className="text-chartreuse">02</span> / NOTES
          </p>
          <p className="font-display text-title-s italic leading-snug text-ink">
            “Made between deploys.”
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
            Every piece here was produced late at night in Bengaluru — a counterpoint to the day
            job: unpredictable on purpose. The room tone toggle lowers the lights, the way a
            gallery does for video work.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
