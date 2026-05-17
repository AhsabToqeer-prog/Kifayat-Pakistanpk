import type { VercelRequest, VercelResponse } from "@vercel/node";
import { pool } from "./_db";

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    const { rows: allContacts } = await pool.query("SELECT status FROM contacts");
    const totalContacts = allContacts.length;
    const newContacts = allContacts.filter((c: { status: string }) => c.status === "new").length;
    const { rows: campaignRows } = await pool.query("SELECT COUNT(*) AS count FROM campaigns WHERE status = 'active'");
    const activeCampaigns = Number(campaignRows[0].count);
    res.json({ totalContacts, newContacts, activeCampaigns });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}
