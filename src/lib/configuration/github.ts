import type { WrapperTextProps } from "vergins";
import type { GitHubConfig } from "$generated/types/Configuration";

export const glitchWrapperTextProps: WrapperTextProps = {
  wrapFrom: "top",
  enableWrapOnLoad: true,
  enableHoverGlitch: true,
};
// will remove if not required afterwards
export const githubApiUrl: GitHubConfig["githubApiUrl"] =
  "https://api.github.com";

export const githubApiVersion: GitHubConfig["githubApiVersion"] = "2022-11-28";

export const githubUserName: GitHubConfig["githubUserName"] =
  "AmreetKumarkhuntia";

export const githubPageIterations: GitHubConfig["githubPageIterations"] = 1;
