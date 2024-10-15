import "reflect-metadata";
import { DataSource } from "typeorm";
import { Log } from "./entity/Log";

export const AppDataSource = new DataSource({
  type: "mariadb",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "root",
  database: "db",
  synchronize: true,
  logging: true,
  entities: [Log],
  subscribers: [],
  migrations: [],
});
