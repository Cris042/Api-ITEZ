import { inject, injectable } from "tsyringe";
import bcrypt from 'bcrypt';
import { AppError } from "@shared/errors/AppError";
import { ICreateTransactionsDTO } from "../../dtos/ITransactionsResponseDTO";

import { ITransactionsRepository } from "../../repositories/ITransactionsRepository";

@injectable()
class CreateTransactionsUseCase 
{
  constructor
  (
    @inject("TransactionsRepository")
    private transactionsRepository: ITransactionsRepository
  ) {}

  async execute({
    name,
    idUser,
    type,
    value,
    category
  }: ICreateTransactionsDTO): Promise<void> 
  {
    const alreadyExists = await this.transactionsRepository.findByName( name );

    const categorys = ["Entretenimento", "Alimentação", "Educação", "Saúde", "Transporte", "Receitas"];
    let alreadyExistsCategory = "";

    const types = ["Receitas", "Despesas"];
    let alreadyExistsType = "";

    if( categorys.includes( category )) 
       alreadyExistsCategory = "true";
    else
       alreadyExistsCategory = "false"; 

    if( types.includes( type )) 
        alreadyExistsType = "true";
    else
        alreadyExistsType = "false"; 

    if ( alreadyExists )    
      throw new AppError("Name already exists");
  
    if ( alreadyExistsCategory == "false" )    
      throw new AppError("Category not exists. Existing categories: Entretenimento, Alimentação, Educação, Saúde, Transporte, Receitas");

    if ( alreadyExistsType == "false" )    
      throw new AppError("Type not exists. Existing types: Receitas, Despesas");
    
    await this.transactionsRepository.create({
      name,
      idUser,
      type,
      value,
      category
    });

  }
}

export { CreateTransactionsUseCase };
