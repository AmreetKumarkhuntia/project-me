import { type Handle } from "@sveltejs/kit";
import { logger } from "$services/logger";

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

  logger.logSetValues.orderId = 0;
  if (response.status === 404) {
    const redirectUrl = event.url.origin + "/";
    return Response.redirect(redirectUrl, 302);
  }
  return response;
};
