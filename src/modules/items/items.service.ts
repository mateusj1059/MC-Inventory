import { ItemsRepository } from "./items.repository";
import { Item } from "./items.model";
import { CreateItemDto, UpdateItemDto } from "./items.schema";
import { NotFoundError } from "../../shared/errors/AppError";

export class ItemsService {
  private repository = new ItemsRepository();

  async create(data: CreateItemDto, userId: string): Promise<Item> {
    const now = new Date();
    return await this.repository.create({
      ...data,
      isActive: true,
      createdBy: userId,
      createdAt: now,
      updatedAt: now,
    });
  }

  async findAll(): Promise<Item[]> {
    return await this.repository.findAll();
  }

  async findById(id: string): Promise<Item> {
    const item = await this.repository.findById(id);
    if (!item) throw new NotFoundError("Item");
    return item;
  }

  async update(id: string, data: UpdateItemDto): Promise<Item> {
    await this.findById(id);
    const updated = await this.repository.update(id, data);
    if (!updated) throw new NotFoundError("Item");
    return updated;
  }

  async delete(id: string) {
    await this.findById(id);
    return await this.repository.delete(id);
  }
}
