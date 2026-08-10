// src/components/home/Wings.tsx — S3 directory of rooms (home.md)
import { useRef, useState } from "react";
import { Link } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const WINGS = [
  {
    index: "W.01",
    name: "Engineering",
    descriptor: "Resilient systems, boring deploys",
    to: "/work",
    preview: "/sculpt-bronze.png",
  },
  {
    index: "W.02",
    name: "Music",
    descriptor: "Five pieces, one listening room",
    to: "/music",
    preview: "/cover-midnight-compile.png",
  },
  {
    index: "W.03",
    name: "Gaming",
    descriptor: "A small game, framed",
    to: "/gaming",
    preview: "/sculpt-glass.png",
  },
];

export default function Wings() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const wrapRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <section
      className="mx-auto max-w-[1440px] py-24 md:py-36"
      style={{ paddingInline: "clamp(24px, 6vw, 96px)" }}
      aria-label="The wings"
    >
      <SectionHeader index="03" label="THE WINGS" />

      <div ref={wrapRef} className="relative mt-16" onMouseMove={onMove} onMouseLeave={() => setHovered(null)}>
        {WINGS.map((w, i) => (
          <motion.div
            key={w.index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.9, ease: EASE, delay: i * 0.12 }}
          >
            <Link
              to={w.to}
              data-cursor="VIEW"
              onMouseEnter={() => setHovered(i)}
              className="hairline-b group grid grid-cols-12 items-center gap-4 py-8 transition-colors duration-500 hover:bg-bg-2 md:py-10"
            >
              <span className="col-span-2 font-mono text-micro text-ink-faint md:col-span-1">
                {w.index}
              </span>
              <span className="col-span-10 font-display text-display-m leading-display-m text-ink transition-all duration-500 group-hover:translate-x-6 group-hover:italic md:col-span-7">
                {w.name}
              </span>
              <span className="col-span-9 col-start-3 flex items-center justify-between gap-4 md:col-span-4 md:col-start-auto md:justify-end">
                <span className="micro-label">{w.descriptor}</span>
                <span className="flex items-center gap-1 font-mono text-micro uppercase text-ink-faint transition-colors duration-300 group-hover:text-chartreuse">
                  Enter
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-300 group-hover:rotate-45"
                  />
                </span>
              </span>
            </Link>
          </motion.div>
        ))}

        {/* cursor-following 160px preview thumbnail */}
        <AnimatePresence>
          {hovered !== null && (
            <motion.div
              key={hovered}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="pointer-events-none absolute z-20 hidden h-40 w-40 lg:block"
              style={{ left: pos.x + 24, top: pos.y - 80 }}
              aria-hidden
            >
              <img
                src={WINGS[hovered]!.preview}
                alt=""
                className="h-full w-full border object-cover"
                style={{ borderColor: "var(--hairline-strong)" }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
