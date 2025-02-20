import { decodeArray } from "type-decoder";

import { decodeSteamGame, type SteamGame } from "$generated/types";
import { steamApiUrl, steamId, steamKey } from "$configuration/config";
import { APICaller } from "$services/apiCaller";
import { logger } from "$services/logger";

/**
 * Fetches the list of games played from steam.

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
