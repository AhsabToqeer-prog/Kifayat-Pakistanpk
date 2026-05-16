import { Router, type IRouter, type Request, type Response } from "express";
import { db, campaignsTable } from "@workspace/db";

const router: IRouter = Router();

router.get("/campaigns", async (_req: Request, res: Response): Promise<void> => {
  const campaigns = await db.select().from(campaignsTable);
  res.json(
    campaigns.map((c) => ({
      id: c.id,
      title: c.title,
      description: c.description,
      category: c.category,
      status: c.status,
      beneficiaryCount: c.beneficiaryCount,
      imageUrl: c.imageUrl,
      location: c.location,
      startDate: c.startDate,
    }))
  );
});

export default router;
