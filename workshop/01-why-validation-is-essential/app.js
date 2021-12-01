import { createServer } from "node:http";

const routesPath = process.argv[2] || "./routes.js";
const { routes } = await import(routesPath);

/**
 * Creates a new HTTP server instance.
 *
 * @see https://nodejs.org/api/http.html#httpcreateserveroptions-requestlistener
 * @see https://nodejs.dev/learn/build-an-http-server
 *
 * @returns {import("node:http").Server}
 */
export function createHttpServer() {
  return createServer(
    async (request, response) => {
    /**
     * Find a route which matches the request method and URL path.
     *
     * e.g. method = POST, path = /some-path
     */
    const requestUrl = new URL(request.url || "", `http://${request.headers.host}`);
    const matchingRoute = routes.find((route) => {
      return (
        route.method === request.method && route.path === requestUrl.pathname
      );
    });

    /**
     * Send a 404 (Not Found) error response if no matching route was found.
     */
    const foundMatchingRoute =
      matchingRoute && typeof matchingRoute?.handler === "function";

    if (!foundMatchingRoute) {
      response.writeHead(404).end();
      return;
    }

    /**
     * Parse the JSON formatted request body if the request has one.
     *
     * The parsed request body is set as `request.body`.
     */
    const requestHasBody = ["POST", "PUT", "PATCH"].includes(request.method || "")
    if (requestHasBody) {
      try {
        // @ts-ignore
        request.body = await parseJsonRequestBody(request);
      } catch (error) {
        /**
         * The request body was not valid JSON.
         *
         * Send a 400 (Bad Request) error response.
         */
        response.writeHead(400).end();
        return;
      }
    }

    /**
     * Execute the matching route handler.
     */
    // @ts-ignore
    await matchingRoute.handler(request, response);

    /**
     * Signal that all response headers and the body have been sent.
     */
    response.end();
  });
}

/**
 * Parses a JSON formatted request body from an `IncomingMessage`
 * readable stream.
 *
 * @see https://nodejs.org/api/http.html#class-httpincomingmessage
 * @see https://nodejs.dev/learn/get-http-request-body-data-using-nodejs
 *
 * @param {import("node:http").IncomingMessage} request
 * @returns {Object|Array}
 */
async function parseJsonRequestBody(request) {
  const bodyChunks = [];
  for await (const chunk of request) {
    bodyChunks.push(chunk);
  }

  const rawRequestBody = Buffer.concat(bodyChunks).toString();

  return JSON.parse(rawRequestBody);
}
