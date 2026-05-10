import { z } from "zod";

const minecraftIdRegex = /^minecraft:[a-z0-9_]+$/;

const slotSchema = z.object({
  minecraftId: z.string().regex(minecraftIdRegex, "Formato: minecraft:nombre_item"),
  itemName: z.string().min(1, "El nombre del item es requerido"),
  quantity: z.number().int().min(1).max(64),
  slot: z.number().int().min(0).max(35, "El slot debe estar entre 0 y 35"),
});

export const createInventorySchema = z.object({
  playerName: z.string().min(2, "El nombre del jugador debe tener mínimo 2 caracteres").max(50),
  slots: z.array(slotSchema).max(36, "El inventario no puede tener más de 36 slots").default([]),
});

export const updateInventorySchema = z.object({
  playerName: z.string().min(2).max(50).optional(),
  slots: z.array(slotSchema).max(36).optional(),
});

export const addSlotSchema = z.object({
  minecraftId: z.string().regex(minecraftIdRegex, "Formato: minecraft:nombre_item"),
  itemName: z.string().min(1),
  quantity: z.number().int().min(1).max(64),
  slot: z.number().int().min(0).max(35),
});

export type CreateInventoryDto = z.infer<typeof createInventorySchema>;
export type UpdateInventoryDto = z.infer<typeof updateInventorySchema>;
export type AddSlotDto = z.infer<typeof addSlotSchema>;
