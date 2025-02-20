import type { Source } from "$generated/types";
import {
  discord,
  github,
  instagram,
  linkedIn,
  twitter,
  youtube,
} from "$lib/constants";

export const linkedInLink =
  "https://www.linkedin.com/in/amreet-khuntia-15193220b/";

export const githubLink = "https://github.com/AmreetKumarkhuntia";

export const ytLink =
  "https://www.youtube.com/channel/UCzYq3173lifArHppAEEclgQ";

export const instaLink = "https://www.instagram.com/akmaniac123/";

export const twitterLink = "https://x.com/amreetsgto321";

export const discordLink = "https://discord.gg/F76YrsB";

export const contactLinks: { link: string; imgSrc: string; title: string }[] = [
  {
    link: linkedInLink,
    imgSrc: linkedIn,
    title: "LinkedIn",
  },
  {
    link: githubLink,
    imgSrc: github,
    title: "Github",
  },
  {
    link: discordLink,
    imgSrc: discord,
    title: "Discord",
  },
  {
    link: ytLink,
    imgSrc: youtube,
    title: "YouTube",
  },
  {
    link: twitterLink,
    imgSrc: twitter,
    title: "X",
  },
  {
    link: instaLink,
    imgSrc: instagram,
    title: "Instagram",
  },
];

export const talentItems: { id: Source; label: string }[] = [
  {
    id: "spotify",
    label: "Production Skills",
  },
  {
    id: "github",
    label: "Tech Skills",
  },
  {
    id: "games",
    label: "Gaming Skills",
  },
];
