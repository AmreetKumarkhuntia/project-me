// src/sections/work/AccordionGallery.tsx — S2 single-open accordion exhibition (work.md §S2)
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import Pill from "@/components/Pill";
import { projects } from "@/data/projects";
import type { Project } from "@/data/projects";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Split "Top 10 ranked segments per run." → ["Top 10", "ranked segments per run"] etc. */
function splitImpact(impact: string): [string, string] {
  const clean = impact.replace(/\.$/, "");
  const multi = ["Top 10"];
  for (const m of multi) {
    if (clean.startsWith(m)) return [m, clean.slice(m.length).trim()];
  }
  const firstSpace = clean.indexOf(" ");
  if (firstSpace === -1) return [clean, ""];
  return [clean.slice(0, firstSpace), clean.slice(firstSpace + 1).trim()];
}

function AccordionRow({
  project,
  open,
  onToggle,
}: {
  project: Project;
  open: boolean;
  onToggle: () => void;
}) {
  const [stat, caption] = splitImpact(project.impact);
  const repo = project.links[0];
  const panelId = `work-panel-${project.id}`;
  const buttonId = `work-button-${project.id}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.9, ease: EASE }}
      className="hairline-b first:border-t first:border-[var(--hairline)]"
    >
      {/* collapsed row (also the toggle) */}
      <button
        id={buttonId}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        data-cursor={open ? undefined : "OPEN"}
        className="group grid min-h-24 w-full grid-cols-12 items-center gap-4 py-6 text-left transition-colors duration-300 hover:bg-bg-2 md:py-8"
      >
        <span className="micro-label col-span-2 pl-1 md:col-span-1">{project.index}</span>
        <span
          className={`col-span-8 font-display text-display-m leading-display-m text-ink transition-all duration-300 group-hover:translate-x-4 group-hover:italic md:col-span-8 ${
            open ? "italic" : ""
          }`}
        >
          {project.title}
        </span>
        <span
          className={`col-span-12 order-last pl-1 font-mono text-micro uppercase md:order-none md:col-span-2 md:pl-0 md:text-right ${
            open ? "text-chartreuse" : "text-ink-faint"
          }`}
        >
          {project.category} · {project.year}
        </span>
        <span className="col-span-2 flex justify-end pr-1 md:col-span-1">
          <Plus
            size={20}
            aria-hidden
            className={`text-ink-faint transition-transform duration-500 ease-gallery group-hover:text-ink ${
              open ? "rotate-45 text-chartreuse" : ""
            }`}
          />
        </span>
      </button>

      {/* expanded content — grid-rows 0fr → 1fr, 0.6s gallery ease */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={`grid transition-[grid-template-rows] duration-[600ms] ease-gallery ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div
            className={`grid grid-cols-1 gap-10 pb-12 transition-opacity duration-500 md:grid-cols-12 ${
              open ? "opacity-100 delay-300" : "opacity-0 delay-0"
            }`}
          >
            {/* left (7): problem + built + repo link */}
            <div className="md:col-span-7">
              <p className="micro-label">The Problem</p>
              <p className="mt-3 max-w-[56ch] font-sans text-[16px] leading-body text-ink-dim">
                {project.problem}
              </p>
              <p className="micro-label mt-8">What I Built</p>
              <p className="mt-3 max-w-[56ch] font-sans text-[16px] leading-body text-ink-dim">
                {project.built}
              </p>
              {repo && (
                <a
                  href={repo.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex items-center gap-1.5 font-mono text-micro uppercase text-chartreuse transition-opacity hover:opacity-70"
                >
                  View repository <ArrowUpRight size={14} aria-hidden />
                </a>
              )}
            </div>

            {/* right (5): vertical hairline + impact + stack pills */}
            <div className="border-t border-[var(--hairline)] pt-8 md:col-span-5 md:border-l md:border-t-0 md:pl-10 md:pt-0">
              <p className="micro-label">Impact</p>
              <AnimatePresence mode="wait">
                {open && (
                  <motion.div
                    key={`${project.id}-impact`}
                    initial={{ opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
                  >
                    <p className="mt-4 font-display text-display-l italic leading-[1.0] text-chartreuse">
                      {stat}
                    </p>
                    {caption && <p className="micro-label mt-3">{caption}</p>}
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="mt-8 flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <Pill key={s} label={s} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function AccordionGallery() {
  const [openId, setOpenId] = useState<string>(projects[0]?.id ?? "");

  return (
    <section
      className="mx-auto max-w-[1440px] pt-24 md:pt-36"
      style={{ paddingInline: "clamp(24px, 6vw, 96px)" }}
      aria-label="Selected works"
    >
      <div>
        {projects.map((p) => (
          <AccordionRow
            key={p.id}
            project={p}
            open={openId === p.id}
            onToggle={() => setOpenId(openId === p.id ? "" : p.id)}
          />
        ))}
      </div>
    </section>
  );
}
