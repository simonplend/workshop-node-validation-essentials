import Fastify from "fastify";

import routes from "./routes.js";

export default async function buildApp() {
  const options = {
    /**
     * Note: These settings are NOT suitable for production.
     *
     * They should be configurable so that different
     * settings can be used in development and production.
     */
    logger: {
      level: "debug",
      prettyPrint: true,
    },
  };

  const fastify = Fastify(options);

  /**
   * This error handler implements handling of validation errors.
   * It constructs and sends a Problem Details error response.
   */
  fastify.setErrorHandler(function(error, request, reply) {
    if (error.validation) {
      const statusCode = 422;

      /**
       * Note: The problem type is hardcoded here (type, title, status),
       * but should be specific to the problem which has occurred.
       */
      const problemDetails = {
        type: "https://example-api.com/problem/invalid-recipe-object",
        title: "Invalid recipe object in request body",
        status: statusCode,
        validation_errors: error.validation
      };

      reply.header("Content-Type", "application/problem+json");
      reply.status(statusCode).send(problemDetails);

      return;
    }

    this.errorHandler(error, request, reply);
  });

  fastify.register(routes, { prefix: "/recipes" });

  return fastify;
}
