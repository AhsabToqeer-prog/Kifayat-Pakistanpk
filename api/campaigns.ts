import type { VercelRequest, VercelResponse } from "@vercel/node";
import { pool } from "./_db";

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    const { rows } = await pool.query(
      "SELECT id, title, description, category, status, beneficiary_count AS \"beneficiaryCount\", location, image_url AS \"imageUrl\", start_date AS \"startDate\" FROM campaigns ORDER BY created_at"
    );
    const mapped = rows.map((c: Record<string, unknown>) => ({
      ...c,
      startDate: c.startDate ? new Date(c.startDate as string).toISOString() : null,
    }));
    res.json(mapped);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}
