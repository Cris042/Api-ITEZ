import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeletTransactionsUseCase } from "./DeletTransactionsUseCase";

class DeletTransactionsController 
{
  async handle(request: Request, response: Response): Promise<Response> 
  {
    const transactionsId = request.body.id;
    const deletTransactionsUseCase  = container.resolve( DeletTransactionsUseCase  );
   
    const obj = await deletTransactionsUseCase.execute
    ({
      id: transactionsId,
    });
    
    return response.status(201).send();
  }
}

export { DeletTransactionsController  };
