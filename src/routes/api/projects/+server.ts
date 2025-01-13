import type { RequestEvent } from "@sveltejs/kit";
import { APIResponseHandler } from "$server/apiSchema";
import { logger } from "$services/logger";
import type { APIResponse } from "$generated/types/APISchema.ts";
import { getCompiledGitRepos, getGithubRepos } from "$services/github";
import {
  githubApiUrl,
  githubApiVersion,
  githubAuthToken,
  getGitUserReposToShow,
  githubUserName,
} from "$server/config";
import { decodeSource } from "$generated/types/Projects.ts";

export async function GET({ url, request }: RequestEvent) {
  let response: APIResponse;

  const tag = "GET /api/projects";
  const params = Object.fromEntries(url.searchParams.entries());
  const userReposToShow = getGitUserReposToShow();

  logger.logServerRequest(tag, { request, params, userReposToShow });

  try {
    const source = decodeSource(params?.source);
    switch (source) {
      case "spotify":
      case "github":
      default: {
        const repos = await getCompiledGitRepos(
          githubApiUrl,
          githubApiVersion,
          githubUserName,
          userReposToShow,
          githubAuthToken
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
