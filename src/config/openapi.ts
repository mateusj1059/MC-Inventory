import swaggerJsdoc from "swagger-jsdoc";
import path from "path";

export const openApiSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Minecraft Inventory API",
      version: "1.0.0",
      description: "Documentación de endpoints de la API de inventario de Minecraft",
    },
    servers: [
      {
        url: "http://localhost:3000/api",
        description: "Servidor local",
      },
      {
        url: "https://mc-inventory.onrender.com/api",
        description: "Servidor Producción",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Ingresa el token JWT en formato Bearer",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [path.join(__dirname, "../modules/**/*.routes.{ts,js}")],
});