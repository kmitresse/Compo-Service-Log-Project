import dotenv from "dotenv";
import Server from "./Server";
import { DatasetCollection } from "./services/dataset";
import { TypeOrmDataSource } from "./TypeOrmDataSource";

dotenv.config();

// 1. initialize database connexions

// 2. Load all datasets

// 3. Start the server

TypeOrmDataSource.initialize()
  .then(() => DatasetCollection.loadAll())
  .then(() => console.log("All datasets are loaded"))
  .then(() => new Server().start())
  .catch(console.error);
