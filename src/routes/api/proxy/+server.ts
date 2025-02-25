import type { RequestEvent } from "@sveltejs/kit";
import { APIResponseHandler } from "$server/apiSchema";
import { logger } from "$services/logger";
import type { APIResponse } from "$generated/types/APISchema.ts";
import { getInnerHTML } from "$services/apiCaller";

export async function GET({ request }: RequestEvent) {
  let response: APIResponse;

  const tag = "GET /api/proxy";
  const headers = request.headers;
  const url = headers.get("X-Proxy-Url");
  // TODO: implement other proxies
  logger.logServerRequest(tag, { request, headers });
  try {
    if (url) {
      const result = await getInnerHTML(url);

      response = APIResponseHandler.successResponse("Success", {
        finalData: result,
      });
    } else {
      response = APIResponseHandler.notFoundResponse("Url Absent");
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
