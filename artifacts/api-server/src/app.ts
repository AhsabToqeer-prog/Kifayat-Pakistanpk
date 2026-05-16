import express, { type Express, type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import { pinoHttp } from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

const httpLogger = pinoHttp({
  logger,
  serializers: {
    req(req: Request) {
      return {
        id: req.id,
        method: req.method,
        url: req.url?.split("?")[0],
      };
    },
    res(res: Response) {
      return {
        statusCode: res.statusCode,
      };
    },
  },
});

app.use(httpLogger);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.use((_req: Request, res: Response, _next: NextFunction): void => {
  res.status(404).json({ error: "Not found" });
});

export default app;
