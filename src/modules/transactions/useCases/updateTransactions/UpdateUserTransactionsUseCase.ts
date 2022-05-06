import { inject, injectable } from "tsyringe";
import bcrypt from 'bcrypt';
import { AppError } from "@shared/errors/AppError";

import { ITransactionsRepository } from "../../repositories/ITransactionsRepository";
import { Transactions } from "@modules/transactions/infra/typeorm/entities/Transactions";

interface Data 
{
  id: string;
  name: string;
  idUser: string;
  type: string;
  value: string;
}

@injectable()
class UpdateTransactionsUseCase 
{
  constructor(
    @inject("TransactionsRepository")
    private transactionsRepository: ITransactionsRepository
  ) {}

  async execute({
    id,
    name,
    idUser,
    type,
    value,
  }: Data): Promise<Transactions> {
    const transactions = await this. transactionsRepository.findById(id);

    if (!transactions) 
      throw new AppError('transactions not found');
    

    const AlreadyExists = await this.transactionsRepository.findByName( name );

    if ( AlreadyExists ) 
      throw new AppError("Name already exists");

    transactions.name = name;
    transactions.idUser = idUser;
    transactions.type = type;
    transactions.value = Number( value );
    
    

    return this.transactionsRepository.save( transactions );
  }
}

export { UpdateTransactionsUseCase };
