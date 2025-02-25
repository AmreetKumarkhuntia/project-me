import {
  decodeSteamGameDetails,
  type SteamGameDetails,
} from "$generated/types";
import { APICaller } from "$services/apiCaller";
import { logger } from "$services/logger";

/**
 * Fetches game details for a game.
 *
 * @param appUrl The appUrl to fetch details from
 * @param gameId The gameId to fetch details
 * @returns A promise resolving to game details
 */
export async function getSteamGameDetails(
  appUrl: string,
  gameId: string,
): Promise<SteamGameDetails | null> {
  const apiUrl: string = appUrl + "/appdetails";
  const defaultQueryParams: Map<string, string> = new Map([["appids", gameId]]);
  const requestHeaders: Map<string, string> = new Map([
    ["Accept", "*/*"],
    ["content-type", "application/json"],
  ]);
  const tag = "getSteamGameDetails";

  let gameDetails: SteamGameDetails | null = null;

  const apiCaller = new APICaller<SteamGameDetails>();
  apiCaller.buildApiCall(
    apiUrl,
    {},
    "GET",
    requestHeaders,
    defaultQueryParams,
    (data) => {
      try {
        const game = data[gameId];
        const gameData = game.data;
        return decodeSteamGameDetails(gameData);
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
    gameDetails = result.body;

    logger.logExternalApiResponse(tag, {
      status: result.status,
      statusText: result.statusText,
      headers: result.headers,
      error: result.error,
      gameDetails,
    });
  } catch (err) {
    logger.logException(tag, String(err));
  }

  return gameDetails;
}
