// src/pages/Gaming.tsx — "The Play Room" (design-v2 gaming.md)
import { Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import RoomHeader from "@/sections/gaming/RoomHeader";
import Screening from "@/sections/gaming/Screening";
import Shelf from "@/sections/gaming/Shelf";
import { gamingContent } from "@/data/pages/gaming";
import { usePageTitle } from "@/hooks/usePageTitle";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** S5 — return band (gaming-v2 §S5) */
function ReturnBand() {
  return (
    <div
      className="hairline-t mx-auto max-w-[1440px] py-20 md:py-28 px-gutter"
    >
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1.1, ease: EASE }}
      >
        <p className="micro-label mb-6">{gamingContent.returnBand.label}</p>
        <Link
          to={gamingContent.returnBand.to}
          className="group inline-flex items-baseline gap-3 font-display text-display-l leading-[1.0] text-ink"
          data-cursor="VIEW"
        >
          <span>
            {gamingContent.returnBand.pre}{" "}
            <em className="italic">{gamingContent.returnBand.em}</em>
          </span>
          <ArrowUpRight
            aria-hidden
            className="h-[0.5em] w-[0.5em] self-center text-chartreuse transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
          />
        </Link>
      </motion.div>
    </div>
  );
}

export default function Gaming() {
  usePageTitle("Gaming");
  return (
    <>
      <RoomHeader />
      <Screening />
      <Shelf />
      <ReturnBand />
      {/* shared contact footer lives in Layout */}
    </>
  );
}
