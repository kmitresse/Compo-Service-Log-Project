import "reflect-metadata";
import { DataSource } from "typeorm";
import { Log } from "./entity/Log";

export const TypeOrmDataSource = new DataSource({
  type: "mariadb",
  host: process.env.MARIADB_HOST || "localhost",
  port: process.env.MARIADB_PORT ? parseInt(process.env.MARIADB_PORT) : 3306,
  username: process.env.MARIADB_USER || "root",
  password: process.env.MARIADB_PASSWORD || "root",
  database: process.env.MARIADB_DATABASE || "database",
  synchronize: true,
  logging: false,
  entities: [Log],
  subscribers: [],
  migrations: [],
});
