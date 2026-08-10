// src/components/home/WordReveal.tsx — word-level mask-rise headline entrance (design-v2 §4)
import { motion } from "framer-motion";
import type { ReactNode } from "react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export interface MaskWord {
  node: ReactNode;
  /** extra delay in seconds (e.g. the chartreuse accent word enters last) */
  delay?: number;
}

interface WordRevealProps {
  words: MaskWord[];
  baseDelay?: number;
  stagger?: number;
  className?: string;
  once?: boolean;
}

/** Each word rises from a clipped mask (overflow-hidden wrapper). */
export default function WordReveal({
  words,
  baseDelay = 0,
  stagger = 0.06,
  className = "",
}: WordRevealProps) {
  return (
    <span className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{
              duration: 1.1,
              ease: EASE,
              delay: baseDelay + i * stagger + (w.delay ?? 0),
            }}
          >
            {w.node}
          </motion.span>
          {"\u00A0"}
        </span>
      ))}
    </span>
  );
}
