// src/data/site.ts — site chrome: nav, brand, footer, preloader (design-v2 §7)
import type { NavItem } from "@/types";
import { profile } from "@/data/profile";

export const site = {
  brand: { initial: "A", wordmark: profile.name },
  statusLine: "Bengaluru, IN · Open to work",
  ctaLabel: "Get in touch",
  preloaderPlaque: "The Atelier · Vol. 02",
} as const;

export const navLinks: NavItem[] = [
  { to: "/work", label: "WORK", index: "01" },
  { to: "/music", label: "MUSIC", index: "02" },
  { to: "/gaming", label: "GAMING", index: "03" },
];

/** leading entry of the mobile overlay menu */
export const homeNavItem: NavItem = { to: "/", label: "Home", index: "00" };

export const footerContent = {
  heading: { pre: "Let's", accent: "build", post: "something." },
  legal: {
    copyright: "© 2026 Amreet Khuntia",
    tagline: "Designed as an atelier",
    location: "Bengaluru, India",
  },
} as const;
