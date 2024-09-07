import jwt from "jsonwebtoken";
import { BaseEnvironment } from "../Environment";

const env = new BaseEnvironment();

export class JWT {
  private readonly JWT_SECRET = env.JWT_SECRET;
  generateToken(userId: number): string {
    return jwt.sign({ userId }, this.JWT_SECRET, { expiresIn: "1d" });
  }

  verifyToken(token: string): any {
    return jwt.verify(token, this.JWT_SECRET);
  }
}
