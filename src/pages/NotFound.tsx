// src/pages/NotFound.tsx — 404 "missing exhibit" room. The Vercel rewrite
// serves index.html for every unknown path, so this renders inside Layout
// (navbar/footer/cursor) like any other room.
import { Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import GalleryPlaque from "@/components/GalleryPlaque";
import WordReveal from "@/components/home/WordReveal";
import { notFoundContent } from "@/data/pages/notFound";
import { toMaskWords } from "@/lib/headline";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function NotFound() {
  return (
    <section
      className="mx-auto flex min-h-[calc(100dvh-64px)] max-w-[1440px] flex-col justify-center py-24 px-gutter"
      aria-label="Page not found"
    >
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.9, ease: EASE }}
        className="micro-label mb-8"
      >
        — <span className="text-chartreuse">{notFoundContent.label.number}</span> /{" "}
        {notFoundContent.label.text}
      </motion.p>

      <h1 className="max-w-[16ch] font-display text-display-l font-normal leading-[1.0] text-ink">
        {notFoundContent.headline.map((line, i) => (
          <span key={i} className="block">
            <WordReveal words={toMaskWords(line)} baseDelay={0.4 + i * 0.12} />
          </span>
        ))}
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 1.0, ease: EASE }}
        className="mt-8 max-w-[44ch] font-sans text-[16px] leading-body text-ink-dim md:text-[17px]"
      >
        {notFoundContent.body}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.9, ease: EASE }}
        className="mt-12"
      >
        <GalleryPlaque
          title={notFoundContent.plaque.title}
          medium={notFoundContent.plaque.medium}
          year={notFoundContent.plaque.year}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.6, duration: 1.1, ease: EASE }}
        className="hairline-t mt-20 pt-10"
      >
        <p className="micro-label mb-6">{notFoundContent.returnBand.label}</p>
        <Link
          to={notFoundContent.returnBand.to}
          className="group inline-flex items-baseline gap-3 font-display text-display-m leading-display-m text-ink transition-colors duration-300 hover:text-chartreuse"
          data-cursor="VIEW"
        >
          <span>
            {notFoundContent.returnBand.pre}{" "}
            <em className="italic">{notFoundContent.returnBand.em}</em>
          </span>
          <ArrowUpRight
            aria-hidden
            className="h-[0.6em] w-[0.6em] self-center text-chartreuse transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
          />
        </Link>
      </motion.div>
    </section>
  );
}
