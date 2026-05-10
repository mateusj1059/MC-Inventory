import { Response, NextFunction } from "express";
import { ItemsService } from "./items.service";
import { AuthRequest } from "../../shared/types/auth-request";

export class ItemsController {
  private service = new ItemsService();

  create = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const item = await this.service.create(req.body, req.user!.sub);
      res.status(201).json(item);
    } catch (error) {
      next(error);
    }
  };

  findAll = async (_req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const items = await this.service.findAll();
      res.json(items);
    } catch (error) {
      next(error);
    }
  };

  findById = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const item = await this.service.findById(req.params.id);
      res.json(item);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const item = await this.service.update(req.params.id, req.body);
      res.json(item);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      await this.service.delete(req.params.id);
      res.json({ message: "Item eliminado del inventario" });
    } catch (error) {
      next(error);
    }
  };
}
