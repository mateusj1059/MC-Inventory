import { Request, Response, NextFunction } from "express";
import { AuthService } from "./auth.service";

export class AuthController {
  private service = new AuthService();

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.register(req.body);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.login(req.body);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };
}
