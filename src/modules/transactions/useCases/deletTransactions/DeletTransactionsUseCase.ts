import { inject, injectable } from "tsyringe";
import bcrypt from 'bcrypt';
import { AppError } from "@shared/errors/AppError";
import { ICreateTransactionsDTO } from "../../dtos/ITransactionsResponseDTO";

import { ITransactionsRepository } from "../../repositories/ITransactionsRepository";

@injectable()
class  DeletTransactionsUseCase 
{
  constructor
  (
    @inject("TransactionsRepository")
    private transactionsRepository: ITransactionsRepository
  ) {}

  async execute(id): Promise<void> 
  {
   
    const transactions = await this.transactionsRepository.findById( id );

    if (!transactions)    
      throw new AppError('transactions not found');
    
    await this.transactionsRepository.delet( id );

  }
}

export { DeletTransactionsUseCase };
