import { Router } from "express";
import { UsersController } from "./users.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validate.middleware";
import { updateUserSchema } from "./users.schema";

const router = Router();
const controller = new UsersController();

router.get("/", authMiddleware, controller.findAll);
router.get("/:id", authMiddleware, controller.findById);
router.put("/:id", authMiddleware, validate(updateUserSchema), controller.update);
router.delete("/:id", authMiddleware, controller.delete);

export default router;
