// src/data/socials.ts — connect links (design-v2 §7 footer)
import type { Social } from "@/types";

export const email = "amreetleo123@gmail.com";
export const emailHref = `mailto:${email}`;

/** Amreet K on Spotify — the full music catalogue. */
export const spotifyArtistUrl = "https://open.spotify.com/artist/7o81QZ0hP1WgKj7N5DF4oM";

export const socials: Social[] = [
  { id: "github", label: "GITHUB", href: "https://github.com/AmreetKumarkhuntia" },
  { id: "linkedin", label: "LINKEDIN", href: "https://www.linkedin.com/in/amreet-khuntia-15193220b/" },
  { id: "twitter", label: "TWITTER", href: "https://x.com/amreetsgto321" },
  { id: "spotify", label: "SPOTIFY", href: spotifyArtistUrl },
  { id: "resume", label: "RESUME", href: "/resume.pdf" },
];
