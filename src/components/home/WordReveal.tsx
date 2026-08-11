// src/components/home/WordReveal.tsx — word-level mask-rise headline entrance (design-v2 §4)
// The observer sits on the (unclipped) outer span: a word that starts fully
// clipped inside its overflow-hidden mask never intersects the viewport, so
// observing the words themselves would never fire the reveal.
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
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
}

/** Each word rises from a clipped mask (overflow-hidden wrapper). */
export default function WordReveal({
  words,
  baseDelay = 0,
  stagger = 0.06,
  className = "",
}: WordRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const shown = reduced || inView;

  return (
    <span ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: reduced ? "0%" : "110%" }}
            animate={{ y: shown ? "0%" : "110%" }}
            transition={
              reduced
                ? { duration: 0 }
                : { duration: 1.1, ease: EASE, delay: baseDelay + i * stagger + (w.delay ?? 0) }
            }
          >
            {w.node}
          </motion.span>
          {" "}
        </span>
      ))}
    </span>
  );
}
