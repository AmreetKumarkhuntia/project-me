import { type Handle } from "@sveltejs/kit";
import { logger } from "$services/logger";

export const handle: Handle = async ({ event, resolve }) => {
  logger.logFunctionCalled("serverHooks", { event });
  logger.logFunctionCallResult("serverHooks", {});
  const response = await resolve(event);

  logger.logSetValues.orderId = 0;
  if (response.status === 404) {
    const redirectUrl = event.url.origin + "/";
    return Response.redirect(redirectUrl, 302);
  }
  return response;
};
