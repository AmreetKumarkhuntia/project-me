import {
  decodeGitReadme,
  decodeGitRepo,
  type GitReadme,
  type GitRepo,
} from "$generated/types";
import { APICaller } from "$services/apiCaller";
import { logger } from "$services/logger";

const defaultGithubHeaders: Map<string, string> = new Map([
  ["Accept", "application/vnd.github+json"],
]);

//region: GITHUB API CALLERS

/**
 * Fetches a list of GitHub repositories for a given user.
 *
 * @param githubApiUrl - The base URL of the GitHub API.
 * @param githubApiVersion - The version of the GitHub API to use.
 * @param userName - The GitHub username.
 * @param page - The number of pages to retrieve.
 * @param authToken - The authentication token.
 * @returns A Promise that resolves to an array of GitRepo objects.
 */
export async function getGithubRepos(
  githubApiUrl: string,
  githubApiVersion: string,
  userName: string,
  page: number,
  authToken: string
): Promise<GitRepo[]> {
  const allRepos: GitRepo[] = [];
  const apiUrl: string = githubApiUrl + "/users/" + userName + "/repos";
  const defaultQueryParams: Map<string, string> = new Map([
    ["per_page", "100"],
  ]);
  const requestHeaders: Map<string, string> = new Map(defaultGithubHeaders);
  requestHeaders.set("X-GitHub-Api-Version", githubApiVersion);
  requestHeaders.set("Authorization", authToken);

  const apiCaller = new APICaller<GitRepo[]>();
  apiCaller.buildApiCall(
    apiUrl,
    {},
    "GET",
    requestHeaders,
    defaultQueryParams,
    (data) => {
      const result: GitRepo[] = [];
      if (Array.isArray(data)) {
        data.map((data) => {
          const decodedData = decodeGitRepo(data);
          if (decodedData) {
            result.push(decodedData);
          }
        });
      }
      return result;
    }
  );

  try {
    for (let i = 1; i <= page; i++) {
      const queryParams: Map<string, string> = new Map(defaultQueryParams);
      queryParams.set("page", String(i));
      apiCaller.setQueryParams(queryParams);
      logger.logExternalApiRequest("getGithubRepos", {
        apiUrl,
        requestHeaders,
        defaultQueryParams,
      });
      const result = await apiCaller.callApi();
      const repos = result.body ?? [];
      allRepos.push(...repos);
      logger.logExternalApiResponse("getGithubRepos", {
        status: result.status,
        error: result.error,
        headers: result.headers,
      });
    }
  } catch (err) {
    logger.logException("getGithubRepos", String(err));
  }

  return allRepos;
}

/**
 * Fetches a specific GitHub repository.
 *
 * @param githubApiUrl - The base URL of the GitHub API.
 * @param githubApiVersion - The version of the GitHub API to use.
 * @param userName - The GitHub username.
 * @param repoName - The name of the repository.
 * @param authToken - The authentication token.
 * @returns A Promise that resolves to a GitRepo object or null.
 */
export async function getGithubRepo(
  githubApiUrl: string,
  githubApiVersion: string,
  userName: string,
  repoName: string,
  authToken: string
): Promise<GitRepo | null> {
  let gitRepo: GitRepo | null = null;
  const apiUrl: string =
    githubApiUrl + "/users/" + userName + `/${repoName}` + "/readme";
  const queryParams: Map<string, string> = new Map();
  const requestHeaders: Map<string, string> = new Map(defaultGithubHeaders);
  const apiCaller = new APICaller<GitRepo>();

  requestHeaders.set("X-GitHub-Api-Version", githubApiVersion);
  requestHeaders.set("Authorization", authToken);

  apiCaller.buildApiCall(
    apiUrl,
    {},
    "GET",
    requestHeaders,
    queryParams,
    decodeGitRepo
  );

  try {
    logger.logExternalApiRequest("getGithubRepos", {
      apiUrl,
      requestHeaders,
      queryParams,
    });
    const result = await apiCaller.callApi();
    gitRepo = result.body;
    logger.logExternalApiResponse("getGithubRepos", {
      status: result.status,
      error: result.error,
      headers: result.headers,
    });
  } catch (err) {
    logger.logException("getGithubRepos", String(err));
  }

  return gitRepo;
}

/**
 * Fetches the README file of a specific GitHub repository.
 *
 * @param githubApiUrl - The base URL of the GitHub API.
 * @param githubApiVersion - The version of the GitHub API to use.
 * @param userName - The GitHub username.
 * @param repoName - The name of the repository.
 * @param authToken - The authentication token.
 * @returns A Promise that resolves to a GitReadme object or null.
 */
export async function getGithubReadme(
  githubApiUrl: string,
  githubApiVersion: string,
  userName: string,
  repoName: string,
  authToken: string
): Promise<GitReadme | null> {
  let readme: GitReadme | null = null;
  const apiUrl: string =
    githubApiUrl + "/users/" + userName + `/${repoName}` + "/readme";
  const queryParams: Map<string, string> = new Map();
  const requestHeaders: Map<string, string> = new Map(defaultGithubHeaders);
  const apiCaller = new APICaller<GitReadme>();

  requestHeaders.set("X-GitHub-Api-Version", githubApiVersion);
  requestHeaders.set("Authorization", authToken);

  apiCaller.buildApiCall(
    apiUrl,
    {},
    "GET",
    requestHeaders,
    queryParams,
    decodeGitReadme
  );

  try {
    logger.logExternalApiRequest("getGithubRepos", {
      apiUrl,
      requestHeaders,
      queryParams,
    });
    const result = await apiCaller.callApi();
    readme = result.body;
    logger.logExternalApiResponse("getGithubRepos", {
      status: result.status,
      error: result.error,
      headers: result.headers,
    });
  } catch (err) {
    logger.logException("getGithubRepos", String(err));
  }

  return readme;
}

//endregion

//region: AGGREGATORS

//endregion
