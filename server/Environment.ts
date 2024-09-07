import dotenv from "dotenv";
dotenv.config();

export type Environmnent = "development" | "production";
export class BaseEnvironment {
  defaultEnvironmentValues = {
    DATABASE_URL: "file:./ZipFeast.db",
    PORT: 3000,
    HOST: "http://localhost",
    JWT_SECRET: "your-secret-key",
    GOOGLE_CLIENT_ID: "your-google-client-id",
    GOOGLE_CLIENT_SECRET: "your-google-client-secret",
    GOOGLE_REDIRECT_URI: "your-google-redirect-uri",
  };
  get environment(): Environmnent {
    return process.env.NODE_ENV as Environmnent;
  }

  get DATABASE_URL(): string {
    return (
      process.env.DATABASE_URL! || this.defaultEnvironmentValues.DATABASE_URL
    );
  }

  get PORT(): number {
    return parseInt(process.env.PORT!) || this.defaultEnvironmentValues.PORT;
  }

  get HOST(): string {
    return process.env.HOST! || this.defaultEnvironmentValues.HOST;
  }

  get JWT_SECRET(): string {
    return process.env.JWT_SECRET! || this.defaultEnvironmentValues.JWT_SECRET;
  }

  get GOOGLE_CLIENT_ID(): string {
    return (
      process.env.GOOGLE_CLIENT_ID! ||
      this.defaultEnvironmentValues.GOOGLE_CLIENT_ID
    );
  }

  get GOOGLE_CLIENT_SECRET(): string {
    return (
      process.env.GOOGLE_CLIENT_SECRET! ||
      this.defaultEnvironmentValues.GOOGLE_CLIENT_SECRET
    );
  }

  get GOOGLE_REDIRECT_URI(): string {
    return (
      process.env.GOOGLE_REDIRECT_URI! ||
      this.defaultEnvironmentValues.GOOGLE_REDIRECT_URI
    );
  }
}
