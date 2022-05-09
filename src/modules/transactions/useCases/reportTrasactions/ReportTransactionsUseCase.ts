import { inject, injectable } from "tsyringe";
import {  Response, Request } from "express";

import { ITransactionsRepository } from "@modules/transactions/repositories/ITransactionsRepository";
import { Transactions } from "@modules/transactions/infra/typeorm/entities/Transactions";

import PDFPrinter from "pdfmake";
import { TDocumentDefinitions } from "pdfmake/interfaces";

@injectable()
class ReportransactionsUseCase 
{
    constructor
    (
      @inject("TransactionsRepository")
      private transactionsRepository: ITransactionsRepository
    ) {}

    async execute( id: string )
    {
      let response : Response;

      const transactions = await this.transactionsRepository.list( id );
      
      const fonte = {
        Helvetica:{
          normal: "Helvetica"     
        }
      }

      const printer = new PDFPrinter( fonte );

      const body = [];

      for await ( let transaction of transactions )
      {
          const rows = new Array();
          rows.push( transaction["Transactions_name"] );
          rows.push( transaction["Transactions_type"] );
          rows.push( transaction["Transactions_category"] );
          rows.push( transaction["Transactions_value"] );

          body.push( rows );
      }
      
      const docDefinition : TDocumentDefinitions = {
          defaultStyle: { font: "Helvetica" },
          content: [
              {
                  table: 
                  { 
                      body: [ ["Name","Type","Category","value"], ...body ],     
                  },
              },
          ]
      };

      const pdf = printer.createPdfKitDocument( docDefinition );
      
      const chunks = [];

      pdf.on("data", ( chunk ) => { chunks.push( chunk ) } );
      pdf.on("end", () => { 
          const result = Buffer.concat( chunks );
          response.end( result ); }
      );

      pdf.end();
  }
}

export { ReportransactionsUseCase };
