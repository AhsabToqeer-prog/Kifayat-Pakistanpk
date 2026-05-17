import { Router, type IRouter, type Request, type Response } from "express";

const router: IRouter = Router();

router.get("/healthz", (_req: Request, res: Response): void => {
  res.json({ status: "ok" });
});

export default router;
