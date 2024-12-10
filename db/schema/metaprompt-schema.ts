import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"

export const metapromptSessionsTable = pgTable("metaprompt_sessions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(),
  bitId: text("bit_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date())
})

export const commandTypeEnum = pgEnum("command_type", [
  "create",
  "read",
  "update",
  "delete",
  "tmux"
])

export const metapromptCommandsTable = pgTable("metaprompt_commands", {
  id: uuid("id").defaultRandom().primaryKey(),
  sessionId: uuid("session_id")
    .references(() => metapromptSessionsTable.id, { onDelete: "cascade" })
    .notNull(),
  commandType: commandTypeEnum("command_type").notNull(),
  resource: text("resource").notNull(),
  commandContent: text("command_content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
})

export const metapromptTmuxLogsTable = pgTable("metaprompt_tmux_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  sessionId: uuid("session_id")
    .references(() => metapromptSessionsTable.id, { onDelete: "cascade" })
    .notNull(),
  tmuxCommand: text("tmux_command").notNull(),
  output: text("output").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
})

export type InsertMetapromptSession = typeof metapromptSessionsTable.$inferInsert
export type SelectMetapromptSession = typeof metapromptSessionsTable.$inferSelect

export type InsertMetapromptCommand = typeof metapromptCommandsTable.$inferInsert
export type SelectMetapromptCommand = typeof metapromptCommandsTable.$inferSelect

export type InsertMetapromptTmuxLog = typeof metapromptTmuxLogsTable.$inferInsert
export type SelectMetapromptTmuxLog = typeof metapromptTmuxLogsTable.$inferSelect 