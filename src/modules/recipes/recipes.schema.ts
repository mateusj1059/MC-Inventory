import { z } from "zod";

const minecraftIdRegex = /^minecraft:[a-z0-9_]+$/;

const ingredientSchema = z.object({
  minecraftId: z.string().regex(minecraftIdRegex, "Formato: minecraft:nombre_item"),
  quantity: z.number().int().min(1).max(64),
});

export const createRecipeSchema = z.object({
  name: z.string().min(2).max(100),
  resultItemId: z.string().regex(minecraftIdRegex, "Formato: minecraft:nombre_item"),
  resultQuantity: z.number().int().min(1),
  recipeType: z.enum(["crafting", "smelting", "stonecutting", "brewing"]),
  ingredients: z.array(ingredientSchema).min(1).max(9),
  description: z.string().max(300).optional(),
});

export const updateRecipeSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  resultItemId: z.string().regex(minecraftIdRegex).optional(),
  resultQuantity: z.number().int().min(1).optional(),
  recipeType: z.enum(["crafting", "smelting", "stonecutting", "brewing"]).optional(),
  ingredients: z.array(ingredientSchema).min(1).max(9).optional(),
  description: z.string().max(300).optional(),
});

export type CreateRecipeDto = z.infer<typeof createRecipeSchema>;
export type UpdateRecipeDto = z.infer<typeof updateRecipeSchema>;
