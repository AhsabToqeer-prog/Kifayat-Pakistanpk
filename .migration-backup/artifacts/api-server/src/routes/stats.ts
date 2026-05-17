import { Router, type IRouter } from "express";
import { eq, count, sum } from "drizzle-orm";
import { db, contactsTable, campaignsTable, resourcesTable } from "@workspace/db";

const router: IRouter = Router();

router.get("/stats", async (_req, res): Promise<void> => {
  const [totalContactsResult, newContactsResult, activeCampaignsResult, totalBeneficiariesResult, resourceCountResult, contactsByTypeResult] =
    await Promise.all([
      db.select({ count: count() }).from(contactsTable),
      db.select({ count: count() }).from(contactsTable).where(eq(contactsTable.status, "new")),
      db.select({ count: count() }).from(campaignsTable).where(eq(campaignsTable.status, "active")),
      db.select({ total: sum(campaignsTable.beneficiaryCount) }).from(campaignsTable),
      db.select({ count: count() }).from(resourcesTable),
      db
        .select({ inquiryType: contactsTable.inquiryType, count: count() })
        .from(contactsTable)
        .groupBy(contactsTable.inquiryType),
    ]);

  res.json({
    totalContacts: totalContactsResult[0]?.count ?? 0,
    newContacts: newContactsResult[0]?.count ?? 0,
    activeCampaigns: activeCampaignsResult[0]?.count ?? 0,
    totalBeneficiaries: Number(totalBeneficiariesResult[0]?.total ?? 0),
    resourceCount: resourceCountResult[0]?.count ?? 0,
    contactsByType: contactsByTypeResult.map((r) => ({
      label: r.inquiryType,
      count: r.count,
    })),
  });
});

export default router;
