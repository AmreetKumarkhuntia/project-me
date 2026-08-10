// src/pages/Gaming.tsx — "The Play Room" (design-v2 gaming.md)
import { Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import RoomHeader from "@/sections/gaming/RoomHeader";
import DustCatcher from "@/sections/gaming/DustCatcher";
import Shelf from "@/sections/gaming/Shelf";
import { gamingContent } from "@/data/pages/gaming";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** S4 — controls & credits strip (gaming-v2 §S4) */
function ControlsStrip() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.9 }}
      transition={{ duration: 0.9, ease: EASE }}
      className="hairline-t mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-3 py-5 font-mono text-micro-10 uppercase text-ink-faint"
      style={{ paddingInline: "clamp(24px, 6vw, 96px)" }}
    >
      <span>{gamingContent.controlsStrip.left}</span>
      <span>{gamingContent.controlsStrip.right}</span>
    </motion.div>
  );
}

/** S5 — return band (gaming-v2 §S5) */
function ReturnBand() {
  return (
    <div
      className="hairline-t mx-auto max-w-[1440px] py-20 md:py-28"
      style={{ paddingInline: "clamp(24px, 6vw, 96px)" }}
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
  return (
    <>
      <RoomHeader />
      <DustCatcher />
      <Shelf />
      <ControlsStrip />
      <ReturnBand />
      {/* shared contact footer lives in Layout */}
    </>
  );
}
