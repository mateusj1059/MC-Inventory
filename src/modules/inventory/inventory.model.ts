import { ObjectId } from "mongodb";

export interface InventorySlot {
  minecraftId: string;  // ej: "minecraft:diamond_sword"
  itemName: string;     // ej: "Diamond Sword"
  quantity: number;
  slot: number;         // posición en el inventario (0-35)
}

export interface Inventory {
  _id?: ObjectId;
  playerId: string;       // referencia al userId
  playerName: string;     // nombre del jugador
  slots: InventorySlot[]; // items en el inventario
  maxSlots: number;       // 36 por defecto (inventario Minecraft estándar)
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
