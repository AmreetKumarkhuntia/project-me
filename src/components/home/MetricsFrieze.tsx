// src/components/home/MetricsFrieze.tsx — S2 "Proof in the Plaster" (home.md)
// The in-view observer sits on the (unclipped) grid: a figure that starts
// fully clipped inside its overflow-hidden mask never intersects the
// viewport, so observing the figures themselves would never fire the reveal.
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";
import { metrics } from "@/data/profile";
import { homeContent } from "@/data/pages/home";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function MetricsFrieze() {
  const gridRef = useRef<HTMLDivElement>(null);
  const inView = useInView(gridRef, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();
  const shown = reduced || inView;

  return (
    <section
      className="mx-auto max-w-[1440px] py-24 md:py-36 px-gutter"
      aria-label="Measured impact"
    >
      <SectionHeader
        index={homeContent.metrics.label.number}
        label={homeContent.metrics.label.text}
      />

      <div ref={gridRef} className="mt-16 grid grid-cols-2 lg:grid-cols-4">
        {metrics.map((m, i) => (
          <div
            key={m.figure}
            className={`relative flex flex-col items-center gap-4 border-hairline px-6 py-10 text-center ${
              i > 0 ? "lg:border-l" : ""
            } ${i % 2 === 1 ? "border-l lg:border-l" : ""}`}
          >
            <span className="inline-block overflow-hidden">
              <motion.span
                initial={{ y: reduced ? "0%" : "110%" }}
                animate={{ y: shown ? "0%" : "110%" }}
                transition={
                  reduced ? { duration: 0 } : { duration: 0.8, ease: EASE, delay: i * 0.15 }
                }
                className={`inline-block font-display text-display-m leading-display-m ${
                  m.accent ? "italic text-chartreuse" : "text-ink"
                }`}
              >
                {m.figure}
              </motion.span>
            </span>
            <span className="micro-label max-w-[22ch]">{m.caption}</span>
          </div>
        ))}
      </div>

      {/* hairlines draw horizontally */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="h-px origin-left bg-hairline"
      />
    </section>
  );
}
