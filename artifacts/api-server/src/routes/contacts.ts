import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { contactsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { SubmitContactBody, UpdateContactStatusBody } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/contacts", async (req, res) => {
  try {
    const { status } = req.query as { status?: string };
    let items;
    if (status) {
      items = await db.select().from(contactsTable).where(eq(contactsTable.status, status)).orderBy(contactsTable.createdAt);
    } else {
      items = await db.select().from(contactsTable).orderBy(contactsTable.createdAt);
    }
    const mapped = items.map((c) => ({
      id: c.id,
      name: c.name,
      email: c.email,
      phone: c.phone ?? null,
      subject: c.subject ?? null,
      inquiryType: c.inquiryType,
      message: c.message,
      status: c.status,
      createdAt: c.createdAt.toISOString(),
    }));
    res.json({ items: mapped, total: mapped.length });
  } catch (err) {
    req.log.error({ err }, "Error listing contacts");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/contacts", async (req, res) => {
  try {
    const body = SubmitContactBody.parse(req.body);
    const [contact] = await db.insert(contactsTable).values({
      name: body.name,
      email: body.email,
      phone: body.phone ?? null,
      subject: body.subject ?? null,
      inquiryType: body.inquiryType,
      message: body.message,
      status: "new",
    }).returning();
    res.status(201).json({
      ...contact,
      phone: contact.phone ?? null,
      subject: contact.subject ?? null,
      createdAt: contact.createdAt.toISOString(),
    });
  } catch (err) {
    req.log.error({ err }, "Error submitting contact");
    res.status(400).json({ error: "Invalid request" });
  }
});

router.patch("/contacts/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const body = UpdateContactStatusBody.parse(req.body);
    const [contact] = await db.update(contactsTable)
      .set({ status: body.status })
      .where(eq(contactsTable.id, id))
      .returning();
    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.json({
      ...contact,
      phone: contact.phone ?? null,
      subject: contact.subject ?? null,
      createdAt: contact.createdAt.toISOString(),
    });
  } catch (err) {
    req.log.error({ err }, "Error updating contact");
    res.status(400).json({ error: "Invalid request" });
  }
});

router.get("/stats", async (req, res) => {
  try {
    const all = await db.select().from(contactsTable);
    const totalContacts = all.length;
    const newContacts = all.filter((c) => c.status === "new").length;
    res.json({ totalContacts, newContacts, activeCampaigns: 3 });
  } catch (err) {
    req.log.error({ err }, "Error getting stats");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
