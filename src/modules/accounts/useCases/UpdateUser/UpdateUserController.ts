import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> 
  {
  
    const id = request.body.id;
    const { email, name, password, old_password } = request.body;
    const createUserUseCase = container.resolve(UpdateUserUseCase);

    await createUserUseCase.execute
    ({
      id: id,
      email,
      name,
      password,
      old_password,      
    });
    
    return response.status(201).send();
  }
}

export { UpdateUserController };
