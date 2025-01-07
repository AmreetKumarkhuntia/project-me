import dotenv from "dotenv";

dotenv.config();

export const githubUserName: string =
  process.env.GITHUB_USER_NAME ?? "AmreetKumarkhuntia";

export const githubAuthToken: string = process.env.GITHUB_AUTH_TOKEN ?? "";

export const githubApiUrl: string =
  process.env.GITHUB_API_URL ?? "https://api.github.com";

export const githubApiVersion: string =
  process.env.GITHUB_API_VERSION ?? "2022-11-28";
