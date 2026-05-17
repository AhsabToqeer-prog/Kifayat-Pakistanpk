import { Router, type IRouter } from "express";
import healthRouter from "./health";
import contactRouter from "./contact";
import campaignsRouter from "./campaigns";
import resourcesRouter from "./resources";
import statsRouter from "./stats";

const router: IRouter = Router();

router.use(healthRouter);
router.use(contactRouter);
router.use(campaignsRouter);
router.use(resourcesRouter);
router.use(statsRouter);

export default router;
