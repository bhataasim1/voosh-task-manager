import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { JWT } from "../utils/jwt";
import { OAuth2Client } from "google-auth-library";
import { BaseEnvironment } from "../Environment";

export class AuthService {
  private prisma: PrismaClient;
  private jwt: JWT;
  private env: BaseEnvironment;
  private googleClient: OAuth2Client;

  constructor() {
    this.prisma = new PrismaClient();
    this.jwt = new JWT();
    this.env = new BaseEnvironment();
    this.googleClient = new OAuth2Client(
      this.env.GOOGLE_CLIENT_ID,
      this.env.GOOGLE_CLIENT_SECRET,
      this.env.GOOGLE_REDIRECT_URI
    );
  }
  async register(email: string, password: string, name: string) {
    const existingUser = await this.prisma.user.findFirst({
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
    const user = await this.prisma.user.findFirst({ where: { email } });
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

  async getGoogleAuthUrl() {
    const scopes = [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ];

    return this.googleClient.generateAuthUrl({
      access_type: "offline",
      scope: scopes,
    });
  }

  async handleGoogleCallback(code: string) {
    const { tokens } = await this.googleClient.getToken(code);
    this.googleClient.setCredentials(tokens);

    const userInfo = await this.googleClient.request({
      url: "https://www.googleapis.com/oauth2/v1/userinfo",
    });

    if (!(userInfo.data as { email: string }).email) {
      throw new Error("Unable to get user information from Google");
    }

    let user = await this.prisma.user.findUnique({
      where: { email: (userInfo.data as { email: string }).email },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email: (userInfo.data as { email: string }).email,
          name: (userInfo.data as { name: string }).name,
          googleId: (userInfo.data as { id: string }).id,
          password: await bcrypt.hash(Math.random().toString(36), 10),
        },
      });
    }

    const token = this.jwt.generateToken(user.id);
    return { user, token };
  }
}
