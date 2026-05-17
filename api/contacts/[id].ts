import type { VercelRequest, VercelResponse } from "@vercel/node";
import { pool } from "../_db";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const id = Number(req.query.id);
    const { status } = req.body as { status: string };
    if (!status || !["new", "read", "replied"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }
    const { rows } = await pool.query(
      "UPDATE contacts SET status = $1 WHERE id = $2 RETURNING id, name, email, phone, subject, inquiry_type AS \"inquiryType\", message, status, created_at AS \"createdAt\"",
      [status, id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: "Contact not found" });
    }
    const c = rows[0] as Record<string, unknown>;
    res.json({
      ...c,
      createdAt: new Date(c.createdAt as string).toISOString(),
      phone: c.phone ?? null,
      subject: c.subject ?? null,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}
