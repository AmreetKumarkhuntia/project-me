import type { APIResponse } from "$generated/types/APISchema.ts";
import { githubApiUrl, githubApiVersion } from "$server/config/index.ts";
import {
  initiateCallerResponse,
  APICaller,
  type APICallerResponse,
} from "$services/apiCaller/index.ts";
import { logger } from "$services/logger/index.ts";
import { error } from "console";

const defaultGithubHeaders: Map<string, string> = new Map([
  ["X-GitHub-Api-Version", githubApiVersion],
  ["Accept", "application/vnd.github+json"],
]);

export async function getGithubRepos(
  userName: string,
  authToken: string
): Promise<APICallerResponse<any | null>> {
  let result: APICallerResponse<any | null> = initiateCallerResponse(null);
  const apiUrl: string = githubApiUrl + "/users/" + userName + "/repos";
  // by default 1st 100 have to paginate this
  const queryParams: Map<string, string> = new Map([
    ["per_page", "100"],
    ["page", "1"],
  ]);
  const requestHeaders: Map<string, string> = new Map(defaultGithubHeaders);
  requestHeaders.set("Authorization", authToken);

  const apiCaller = new APICaller<any | null>();
  apiCaller.buildApiCall(
    apiUrl,
    {},
    "GET",
    requestHeaders,
    queryParams,
    (data) => {
      return data;
    }
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
