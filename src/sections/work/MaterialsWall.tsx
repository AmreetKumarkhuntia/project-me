// src/sections/work/MaterialsWall.tsx — S3 materials wall (stack) (work.md §S3)
import { motion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";
import Pill from "@/components/Pill";
import { skills } from "@/data/skills";
import { workContent } from "@/data/pages/work";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function MaterialsWall() {
  return (
    <section
      className="mx-auto max-w-[1440px] pt-24 md:pt-36 px-gutter"
      aria-label="Materials — technical stack"
    >
      <SectionHeader
        index={workContent.materials.label.number}
        label={workContent.materials.label.text}
      />

      <div className="mt-4">
        {skills.map((group) => (
          <div key={group.name} className="relative">
            {/* hairline that draws across on scroll */}
            <motion.span
              aria-hidden
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 1.1, ease: EASE }}
              className="absolute left-0 top-0 h-px w-full origin-left bg-hairline"
            />
            <div className="grid grid-cols-1 gap-4 py-8 md:grid-cols-12">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.7, ease: EASE }}
                className="micro-label md:col-span-4"
              >
                {group.name}
              </motion.p>
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                variants={{ show: { transition: { staggerChildren: 0.04, delayChildren: 0.15 } } }}
                className="flex flex-wrap gap-2 md:col-span-8"
              >
                {group.items.map((item) => (
                  <motion.span
                    key={item}
                    variants={{
                      hidden: { opacity: 0, y: 12 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
                    }}
                  >
                    <Pill label={item} />
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </div>
        ))}
        {/* closing hairline */}
        <motion.span
          aria-hidden
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 1.1, ease: EASE }}
          className="block h-px w-full origin-left bg-hairline"
        />
      </div>
    </section>
  );
}
