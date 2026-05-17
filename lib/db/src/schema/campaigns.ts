import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";

export const campaignsTable = pgTable("campaigns", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull().default("education"),
  status: text("status").notNull().default("active"),
  beneficiaryCount: integer("beneficiary_count").notNull().default(0),
  location: text("location"),
  imageUrl: text("image_url"),
  startDate: timestamp("start_date"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Campaign = typeof campaignsTable.$inferSelect;
