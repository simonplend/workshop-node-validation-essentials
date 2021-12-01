import { createHttpServer } from "./app.js";

/**
 * Create a new HTTP server instance.
 */
const server = await createHttpServer({ routesPath: process.argv[2] });

const port = process.env.PORT || 3000;

/**
 * Start the HTTP server listening on a specific port.
 */
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
