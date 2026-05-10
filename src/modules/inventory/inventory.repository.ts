import { getDb } from "../../config/database";
import { Inventory, InventorySlot } from "./inventory.model";
import { ObjectId } from "mongodb";

export class InventoryRepository {
  private collection() {
    return getDb().collection<Inventory>("inventories");
  }

  async create(data: Inventory): Promise<Inventory> {
    const result = await this.collection().insertOne(data);
    return { _id: result.insertedId, ...data };
  }

  async findAll(): Promise<Inventory[]> {
    return await this.collection().find({ isActive: true }).toArray();
  }

  async findById(id: string): Promise<Inventory | null> {
    if (!ObjectId.isValid(id)) throw new Error("ID inválido");
    return await this.collection().findOne({ _id: new ObjectId(id) });
  }

  async findByPlayer(playerId: string): Promise<Inventory | null> {
    return await this.collection().findOne({ playerId, isActive: true });
  }

  async update(id: string, data: Partial<Inventory>): Promise<Inventory | null> {
    if (!ObjectId.isValid(id)) throw new Error("ID inválido");
    await this.collection().updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...data, updatedAt: new Date() } }
    );
    return this.findById(id);
  }

  async addSlot(id: string, slot: InventorySlot): Promise<Inventory | null> {
    if (!ObjectId.isValid(id)) throw new Error("ID inválido");
    await this.collection().updateOne(
      { _id: new ObjectId(id) },
      {
        $push: { slots: slot },
        $set: { updatedAt: new Date() },
      }
    );
    return this.findById(id);
  }

  async removeSlot(id: string, slotNumber: number): Promise<Inventory | null> {
    if (!ObjectId.isValid(id)) throw new Error("ID inválido");
    await this.collection().updateOne(
      { _id: new ObjectId(id) },
      {
        $pull: { slots: { slot: slotNumber } },
        $set: { updatedAt: new Date() },
      }
    );
    return this.findById(id);
  }

  async delete(id: string) {
    if (!ObjectId.isValid(id)) throw new Error("ID inválido");
    return await this.collection().updateOne(
      { _id: new ObjectId(id) },
      { $set: { isActive: false, updatedAt: new Date() } }
    );
  }
}
