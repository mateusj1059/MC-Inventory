import dotenv from "dotenv";
dotenv.config();

export const env = {
  port: Number(process.env.PORT) || 3000,
  mongoUri: process.env.MONGO_URI || 'mongodb://jhoncito2105_db_user:B%40nfield2105@ac-tks3m6r-shard-00-00.zf6yqzr.mongodb.net:27017,ac-tks3m6r-shard-00-01.zf6yqzr.mongodb.net:27017,ac-tks3m6r-shard-00-02.zf6yqzr.mongodb.net:27017/?ssl=true&replicaSet=atlas-8rpwzd-shard-0&authSource=admin&appName=Project',
  mongoDbName: process.env.MONGO_DB_NAME || "minecraft_inventory",
  jwtSecret: process.env.JWT_SECRET || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30',
  jwtExpiration: process.env.JWT_EXPIRATION || "10h",
};
