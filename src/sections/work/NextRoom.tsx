// src/sections/work/NextRoom.tsx — S5 next-room band → The Listening Room (work.md §S5)
import { Link } from "react-router";
import { motion } from "framer-motion";
import { workContent } from "@/data/pages/work";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function NextRoom() {
  return (
    <section
      className="mx-auto max-w-[1440px] py-24 md:py-36"
      style={{ paddingInline: "clamp(24px, 6vw, 96px)" }}
      aria-label="Next room"
    >
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.9, ease: EASE }}
        className="hairline-t pt-10"
      >
        <p className="micro-label">{workContent.nextRoom.label}</p>
        <Link
          to={workContent.nextRoom.to}
          data-cursor="ENTER"
          className="group mt-4 inline-flex items-baseline gap-3 font-display text-display-m leading-display-m text-ink transition-colors duration-300 hover:italic hover:text-chartreuse"
        >
          {workContent.nextRoom.text}
          <span aria-hidden className="font-sans text-[0.6em] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
            ↗
          </span>
        </Link>
      </motion.div>
    </section>
  );
}
