// src/components/home/MetricsFrieze.tsx — S2 "Proof in the Plaster" (home.md)
import { motion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const METRICS = [
  { figure: "Sub-50ms", caption: "P95 Latency — High-throughput APIs", accent: false },
  { figure: "99.99%", caption: "Uptime — Resilient infrastructure", accent: true },
  { figure: "1M+", caption: "Logs / Day — Observability at scale", accent: false },
  { figure: "−40%", caption: "MTTR — Fast incident recovery", accent: false },
];

export default function MetricsFrieze() {
  return (
    <section
      className="mx-auto max-w-[1440px] py-24 md:py-36"
      style={{ paddingInline: "clamp(24px, 6vw, 96px)" }}
      aria-label="Measured impact"
    >
      <SectionHeader index="02" label="MEASURED" />

      <div className="mt-16 grid grid-cols-2 lg:grid-cols-4">
        {METRICS.map((m, i) => (
          <div
            key={m.figure}
            className={`relative flex flex-col items-center gap-4 px-6 py-10 text-center ${
              i > 0 ? "lg:border-l" : ""
            } ${i % 2 === 1 ? "border-l lg:border-l" : ""}`}
            style={{ borderColor: "var(--hairline)" }}
          >
            <span className="inline-block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.8, ease: EASE, delay: i * 0.15 }}
                className={`inline-block font-display text-display-m leading-display-m ${
                  m.accent ? "italic text-chartreuse" : "text-ink"
                }`}
              >
                {m.figure}
              </motion.span>
            </span>
            <span className="micro-label max-w-[22ch]">{m.caption}</span>
          </div>
        ))}
      </div>

      {/* hairlines draw horizontally */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="h-px origin-left"
        style={{ background: "var(--hairline)" }}
      />
    </section>
  );
}
