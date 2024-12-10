"use client"

import { useEffect, useState } from "react"
import { SelectMetapromptCommand } from "@/db/schema"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { getMetapromptCommandsAction } from "@/actions/db/metaprompt-actions"
import { formatDistanceToNow } from "date-fns"

interface CommandsListProps {
  sessionId: string
}

export function CommandsList({ sessionId }: CommandsListProps) {
  const [commands, setCommands] = useState<SelectMetapromptCommand[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCommands = async () => {
      const result = await getMetapromptCommandsAction(sessionId)
      if (result.isSuccess) {
        setCommands(result.data)
      } else {
        setError(result.message)
      }
    }

    fetchCommands()
  }, [sessionId])

  if (error) {
    return (
      <div className="text-center text-red-500">
        Error loading commands: {error}
      </div>
    )
  }

  if (commands.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No commands recorded for this session
      </div>
    )
  }

  return (
    <ScrollArea className="h-[300px]">
      <div className="space-y-3">
        {commands.map((command) => (
          <Card key={command.id} className="p-4">
            <div className="flex items-start justify-between mb-2">
              <Badge variant={getCommandVariant(command.commandType)}>
                {command.commandType}
              </Badge>
              <span className="text-xs text-gray-500">
                {formatDistanceToNow(new Date(command.createdAt), {
                  addSuffix: true
                })}
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-sm">
                <span className="font-medium">Resource:</span> {command.resource}
              </div>
              <pre className="text-xs bg-gray-50 p-2 rounded overflow-x-auto">
                {command.commandContent}
              </pre>
            </div>
          </Card>
        ))}
      </div>
    </ScrollArea>
  )
}

function getCommandVariant(type: string) {
  switch (type) {
    case "create":
      return "default"
    case "read":
      return "secondary"
    case "update":
      return "outline"
    case "delete":
      return "destructive"
    case "tmux":
      return "default"
    default:
      return "default"
  }
} 