import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(2, "El nombre debe tener mínimo 2 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener mínimo 6 caracteres"),
});

export const updateUserSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;
export type UpdateUserDto = z.infer<typeof updateUserSchema>;
