
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

import { CreateTransactionsController } from "@modules/transactions/useCases/createTransactions/CreateTransactionsController";
import { ListTransactionsController } from "@modules/transactions/useCases/listTransactions/ListTransactionsController";
import { UpdateTransactionsController } from "@modules/transactions/useCases/updateTransactions/UpdateTransactionsController";
import { DeletTransactionsController } from "@modules/transactions/useCases/deletTransactions/DeletTransactionsController";

const transactionsRoutes = Router();
const createTransactionsController = new CreateTransactionsController();
const listTransactionsController = new ListTransactionsController();
const deletTransactionsController = new DeletTransactionsController();
const updateTransactionsController = new UpdateTransactionsController();

transactionsRoutes.post( "/", createTransactionsController.handle );
transactionsRoutes.get( "/list", listTransactionsController.handle );
transactionsRoutes.put( "/", updateTransactionsController.handle );
transactionsRoutes.put( "/delet", deletTransactionsController.handle );

export { transactionsRoutes };
