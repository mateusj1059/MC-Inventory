import { Router } from "express";
import AuthRouter from "../../modules/auth/auth.routes";
import UsersRouter from "../../modules/users/users.routes";
import ItemsRouter from "../../modules/items/items.routes";
import RecipesRouter from "../../modules/recipes/recipes.routes";
import InventoryRouter from "../../modules/inventory/inventory.routes";

const router = Router();

router.use("/auth", AuthRouter);
router.use("/users", UsersRouter);
router.use("/items", ItemsRouter);
router.use("/recipes", RecipesRouter);
router.use("/inventory", InventoryRouter);

export default router;
