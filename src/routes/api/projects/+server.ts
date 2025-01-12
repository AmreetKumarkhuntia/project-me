import type { RequestEvent } from "@sveltejs/kit";
import { APIResponseHandler } from "$server/apiSchema";
import { logger } from "$services/logger";
import type { APIResponse } from "$generated/types/APISchema.ts";
import { getGithubRepos } from "$services/github";
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
    const pages = Number(params.pages);
    const source = decodeSource(params?.source);
    switch (source) {
      case "spotify":
      case "github":
      default: {
        const repos = await getGithubRepos(
          githubApiUrl,
          githubApiVersion,
          githubUserName,
          pages,
          githubAuthToken
        );
        const sortedRepos = repos.sort((a, b) =>
          b.created_at?.localeCompare(a.created_at)
        );
        response = APIResponseHandler.successResponse("success", {
          repos: sortedRepos,
          length: repos.length,
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
