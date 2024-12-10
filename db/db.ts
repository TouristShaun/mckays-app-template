import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import {
  goalsTable,
  subGoalsTable,
  metapromptSessionsTable,
  metapromptCommandsTable,
  metapromptTmuxLogsTable,
  resourcesTable
} from "@/db/schema"

const connectionString = process.env.DATABASE_URL!
const client = postgres(connectionString)
export const db = drizzle(client, {
  schema: {
    goals: goalsTable,
    subGoals: subGoalsTable,
    metapromptSessions: metapromptSessionsTable,
    metapromptCommands: metapromptCommandsTable,
    metapromptTmuxLogs: metapromptTmuxLogsTable,
    resources: resourcesTable
  }
})
