import { createServer } from "node:http";

import { routes } from "./routes.js";

export function createHttpServer() {
  return createServer(
    async (request, response) => {
    /**
     * TODO: Add comment.
     */
    const requestUrl = new URL(request.url || "", `http://${request.headers.host}`);
    const matchingRoute = routes.find((route) => {
      return (
        route.method === request.method && route.path === requestUrl.pathname
      );
    });

    /**
     * TODO: Add comment.
     */
    const foundMatchingRoute =
      matchingRoute && typeof matchingRoute?.handler === "function";

    if (!foundMatchingRoute) {
      response.writeHead(404).end();
      return;
    }

    /**
     * TODO: Add comment.
     */
    const requestHasBody = ["POST", "PUT", "PATCH"].includes(request.method || "")
    if (requestHasBody) {
      try {
        // @ts-ignore
        request.body = await parseJsonRequestBody(request);
      } catch (error) {
        /**
         * TODO:
         */
        response.writeHead(400).end();
        return;
      }
    }

    // @ts-ignore
    await matchingRoute.handler(request, response);
  });
}

/** @param {import("node:http").IncomingMessage} request */
async function parseJsonRequestBody(request) {
  const bodyChunks = [];
  for await (const chunk of request) {
    bodyChunks.push(chunk);
  }

  const rawRequestBody = Buffer.concat(bodyChunks).toString();

  return JSON.parse(rawRequestBody);
}
