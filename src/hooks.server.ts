import { type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  const response = await resolve(event);

  if (response.status === 404) {
    const redirectUrl = event.url.origin + "/";
    return Response.redirect(redirectUrl, 302);
  }
  return response;
};
