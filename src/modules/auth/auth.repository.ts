import { getDb } from "../../config/database";
import { User } from "./auth.model";

export class AuthRepository {
  private collection() {
    return getDb().collection<User>("users");
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.collection().findOne({ email });
  }

  async create(user: User): Promise<User> {
    const result = await this.collection().insertOne(user);
    return { _id: result.insertedId, ...user };
  }
}
