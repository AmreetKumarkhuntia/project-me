import {
  decodeSpotifyAlbum,
  decodeSpotifyAuthToken,
  decodeSpotifyTrack,
  type SpotifyAlbum,
  type SpotifyArtist,
  type SpotifyAuthToken,
  type SpotifyTrack,
} from "$generated/types";
import {
  spotifyAccountsApiUrl,
  spotifyApiUrl,
  spotifyArtistId,
  spotifyCliSecret,
  spotifyCliToken,
} from "$server/config";
import { APICaller } from "$services/apiCaller";
import { logger } from "$services/logger";
import { decodeArray } from "type-decoder";

/**
 * Fetches the list of tracks for a specific Spotify album.
 * @param authToken The authorization token for the Spotify API.
 * @param albumId The album id for which the tracks are needed.

 * @returns A promise resolving to a SpotifyAlbum object or null if the request fails.
 */
export async function getSpotifyTracks(
  authToken: string,
  albumId: string
): Promise<SpotifyTrack[]> {
  const apiUrl: string = spotifyApiUrl + "/albums/" + albumId + "/tracks";
  const defaultQueryParams: Map<string, string> = new Map([["limit", "50"]]);
  const requestHeaders: Map<string, string> = new Map([
    ["Authorization", authToken],
  ]);
  const tag = "getSpotifyTracks";

  let allTracks: SpotifyTrack[] = [];

  const apiCaller = new APICaller<SpotifyTrack[]>();
  apiCaller.buildApiCall(
    apiUrl,
    {},
    "GET",
    requestHeaders,
    defaultQueryParams,
    (data) => {
      const items = data["items"] ?? null;
      return decodeArray(items, decodeSpotifyTrack);
    }
  );

  try {
    logger.logExternalApiRequest(tag, {
      apiUrl,
      requestHeaders,
      defaultQueryParams,
    });
    const result = await apiCaller.callApi();
    allTracks = result.body ?? [];

    logger.logExternalApiResponse(tag, {
      result,
    });
  } catch (err) {
    logger.logException(tag, String(err));
  }

  return allTracks;
}

/**
 * Fetches the list of albums for a specific Spotify artist.
 * @param authToken The authorization token for the Spotify API.
 * @returns A promise resolving to a SpotifyAlbum object or null if the request fails.
 */
export async function getSpotifyAlbums(
  authToken: string
): Promise<SpotifyAlbum | null> {
  const apiUrl: string =
    spotifyApiUrl + "/artists/" + spotifyArtistId + "/albums";
  const defaultQueryParams: Map<string, string> = new Map();
  const requestHeaders: Map<string, string> = new Map([
    ["Authorization", authToken],
  ]);
  const tag = "getSpotifyAlbums";

  let allAlbums: SpotifyAlbum | null = null;

  const apiCaller = new APICaller<SpotifyAlbum>();
  apiCaller.buildApiCall(
    apiUrl,
    {},
    "GET",
    requestHeaders,
    defaultQueryParams,
    decodeSpotifyAlbum
  );

  try {
    logger.logExternalApiRequest(tag, {
      apiUrl,
      requestHeaders,
      defaultQueryParams,
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

/**
 * Retrieves an authentication token from Spotify using client credentials.
 * @returns A promise resolving to a SpotifyAuthToken object or null if the request fails.
 */
export async function getAuthToken(): Promise<SpotifyAuthToken | null> {
  const apiUrl: string = spotifyAccountsApiUrl + "/api/token";
  const token = `${spotifyCliToken}:${spotifyCliSecret}`;
  const authToken = `Basic ${Buffer.from(token).toString("base64")}`;
  const defaultQueryParams: Map<string, string> = new Map();
  const requestHeaders: Map<string, string> = new Map([
    ["Content-Type", "application/x-www-form-urlencoded"],
    ["Authorization", authToken],
  ]);
  const body = {
    grant_type: "client_credentials",
  };
  const tag = "getAuthToken";

  let spotifyAuthToken: SpotifyAuthToken | null = null;

  const apiCaller = new APICaller<SpotifyAuthToken>();
  apiCaller.buildApiCall(
    apiUrl,
    body,
    "POST",
    requestHeaders,
    defaultQueryParams,
    decodeSpotifyAuthToken
  );

  try {
    logger.logExternalApiRequest(tag, {
      apiUrl,
      requestHeaders,
      defaultQueryParams,
    });
    const result = await apiCaller.callApi();
    spotifyAuthToken = result.body;

    logger.logExternalApiResponse(tag, { result });
  } catch (err) {
    logger.logException(tag, String(err));
  }

  return spotifyAuthToken;
}
