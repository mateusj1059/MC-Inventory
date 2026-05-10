import { Response, NextFunction } from "express";
import { verifyToken } from "../libs/jwt";
import { AuthRequest } from "../shared/types/auth-request";
import { UnauthorizedError } from "../shared/errors/AppError";

export function authMiddleware(
  req: AuthRequest,
  _res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedError("Token no proporcionado");
    }

    const token = authHeader.split(" ")[1];
    const payload = verifyToken(token);
    req.user = {
      sub: payload.sub as string,
      email: payload.email,
      role: payload.role,
    };
    next();
  } catch {
    next(new UnauthorizedError("Token inválido o expirado"));
  }
}
