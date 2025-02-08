import {
  decodeGitProjectDetails,
  decodeSpotifyAlbum,
  type GitProjectDetails,
  type SpotifyAlbum,
} from "$generated/types";
import { APICaller } from "$services/apiCaller";
import { updateGithubProjects, projectStore } from "$stores/projects.ts";
import { logger } from "$services/logger";
import { get } from "svelte/store";

/**
 * Retrieves GitHub repositories and updates the store if not already populated.
 */
export async function getGitRepos() {
  const store = get(projectStore);
  if (store.githubProjects === null) {
    const allRepos = await getReposFromBackend();
    updateGithubProjects(allRepos);
  }
}

//region GITHUB API CLIENT CALLERS

/**
 * Fetches GitHub repositories from the backend.
 * @returns A promise resolving to an array of GitProjectDetails.
 */
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
    }
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

/**
 * Fetches details of a specific GitHub repository along with commit history.
 * @param projectId The ID of the GitHub repository.
 * @param page The page number for pagination (default: "1").
 * @param perPage The number of commits per page (default: 10).
 * @returns A promise resolving to GitProjectDetails or null if the request fails.
 */
export async function getGithubRepoWithCommits(
  projectId: string,
  page: string = "1",
  perPage = "10"
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
    decodeGitProjectDetails
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
//endregion
//region SPOTIFY API CLIENT CALLERS

/**
 * Fetches SpotifyAlbums from the backend.
 * @returns A promise resolving to SpotifyAlbum
 */
export async function getSpotifyAlbumsFromBackend(): Promise<SpotifyAlbum | null> {
  const requestHeaders: Map<string, string> = new Map();
  const apiUrl: string = window.location.origin + "/api/projects";
  const queryParams: Map<string, string> = new Map([["source", "spotify"]]);
  const apiCaller = new APICaller<SpotifyAlbum>();
  const tag = "getSpotifyAlbumsFromBackend";

  let allAlbums: SpotifyAlbum | null = null;

  apiCaller.buildApiCall(
    apiUrl,
    {},
    "GET",
    requestHeaders,
    queryParams,
    decodeSpotifyAlbum
  );

  try {
    logger.logExternalApiRequest(tag, {
      apiUrl,
      requestHeaders,
      queryParams,
    });

    const result = await apiCaller.callApi();
    allAlbums = result.body;

    logger.logExternalApiResponse(tag, {
      status: result.status,
      error: result.error,
      headers: result.headers,
    });
  } catch (err) {
    logger.logException(tag, String(err));
  }

  return allAlbums;
}

//endregion
