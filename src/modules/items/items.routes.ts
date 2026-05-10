import { Router } from "express";
import { ItemsController } from "./items.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validate.middleware";
import { createItemSchema, updateItemSchema } from "./items.schema";

const router = Router();
const controller = new ItemsController();

router.post("/", authMiddleware, validate(createItemSchema), controller.create);
router.get("/", authMiddleware, controller.findAll);
router.get("/:id", authMiddleware, controller.findById);
router.put("/:id", authMiddleware, validate(updateItemSchema), controller.update);
router.delete("/:id", authMiddleware, controller.delete);

export default router;
