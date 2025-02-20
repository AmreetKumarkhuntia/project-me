import type { RequestEvent } from "@sveltejs/kit";
import { APIResponseHandler } from "$server/apiSchema";
import { logger } from "$services/logger";
import type { APIResponse } from "$generated/types/APISchema.ts";
import {
  getCompiledGitRepo,
  getGithubCommits,
  getGithubLanguages,
} from "$services/github";
import {
  githubApiUrl,
  githubApiVersion,
  githubAuthToken,
  githubUserName,
} from "$configuration/config";
import { decodeSource } from "$generated/types/Projects.ts";
import { getAuthToken, getSpotifyTracks } from "$services/spotify";

export async function GET({ url, request, params }: RequestEvent) {
  let response: APIResponse;

  const tag = `GET /api/info/${params.source}/${params.projectId}`;
  const searchParams = new Map<string, string>(url.searchParams.entries());
  const source = decodeSource(params?.source);
  const projectId = params?.projectId ?? null;

  logger.logServerRequest(tag, { request, params, searchParams });

  try {
    if (projectId !== null) {
      switch (source) {
        case "spotify": {
          const spotifyAuthToken = await getAuthToken();
          if (spotifyAuthToken) {
            const authToken = `${spotifyAuthToken.token_type} ${spotifyAuthToken.access_token}`;

            const albums = await getSpotifyTracks(authToken, projectId);
            response = APIResponseHandler.successResponse("success", albums);
          } else {
            response = APIResponseHandler.badRequestResponse(
              "Something Went Wrong !!!. Unable to generate token.",
            );
          }
          break;
        }
        case "github":
        default: {
          const repo = await getCompiledGitRepo(
            githubApiUrl,
            githubApiVersion,
            githubUserName,
            projectId,
            githubAuthToken,
          );
          if (repo !== null) {
            const githubCommits = await getGithubCommits(
              githubApiUrl,
              githubApiVersion,
              githubUserName,
              projectId,
              githubAuthToken,
              searchParams,
            );
            const gitLanguages = await getGithubLanguages(
              githubApiUrl,
              githubApiVersion,
              githubUserName,
              projectId,
              githubAuthToken,
            );
            repo.commits = githubCommits;
            repo.languages = gitLanguages;
            response = APIResponseHandler.successResponse("success", repo);
          } else {
            response = APIResponseHandler.badRequestResponse(
              "Couldn't find details. Something Went Wrong.",
            );
          }
        }
      }
    } else {
      response = APIResponseHandler.notFoundResponse("Invalid project Id.");
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
