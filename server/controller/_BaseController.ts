import { Response } from "express";
import { ApiResponse } from "../middleware/apiResponse.middleware";

export class BaseController {
  constructor() {}

  async _sendResponse(
    res: Response,
    message: string,
    statusCode = 200,
    data = {}
  ) {
    return res
      .status(statusCode)
      .send(new ApiResponse({ message, ...data }, statusCode));
  }

  async _sendError(res: Response, error: any) {
    console.error(error);
    return res.status(500).send(new ApiResponse({ message: error }, 500));
  }

  protected _filterSensitiveData(data: { user: any; token: string }) {
    const { user, token } = data;
    const { password, createdAt, updatedAt, ...filteredUserData } = user;
    return { user: filteredUserData, token };
  }
}
