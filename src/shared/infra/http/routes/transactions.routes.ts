
import { Router, Response, Request } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { container } from "tsyringe";

import PDFPrinter from "pdfmake";
import { TDocumentDefinitions } from "pdfmake/interfaces";

import { CreateTransactionsController } from "@modules/transactions/useCases/createTransactions/CreateTransactionsController";
import { ListTransactionsController } from "@modules/transactions/useCases/listTransactions/ListTransactionsController";
import { UpdateTransactionsController } from "@modules/transactions/useCases/updateTransactions/UpdateTransactionsController";
import { DeletTransactionsController } from "@modules/transactions/useCases/deletTransactions/DeletTransactionsController";
import { ReportTransactionsController } from "@modules/transactions/useCases/reportTrasactions/ReportTransactionsController";

import { ListTransactionsUseCase } from "@modules/transactions/useCases/listTransactions/ListTransactionsUseCase";

const transactionsRoutes = Router();
const createTransactionsController = new CreateTransactionsController();
const listTransactionsController = new ListTransactionsController();
const deletTransactionsController = new DeletTransactionsController();
const updateTransactionsController = new UpdateTransactionsController();
const reportTransactionsController = new ReportTransactionsController();

transactionsRoutes.post( "/", ensureAuthenticated, createTransactionsController.handle );
transactionsRoutes.get( "/list", ensureAuthenticated, listTransactionsController.handle );
transactionsRoutes.put( "/", ensureAuthenticated, updateTransactionsController.handle );
transactionsRoutes.put( "/delet",ensureAuthenticated, deletTransactionsController.handle );
// transactionsRoutes.get( "/report",  reportTransactionsController.handle );

transactionsRoutes.get( "/report", async ( request : Request, response: Response) => { 

    const listTransactionsUseCase = container.resolve( ListTransactionsUseCase );

    const { id } = request.query;
    const transactions = await listTransactionsUseCase.execute( id as string );

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

});

export { transactionsRoutes };
