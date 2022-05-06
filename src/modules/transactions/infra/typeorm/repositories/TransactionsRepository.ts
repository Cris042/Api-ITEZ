import { getRepository, Repository } from "typeorm";
import { ITransactionsRepository  } from "../../../repositories/ITransactionsRepository";
import { ICreateTransactionsDTO  } from "../../../dtos/ITransactionsResponseDTO";
import { Transactions } from "../entities/Transactions";

class TransactionsRepository implements ITransactionsRepository 
{
  private repository: Repository<Transactions>;

  constructor() 
  {
    this.repository = getRepository( Transactions  );
  }
 
  async create(
  {
    name,
    idUser,
    type,
    value,
    category
  }: ICreateTransactionsDTO ): Promise<void> 
  {
    const transactions = this.repository.create(
    {
       name,
       idUser,
       type,
       value,
       category
    });

    await this.repository.save( transactions );
  }

  async findByName( name: string ): Promise<Transactions> 
  {

    const transactions = await this.repository.findOne({ name });
    return transactions;

  }

  async findById( id: string ): Promise<Transactions> 
  {

    const transactions = await this.repository.findOne( id );
    return transactions;

  }

  async delet( id: string ): Promise<void> 
  {

    await this.repository.delete( id );

  }

  async save( transactions: Transactions ): Promise<Transactions> 
  {

    await this.repository.save( transactions );    
    return transactions;

  }

  async list( id: string ): Promise<Transactions[]> 
  {

    const transactions = await this.repository.createQueryBuilder().where("idUser = :id").setParameters({ id }).execute();
    return transactions;
    
  }

}

export { TransactionsRepository };
