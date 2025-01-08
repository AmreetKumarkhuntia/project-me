import { decodeGitRepos, type GitRepos } from "$generated/types/GitHub.ts";
import {
  initiateCallerResponse,
  APICaller,
  type APICallerResponse,
} from "$services/apiCaller/index.ts";
import { logger } from "$services/logger/index.ts";

const defaultGithubHeaders: Map<string, string> = new Map([
  ["Accept", "application/vnd.github+json"],
]);

export async function getGithubRepos(
  githubApiUrl: string,
  githubApiVersion: string,
  userName: string,
  page: string,
): Promise<APICallerResponse<GitRepos[] | null>> {
  let result: APICallerResponse<GitRepos[] | null> =
    initiateCallerResponse(null);
  const apiUrl: string = githubApiUrl + "/users/" + userName + "/repos";
  const queryParams: Map<string, string> = new Map([
    ["per_page", "100"],
    ["page", page],
  ]);
  const requestHeaders: Map<string, string> = new Map(defaultGithubHeaders);
  requestHeaders.set("X-GitHub-Api-Version", githubApiVersion);

  const apiCaller = new APICaller<GitRepos[]>();
  apiCaller.buildApiCall(
    apiUrl,
    {},
    "GET",
    requestHeaders,
    queryParams,
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
    },
  );
  try {
    logger.logExternalApiRequest("getGithubRepos", {
      apiUrl,
      requestHeaders,
      queryParams,
    });
    result = await apiCaller.callApi();
    logger.logExternalApiResponse("getGithubRepos", {
      status: result.status,
      error: result.error,
      headers: result.headers,
    });
  } catch (err) {
    logger.logException("getGithubRepos", String(err));
  }

  return result;
}
