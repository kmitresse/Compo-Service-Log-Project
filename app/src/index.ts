import dotenv from "dotenv";
import Server from "./Server";
import { DatasetCollection } from "./services/dataset";
import { TypeOrmDataSource } from "./TypeOrmDataSource";

dotenv.config();

TypeOrmDataSource.initialize().then(() => {
  new Server().start();
  DatasetCollection.loadAll()
    .then(() => console.log("All datasets are loaded"))
    .catch(console.error);
});
