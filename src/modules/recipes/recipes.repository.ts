import { getDb } from "../../config/database";
import { Recipe } from "./recipes.model";
import { ObjectId } from "mongodb";

export class RecipesRepository {
  private collection() {
    return getDb().collection<Recipe>("recipes");
  }

  async create(data: Recipe): Promise<Recipe> {
    const result = await this.collection().insertOne(data);
    return { _id: result.insertedId, ...data };
  }

  async findAll(): Promise<Recipe[]> {
    return await this.collection().find({ isActive: true }).toArray();
  }

  async findById(id: string): Promise<Recipe | null> {
    if (!ObjectId.isValid(id)) throw new Error("ID inválido");
    return await this.collection().findOne({ _id: new ObjectId(id) });
  }

  async findByResultItem(minecraftId: string): Promise<Recipe[]> {
    return await this.collection()
      .find({ resultItemId: minecraftId, isActive: true })
      .toArray();
  }

  async update(id: string, data: Partial<Recipe>): Promise<Recipe | null> {
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
