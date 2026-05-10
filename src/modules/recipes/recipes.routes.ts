import { Router } from "express";
import { RecipesController } from "./recipes.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validate.middleware";
import { createRecipeSchema, updateRecipeSchema } from "./recipes.schema";

const router = Router();
const controller = new RecipesController();

router.post("/", authMiddleware, validate(createRecipeSchema), controller.create);
router.get("/", authMiddleware, controller.findAll);
router.get("/result/:itemName", authMiddleware, controller.findByResultItem);
router.get("/:id", authMiddleware, controller.findById);
router.put("/:id", authMiddleware, validate(updateRecipeSchema), controller.update);
router.delete("/:id", authMiddleware, controller.delete);

export default router;
