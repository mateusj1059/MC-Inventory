import dotenv from "dotenv";
dotenv.config();

export const env = {
  port: Number(process.env.PORT) || 3000,
  mongoUri: process.env.MONGO_URI || "",
  mongoDbName: process.env.MONGO_DB_NAME || "minecraft_inventory",
  jwtSecret: process.env.JWT_SECRET || "secret",
  jwtExpiration: process.env.JWT_EXPIRATION || "10h",
};
