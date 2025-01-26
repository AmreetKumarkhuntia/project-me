import {
  decodeGitProjectDetails,
  type GitProjectDetails,
} from "$generated/types";
import { APICaller } from "$services/apiCaller";
import { updateGithubProjects, projectStore } from "$stores/projects.ts";
import { logger } from "$services/logger";
import { get } from "svelte/store";

export async function getGitRepos() {
  const store = get(projectStore);
  if (store.githubProjects === null) {
    const allRepos = await getReposFromBackend();
    updateGithubProjects(allRepos);
  }
}
// move to frontend
export async function getReposFromBackend(): Promise<GitProjectDetails[]> {
  const requestHeaders: Map<string, string> = new Map();
  const apiUrl: string = window.location.href + "api/projects";
  const queryParams: Map<string, string> = new Map([["source", "github"]]);
  const apiCaller = new APICaller<GitProjectDetails[]>();

  const allRepos: GitProjectDetails[] = [];

  apiCaller.buildApiCall(
    apiUrl,
    {},
    "GET",
    requestHeaders,
    queryParams,
    (body) => {
      const result: GitProjectDetails[] = [];
      const data = body?.repos ?? [];
      if (Array.isArray(data)) {
        data.map((data) => {
          const decodedData = decodeGitProjectDetails(data);
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

    const result = await apiCaller.callApi();
    allRepos.push(...(result.body ?? []));

    logger.logExternalApiResponse("getGithubRepos", {
      status: result.status,
      error: result.error,
      headers: result.headers,
    });
  } catch (err) {
    logger.logException("getGithubRepos", String(err));
  }

  return allRepos;
}
