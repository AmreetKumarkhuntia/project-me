// src/data/socials.ts — connect links (design-v2 §7 footer)
import type { Social } from "@/types";
import { placeholderLinks } from "@/data/placeholders";

export const email = "amreetleo123@gmail.com";
export const emailHref = `mailto:${email}`;

export const socials: Social[] = [
  { id: "github", label: "GITHUB", href: placeholderLinks.github },
  { id: "linkedin", label: "LINKEDIN", href: placeholderLinks.linkedin },
  { id: "twitter", label: "TWITTER", href: placeholderLinks.twitter },
];
