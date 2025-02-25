import type { RequestEvent } from "@sveltejs/kit";
import { APIResponseHandler } from "$server/apiSchema";
import { logger } from "$services/logger";
import type { APIResponse } from "$generated/types/APISchema.ts";
import { getCompiledGitRepos } from "$services/github";
import {
  githubApiUrl,
  githubApiVersion,
  githubAuthToken,
  getGitUserReposToShow,
  githubUserName,
} from "$configuration/config";
import { decodeSource } from "$generated/types/Projects.ts";
import { getAuthToken, getSpotifyAlbums } from "$services/spotify";
import { getSteamOwnedGames } from "$services/steam";
import type { SteamGame } from "$generated/types";
import { castToGameFromSteamGame } from "$server/games";

export async function GET({ url, request }: RequestEvent) {
  let response: APIResponse;

  const tag = "GET /api/infos";
  const params = Object.fromEntries(url.searchParams.entries());
  const userReposToShow = getGitUserReposToShow();

  logger.logServerRequest(tag, { request, params, userReposToShow });

  try {
    const source = decodeSource(params?.source);
    switch (source) {
      case "spotify": {
        const spotifyAuthToken = await getAuthToken();
        if (spotifyAuthToken !== null) {
          const authToken = `${spotifyAuthToken.token_type} ${spotifyAuthToken.access_token}`;

          const allAlbums = await getSpotifyAlbums(authToken);

          response = APIResponseHandler.successResponse("success", allAlbums);
        } else {
          response = APIResponseHandler.badRequestResponse(
            "Something Went Wrong !!! Unable to get access token.",
          );
        }
        break;
      }
      case "games": {
        const games = await getSteamOwnedGames();
        /**
         * image url
         * https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/apps/{appid}/{img_icon_url}.jpg
         */
        const modifiedGames = games.map((game) => {
          const appId = game.appid;
          const imgIconUrl = game.img_icon_url;
          const imageUrl = `https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/apps/${appId}/${imgIconUrl}.jpg`;

          const newGame: SteamGame = {
            ...game,
            img_icon_url: imageUrl,
          };
          return newGame;
        });
        const sortedGames = modifiedGames
          .sort((a, b) => b.playtime_forever - a.playtime_forever)
          .slice(0, 10);
        response = APIResponseHandler.successResponse(
          "success",
          castToGameFromSteamGame(sortedGames),
        );
        break;
      }
      case "github":
      default: {
        const repos = await getCompiledGitRepos(
          githubApiUrl,
          githubApiVersion,
          githubUserName,
          userReposToShow,
          githubAuthToken,
        );
        response = APIResponseHandler.successResponse("success", {
          repos,
        });
      }
    }
  } catch (err) {
    logger.logException(tag, String(err));
    response = APIResponseHandler.badRequestResponse(String(err));
  }

  logger.logServerResponse(tag, {
    status: response.status,
    code: response.code,
    message: response.message,
  });
  return APIResponseHandler.toResponse(response);
}
