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
    link: "www.google.com",
    imgSrc: discord,
    title: "Discord",
  },
  {
    link: ytLink,
    imgSrc: youtube,
    title: "YouTube",
  },
  {
    link: "www.google.com",
    imgSrc: twitter,
    title: "Twitter",
  },
  {
    link: "www.google.com",
    imgSrc: instagram,
    title: "Instagram",
  },
];
