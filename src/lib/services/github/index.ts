import { decodeGitRepos, type GitRepos } from "$generated/types/GitHub.ts";
import { APICaller } from "$services/apiCaller/index.ts";
import { logger } from "$services/logger/index.ts";

const defaultGithubHeaders: Map<string, string> = new Map([
  ["Accept", "application/vnd.github+json"],
]);

export async function getGithubRepos(
  githubApiUrl: string,
  githubApiVersion: string,
  userName: string,
  page: number,
  authToken: string
): Promise<GitRepos[]> {
  const allRepos: GitRepos[] = [];
  const apiUrl: string = githubApiUrl + "/users/" + userName + "/repos";
  const defaultQueryParams: Map<string, string> = new Map([
    ["per_page", "100"],
  ]);
  const requestHeaders: Map<string, string> = new Map(defaultGithubHeaders);
  requestHeaders.set("X-GitHub-Api-Version", githubApiVersion);
  requestHeaders.set("Authorization", authToken);

  const apiCaller = new APICaller<GitRepos[]>();
  apiCaller.buildApiCall(
    apiUrl,
    {},
    "GET",
    requestHeaders,
    defaultQueryParams,
    (data) => {
      const result: GitRepos[] = [];
      if (Array.isArray(data)) {
        data.map((data) => {
          const decodedData = decodeGitRepos(data);
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
