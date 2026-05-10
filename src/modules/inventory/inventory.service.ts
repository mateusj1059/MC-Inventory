import { InventoryRepository } from "./inventory.repository";
import { Inventory } from "./inventory.model";
import { CreateInventoryDto, UpdateInventoryDto, AddSlotDto } from "./inventory.schema";
import { NotFoundError, BadRequestError, ConflictError } from "../../shared/errors/AppError";

export class InventoryService {
  private repository = new InventoryRepository();

  async create(data: CreateInventoryDto, userId: string): Promise<Inventory> {
    const existing = await this.repository.findByPlayer(userId);
    if (existing) throw new ConflictError("Este jugador ya tiene un inventario creado");

    const now = new Date();
    return await this.repository.create({
      playerId: userId,
      playerName: data.playerName,
      slots: data.slots ?? [],
      maxSlots: 36,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    });
  }

  async findAll(): Promise<Inventory[]> {
    return await this.repository.findAll();
  }

  async findById(id: string): Promise<Inventory> {
    const inventory = await this.repository.findById(id);
    if (!inventory) throw new NotFoundError("Inventario");
    return inventory;
  }

  async findByPlayer(playerId: string): Promise<Inventory> {
    const inventory = await this.repository.findByPlayer(playerId);
    if (!inventory) throw new NotFoundError("Inventario del jugador");
    return inventory;
  }

  async update(id: string, data: UpdateInventoryDto): Promise<Inventory> {
    await this.findById(id);
    const updated = await this.repository.update(id, data);
    if (!updated) throw new NotFoundError("Inventario");
    return updated;
  }

  async addSlot(id: string, slotData: AddSlotDto): Promise<Inventory> {
    const inventory = await this.findById(id);

    const slotOccupied = inventory.slots.find((s) => s.slot === slotData.slot);
    if (slotOccupied) {
      throw new BadRequestError(`El slot ${slotData.slot} ya está ocupado`);
    }

    if (inventory.slots.length >= inventory.maxSlots) {
      throw new BadRequestError("El inventario está lleno");
    }

    const updated = await this.repository.addSlot(id, slotData);
    if (!updated) throw new NotFoundError("Inventario");
    return updated;
  }

  async removeSlot(id: string, slotNumber: number): Promise<Inventory> {
    await this.findById(id);
    const updated = await this.repository.removeSlot(id, slotNumber);
    if (!updated) throw new NotFoundError("Inventario");
    return updated;
  }

  async delete(id: string) {
    await this.findById(id);
    return await this.repository.delete(id);
  }
}
