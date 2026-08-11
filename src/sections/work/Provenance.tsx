// src/sections/work/Provenance.tsx — S4 scroll-scrubbed experience timeline (work.md §S4)
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";
import { education, experience } from "@/data/experience";
import { workContent } from "@/data/pages/work";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Provenance() {
  const listRef = useRef<HTMLDivElement>(null);

  // spine draws + dot rides with scroll progress through the entries
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 80%", "end 60%"],
  });
  const spineScaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.6 });
  const dotTop = useTransform(spineScaleY, [0, 1], ["0%", "100%"]);

  return (
    <section
      className="mx-auto max-w-[1440px] pt-24 md:pt-36 px-gutter"
      aria-label="Provenance — experience"
    >
      <SectionHeader
        index={workContent.provenance.label.number}
        label={workContent.provenance.label.text}
      />

      <div ref={listRef} className="relative mt-4 pl-6 md:pl-10">
        {/* spine hairline, drawn vertically with scroll (scaleY scrub) */}
        <motion.span
          aria-hidden
          style={{ scaleY: spineScaleY }}
          className="absolute bottom-0 left-0 top-0 w-px origin-top bg-hairline-strong"
        />
        {/* 4px accent dot riding the spine */}
        <motion.span
          aria-hidden
          style={{ top: dotTop }}
          className="absolute -left-[2px] h-1 w-1 rounded-full bg-chartreuse"
        />

        {experience.map((entry, i) => (
          <motion.div
            key={`${entry.company}-${entry.role}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.9, ease: EASE, delay: i * 0.15 }}
            className="hairline-b grid grid-cols-1 gap-4 py-10 first:border-t first:border-hairline md:grid-cols-12"
          >
            <div className="md:col-span-4">
              <p className="micro-label">{entry.period}</p>
              <p className="mt-2 font-mono text-micro uppercase text-ink">{entry.company}</p>
            </div>
            <div className="md:col-span-8">
              <h3 className="font-display text-title-s font-normal text-ink">{entry.role}</h3>
              <ul className="mt-4 space-y-2">
                {entry.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="max-w-[64ch] font-sans text-[16px] leading-body text-ink-dim"
                  >
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}

        {/* education closes the timeline */}
        {education.map((entry, i) => (
          <motion.div
            key={`${entry.institution}-${entry.degree}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.9, ease: EASE, delay: (experience.length + i) * 0.15 }}
            className="hairline-b grid grid-cols-1 gap-4 py-10 md:grid-cols-12"
          >
            <div className="md:col-span-4">
              <p className="micro-label">{entry.period}</p>
              <p className="mt-2 font-mono text-micro uppercase text-ink">{entry.institution}</p>
            </div>
            <div className="md:col-span-8">
              <h3 className="font-display text-title-s font-normal text-ink">{entry.degree}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
