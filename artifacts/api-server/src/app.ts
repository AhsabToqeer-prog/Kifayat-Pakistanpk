import express, { type Express } from "express";
import cors from "cors";
import type { IncomingMessage, ServerResponse } from "http";
import type { Options, HttpLogger } from "pino-http";
import pinoHttpModule from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

// pino-http v10 ships as CJS (module.exports = fn) but its type definition
// doesn't expose call signatures under moduleResolution "bundler".
// Cast to the correct callable signature so both Replit and Vercel compile cleanly.
const pinoHttp = pinoHttpModule as unknown as (opts?: Options) => HttpLogger;

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req: IncomingMessage) {
        return {
          id: (req as IncomingMessage & { id?: string }).id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res: ServerResponse) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

export default app;
