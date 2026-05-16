import express, { type Express, type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import { logger } from "./lib/logger";
import router from "./routes";

const app: Express = express();

app.use((req: Request, res: Response, next: NextFunction): void => {
  const start = Date.now();
  res.on("finish", () => {
    logger.info({
      method: req.method,
      url: req.url.split("?")[0],
      statusCode: res.statusCode,
      durationMs: Date.now() - start,
    });
  });
  next();
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.use((_req: Request, res: Response, _next: NextFunction): void => {
  res.status(404).json({ error: "Not found" });
});

export default app;
