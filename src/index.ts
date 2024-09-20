import express from "express";
import dotenv from "dotenv";
import { createServer } from "node:http";
import { logger } from "./middlewares";
import routes from "./routes";

dotenv.config();

const app = express();
app.use(logger, routes);
const server = createServer(app);

server.listen(process.env.PORT || 8080, () => {
  console.info(
    `Server is running on http://localhost:${process.env.PORT || 8080}`
  );
});
