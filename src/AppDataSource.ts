import "reflect-metadata";
import { DataSource } from "typeorm";
import { Log } from "./entity/Log";
import {
  NudgerData,
  OpenFoodFactsData,
  WorldCitiesData,
} from "./services/data";

export const AppDataSource = new DataSource({
  type: "mariadb",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "root",
  database: "db",
  synchronize: true,
  logging: false,
  entities: [Log, NudgerData, OpenFoodFactsData, WorldCitiesData],
  subscribers: [],
  migrations: [],
});
