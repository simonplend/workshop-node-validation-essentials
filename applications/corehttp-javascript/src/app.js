import http from "node:http";

import { routes } from "./routes.js";

export function createServer() {
  return http.createServer(async (request, response) => {
    /**
     * TODO:
     */
    const requestUrl = new URL(request.url, `http://${request.headers.host}`);
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
    if (["POST", "PUT", "PATCH"].includes(request.method)) {
      try {
        request.body = await parseJsonRequestBody(request);
      } catch (error) {
        /**
         * TODO:
         */
        response.writeHead(400).end();
        return;
      }
    }

    await matchingRoute.handler(request, response);
  });
}

async function parseJsonRequestBody(request) {
  const bodyChunks = [];
  for await (const chunk of request) {
    bodyChunks.push(chunk);
  }

  const rawRequestBody = Buffer.concat(bodyChunks).toString();

  return JSON.parse(rawRequestBody);
}
