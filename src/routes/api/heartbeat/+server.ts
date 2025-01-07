import type { RequestEvent } from "@sveltejs/kit";
import { APIResponseHandler } from "$server/apiSchema/index.ts";
import { logger } from "$services/logger/index.ts";
import type { APIResponse } from "$generated/types/APISchema.ts";
import { getGithubRepos } from "$server/github/index.ts";
import { githubAuthToken, githubUserName } from "$server/config/index.ts";

export async function GET({ url, request }: RequestEvent) {
  const params = Object.fromEntries(url.searchParams.entries());
  logger.logServerRequest("GET /api/heartbeat", { params, request });
  //   FOR API TESTING THIS IS KEPT
  //   const result = await getGithubRepos(githubUserName, githubAuthToken);
  let response: APIResponse = APIResponseHandler.successResponse(
    "App is up !!!",
    null
  );

  logger.logServerResponse("GET /api/heartbeat", { response });
  return APIResponseHandler.toResponse(response);
}
