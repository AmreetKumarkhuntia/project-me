import dotenv from "dotenv";

dotenv.config();

export const githubUserName: string =
  process.env.GITHUB_USER_NAME ?? "AmreetKumarkhuntia";

export const githubAuthToken: string = process.env.GITHUB_AUTH_TOKEN ?? "";

export const githubApiUrl: string =
  process.env.GITHUB_API_URL ?? "https://api.github.com";

export const githubApiVersion: string =
  process.env.GITHUB_API_VERSION ?? "2022-11-28";

export function getGitUserReposToShow() {
  const availableRepos: string = process.env.GITHUB_USER_REPOS ?? "";
  const reposArray: string[] = availableRepos
    .split(",")
    .map((repo) => repo.trim())
    .filter(Boolean);

  return reposArray;
}

export const senderGmail: string = process.env.GMAIL_SENDER_ADDRESS ?? "";

export const receiverGmail: string = process.env.GMAIL_RECEIVER_ADDRESS ?? "";

export const senderGmailPass: string = process.env.GMAIL_SENDER_PASSWORD ?? "";
