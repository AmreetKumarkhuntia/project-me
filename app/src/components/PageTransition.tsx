// src/components/PageTransition.tsx — gallery plaque sweep on route change (design-v2 §4)
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import { AnimatePresence, motion } from "framer-motion";

const EXIT_EASE: [number, number, number, number] = [0.65, 0, 0.35, 1];

export default function PageTransition() {
  const location = useLocation();
  const [active, setActive] = useState(false);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setActive(true);
    const t = window.setTimeout(() => setActive(false), 900);
    window.scrollTo(0, 0);
    return () => window.clearTimeout(t);
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {active && (
        <div className="pointer-events-none fixed inset-0 z-[80]" aria-hidden>
          {/* fade to black + slight scale feel */}
          <motion.div
            className="absolute inset-0 bg-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.9, times: [0, 0.35, 1], ease: EXIT_EASE }}
          />
          {/* accent hairline sweep left → right */}
          <motion.div
            className="absolute left-0 top-1/2 h-px w-full origin-left bg-chartreuse"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: [0, 1], opacity: [0, 1] }}
            transition={{ duration: 0.7, ease: EXIT_EASE }}
          />
        </div>
      )}
    </AnimatePresence>
  );
}
