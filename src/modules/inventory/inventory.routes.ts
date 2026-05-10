import { Router } from "express";
import { InventoryController } from "./inventory.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validate.middleware";
import { createInventorySchema, updateInventorySchema, addSlotSchema } from "./inventory.schema";

const router = Router();
const controller = new InventoryController();

router.post("/", authMiddleware, validate(createInventorySchema), controller.create);
router.get("/", authMiddleware, controller.findAll);
router.get("/me", authMiddleware, controller.findMyInventory);
router.get("/:id", authMiddleware, controller.findById);
router.put("/:id", authMiddleware, validate(updateInventorySchema), controller.update);
router.post("/:id/slots", authMiddleware, validate(addSlotSchema), controller.addSlot);
router.delete("/:id/slots/:slot", authMiddleware, controller.removeSlot);
router.delete("/:id", authMiddleware, controller.delete);

export default router;
