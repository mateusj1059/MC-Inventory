import { Router } from "express";
import { RecipesController } from "./recipes.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validate.middleware";
import { createRecipeSchema, updateRecipeSchema } from "./recipes.schema";

const router = Router();
const controller = new RecipesController();

/**
 * @openapi
 * tags:
 *   name: Recipes
 *   description: Gestión de recetas de crafteo de Minecraft
 */

/**
 * @openapi
 * /recipes:
 *   post:
 *     tags: [Recipes]
 *     summary: Crear una receta
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, resultItemId, resultQuantity, recipeType, ingredients]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Diamond Sword
 *               resultItemId:
 *                 type: string
 *                 example: minecraft:diamond_sword
 *               resultQuantity:
 *                 type: integer
 *                 example: 1
 *               recipeType:
 *                 type: string
 *                 enum: [crafting, smelting, stonecutting, brewing]
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     minecraftId:
 *                       type: string
 *                       example: minecraft:diamond
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *     responses:
 *       201:
 *         description: Receta creada exitosamente
 *       400:
 *         description: Error de validación
 *       401:
 *         description: No autorizado
 *   get:
 *     tags: [Recipes]
 *     summary: Obtener todas las recetas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de recetas
 *       401:
 *         description: No autorizado
 */

/**
 * @openapi
 * /recipes/result/{itemName}:
 *   get:
 *     tags: [Recipes]
 *     summary: Buscar recetas por item resultado
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: itemName
 *         required: true
 *         schema:
 *           type: string
 *         example: diamond_sword
 *     responses:
 *       200:
 *         description: Recetas encontradas
 *       401:
 *         description: No autorizado
 */

/**
 * @openapi
 * /recipes/{id}:
 *   get:
 *     tags: [Recipes]
 *     summary: Obtener una receta por ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Receta encontrada
 *       404:
 *         description: Receta no encontrada
 *   put:
 *     tags: [Recipes]
 *     summary: Actualizar una receta
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               resultQuantity:
 *                 type: integer
 *               recipeType:
 *                 type: string
 *     responses:
 *       200:
 *         description: Receta actualizada
 *       404:
 *         description: Receta no encontrada
 *   delete:
 *     tags: [Recipes]
 *     summary: Eliminar una receta
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Receta eliminada
 *       404:
 *         description: Receta no encontrada
 */

router.post("/", authMiddleware, validate(createRecipeSchema), controller.create);
router.get("/", authMiddleware, controller.findAll);
router.get("/result/:itemName", authMiddleware, controller.findByResultItem);
router.get("/:id", authMiddleware, controller.findById);
router.put("/:id", authMiddleware, validate(updateRecipeSchema), controller.update);
router.delete("/:id", authMiddleware, controller.delete);

export default router;