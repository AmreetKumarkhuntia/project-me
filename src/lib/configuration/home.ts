import {
  discord,
  github,
  instagram,
  linkedIn,
  twitter,
  youtube,
} from "$lib/constants/index.ts";
import type { WrapperTextProps } from "vergins";

export const secondSubtitles: string[] = [
  "Coding by Day",
  "Jamming by Night",
  "And Crushing Bosses in Between",
];

export const contactLinks: { link: string; imgSrc: string }[] = [
  {
    link: "www.google.com",
    imgSrc: linkedIn,
  },
  {
    link: "www.google.com",
    imgSrc: github,
  },
  {
    link: "www.google.com",
    imgSrc: discord,
  },
  {
    link: "www.google.com",
    imgSrc: youtube,
  },
  {
    link: "www.google.com",
    imgSrc: twitter,
  },
  {
    link: "www.google.com",
    imgSrc: instagram,
  },
];

export const linkSize = "20px";

export const glitchWrapperTextProps: WrapperTextProps = {
  wrapFrom: "top",
  enableWrapOnLoad: true,
  enableHoverGlitch: true,
};

export const constantAvatarLazyLoaderDelay = 2400;
