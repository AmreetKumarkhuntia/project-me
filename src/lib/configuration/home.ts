import type { WrapperTextProps } from "vergins";
import type { HomeConfig } from "$generated/types/Configuration";

export const secondSubtitles: HomeConfig["secondSubtitles"] = [
  "Coding by Day",
  "Jamming by Night",
  "And Crushing Bosses in Between",
];

export const linkSize: HomeConfig["linkSize"] = "20px";

export const glitchWrapperTextProps: WrapperTextProps = {
  wrapFrom: "top",
  enableWrapOnLoad: true,
  enableHoverGlitch: true,
};

export const constantAvatarLazyLoaderDelay: HomeConfig["constantAvatarLazyLoaderDelay"] = 2400;
