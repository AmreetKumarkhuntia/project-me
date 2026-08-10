// src/components/WingStub.tsx — elegant placeholder for the wings under rebuild
import { Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface WingStubProps {
  index: string;
  label: string;
  note: string;
}

export default function WingStub({ index, label, note }: WingStubProps) {
  return (
    <section
      className="mx-auto flex min-h-[70dvh] max-w-[1440px] flex-col justify-center py-24"
      style={{ paddingInline: "clamp(24px, 6vw, 96px)" }}
    >
      <SectionHeader index={index} label={label} note={note} />
      <motion.h1
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, ease: EASE, delay: 0.2 }}
        className="mt-16 font-display text-display-l italic leading-[1.0] text-ink"
      >
        Exhibition <span className="text-chartreuse">opening</span> soon.
      </motion.h1>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
        className="mt-12"
      >
        <Link
          to="/"
          className="flex w-fit items-center gap-2 font-mono text-micro uppercase text-ink-faint transition-colors hover:text-chartreuse"
        >
          <ArrowLeft size={14} /> Return to the Atrium
        </Link>
      </motion.div>
    </section>
  );
}
