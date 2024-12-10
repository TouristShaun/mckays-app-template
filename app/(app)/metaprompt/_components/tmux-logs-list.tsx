"use client"

import { useEffect, useState } from "react"
import { SelectMetapromptTmuxLog } from "@/db/schema"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { getMetapromptTmuxLogsAction } from "@/actions/db/metaprompt-actions"
import { formatDistanceToNow } from "date-fns"

interface TmuxLogsListProps {
  sessionId: string
}

export function TmuxLogsList({ sessionId }: TmuxLogsListProps) {
  const [logs, setLogs] = useState<SelectMetapromptTmuxLog[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLogs = async () => {
      const result = await getMetapromptTmuxLogsAction(sessionId)
      if (result.isSuccess) {
        setLogs(result.data)
      } else {
        setError(result.message)
      }
    }

    fetchLogs()
  }, [sessionId])

  if (error) {
    return (
      <div className="text-center text-red-500">
        Error loading tmux logs: {error}
      </div>
    )
  }

  if (logs.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No tmux logs recorded for this session
      </div>
    )
  }

  return (
    <ScrollArea className="h-[300px]">
      <div className="space-y-3">
        {logs.map((log) => (
          <Card key={log.id} className="p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="text-sm font-medium">
                Command: {log.tmuxCommand}
              </div>
              <span className="text-xs text-gray-500">
                {formatDistanceToNow(new Date(log.createdAt), {
                  addSuffix: true
                })}
              </span>
            </div>

            <pre className="text-xs bg-gray-50 p-2 rounded overflow-x-auto whitespace-pre-wrap">
              {log.output}
            </pre>
          </Card>
        ))}
      </div>
    </ScrollArea>
  )
} 