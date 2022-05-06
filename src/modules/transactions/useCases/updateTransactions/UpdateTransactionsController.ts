import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateTransactionsUseCase } from "./UpdateUserTransactionsUseCase";

class UpdateTransactionsController 
{
  async handle(request: Request, response: Response): Promise<Response> 
  {
  
    const transactionsId = request.body.id;
    const { name, idUser, type, value } = request.body;
    const updateTransactionsUseCase = container.resolve ( UpdateTransactionsUseCase );
 
    const user = await updateTransactionsUseCase.execute
    ({
      id: transactionsId,
      name,
      idUser,
      type,
      value,
    });
    
    return response.status(201).send();
  }
}

export { UpdateTransactionsController };
