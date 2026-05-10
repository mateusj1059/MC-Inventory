import { Request, Response, NextFunction } from "express";
import { AppError } from "../shared/errors/AppError";
import { ZodError } from "zod";

export function errorMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  // Error de validación Zod
  if (err instanceof ZodError) {
    return res.status(400).json({
      status: "error",
      message: "Error de validación",
      errors: err.errors.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      })),
    });
  }

  // Error personalizado de la app
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  // Error genérico
  console.error("Error no controlado:", err);
  return res.status(500).json({
    status: "error",
    message: "Error interno del servidor",
  });
}
