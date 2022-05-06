import "reflect-metadata";
import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import { router } from "./routes";
import { resolve } from "path";

import '../database';
import "../../container";

import { AppError } from "../../errors/AppError";

const app = express();

import swaggerFile from "../../../swagger.json";
app.use( express.json() );
app.use("/docs", swaggerUi.serve, swaggerUi.setup( swaggerFile ));
app.use( router );

app.use('/files', express.static( resolve(__dirname, "..", "..", "..", "..", 'tmp', 'avatar') ) );

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => 
  {

    if (err instanceof AppError) 
    {

      return response.status(err.statusCode).json({
        message: err.message,
      });

    }

    return response.status(500).json(
    {

      status: "error",
      message: `Internal server error - ${err.message}`,

    });

  }
);

export { app };
