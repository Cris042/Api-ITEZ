import { Router } from "express";

import { authenticateRoutes } from "./authenticate.routes";
import { usersRoutes } from "./users.routes";
import { transactionsRoutes } from "./transactions.routes";

const router = Router();

router.use( "/transactions", transactionsRoutes );
router.use( "/users", usersRoutes );
router.use( "/authenticate", authenticateRoutes );

export { router };
