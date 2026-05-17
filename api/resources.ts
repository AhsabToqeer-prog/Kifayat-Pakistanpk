import type { VercelRequest, VercelResponse } from "@vercel/node";
import { pool } from "./_db";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { category } = req.query as { category?: string };
    let query = "SELECT id, title, description, category, resource_type AS \"resourceType\", url, phone_number AS \"phoneNumber\" FROM resources ORDER BY id";
    const params: string[] = [];
    if (category) {
      query = "SELECT id, title, description, category, resource_type AS \"resourceType\", url, phone_number AS \"phoneNumber\" FROM resources WHERE category = $1 ORDER BY id";
      params.push(category);
    }
    const { rows } = await pool.query(query, params);
    const mapped = rows.map((r: Record<string, unknown>) => ({
      ...r,
      url: r.url ?? null,
      phoneNumber: r.phoneNumber ?? null,
    }));
    res.json(mapped);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}
