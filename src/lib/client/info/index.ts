import {
  decodeAchievement,
  decodeGame,
  decodeGitProjectDetails,
  decodeSpotifyAlbum,
  decodeSpotifyTrack,
  decodeSteamGameDetails,
  type Achievement,
  type Game,
  type GitProjectDetails,
  type SpotifyAlbum,
  type SpotifyTrack,
  type SteamGameDetails,
} from "$generated/types";
import { APICaller, getInnerHTML } from "$services/apiCaller";
import {
  updateGithubProjects,
  skillStore,
  updateSpotifyAlbum,
  updateGames,
} from "$stores/skills";
import { logger } from "$services/logger";
import { get } from "svelte/store";
import { decodeArray, isJSON, type JSONObject } from "type-decoder";
import { getSteamGameDetails } from "$services/steam/client";
import { getDataUsingProxy } from "$client";

/**
 * Retrieves GitHub repositories and updates the store if not already populated.
 */
export async function getGitRepos() {
  const store = get(skillStore);
  if (store.githubProjects === null) {
    const allRepos = await getReposFromBackend();
    updateGithubProjects(allRepos);
  }
}

export async function getSpotifyAlbums() {
  const store = get(skillStore);
  if (store.spotifyAlbum === null) {
    const spotifyAlbum = await getSpotifyAlbumsFromBackend();
    if (spotifyAlbum !== null) updateSpotifyAlbum(spotifyAlbum);
  }
}

export async function getGames() {
  const store = get(skillStore);
  if (store.games === null) {
    const games = await getGamesFromBackend();
    updateGames(games);
  }
}

//region GITHUB API CLIENT CALLERS

/**
 * Fetches GitHub repositories from the backend.
 * @returns A promise resolving to an array of GitProjectDetails.
 */
export async function getReposFromBackend(): Promise<GitProjectDetails[]> {
  const requestHeaders: Map<string, string> = new Map();
  const apiUrl: string = window.location.origin + "/api/infos";
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
  perPage = "10",
): Promise<GitProjectDetails | null> {
  const tag = "getGithubRepoWithCommits";
  const requestHeaders: Map<string, string> = new Map();
  const apiUrl: string =
    window.location.origin + `/api/info/github/${projectId}`;
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
//endregion
//region SPOTIFY API CLIENT CALLERS

/**
 * Fetches SpotifyAlbums from the backend.
 * @returns A promise resolving to SpotifyAlbum
 */
export async function getSpotifyAlbumsFromBackend(): Promise<SpotifyAlbum | null> {
  const requestHeaders: Map<string, string> = new Map();
  const apiUrl: string = window.location.origin + "/api/infos";
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
    decodeSpotifyAlbum,
  );

  try {
    logger.logExternalApiRequest(tag, {
      apiUrl,
      requestHeaders,
      queryParams,
    });

    const result = await apiCaller.callApi();
    allAlbums = result.body;

    logger.logExternalApiResponse(tag, { result });
  } catch (err) {
    logger.logException(tag, String(err));
  }

  return allAlbums;
}

/**
 * Fetches SpotifyAlbums from the backend.
 * @param projectId The ID of the spotify album.
 * @returns A promise resolving to SpotifyAlbum
 */
export async function getSpotifyTracksFromBackend(
  projectId: string,
): Promise<SpotifyTrack[]> {
  const requestHeaders: Map<string, string> = new Map();
  const apiUrl: string =
    window.location.origin + "/api/info/spotify/" + projectId;
  const queryParams: Map<string, string> = new Map([["source", "spotify"]]);
  const apiCaller = new APICaller<SpotifyTrack[]>();
  const tag = "getSpotifyAlbumsFromBackend";

  let allAlbums: SpotifyTrack[] = [];

  apiCaller.buildApiCall(
    apiUrl,
    {},
    "GET",
    requestHeaders,
    queryParams,
    (data) => decodeArray(data, decodeSpotifyTrack),
  );

  try {
    logger.logExternalApiRequest(tag, {
      apiUrl,
      requestHeaders,
      queryParams,
    });

    const result = await apiCaller.callApi();
    allAlbums = result.body ?? [];

    logger.logExternalApiResponse(tag, { result });
  } catch (err) {
    logger.logException(tag, String(err));
  }

  return allAlbums;
}

//endregion
//region GAME API CLIENT CALLERS

/**
 * Fetches Games played from the backend.
 * @returns A promise resolving to Game
 */
export async function getGamesFromBackend(): Promise<Game[]> {
  const requestHeaders: Map<string, string> = new Map();
  const apiUrl: string = window.location.origin + "/api/infos";
  const queryParams: Map<string, string> = new Map([["source", "games"]]);
  const apiCaller = new APICaller<Game[]>();
  const tag = "getGamesFromBackend";

  let allGames: Game[] = [];

  apiCaller.buildApiCall(
    apiUrl,
    {},
    "GET",
    requestHeaders,
    queryParams,
    (data) => decodeArray(data, decodeGame),
  );

  try {
    logger.logExternalApiRequest(tag, {
      apiUrl,
      requestHeaders,
      queryParams,
    });

    const result = await apiCaller.callApi();
    allGames = result.body ?? [];

    logger.logExternalApiResponse(tag, { result });
  } catch (err) {
    logger.logException(tag, String(err));
  }

  return allGames;
}

/**
 * Fetches Game achievements from backend
 *
 * @param gameId The gameId for which we need to fetch achievements
 * @returns A promise resolving to Game
 */
export async function getGameAchievements(
  gameId: string,
): Promise<Achievement[]> {
  const requestHeaders: Map<string, string> = new Map();
  const apiUrl: string = window.location.origin + "/api/info/game/achievement";
  const queryParams: Map<string, string> = new Map([["gameId", gameId]]);
  const apiCaller = new APICaller<Achievement[]>();
  const tag = "getGameAchievements";

  let allAchievements: Achievement[] = [];

  apiCaller.buildApiCall(
    apiUrl,
    {},
    "GET",
    requestHeaders,
    queryParams,
    (data) => decodeArray(data, decodeAchievement),
  );

  try {
    logger.logExternalApiRequest(tag, {
      apiUrl,
      requestHeaders,
      queryParams,
    });

    const result = await apiCaller.callApi();
    allAchievements = result.body ?? [];

    logger.logExternalApiResponse(tag, { result });
  } catch (err) {
    logger.logException(tag, String(err));
  }

  return allAchievements;
}
//endregion

//region GAME CALLERS

/**
 * Fetches Game Details from steam
 *
 * @param gameId The gameId for which we need details
 * @returns A promise resolving to Game Details
 */

export async function getGameDetails(
  gameId: string,
): Promise<SteamGameDetails | null> {
  const url = `https://store.steampowered.com/api/appdetails?appids=${gameId}`;
  const tag = "getGameDetails";
  let result: SteamGameDetails | null = null;
  try {
    const response: string | JSONObject | null = await getDataUsingProxy(
      url,
      "json",
    );
    if (isJSON(response) && response !== null) {
      const game = response[gameId];
      if (isJSON(game)) {
        const gameData = game["data"];
        result = decodeSteamGameDetails(gameData);
      }
    }
  } catch (err) {
    logger.logException(tag, String(err));
  }
  return result;
}

//endregion
