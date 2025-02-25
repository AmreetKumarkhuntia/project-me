import type { RequestEvent } from "@sveltejs/kit";
import { APIResponseHandler } from "$server/apiSchema";
import { logger } from "$services/logger";
import type { APIResponse } from "$generated/types/APISchema.ts";
import { getCompiledGameAchievements } from "$services/steam";

export async function GET({ url, request }: RequestEvent) {
  const params = Object.fromEntries(url.searchParams.entries());
  const gameId = params.gameId;
  const tag = `GET /api/info/game/achievement/${gameId}`;
  let response: APIResponse = APIResponseHandler.badRequestResponse(
    "Something went wrong!!! Unable to process data.",
  );

  logger.logServerRequest(tag, { params, request });

  try {
    const allAchievements = await getCompiledGameAchievements(gameId);

    response = APIResponseHandler.successResponse("success", allAchievements);
  } catch (err) {
    response = APIResponseHandler.badRequestResponse(String(err));
  }

  logger.logServerResponse(tag, { response });
  return APIResponseHandler.toResponse(response);
}
