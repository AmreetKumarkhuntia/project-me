import { decodeArray } from "type-decoder";

import {
  decodeSteamAchievement,
  decodeSteamAchievementSchema,
  decodeSteamGame,
  decodeSteamGameDetails,
  type Achievement,
  type SteamAchievement,
  type SteamAchievementSchema,
  type SteamGame,
  type SteamGameDetails,
} from "$generated/types";
import { steamApiUrl, steamId, steamKey } from "$configuration/config";
import { APICaller } from "$services/apiCaller";
import { logger } from "$services/logger";

//region API CALLERS FOR STEAM

/**
 * Fetches the list of games played from steam
 *
 * @returns A promise resolving to a list of owned steam games
 */
export async function getSteamOwnedGames(): Promise<SteamGame[]> {
  const apiUrl: string = steamApiUrl + "/IPlayerService/GetOwnedGames/v1";
  const defaultQueryParams: Map<string, string> = new Map([
    ["key", steamKey],
    ["steamid", steamId],
    ["include_appinfo", "true"],
    ["include_played_free_games", "true"],
  ]);
  const requestHeaders: Map<string, string> = new Map();
  const tag = "getSteamOwnedGames";

  let ownedGames: SteamGame[] = [];

  const apiCaller = new APICaller<SteamGame[]>();
  apiCaller.buildApiCall(
    apiUrl,
    {},
    "GET",
    requestHeaders,
    defaultQueryParams,
    (data) => {
      const response = data["response"];
      const games = response["games"];
      return decodeArray(games, decodeSteamGame);
    },
  );

  try {
    logger.logExternalApiRequest(tag, {
      apiUrl,
      requestHeaders,
      defaultQueryParams,
    });
    const result = await apiCaller.callApi();
    ownedGames = result.body ?? [];

    logger.logExternalApiResponse(tag, {
      result,
    });
  } catch (err) {
    logger.logException(tag, String(err));
  }

  return ownedGames;
}

/**
 * Fetches the list of achievements from steam for a particular game.
 *
 * @param gameId The gameId to fetch achievements
 * @returns A promise resolving to a list of achievements
 */
export async function getSteamGameAchievementsSchema(
  gameId: string,
): Promise<SteamAchievementSchema[]> {
  const apiUrl: string = steamApiUrl + "/ISteamUserStats/GetSchemaForGame/v2";
  const defaultQueryParams: Map<string, string> = new Map([
    ["key", steamKey],
    ["steamid", steamId],
    ["appid", gameId],
  ]);
  const requestHeaders: Map<string, string> = new Map();
  const tag = "getSteamGameAchievementsSchema";

  let allAchievements: SteamAchievementSchema[] = [];

  const apiCaller = new APICaller<SteamAchievementSchema[]>();
  apiCaller.buildApiCall(
    apiUrl,
    {},
    "GET",
    requestHeaders,
    defaultQueryParams,
    (data) => {
      try {
        const game = data["game"];
        const availableStats = game["availableGameStats"];
        const allAchievements = availableStats["achievements"];
        return decodeArray(allAchievements, decodeSteamAchievementSchema);
      } catch (err) {
        return null;
      }
    },
  );

  try {
    logger.logExternalApiRequest(tag, {
      apiUrl,
      requestHeaders,
      defaultQueryParams,
    });
    const result = await apiCaller.callApi();
    allAchievements = result.body ?? [];

    logger.logExternalApiResponse(tag, {
      status: result.status,
      statusText: result.statusText,
      headers: result.headers,
      error: result.error,
      length: allAchievements.length,
    });
  } catch (err) {
    logger.logException(tag, String(err));
  }

  return allAchievements;
}

/**
 * Fetches all achievements from steam for a particular game.
 *
 * @param gameId The gameId to fetch achievements
 * @returns A promise resolving to a list of all achievements
 */
export async function getSteamGameAchievements(
  gameId: string,
): Promise<SteamAchievement[]> {
  const apiUrl: string =
    steamApiUrl + "/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v2";
  const defaultQueryParams: Map<string, string> = new Map([
    ["key", steamKey],
    ["steamid", steamId],
    ["gameid", gameId],
  ]);
  const requestHeaders: Map<string, string> = new Map();
  const tag = "getSteamGameAchievements";

  let allAchievements: SteamAchievement[] = [];

  const apiCaller = new APICaller<SteamAchievement[]>();
  apiCaller.buildApiCall(
    apiUrl,
    {},
    "GET",
    requestHeaders,
    defaultQueryParams,
    (data) => {
      try {
        const availableStats = data["achievementpercentages"];
        const allAchievements = availableStats["achievements"];
        return decodeArray(allAchievements, decodeSteamAchievement);
      } catch (err) {
        return null;
      }
    },
  );

  try {
    logger.logExternalApiRequest(tag, {
      apiUrl,
      requestHeaders,
      defaultQueryParams,
    });
    const result = await apiCaller.callApi();
    allAchievements = result.body ?? [];

    logger.logExternalApiResponse(tag, {
      status: result.status,
      statusText: result.statusText,
      headers: result.headers,
      error: result.error,
      length: allAchievements.length,
    });
  } catch (err) {
    logger.logException(tag, String(err));
  }

  return allAchievements;
}

//endregion
//region: LOGIC HANDLERS

export async function getCompiledGameAchievements(
  gameId: string,
): Promise<Achievement[]> {
  const tag = "getCompiledGameAchievements";
  const result: Achievement[] = [];

  logger.logFunctionCalled(tag, { gameId });

  try {
    const allAchievementsSchema = await getSteamGameAchievementsSchema(gameId);
    const allAchievements = await getSteamGameAchievements(gameId);

    const achievementsMap: Map<string, SteamAchievement> = new Map();

    for (let i = 0; i < allAchievements.length; i++) {
      achievementsMap.set(allAchievements[i].name, allAchievements[i]);
    }

    for (let i = 0; i < allAchievementsSchema.length; i++) {
      const achievement = achievementsMap.get(allAchievementsSchema[i].name);

      if (achievement !== undefined) {
        result.push({
          name: allAchievementsSchema[i].displayName,
          description: allAchievementsSchema[i].description,
          number: Number(achievement?.percent ?? 0),
          statEnum: "PERCENT",
          iconUrl: allAchievementsSchema[i].icon,
        });
      }
    }
  } catch (err) {
    logger.logException(tag, String(err));
  }

  logger.logFunctionCallResult(tag, { length: result.length });

  return result;
}
