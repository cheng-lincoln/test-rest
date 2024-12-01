import express, { Response as ExResponse, Request as ExRequest, NextFunction } from "express";
import { RegisterRoutes } from "../build/routes";
import swaggerUi from "swagger-ui-express";
import { ValidateError } from "tsoa";
import morgan from "morgan";
import compression from "compression";
import helmet from "helmet";

export const app = express();

app.use(compression());

app.use(helmet());

app.use(morgan("tiny"));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(
  "/docs",
  swaggerUi.serve,
  async (_req: ExRequest, res: ExResponse) => {
    return res.send(
      swaggerUi.generateHTML(await import("../build/swagger.json"))
    );
  }
);

RegisterRoutes(app);

app.use(
  (_req, res: ExResponse) => {
    res.status(404).send({
      message: "Not Found",
    });
  }
);

app.use(
  function errorHandler(
    err: unknown,
    req: ExRequest,
    res: ExResponse,
    next: NextFunction
  ): ExResponse | void {
    // Validation errors caught by tsoa
    if (err instanceof ValidateError) {
      return res.status(422).json({
        message: "Input Validation Failed",
        path: req.path,
        fields: err?.fields,
      });
    }

    // Generic errors
    if (err instanceof Error) {
      return res.status(500).json({
        message: "Unknown error occured",
      });
    }

    next();
  }
);
