import { Router } from "express";
import { ItemsController } from "./items.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validate.middleware";
import { createItemSchema, updateItemSchema } from "./items.schema";

const router = Router();
const controller = new ItemsController();

/**
 * @openapi
 * tags:
 *   name: Items
 *   description: Gestión de items de Minecraft
 */

/**
 * @openapi
 * /items:
 *   post:
 *     tags: [Items]
 *     summary: Crear un item
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, minecraftId, category, quantity]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Diamond Sword
 *               minecraftId:
 *                 type: string
 *                 example: minecraft:diamond_sword
 *               category:
 *                 type: string
 *                 enum: [block, tool, weapon, armor, food, material, misc]
 *               quantity:
 *                 type: integer
 *                 example: 1
 *               description:
 *                 type: string
 *                 example: Espada de diamante
 *     responses:
 *       201:
 *         description: Item creado exitosamente
 *       400:
 *         description: Error de validación
 *       401:
 *         description: No autorizado
 *   get:
 *     tags: [Items]
 *     summary: Obtener todos los items
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de items
 *       401:
 *         description: No autorizado
 */

/**
 * @openapi
 * /items/{id}:
 *   get:
 *     tags: [Items]
 *     summary: Obtener un item por ID
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
 *         description: Item encontrado
 *       404:
 *         description: Item no encontrado
 *   put:
 *     tags: [Items]
 *     summary: Actualizar un item
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
 *               quantity:
 *                 type: integer
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Item actualizado
 *       404:
 *         description: Item no encontrado
 *   delete:
 *     tags: [Items]
 *     summary: Eliminar un item
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
 *         description: Item eliminado
 *       404:
 *         description: Item no encontrado
 */

router.post("/", authMiddleware, validate(createItemSchema), controller.create);
router.get("/", authMiddleware, controller.findAll);
router.get("/:id", authMiddleware, controller.findById);
router.put("/:id", authMiddleware, validate(updateItemSchema), controller.update);
router.delete("/:id", authMiddleware, controller.delete);

export default router;
