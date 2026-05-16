import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";


export const contactsTable = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  subject: text("subject"),
  message: text("message").notNull(),
  inquiryType: text("inquiry_type").notNull().default("general"),
  status: text("status").notNull().default("new"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});


export type Contact = typeof contactsTable.$inferSelect;
