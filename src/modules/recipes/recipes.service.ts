import { RecipesRepository } from "./recipes.repository";
import { Recipe } from "./recipes.model";
import { CreateRecipeDto, UpdateRecipeDto } from "./recipes.schema";
import { NotFoundError } from "../../shared/errors/AppError";

export class RecipesService {
  private repository = new RecipesRepository();

  async create(data: CreateRecipeDto, userId: string): Promise<Recipe> {
    const now = new Date();
    return await this.repository.create({
      ...data,
      isActive: true,
      createdBy: userId,
      createdAt: now,
      updatedAt: now,
    });
  }

  async findAll(): Promise<Recipe[]> {
    return await this.repository.findAll();
  }

  async findById(id: string): Promise<Recipe> {
    const recipe = await this.repository.findById(id);
    if (!recipe) throw new NotFoundError("Receta");
    return recipe;
  }

  async findByResultItem(minecraftId: string): Promise<Recipe[]> {
    return await this.repository.findByResultItem(minecraftId);
  }

  async update(id: string, data: UpdateRecipeDto): Promise<Recipe> {
    await this.findById(id);
    const updated = await this.repository.update(id, data);
    if (!updated) throw new NotFoundError("Receta");
    return updated;
  }

  async delete(id: string) {
    await this.findById(id);
    return await this.repository.delete(id);
  }
}
