import { Request, Response } from "express";
import { container } from "tsyringe";

import { LogoutUseCase } from "./LogoutUseCase";

class LogoutUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const token =
      request.body.refresh_token ||
      request.headers["x-access-token"] ||
      request.query.token;

    const logoutUseCase = container.resolve( LogoutUseCase );

    const refresh_token = await logoutUseCase.execute(token);

    return response.json(refresh_token);
  }
}

export { LogoutUserController };
