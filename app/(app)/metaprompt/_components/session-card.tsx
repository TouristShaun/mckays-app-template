"use client"

import { useState } from "react"
import { SelectMetapromptSession } from "@/db/schema"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Terminal, ChevronDown, ChevronUp } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { CommandsList } from "./commands-list"
import { TmuxLogsList } from "./tmux-logs-list"
import { motion, AnimatePresence } from "framer-motion"

interface SessionCardProps {
  session: SelectMetapromptSession
}

export function SessionCard({ session }: SessionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Terminal className="w-5 h-5 text-primary" />
            <div>
              <h3 className="text-lg font-semibold">Session {session.id}</h3>
              <p className="text-sm text-gray-600">
                {formatDistanceToNow(new Date(session.createdAt), {
                  addSuffix: true
                })}
              </p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </Button>
        </div>

        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div>
            <span className="font-medium">User ID:</span> {session.userId}
          </div>
          <div>
            <span className="font-medium">Bit ID:</span> {session.bitId}
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="mt-6 space-y-6">
                <div>
                  <h4 className="text-sm font-medium mb-3">Commands</h4>
                  <CommandsList sessionId={session.id} />
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-3">Tmux Logs</h4>
                  <TmuxLogsList sessionId={session.id} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  )
} 