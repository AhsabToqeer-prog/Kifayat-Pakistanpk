import { pgTable, text, serial } from "drizzle-orm/pg-core";

export const resourcesTable = pgTable("resources", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull().default("general"),
  resourceType: text("resource_type").notNull().default("guide"),
  url: text("url"),
  phoneNumber: text("phone_number"),
});

export type Resource = typeof resourcesTable.$inferSelect;
