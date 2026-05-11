import { MongoClient, Db } from "mongodb";
import { env } from "./env";

let db: Db;

export async function connectDB(): Promise<void> {
  try {
    const client = new MongoClient(env.mongoUri);
    await client.connect();
    db = client.db(env.mongoDbName);
    console.log("MongoDB conectado correctamente");
  } catch (error) {
    console.error("Error conectando MongoDB:", error);
    process.exit(1);
  }
}

export function getDb(): Db {
  if (!db) throw new Error("Base de datos no inicializada");
  return db;
}
