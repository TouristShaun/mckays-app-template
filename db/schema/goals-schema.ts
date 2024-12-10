import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"

export const goalStatusEnum = pgEnum("goal_status", [
  "not_started",
  "in_progress",
  "completed"
])

export const goalsTable = pgTable("goals", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  status: goalStatusEnum("status").notNull().default("not_started"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date())
})

export type InsertGoal = typeof goalsTable.$inferInsert
export type SelectGoal = typeof goalsTable.$inferSelect 