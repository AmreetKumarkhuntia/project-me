// src/data/socials.ts — connect links (design-v2 §7 footer)
import type { Social } from "@/types";

export const email = "amreetleo123@gmail.com";
export const emailHref = `mailto:${email}`;

export const socials: Social[] = [
  { id: "github", label: "GITHUB", href: "https://github.com/TODO_EDIT" }, // TODO_EDIT: real GitHub URL
  { id: "linkedin", label: "LINKEDIN", href: "https://linkedin.com/in/TODO_EDIT" }, // TODO_EDIT: real LinkedIn URL
  { id: "twitter", label: "TWITTER", href: "https://twitter.com/TODO_EDIT" }, // TODO_EDIT: real Twitter URL
];
