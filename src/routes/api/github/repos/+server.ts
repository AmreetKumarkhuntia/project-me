import type { RequestEvent } from "@sveltejs/kit";
import { APIResponseHandler } from "$server/apiSchema/index.ts";
import { logger } from "$services/logger/index.ts";
import type { APIResponse } from "$generated/types/APISchema.ts";
import { getGithubRepos } from "$services/github/index.ts";
import {
  githubApiUrl,
  githubApiVersion,
  githubAuthToken,
  githubUserName,
} from "$server/config/index.ts";

export async function GET({ url, request }: RequestEvent) {
  let response: APIResponse;

  const tag = "GET /api/github/repos";
  const params = Object.fromEntries(url.searchParams.entries());

  logger.logServerRequest(tag, { request, params });

  try {
    const pages = Number(params.pages);
    const repos = await getGithubRepos(
      githubApiUrl,
      githubApiVersion,
      githubUserName,
      pages,
      githubAuthToken
    );
    response = APIResponseHandler.successResponse("Success", {
      repos,
      length: repos.length,
    });
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
