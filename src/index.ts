import dotenv from "dotenv";
import Server from "./Server";
import { DatasetCollection } from "./services/dataset";
import { AppDataSource } from "./AppDataSource";

dotenv.config();

AppDataSource.initialize()
  .then(() => DatasetCollection.loadAll())
  .then(() => console.log("All datasets are loaded"))
  .then(() => new Server().start())
  .catch(console.error);
