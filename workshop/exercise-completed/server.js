import { createHttpServer } from "./app.js";

const server = createHttpServer();

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
