import { Response, NextFunction } from "express";
import { InventoryService } from "./inventory.service";
import { AuthRequest } from "../../shared/types/auth-request";

export class InventoryController {
  private service = new InventoryService();

  create = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const inventory = await this.service.create(req.body, req.user!.sub);
      res.status(201).json(inventory);
    } catch (error) {
      next(error);
    }
  };

  findAll = async (_req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const inventories = await this.service.findAll();
      res.json(inventories);
    } catch (error) {
      next(error);
    }
  };

  findById = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const inventory = await this.service.findById(req.params.id);
      res.json(inventory);
    } catch (error) {
      next(error);
    }
  };

  findMyInventory = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const inventory = await this.service.findByPlayer(req.user!.sub);
      res.json(inventory);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const inventory = await this.service.update(req.params.id, req.body);
      res.json(inventory);
    } catch (error) {
      next(error);
    }
  };

  addSlot = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const inventory = await this.service.addSlot(req.params.id, req.body);
      res.json(inventory);
    } catch (error) {
      next(error);
    }
  };

  removeSlot = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const slotNumber = parseInt(req.params.slot);
      const inventory = await this.service.removeSlot(req.params.id, slotNumber);
      res.json(inventory);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      await this.service.delete(req.params.id);
      res.json({ message: "Inventario eliminado correctamente" });
    } catch (error) {
      next(error);
    }
  };
}
