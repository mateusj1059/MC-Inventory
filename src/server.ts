import { app } from "./app";
import { connectDB } from "./config/database";
import { env } from "./config/env";

connectDB();

app.listen(env.port, () => {
  console.log(`🚀 Servidor corriendo en puerto ${env.port}`);
});
