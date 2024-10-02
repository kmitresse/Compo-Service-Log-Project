import express from "express";
import routes from "./routes";
import { createServer } from "node:http";
import { logger, xmlBodyParser } from "./middlewares";

export default class Server {
  private readonly app: express.Application;
  private static PORT: number = 4321;

  constructor() {
    this.app = express();
    this.app.use(express.json(), xmlBodyParser, logger, routes);
  }

  public start() {
    const server = createServer(this.app);
    server.listen(Server.PORT, () => {
      console.info(`Server is running on http://localhost:${Server.PORT}`);
    });
  }
}
