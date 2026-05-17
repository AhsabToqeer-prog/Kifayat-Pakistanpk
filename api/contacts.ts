import type { VercelRequest, VercelResponse } from "@vercel/node";
import { pool } from "./_db";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "GET") {
    try {
      const { status } = req.query as { status?: string };
      let query = "SELECT id, name, email, phone, subject, inquiry_type AS \"inquiryType\", message, status, created_at AS \"createdAt\" FROM contacts ORDER BY created_at DESC";
      const params: string[] = [];
      if (status) {
        query = "SELECT id, name, email, phone, subject, inquiry_type AS \"inquiryType\", message, status, created_at AS \"createdAt\" FROM contacts WHERE status = $1 ORDER BY created_at DESC";
        params.push(status);
      }
      const { rows } = await pool.query(query, params);
      const mapped = rows.map((c: Record<string, unknown>) => ({
        ...c,
        createdAt: new Date(c.createdAt as string).toISOString(),
        phone: c.phone ?? null,
        subject: c.subject ?? null,
      }));
      res.json({ items: mapped, total: mapped.length });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  } else if (req.method === "POST") {
    try {
      const { name, email, phone, subject, inquiryType, message } = req.body as Record<string, string>;
      if (!name || !email || !inquiryType || !message) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      const { rows } = await pool.query(
        "INSERT INTO contacts (name, email, phone, subject, inquiry_type, message, status) VALUES ($1, $2, $3, $4, $5, $6, 'new') RETURNING id, name, email, phone, subject, inquiry_type AS \"inquiryType\", message, status, created_at AS \"createdAt\"",
        [name, email, phone ?? null, subject ?? null, inquiryType, message]
      );
      const c = rows[0] as Record<string, unknown>;
      res.status(201).json({
        ...c,
        createdAt: new Date(c.createdAt as string).toISOString(),
        phone: c.phone ?? null,
        subject: c.subject ?? null,
      });
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: "Invalid request" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
