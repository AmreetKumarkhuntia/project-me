import {
  decodeGitCommit,
  decodeGitReadme,
  decodeGitRepo,
  type GitCommit,
  type GitProjectDetails,
  type GitReadme,
  type GitRepo,
} from "$generated/types";
import { APICaller } from "$services/apiCaller";
import { logger } from "$services/logger";
import { decodeArray } from "type-decoder";

const defaultGithubHeaders: Map<string, string> = new Map([
  ["Accept", "application/vnd.github+json"],
]);

//region: GITHUB API CALLERS

/**
 * ^ Fetches a list of GitHub repositories for a given user.
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
 * ^ Fetches a specific GitHub repository.
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

  const tag = "getGithubRepo";
  const apiUrl: string = githubApiUrl + "/repos/" + userName + `/${repoName}`;
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
    logger.logExternalApiRequest(tag, {
      apiUrl,
      requestHeaders,
      queryParams,
    });
    const result = await apiCaller.callApi();
    gitRepo = result.body;
    logger.logExternalApiResponse(tag, {
      status: result.status,
      error: result.error,
      headers: result.headers,
    });
  } catch (err) {
    logger.logException(tag, String(err));
  }

  return gitRepo;
}

/**
 * ^ Fetches the README file of a specific GitHub repository.
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

  const tag = "getGithubReadme";
  const apiUrl: string =
    githubApiUrl + "/repos/" + userName + `/${repoName}` + "/readme";
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
    logger.logExternalApiRequest(tag, {
      apiUrl,
      requestHeaders,
      queryParams,
    });
    const result = await apiCaller.callApi();
    readme = result.body;
    logger.logExternalApiResponse(tag, {
      status: result.status,
      error: result.error,
      headers: result.headers,
    });
  } catch (err) {
    logger.logException(tag, String(err));
  }

  return readme;
}

/**
 * ^ Fetches the commits for a specific GitHub repository.
 *
 * @param githubApiUrl - The base URL of the GitHub API.
 * @param githubApiVersion - The version of the GitHub API to use.
 * @param userName - The GitHub username.
 * @param repoName - The name of the repository.
 * @param authToken - The authentication token.
 * @returns A Promise that resolves to a GitReadme object or null.
 */
export async function getGithubCommits(
  githubApiUrl: string,
  githubApiVersion: string,
  userName: string,
  repoName: string,
  authToken: string,
  queryParams: Map<string, string> = new Map()
): Promise<GitCommit[] | null> {
  let commits: GitCommit[] | null = null;

  const tag = "getGithubCommits";
  const apiUrl: string = `${githubApiUrl}/repos/${userName}/${repoName}/commits`;
  const requestHeaders: Map<string, string> = new Map(defaultGithubHeaders);
  const apiCaller = new APICaller<GitCommit[]>();

  requestHeaders.set("X-GitHub-Api-Version", githubApiVersion);
  requestHeaders.set("Authorization", authToken);

  apiCaller.buildApiCall(
    apiUrl,
    {},
    "GET",
    requestHeaders,
    queryParams,
    (rawData) => {
      const data = decodeArray(rawData, decodeGitCommit);
      return data;
    }
  );

  try {
    logger.logExternalApiRequest(tag, {
      apiUrl,
      requestHeaders,
      queryParams,
    });
    const result = await apiCaller.callApi();
    commits = result.body;
    logger.logExternalApiResponse(tag, {
      status: result.status,
      error: result.error,
      headers: result.headers,
    });
  } catch (err) {
    logger.logException(tag, String(err));
  }

  return commits;
}

//endregion

//region: AGGREGATORS

/**
 * ^ Compiles detailed information about a specific GitHub project.
 *
 * @param githubApiUrl - The base URL of the GitHub API.
 * @param githubApiVersion - The version of the GitHub API to use.
 * @param userName - The GitHub username.
 * @param repoName - The name of the repository.
 * @param authToken - The authentication token.
 * @returns A Promise that resolves to a GitProjectDetails object or null.
 */
export async function getCompiledGitRepo(
  githubApiUrl: string,
  githubApiVersion: string,
  userName: string,
  repoName: string,
  authToken: string
): Promise<GitProjectDetails | null> {
  let projectDetails: GitProjectDetails | null = null;

  const tag = "getCompiledGitRepo";

  logger.logFunctionCalled(tag, {
    githubApiUrl,
    githubApiVersion,
    userName,
    repoName,
  });
  try {
    const repo = await getGithubRepo(
      githubApiUrl,
      githubApiVersion,
      userName,
      repoName,
      authToken
    );
    if (repo !== null) {
      const repoReadme = await getGithubReadme(
        githubApiUrl,
        githubApiVersion,
        userName,
        repoName,
        authToken
      );
      projectDetails = {
        repo,
        readme: repoReadme,
        commits: null,
      };
    }
  } catch (err) {
    logger.logException(tag, String(err));
  }
  logger.logFunctionCallResult(tag, {
    name: projectDetails?.repo?.full_name ?? null,
  });

  return projectDetails;
}

/**
 * ^ Compiles detailed information about multiple GitHub projects.
 *
 * @param githubApiUrl - The base URL of the GitHub API.
 * @param githubApiVersion - The version of the GitHub API to use.
 * @param userName - The GitHub username.
 * @param repos - An array of repository names.
 * @param authToken - The authentication token.
 * @returns A Promise that resolves to an array of GitProjectDetails objects.
 */
export async function getCompiledGitRepos(
  githubApiUrl: string,
  githubApiVersion: string,
  userName: string,
  repos: string[],
  authToken: string
): Promise<GitProjectDetails[]> {
  const result: GitProjectDetails[] = [];

  for (let i = 0; i < repos.length; i++) {
    const projectDetails = await getCompiledGitRepo(
      githubApiUrl,
      githubApiVersion,
      userName,
      repos[i],
      authToken
    );
    if (projectDetails !== null) {
      result.push(projectDetails);
    }
  }
  return result;
}
//endregion
