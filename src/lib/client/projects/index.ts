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
  const apiUrl: string = window.location.origin + "/api/projects";
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

export async function getGithubRepoWithCommits(
  projectId: string,
  page: string = "1",
  perPage = "10",
): Promise<GitProjectDetails | null> {
  const tag = "getGithubRepoWithCommits";
  const requestHeaders: Map<string, string> = new Map();
  const apiUrl: string =
    window.location.origin + `/api/project/github/${projectId}`;
  const queryParams: Map<string, string> = new Map([
    ["page", page],
    ["per_page", perPage],
  ]);
  const apiCaller = new APICaller<GitProjectDetails>();

  let repo: GitProjectDetails | null = null;

  apiCaller.buildApiCall(
    apiUrl,
    {},
    "GET",
    requestHeaders,
    queryParams,
    decodeGitProjectDetails,
  );

  try {
    logger.logExternalApiRequest(tag, {
      apiUrl,
      requestHeaders,
      queryParams,
    });

    const result = await apiCaller.callApi();
    repo = result.body;

    logger.logExternalApiResponse(tag, {
      status: result.status,
      error: result.error,
      headers: result.headers,
    });
  } catch (err) {
    logger.logException(tag, String(err));
  }

  return repo;
}
