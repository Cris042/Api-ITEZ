import { 
    Column, 
    CreateDateColumn, 
    Entity, 
    PrimaryColumn 
  } from "typeorm";
  
  import { v4 as uuidV4 } from "uuid";
  
  @Entity("transactions")
  
  export default class Transactions
  {
  
      @PrimaryColumn()
      id: string;
  
      @Column()
      name: string;
  
      @Column()
      idUser: string;
  
      @Column()
      type: string;

      @Column()
      category: string;
  
      @Column()
      value: number;
  
      @CreateDateColumn()
      created_at: Date;
  
      @CreateDateColumn()
      updated_at: Date;
  
      constructor() 
      {
          if (!this.id) 
          {
            this.id = uuidV4();
          }
      }
      
  }
  
  export { Transactions };
  
  