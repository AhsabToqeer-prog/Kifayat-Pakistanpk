import { Router, type IRouter } from "express";
import { eq, desc, count, sql } from "drizzle-orm";
import { db, contactsTable } from "@workspace/db";
import {
  SubmitContactBody,
  ListContactsQueryParams,
  GetContactParams,
  UpdateContactStatusParams,
  UpdateContactStatusBody,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/contact", async (req, res): Promise<void> => {
  const parsed = SubmitContactBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { name, email, phone, subject, message, inquiryType } = parsed.data;

  const [submission] = await db
    .insert(contactsTable)
    .values({
      name,
      email,
      phone: phone ?? null,
      subject: subject ?? null,
      message,
      inquiryType: inquiryType ?? "general",
      status: "new",
    })
    .returning();

  req.log.info({ id: submission.id }, "Contact form submitted");
  res.status(201).json({
    id: submission.id,
    name: submission.name,
    email: submission.email,
    phone: submission.phone,
    subject: submission.subject,
    message: submission.message,
    inquiryType: submission.inquiryType,
    status: submission.status,
    createdAt: submission.createdAt.toISOString(),
  });
});

router.get("/admin/contacts", async (req, res): Promise<void> => {
  const queryParsed = ListContactsQueryParams.safeParse(req.query);
  const page = queryParsed.success ? (queryParsed.data.page ?? 1) : 1;
  const limit = queryParsed.success ? (queryParsed.data.limit ?? 20) : 20;
  const offset = (page - 1) * limit;

  const [items, totalResult] = await Promise.all([
    db
      .select()
      .from(contactsTable)
      .orderBy(desc(contactsTable.createdAt))
      .limit(limit)
      .offset(offset),
    db.select({ count: count() }).from(contactsTable),
  ]);

  const total = totalResult[0]?.count ?? 0;

  res.json({
    items: items.map((c) => ({
      ...c,
      createdAt: c.createdAt.toISOString(),
    })),
    total,
    page,
    limit,
  });
});

router.get("/admin/contacts/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = GetContactParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const [contact] = await db
    .select()
    .from(contactsTable)
    .where(eq(contactsTable.id, params.data.id));

  if (!contact) {
    res.status(404).json({ error: "Contact not found" });
    return;
  }

  res.json({ ...contact, createdAt: contact.createdAt.toISOString() });
});

router.patch("/admin/contacts/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = UpdateContactStatusParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const body = UpdateContactStatusBody.safeParse(req.body);
  if (!body.success) {
    res.status(400).json({ error: body.error.message });
    return;
  }

  const [updated] = await db
    .update(contactsTable)
    .set({ status: body.data.status })
    .where(eq(contactsTable.id, params.data.id))
    .returning();

  if (!updated) {
    res.status(404).json({ error: "Contact not found" });
    return;
  }

  res.json({ ...updated, createdAt: updated.createdAt.toISOString() });
});

export default router;
