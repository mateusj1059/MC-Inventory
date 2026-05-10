import { ObjectId } from "mongodb";

export type RecipeType = "crafting" | "smelting" | "stonecutting" | "brewing";

export interface RecipeIngredient {
  minecraftId: string;
  quantity: number;
}

export interface Recipe {
  _id?: ObjectId;
  name: string;
  resultItemId: string;
  resultQuantity: number;
  recipeType: RecipeType;
  ingredients: RecipeIngredient[];
  description?: string;
  isActive: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}
