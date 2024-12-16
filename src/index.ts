import dotenv from "dotenv";
import Server from "./Server";
import { DatasetCollection } from "./services/dataset";
import { TypeOrmDataSource } from "./TypeOrmDataSource";

dotenv.config();

TypeOrmDataSource.initialize()
  .then(() => DatasetCollection.loadAll())
  .then(() => console.log("All datasets are loaded"))
  .catch(console.error);

new Server().start();
