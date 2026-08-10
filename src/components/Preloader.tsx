// src/components/Preloader.tsx — quiet gallery fade-in intro (design-v2 §4)
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SESSION_KEY = "amreet-atelier-seen";
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    return !sessionStorage.getItem(SESSION_KEY);
  });
  const doneRef = useRef(false);

  useEffect(() => {
    if (!visible) {
      onDone();
      return;
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = window.setTimeout(
      () => {
        if (doneRef.current) return;
        doneRef.current = true;
        sessionStorage.setItem(SESSION_KEY, "1");
        setVisible(false);
        onDone();
      },
      reduced ? 200 : 1600,
    );
    return () => window.clearTimeout(t);
  }, [visible, onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-bg"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
          role="status"
          aria-label="Loading"
        >
          <div className="flex flex-col items-center gap-6">
            <motion.span
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: EASE }}
              className="flex h-10 w-10 items-center justify-center bg-chartreuse"
            >
              <span className="font-display text-[22px] font-semibold leading-none text-bg">A</span>
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.9, ease: EASE }}
              className="font-mono text-micro uppercase text-ink-faint"
            >
              The Atelier · Vol. 02
            </motion.span>
            <motion.span
              aria-hidden
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 1.0, ease: EASE }}
              className="h-px w-24 origin-left bg-chartreuse"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
