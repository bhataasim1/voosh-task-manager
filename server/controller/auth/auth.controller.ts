import { Request, Response } from "express";
import { BaseController } from "../_BaseController";
import { AuthService } from "../../services/Auth.service";

export class AuthController extends BaseController {
  private authService: AuthService;
  constructor() {
    super();
    this.authService = new AuthService();
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
  }

  async register(req: Request, res: Response) {
    try {
      const { email, password, name } = req.body;

      if (!email || !password || !name) {
        return this._sendError(res, "Please provide all the required fields");
      }

      const result = await this.authService.register(email, password, name);
      return this._sendResponse(res, "User registered successfully", 200, {
        result,
      });
    } catch (error: any) {
      return this._sendError(res, error.message);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return this._sendError(res, "Please provide email and password");
      }

      const result = await this.authService.login(email, password);

      const data = this._filterSensitiveData(result);

      return this._sendResponse(res, "User logged in successfully", 200, {
        data,
      });
    } catch (error: any) {
      return this._sendError(res, error.message);
    }
  }
}
