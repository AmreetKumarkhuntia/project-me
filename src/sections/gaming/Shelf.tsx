// src/sections/gaming/Shelf.tsx — S3 favorite games, data-driven (gaming-v2 §S3)
import { motion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";
import { games } from "@/data/games";
import { gamingContent } from "@/data/pages/gaming";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Shelf() {
  return (
    <section
      className="mx-auto max-w-[1440px] pb-24 md:pb-40 px-gutter"
      aria-label="Favorite games"
    >
      <SectionHeader
        index={gamingContent.shelf.label.number}
        label={gamingContent.shelf.label.text}
        note={gamingContent.shelf.note}
      />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={{ show: { transition: { staggerChildren: 0.12 } } }}
        className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4"
      >
        {games.map((game, i) => (
          <motion.article
            key={game.id}
            variants={{
              hidden: { opacity: 0, y: 50 },
              show: { opacity: 1, y: 0, transition: { duration: 1.1, ease: EASE } },
            }}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="group transition-shadow duration-500 hover:shadow-[0_16px_40px_rgba(0,0,0,0.5)]"
            data-cursor="VIEW"
          >
            {/* 4:5 cover in hairline frame with 8px bg-3 mat; clip-wipe bottom→top on reveal */}
            <div className="border border-hairline bg-bg-3 p-2">
              <motion.div
                initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
                whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 1.0, ease: EASE, delay: 0.15 + i * 0.12 }}
                className="aspect-[4/5] overflow-hidden"
              >
                <img
                  src={game.cover}
                  alt={`Fine-art cover for ${game.title.toLowerCase()} — ${game.genre.toLowerCase()}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-gallery group-hover:scale-105"
                />
              </motion.div>
            </div>

            <p className="mt-5 font-mono text-micro-10 uppercase text-ink-faint">
              G.{String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-2 font-display text-title-s text-ink">{game.title}</h3>
            {/* thin accent hairline draws under the title on hover */}
            <span
              aria-hidden
              className="mt-2 block h-px w-full origin-left scale-x-0 bg-chartreuse transition-transform duration-500 ease-gallery group-hover:scale-x-100"
            />
            <p className="mt-3 font-mono text-micro-10 uppercase text-ink-faint">
              {game.genre} · {game.rank} · {game.hours}
            </p>
            <p className="mt-3 font-sans text-[15px] leading-body text-ink-dim">{game.blurb}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
