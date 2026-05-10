import { z } from "zod";

const minecraftIdRegex = /^minecraft:[a-z0-9_]+$/;

export const createItemSchema = z.object({
  name: z.string().min(2).max(100),
  minecraftId: z
    .string()
    .regex(minecraftIdRegex, "Formato: minecraft:nombre_item"),
  category: z.enum(["block", "tool", "weapon", "armor", "food", "material", "misc"]),
  quantity: z.number().int().min(1).max(64),
  description: z.string().max(300).optional(),
});

export const updateItemSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  minecraftId: z.string().regex(minecraftIdRegex).optional(),
  category: z.enum(["block", "tool", "weapon", "armor", "food", "material", "misc"]).optional(),
  quantity: z.number().int().min(1).max(64).optional(),
  description: z.string().max(300).optional(),
});

export type CreateItemDto = z.infer<typeof createItemSchema>;
export type UpdateItemDto = z.infer<typeof updateItemSchema>;
