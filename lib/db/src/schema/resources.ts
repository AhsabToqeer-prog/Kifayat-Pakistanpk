import { pgTable, text, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const resourcesTable = pgTable("resources", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull().default("general"),
  resourceType: text("resource_type").notNull().default("guide"),
  url: text("url"),
  phoneNumber: text("phone_number"),
});

export const insertResourceSchema = createInsertSchema(resourcesTable).omit({ id: true });
export type InsertResource = z.infer<typeof insertResourceSchema>;
export type Resource = typeof resourcesTable.$inferSelect;
