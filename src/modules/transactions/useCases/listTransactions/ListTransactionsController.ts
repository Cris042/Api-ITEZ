import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListTransactionsUseCase } from "./ListTransactionsUseCase";

class ListTransactionsController {
  async handle(request: Request, response: Response): Promise<Response> 
  {

    const { id } = request.query;
    const listTransactionsUseCase = container.resolve( ListTransactionsUseCase );

    const all = await listTransactionsUseCase.execute( id as string );

    return response.json(all);
  }
}

export { ListTransactionsController };
