import { getDb } from "../../config/database";
import { Item } from "./items.model";
import { ObjectId } from "mongodb";

export class ItemsRepository {
  private collection() {
    return getDb().collection<Item>("items");
  }

  async create(data: Item): Promise<Item> {
    const result = await this.collection().insertOne(data);
    return { _id: result.insertedId, ...data };
  }

  async findAll(): Promise<Item[]> {
    return await this.collection().find({ isActive: true }).toArray();
  }

  async findById(id: string): Promise<Item | null> {
    if (!ObjectId.isValid(id)) throw new Error("ID inválido");
    return await this.collection().findOne({ _id: new ObjectId(id) });
  }

  async update(id: string, data: Partial<Item>): Promise<Item | null> {
    if (!ObjectId.isValid(id)) throw new Error("ID inválido");
    await this.collection().updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...data, updatedAt: new Date() } }
    );
    return this.findById(id);
  }

  async delete(id: string) {
    if (!ObjectId.isValid(id)) throw new Error("ID inválido");
    return await this.collection().deleteOne({ _id: new ObjectId(id) });
  }
}
