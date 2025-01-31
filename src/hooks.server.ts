import { type Handle } from "@sveltejs/kit";
import { logger } from "$services/logger";
import { APIResponseHandler } from "$server/apiSchema";

export const handle: Handle = async ({ event, resolve }) => {
  logger.logFunctionCalled("serverHooks", { event });
  logger.logFunctionCallResult("serverHooks", {});

  if (event.request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Credentials": "true",
      },
    });
  }

  const response = await resolve(event);
  const url: URL = event.url;

  logger.logSetValues.orderId = 0;

  if (response.status === 404 && url.href.includes("/api") !== true) {
    const redirectUrl = event.url.origin + "/not-found";
    return Response.redirect(redirectUrl, 302);
  } else if (response.status === 404) {
    const newResponse = APIResponseHandler.notFoundResponse(
      "Oops !!! End of your search.",
    );
    return APIResponseHandler.toResponse(newResponse);
  }
  return response;
};
