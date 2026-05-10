import { getDb } from "../../config/database";
import { User } from "./users.model";
import { ObjectId } from "mongodb";

export class UsersRepository {
  private collection() {
    return getDb().collection<User>("users");
  }

  async findAll(): Promise<Omit<User, "password">[]> {
    return await this.collection()
      .find({ isActive: true }, { projection: { password: 0 } })
      .toArray();
  }

  async findById(id: string): Promise<User | null> {
    if (!ObjectId.isValid(id)) throw new Error("ID inválido");
    return await this.collection().findOne(
      { _id: new ObjectId(id) },
      { projection: { password: 0 } }
    );
  }

  async update(id: string, data: Partial<User>): Promise<User | null> {
    if (!ObjectId.isValid(id)) throw new Error("ID inválido");
    await this.collection().updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...data, updatedAt: new Date() } }
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
