import { pgTable, serial, varchar, text, timestamp } from "drizzle-orm/pg-core";

export const aiOutput = pgTable("ai_output", {
    id: serial("id").primaryKey(),
    formData: varchar("formData", { length: 255 }).notNull(),
    aiResponse: text("aiResponse").notNull(),
    templateSlug: varchar("templateSlug", { length: 255 }).notNull(),
    createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow(),
    createdBy: varchar("createdBy", { length: 255 }).notNull()
   
});

// Type inference for TypeScript
export type AiOutput = typeof aiOutput.$inferSelect;
export type NewAiOutput = typeof aiOutput.$inferInsert;