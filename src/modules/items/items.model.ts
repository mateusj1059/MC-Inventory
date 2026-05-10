import { ObjectId } from "mongodb";

export type ItemCategory =
  | "block"
  | "tool"
  | "weapon"
  | "armor"
  | "food"
  | "material"
  | "misc";

export interface Item {
  _id?: ObjectId;
  name: string;
  minecraftId: string;
  category: ItemCategory;
  quantity: number;
  description?: string;
  isActive: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}
