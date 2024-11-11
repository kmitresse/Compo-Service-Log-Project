import { MongoClient, Db } from "mongodb";

const uri = "mongodb://localhost:27017";
const dbName = "db";

let db: Db;

export const getDatabaseConnexion = async (): Promise<Db> => {
  if (!db) {
    const client = new MongoClient(uri, {
      auth: { username: "root", password: "root" },
      connectTimeoutMS: 60000,
      socketTimeoutMS: 60000,
    });
    await client.connect();
    db = client.db(dbName);
  }
  return db;
};
