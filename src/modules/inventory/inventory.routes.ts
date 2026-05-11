import { Router } from "express";
import { InventoryController } from "./inventory.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validate.middleware";
import { createInventorySchema, updateInventorySchema, addSlotSchema } from "./inventory.schema";

const router = Router();
const controller = new InventoryController();

/**
 * @openapi
 * tags:
 *   name: Inventory
 *   description: Gestión de inventario por jugador
 */

/**
 * @openapi
 * /inventory:
 *   post:
 *     tags: [Inventory]
 *     summary: Crear inventario de un jugador
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [playerName]
 *             properties:
 *               playerName:
 *                 type: string
 *                 example: Jhoncito
 *     responses:
 *       201:
 *         description: Inventario creado exitosamente
 *       409:
 *         description: El jugador ya tiene un inventario
 *   get:
 *     tags: [Inventory]
 *     summary: Obtener todos los inventarios
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de inventarios
 *       401:
 *         description: No autorizado
 */

/**
 * @openapi
 * /inventory/me:
 *   get:
 *     tags: [Inventory]
 *     summary: Obtener el inventario del jugador autenticado
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Inventario del jugador
 *       404:
 *         description: Inventario no encontrado
 */

/**
 * @openapi
 * /inventory/{id}:
 *   get:
 *     tags: [Inventory]
 *     summary: Obtener inventario por ID
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
 *         description: Inventario encontrado
 *       404:
 *         description: Inventario no encontrado
 *   put:
 *     tags: [Inventory]
 *     summary: Actualizar inventario
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
 *               playerName:
 *                 type: string
 *                 example: Jhoncito Updated
 *     responses:
 *       200:
 *         description: Inventario actualizado
 *       404:
 *         description: Inventario no encontrado
 *   delete:
 *     tags: [Inventory]
 *     summary: Eliminar inventario
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
 *         description: Inventario eliminado
 *       404:
 *         description: Inventario no encontrado
 */

/**
 * @openapi
 * /inventory/{id}/slots:
 *   post:
 *     tags: [Inventory]
 *     summary: Agregar un item a un slot del inventario
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [minecraftId, itemName, quantity, slot]
 *             properties:
 *               minecraftId:
 *                 type: string
 *                 example: minecraft:diamond_sword
 *               itemName:
 *                 type: string
 *                 example: Diamond Sword
 *               quantity:
 *                 type: integer
 *                 example: 1
 *               slot:
 *                 type: integer
 *                 example: 0
 *     responses:
 *       200:
 *         description: Item agregado al inventario
 *       400:
 *         description: Slot ocupado o inventario lleno
 */

/**
 * @openapi
 * /inventory/{id}/slots/{slot}:
 *   delete:
 *     tags: [Inventory]
 *     summary: Eliminar un item de un slot
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: slot
 *         required: true
 *         schema:
 *           type: integer
 *         example: 0
 *     responses:
 *       200:
 *         description: Item eliminado del slot
 *       404:
 *         description: Inventario no encontrado
 */

router.post("/", authMiddleware, validate(createInventorySchema), controller.create);
router.get("/", authMiddleware, controller.findAll);
router.get("/me", authMiddleware, controller.findMyInventory);
router.get("/:id", authMiddleware, controller.findById);
router.put("/:id", authMiddleware, validate(updateInventorySchema), controller.update);
router.post("/:id/slots", authMiddleware, validate(addSlotSchema), controller.addSlot);
router.delete("/:id/slots/:slot", authMiddleware, controller.removeSlot);
router.delete("/:id", authMiddleware, controller.delete);

export default router;
