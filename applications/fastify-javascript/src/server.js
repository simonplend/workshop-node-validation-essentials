// src/server.js

import config from "./config/index.js";
import buildApp from "./app.js";

const fastify = await buildApp();

try {
  await fastify.listen(config.server.port);
} catch(error) {
  fastify.log.error(error);
  process.exit(1);
}
