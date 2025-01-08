import type { RequestEvent } from "@sveltejs/kit";
import { APIResponseHandler } from "$server/apiSchema/index.ts";
import { logger } from "$services/logger/index.ts";
import type { APIResponse } from "$generated/types/APISchema.ts";
import { getGithubRepos } from "$services/github/index.ts";
import {
  githubApiUrl,
  githubApiVersion,
  githubUserName,
} from "$server/config/index.ts";

export async function GET({ url, request }: RequestEvent) {
  const params = Object.fromEntries(url.searchParams.entries());
  logger.logServerRequest("GET /api/heartbeat", { params, request });
  //   FOR API TESTING THIS IS KEPT
  const result = await getGithubRepos(
    githubApiUrl,
    githubApiVersion,
    githubUserName,
    "1",
  );
  let response: APIResponse = APIResponseHandler.successResponse(
    "App is up !!!",
    { result },
  );

  logger.logServerResponse("GET /api/heartbeat", { response });
  return APIResponseHandler.toResponse(response);
}
