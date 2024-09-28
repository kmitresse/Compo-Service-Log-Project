import dotenv from "dotenv";
import Server from "./Server";
import { DatasetCollection } from "./services/dataset";

dotenv.config();

DatasetCollection.loadAll()
                 .then(() => console.log("All datasets are loaded"))
                 .then(() => new Server().start())
                 .catch(console.error);
