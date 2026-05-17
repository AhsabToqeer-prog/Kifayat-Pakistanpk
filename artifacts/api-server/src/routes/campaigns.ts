import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { campaignsTable } from "@workspace/db";

const router: IRouter = Router();

router.get("/campaigns", async (req, res) => {
  try {
    const items = await db.select().from(campaignsTable).orderBy(campaignsTable.createdAt);
    const mapped = items.map((c) => ({
      id: c.id,
      title: c.title,
      description: c.description,
      category: c.category,
      status: c.status,
      beneficiaryCount: c.beneficiaryCount,
      location: c.location ?? null,
      imageUrl: c.imageUrl ?? null,
      startDate: c.startDate ? c.startDate.toISOString() : null,
    }));
    res.json(mapped);
  } catch (err) {
    req.log.error({ err }, "Error listing campaigns");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
