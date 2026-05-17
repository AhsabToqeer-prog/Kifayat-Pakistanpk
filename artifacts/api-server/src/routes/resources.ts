import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, resourcesTable } from "@workspace/db";

const router: IRouter = Router();

router.get("/resources", async (req, res) => {
  try {
    const category = req.query.category as string | undefined;
    const results = category
      ? await db.select().from(resourcesTable).where(eq(resourcesTable.category, category))
      : await db.select().from(resourcesTable);
    res.json(
      results.map((r) => ({
        id: r.id,
        title: r.title,
        description: r.description,
        category: r.category,
        resourceType: r.resourceType,
        url: r.url ?? null,
        phoneNumber: r.phoneNumber ?? null,
      }))
    );
  } catch (err) {
    req.log.error({ err }, "Error listing resources");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
