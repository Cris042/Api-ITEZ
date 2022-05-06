import { Request, Response } from "express";

import { container } from "tsyringe";

import { CreateTransactionsUseCase } from "./CreateTransactionsUseCase";

class CreateTransactionsController 
{
  async handle( request: Request, response: Response ): Promise<Response> 
  {
    const createTransactionsUseCase = container.resolve( CreateTransactionsUseCase );

    const { name, idUser, type, value, category } = request.body;

    await createTransactionsUseCase.execute(
    {
      name,
      idUser,
      type,
      value,
      category
    });

    return response.status(201).send();
  }
}

export { CreateTransactionsController };
