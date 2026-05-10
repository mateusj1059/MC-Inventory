import { Response, NextFunction } from "express";
import { RecipesService } from "./recipes.service";
import { AuthRequest } from "../../shared/types/auth-request";

export class RecipesController {
  private service = new RecipesService();

  create = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const recipe = await this.service.create(req.body, req.user!.sub);
      res.status(201).json(recipe);
    } catch (error) {
      next(error);
    }
  };

  findAll = async (_req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const recipes = await this.service.findAll();
      res.json(recipes);
    } catch (error) {
      next(error);
    }
  };

  findById = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const recipe = await this.service.findById(req.params.id);
      res.json(recipe);
    } catch (error) {
      next(error);
    }
  };

  findByResultItem = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const minecraftId = `minecraft:${req.params.itemName}`;
      const recipes = await this.service.findByResultItem(minecraftId);
      res.json(recipes);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const recipe = await this.service.update(req.params.id, req.body);
      res.json(recipe);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      await this.service.delete(req.params.id);
      res.json({ message: "Receta eliminada" });
    } catch (error) {
      next(error);
    }
  };
}
