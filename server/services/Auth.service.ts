import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { JWT } from "../utils/jwt";

export class AuthService {
  private prisma: PrismaClient;
  private jwt: JWT;

  constructor() {
    this.prisma = new PrismaClient();
    this.jwt = new JWT();
  }
  async register(email: string, password: string, name: string) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: { email, password: hashedPassword, name },
      select: { id: true, email: true, name: true },
    });

    const token = this.jwt.generateToken(user.id);
    return { user, token };
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    const token = this.jwt.generateToken(user.id);
    return { user, token };
  }
}
