import { createServer, ServerResponse } from "node:http";

import { routes } from "./routes.js";

/**
 * @typedef {Object} ExtendedRequestType
 * @property {Object} body
 *
 * @typedef {import("node:http").IncomingMessage & ExtendedRequestType} ExtendedRequest
 */

export function createHttpServer() {
  return createServer(
    async (request, response) => {
    /**
     * TODO:
     */
    const requestUrl = new URL(request.url || "", `http://${request.headers.host}`);
    const matchingRoute = routes.find((route) => {
      return (
        route.method === request.method && route.path === requestUrl.pathname
      );
    });

    /**
     * TODO:
     */
    const foundMatchingRoute =
      matchingRoute && typeof matchingRoute?.handler === "function";

    if (!foundMatchingRoute) {
      response.writeHead(404).end();
      return;
    }

    /**
     * TODO:
     */
    if (["POST", "PUT", "PATCH"].includes(request.method || "")) {
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
