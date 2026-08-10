// src/components/Footer.tsx — shared contact + legal footer (design-v2 §7)
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { socials, email, emailHref } from "@/data/socials";
import { profile } from "@/data/profile";
import { footerContent } from "@/data/site";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Footer() {
  return (
    <footer id="contact" className="hairline-t relative">
      {/* accent line sweep across the top hairline on entry */}
      <motion.div
        aria-hidden
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 1.1, ease: EASE }}
        className="absolute -top-px left-0 h-px w-full origin-left bg-chartreuse"
      />

      <div
        className="mx-auto max-w-[1440px] py-24 md:py-36 px-gutter"
      >
        <h2 className="font-display text-display-l leading-[1.0] text-ink">
          {footerContent.heading.pre}{" "}
          <em className="italic text-chartreuse">{footerContent.heading.accent}</em>{" "}
          {footerContent.heading.post}
        </h2>

        <p className="mt-6 max-w-[52ch] font-sans text-[16px] leading-body text-ink-dim">
          {profile.contactBody}{" "}
          <em className="italic text-ink">{profile.availability}</em>
        </p>

        {/* email + social pills */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className="mt-12 flex flex-wrap items-center gap-3"
        >
          <motion.a
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}
            href={emailHref}
            className="rounded-sm bg-chartreuse px-5 py-3 font-mono text-micro uppercase text-bg transition-all duration-300 hover:scale-[1.02] hover:shadow-accent-glow"
          >
            {email}
          </motion.a>
          {socials.map((s) => (
            <motion.a
              key={s.id}
              variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-1.5 rounded-full border px-4 py-2.5 font-mono text-micro uppercase text-ink transition-colors duration-300 hover:border-chartreuse border-hairline-strong"
            >
              {s.label}
              <ArrowUpRight
                size={12}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </motion.a>
          ))}
        </motion.div>

        {/* legal row */}
        <div className="hairline-t mt-24 flex flex-col gap-2 pt-6 font-mono text-micro-10 uppercase text-ink-faint md:flex-row md:items-center md:justify-between">
          <span>{footerContent.legal.copyright}</span>
          <span className="hidden md:block">{footerContent.legal.tagline}</span>
          <span>{footerContent.legal.location}</span>
        </div>
      </div>
    </footer>
  );
}
