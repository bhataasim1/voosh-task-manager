import express from "express";
import { AuthController } from "../controller/auth/auth.controller";

const authRouter = express.Router();
const authController = new AuthController();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);

authRouter.get("/google", authController.googleAuth);
authRouter.get("/google/callback", authController.googleCallback);

export default authRouter;
