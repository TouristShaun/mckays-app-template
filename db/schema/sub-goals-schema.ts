import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
import { goalStatusEnum, goalsTable } from "./goals-schema"

export const subGoalsTable = pgTable("sub_goals", {
  id: uuid("id").defaultRandom().primaryKey(),
  goalId: uuid("goal_id")
    .references(() => goalsTable.id, { onDelete: "cascade" })
    .notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  status: goalStatusEnum("status").notNull().default("not_started"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date())
})

export type InsertSubGoal = typeof subGoalsTable.$inferInsert
export type SelectSubGoal = typeof subGoalsTable.$inferSelect 