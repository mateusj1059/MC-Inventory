import { UsersRepository } from "./users.repository";
import { UpdateUserDto } from "./users.schema";
import { NotFoundError } from "../../shared/errors/AppError";

export class UsersService {
  private repository = new UsersRepository();

  async findAll() {
    return await this.repository.findAll();
  }

  async findById(id: string) {
    const user = await this.repository.findById(id);
    if (!user) throw new NotFoundError("Usuario");
    return user;
  }

  async update(id: string, data: UpdateUserDto) {
    const user = await this.repository.update(id, data);
    if (!user) throw new NotFoundError("Usuario");
    return user;
  }

  async delete(id: string) {
    await this.findById(id);
    return await this.repository.delete(id);
  }
}
