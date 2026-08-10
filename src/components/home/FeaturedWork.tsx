// src/components/home/FeaturedWork.tsx — S4 featured project teaser (home.md)
import { Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import Pill from "@/components/Pill";
import { projects } from "@/data/projects";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function FeaturedWork() {
  const featured = projects[0]!; // Video Clipper

  return (
    <section
      className="mx-auto max-w-[1440px] py-24 md:py-36"
      style={{ paddingInline: "clamp(24px, 6vw, 96px)" }}
      aria-label="Selected work"
    >
      <SectionHeader index="04" label="SELECTED WORK" note="FULL EXHIBITION → /WORK" />

      <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* left: meta + name + summary + pills */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <p className="micro-label">
            {featured.category} · {featured.year}
          </p>
          <h3 className="mt-4 font-display text-display-m leading-display-m text-ink">
            {featured.title}
          </h3>
          <p className="mt-6 max-w-[52ch] font-sans text-[16px] leading-body text-ink-dim">
            {featured.problem} {featured.built}
          </p>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
            variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.3 } } }}
            className="mt-8 flex flex-wrap gap-2"
          >
            {featured.stack.map((s) => (
              <motion.span
                key={s}
                variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } }}
              >
                <Pill label={s} />
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* right: impact stat + repo link */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="flex flex-col items-start justify-center gap-6 lg:items-end lg:text-right"
        >
          <div>
            <p className="font-display text-display-l italic leading-[1.0] text-chartreuse">Top 10</p>
            <p className="micro-label mt-3">Ranked segments per run</p>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <a
              href={featured.links[0]?.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 font-mono text-micro uppercase text-chartreuse transition-opacity hover:opacity-70"
            >
              View repository <ArrowUpRight size={14} />
            </a>
            <Link
              to="/work"
              className="flex items-center gap-1.5 font-mono text-micro uppercase text-ink-faint transition-colors hover:text-ink"
            >
              All work <ArrowUpRight size={14} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
