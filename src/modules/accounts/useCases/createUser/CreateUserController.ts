import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserCase } from "./CreateUserUseCase";

class CreateUserController 
{
  async handle( request: Request, response: Response ): Promise<Response> 
  {

    const { email, name, password, isAdmin } = request.body;
    const createUserUseCase = container.resolve( CreateUserCase );

    await createUserUseCase.execute(
    {
      email,
      name,
      password,
      isAdmin,
    });

    return response.status(201).send();
  }
}

export { CreateUserController };
