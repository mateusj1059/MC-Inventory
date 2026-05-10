import { Request, Response, NextFunction } from "express";
import { UsersService } from "./users.service";

export class UsersController {
  private service = new UsersService();

  findAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.service.findAll();
      res.json(users);
    } catch (error) {
      next(error);
    }
  };

  findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.service.findById(req.params.id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.service.update(req.params.id, req.body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.service.delete(req.params.id);
      res.json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
      next(error);
    }
  };
}
