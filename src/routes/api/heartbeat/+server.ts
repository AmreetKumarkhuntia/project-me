import type { RequestEvent } from "@sveltejs/kit";
import { APIResponseHandler } from "$server/apiSchema";
import { logger } from "$services/logger";
import type { APIResponse } from "$generated/types/APISchema.ts";
import { getAuthToken } from "$services/spotify";

export async function GET({ url, request }: RequestEvent) {
  const params = Object.fromEntries(url.searchParams.entries());
  logger.logServerRequest("GET /api/heartbeat", { params, request });

  let response: APIResponse = APIResponseHandler.successResponse(
    "App is up !!!",
    {}
  );

  const result = await getAuthToken();

  logger.logServerResponse("GET /api/heartbeat", { response, result });
  return APIResponseHandler.toResponse(response);
}
