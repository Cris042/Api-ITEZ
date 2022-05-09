import { Request, Response } from "express";
import { container } from "tsyringe";

import { ReportransactionsUseCase  } from "./ReportTransactionsUseCase";

class ReportTransactionsController {
  async handle(request: Request, response: Response): Promise<Response> 
  {

    const { id } = request.query;
    const listTransactionsUseCase = container.resolve( ReportransactionsUseCase  );
    await listTransactionsUseCase.execute( id as string );

    return response.status(201).send();
  }
}

export { ReportTransactionsController };
