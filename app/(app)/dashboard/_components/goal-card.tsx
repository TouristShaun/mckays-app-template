"use client"

import { SelectGoal } from "@/db/schema"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Target } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

interface GoalCardProps {
  goal: SelectGoal
}

export function GoalCard({ goal }: GoalCardProps) {
  // TODO: Calculate progress based on sub-goals
  const progress = 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6 h-full flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-primary" />
            <Badge variant={getStatusVariant(goal.status)}>{goal.status}</Badge>
          </div>
        </div>

        <h3 className="text-lg font-semibold mb-2">{goal.title}</h3>
        <p className="text-sm text-gray-600 mb-4 flex-grow">{goal.description}</p>

        <div className="space-y-4">
          <div className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} />
          </div>

          <Link href={`/goals/${goal.id}`} className="block">
            <Button className="w-full" variant="outline">
              View Details
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </Card>
    </motion.div>
  )
}

function getStatusVariant(status: string) {
  switch (status) {
    case "not_started":
      return "secondary"
    case "in_progress":
      return "default"
    case "completed":
      return "success"
    default:
      return "default"
  }
} 