import config from "./config.js";
import { createTables } from "./database/createTables.js";
import { runSeeds } from "./database/runSeeds.js";
import { createServer } from "node:http";
import app from "./app.js";

const PORT = config.app.PORT;

createTables();
await runSeeds();

const server = createServer(app);

server.listen(PORT, () => {
  const link = `http://localhost:${PORT}`;
  console.log(
    `[\x1b[1;32mAPP\x1b[0m] Server running at -> \x1b[1;35;4m${link}\x1b[0m\n`
  );
});
