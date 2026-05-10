import { AuthRepository } from "./auth.repository";
import { RegisterDto, LoginDto } from "./auth.schema";
import { hashPassword, comparePassword } from "../../libs/bcrypt";
import { generateToken } from "../../libs/jwt";
import { ConflictError, UnauthorizedError } from "../../shared/errors/AppError";

export class AuthService {
  private repository = new AuthRepository();

  async register(data: RegisterDto) {
    const exists = await this.repository.findByEmail(data.email);
    if (exists) throw new ConflictError("El email ya está registrado");

    const hashed = await hashPassword(data.password);
    const now = new Date();

    const user = await this.repository.create({
      name: data.name,
      email: data.email,
      password: hashed,
      role: "user",
      isActive: true,
      createdAt: now,
      updatedAt: now,
    });

    const token = generateToken({
      sub: user._id!.toString(),
      email: user.email,
      role: user.role,
    });

    return {
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      token,
    };
  }

  async login(data: LoginDto) {
    const user = await this.repository.findByEmail(data.email);
    if (!user) throw new UnauthorizedError("Credenciales inválidas");

    const valid = await comparePassword(data.password, user.password);
    if (!valid) throw new UnauthorizedError("Credenciales inválidas");

    const token = generateToken({
      sub: user._id!.toString(),
      email: user.email,
      role: user.role,
    });

    return {
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      token,
    };
  }
}
