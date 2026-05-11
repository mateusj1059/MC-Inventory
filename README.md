# Backend API - Minecraft Inventory

API REST construida con Node.js, Express, MongoDB y TypeScript, siguiendo buenas prácticas como arquitectura modular, validaciones con Zod, documentación con Swagger y autenticación con JWT.

## Tecnologías utilizadas

- Node.js
- Express
- MongoDB (Atlas)
- TypeScript
- JWT (jsonwebtoken) — Autenticación
- bcrypt — Encriptación de contraseñas
- Zod — Validación de datos
- Swagger (OpenAPI) — Documentación de API
- Helmet — Seguridad HTTP
- CORS
- Morgan — Logging

## Estructura del proyecto

```
src/
│
├── modules/
│   ├── auth/
│   ├── users/
│   ├── items/
│   ├── recipes/
│   └── inventory/
│
├── api/
│   └── v1/
├── config/
├── middlewares/
├── libs/
├── shared/
└── server.ts
```

## Instalación

```bash
git clone https://github.com/mateusj1059/MC-Inventory.git
cd MC-Inventory
npm install
```

## Variables de entorno

Crea un archivo `.env` en la raíz del proyecto basado en `.env.example`:

```
PORT=3000
MONGO_URI=tu_uri_de_mongodb
MONGO_DB_NAME=minecraft_inventory
JWT_SECRET=tu_secreto
JWT_EXPIRATION=10h
```

## Ejecución

Desarrollo:
```bash
npm run dev
```

Producción:
```bash
npm run build
npm start
```

## Autenticación

Todos los endpoints (excepto `/api/auth/register` y `/api/auth/login`) requieren un token JWT en el header:

```
Authorization: Bearer <token>
```

## Módulos

| Módulo | Descripción |
|---|---|
| auth | Registro e inicio de sesión con JWT |
| users | Gestión de usuarios |
| items | Items y bloques de Minecraft |
| recipes | Recetas de crafteo |
| inventory | Inventario por jugador |

## Deploy

La API está desplegada en Render y disponible en:

Base URL:
```
https://mc-inventory.onrender.com
```

Endpoints disponibles:
```
https://mc-inventory.onrender.com/api/auth
https://mc-inventory.onrender.com/api/users
https://mc-inventory.onrender.com/api/items
https://mc-inventory.onrender.com/api/recipes
https://mc-inventory.onrender.com/api/inventory
```

## Swagger

```
https://mc-inventory.onrender.com/api/docs
```

## Autor

Jhon Jairo Mateus Rodríguez  
Programación 3 — Grupo S6D
