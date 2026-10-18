// src/components/ScrollProgress.tsx — 2px chartreuse reading-progress line
// along the top edge of the viewport; scroll-linked, so it costs nothing.
import { motion, useScroll } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      aria-hidden
      style={{ scaleX: scrollYProgress }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[56] h-[2px] origin-left bg-chartreuse"
    />
  );
}
