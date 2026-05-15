import { pgTable, text, serial, integer, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const campaignsTable = pgTable("campaigns", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull().default("general"),
  status: text("status").notNull().default("active"),
  beneficiaryCount: integer("beneficiary_count").notNull().default(0),
  imageUrl: text("image_url"),
  location: text("location"),
  startDate: date("start_date"),
});

export const insertCampaignSchema = createInsertSchema(campaignsTable).omit({ id: true });
export type InsertCampaign = z.infer<typeof insertCampaignSchema>;
export type Campaign = typeof campaignsTable.$inferSelect;
