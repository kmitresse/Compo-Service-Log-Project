import dotenv from "dotenv";
import Server from "./Server";
import NudgerDatasetService from "./services/dataset/NudgerDatasetService";

dotenv.config();

Promise.all([NudgerDatasetService.loadDataset()])
  .then(() => new Server().start())
  .catch(console.error);
