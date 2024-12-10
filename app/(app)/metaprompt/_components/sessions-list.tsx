"use server"

import { db } from "@/db/db"
import { SessionCard } from "./session-card"
import { EmptyState } from "@/components/ui/empty-state"
import { Terminal } from "lucide-react"

export async function SessionsList() {
  const sessions = await db.query.metapromptSessions.findMany({
    orderBy: (sessions, { desc }) => [desc(sessions.createdAt)]
  })

  if (sessions.length === 0) {
    return (
      <EmptyState
        icon={Terminal}
        title="No sessions found"
        description="No metaprompt sessions have been recorded yet"
      />
    )
  }

  return (
    <div className="space-y-6">
      {sessions.map((session) => (
        <SessionCard key={session.id} session={session} />
      ))}
    </div>
  )
} 