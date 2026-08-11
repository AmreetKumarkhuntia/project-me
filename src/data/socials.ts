// src/data/socials.ts — connect links (design-v2 §7 footer)
import type { Social } from "@/types";

export const email = "amreetleo123@gmail.com";
export const emailHref = `mailto:${email}`;

export const socials: Social[] = [
  { id: "github", label: "GITHUB", href: "https://github.com/AmreetKumarkhuntia" },
  { id: "linkedin", label: "LINKEDIN", href: "https://www.linkedin.com/in/amreet-khuntia-15193220b/" },
  { id: "twitter", label: "TWITTER", href: "https://x.com/amreetsgto321" },
  { id: "resume", label: "RESUME", href: "/resume.pdf" },
];
