import { createServer } from "./app.js";

const server = createServer();

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
