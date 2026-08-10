// src/components/Navbar.tsx — fixed gallery nav (design-v2 §7)
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { homeNavItem, navLinks, site } from "@/data/site";

function scrollToContact() {
  const el = document.getElementById("contact");
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);
  const location = useLocation();
  const navigate = useNavigate();

  // hide on scroll down, reappear on scroll up (design-v2 §7)
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y > lastY.current && y > 120) setHidden(true);
      else setHidden(false);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close overlay menu on route change
  useEffect(() => setMenuOpen(false), [location.pathname]);

  const onContact = () => {
    setMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      window.setTimeout(scrollToContact, 400);
    } else {
      scrollToContact();
    }
  };

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50 border-b border-hairline bg-bg/80 backdrop-blur-[12px]"
      >
        <nav
          className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-gutter"
          aria-label="Primary"
        >
          {/* logo + wordmark */}
          <Link to="/" className="flex items-center gap-3" aria-label={`${site.brand.wordmark} — home`}>
            <span className="flex h-7 w-7 items-center justify-center bg-chartreuse">
              <span className="font-display text-[16px] font-semibold leading-none text-bg">
                {site.brand.initial}
              </span>
            </span>
            <span className="font-display text-[18px] italic text-ink">{site.brand.wordmark}</span>
          </Link>

          {/* desktop links */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `group relative font-mono text-micro uppercase transition-colors duration-300 ${
                    isActive ? "text-ink" : "text-ink-faint hover:text-ink"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      aria-hidden
                      className={`absolute -top-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-chartreuse transition-opacity ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    />
                    <sup className="mr-1 text-[8px] text-ink-faint">{l.index}</sup>
                    {l.label}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* status cluster + CTA */}
          <div className="hidden items-center gap-6 md:flex">
            <span className="flex items-center gap-2 font-mono text-micro-10 uppercase text-ink-faint">
              <span aria-hidden className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-chartreuse" />
              {site.statusLine}
            </span>
            <button
              type="button"
              onClick={onContact}
              className="rounded-sm bg-chartreuse px-4 py-2 font-mono text-micro uppercase text-bg transition-all duration-300 hover:scale-[1.02] hover:shadow-accent-glow"
            >
              {site.ctaLabel}
            </button>
          </div>

          {/* mobile hamburger */}
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center text-ink md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </motion.header>

      {/* mobile full-screen overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-bg md:hidden px-gutter"
          >
            <nav className="flex flex-col gap-2" aria-label="Mobile">
              {[homeNavItem, ...navLinks.map((l) => ({ ...l, label: l.label[0] + l.label.slice(1).toLowerCase() }))].map(
                (l, i) => (
                  <motion.div
                    key={l.to}
                    initial={{ opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      to={l.to}
                      className="hairline-b flex items-baseline gap-4 py-4 font-display text-display-m leading-display-m text-ink"
                    >
                      <span className="font-mono text-micro text-ink-faint">{l.index}</span>
                      {l.label}
                    </Link>
                  </motion.div>
                ),
              )}
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="mt-10 flex flex-col gap-3"
            >
              <span className="flex items-center gap-2 font-mono text-micro-10 uppercase text-ink-faint">
                <span aria-hidden className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-chartreuse" />
                {site.statusLine}
              </span>
              <button
                type="button"
                onClick={onContact}
                className="mt-2 w-fit rounded-sm bg-chartreuse px-5 py-3 font-mono text-micro uppercase text-bg"
              >
                {site.ctaLabel}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
