import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Transactions1651623564687 implements MigrationInterface 
{

    public async up(queryRunner: QueryRunner): Promise<void> 
    {
        await queryRunner.createTable
        (
            new Table
            ({
              name: "transactions",
                columns: [
                {
                  name: "id",
                  type: "uuid",
                  isPrimary: true,
                },
                
                {
                   name: "idUser",
                   type: "uuid",
                },
    
                {
                   name: "name",
                   type: "varchar",
                },
    
                {
                   name: "type",
                   type: "varchar",
                },

                {
                  name: "category",
                  type: "varchar",
                },
    
                {
                   name: "value",
                   type: "float",
                },
    
                {
                   name: "created_at",
                   type: "timestamp",
                   default: "now()",
                },
    
                {
                   name: "updated_at",
                   type: "timestamp",
                   default: "now()",
                },
    
              ],
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> 
    {
    }

}
