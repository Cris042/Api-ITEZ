import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { AuthenticateUserController } from "@modules/accounts/useCases/authenticateUser/AuthenticateUserController";
import { RefreshTokenController } from "@modules/accounts/useCases/refreshToken/RefreshTokenController";
import { LogoutUserController } from "@modules/accounts/useCases/logoutUser/LogoutUserController";

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();
const logoutUserController = new LogoutUserController();

authenticateRoutes.post( "/sessions", authenticateUserController.handle );
authenticateRoutes.post("/refresh-token", ensureAuthenticated, refreshTokenController.handle);
authenticateRoutes.post("/logout", ensureAuthenticated, logoutUserController.handle);

export { authenticateRoutes };
