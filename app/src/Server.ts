import express from "express";
import router from "./routes/randomize";
import { createServer } from "node:http";
import { bodyToSchema, xmlBodyParser } from "./middlewares";

export default class Server {
  private readonly app: express.Application;
  private static PORT: number =
    process.env.PORT
    ? parseInt(process.env.PORT)
    : 3000;

  constructor() {
    this.app = express();
    this.app.use(
      express.json(),
      xmlBodyParser,
      bodyToSchema,
      router,
    );
  }

  public start() {
    const server = createServer(this.app);
    server.listen(Server.PORT, () => {
      console.info(`Server is running on http://localhost:${Server.PORT}`);
    });
  }
}
