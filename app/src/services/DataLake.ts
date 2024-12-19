import { MongoClient, Db } from "mongodb";

const uri: string = `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}`;
const dbName: string = process.env.MONGODB_DATABASE || "database";

let db: Db;

export const getDatabaseConnexion = async (): Promise<Db> => {
  if (!db) {
    const client = new MongoClient(uri, {
      auth: {
        username: process.env.MONGODB_USER || "user",
        password: process.env.MONGODB_PASSWORD || "password",
      },
      connectTimeoutMS: 60000,
      socketTimeoutMS: 60000,
    });
    await client.connect();
    db = client.db(dbName);
  }
  return db;
};
