import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"

export const resourceTypeEnum = pgEnum("resource_type", [
  "guide",
  "template",
  "checklist"
])

export const resourcesTable = pgTable("resources", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  content: text("content").notNull(),
  type: resourceTypeEnum("type").notNull(),
  link: text("link"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date())
})

export type InsertResource = typeof resourcesTable.$inferInsert
export type SelectResource = typeof resourcesTable.$inferSelect 