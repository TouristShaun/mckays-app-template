"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { SelectGoal } from "@/db/schema"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Target } from "lucide-react"
import { updateGoalAction } from "@/actions/db/goals-actions"
import { toast } from "sonner"

interface GoalDetailsProps {
  goal: SelectGoal
}

export function GoalDetails({ goal }: GoalDetailsProps) {
  const router = useRouter()
  const [status, setStatus] = useState(goal.status)
  const [updating, setUpdating] = useState(false)

  // TODO: Calculate progress based on sub-goals
  const progress = 0

  const handleStatusChange = async (newStatus: string) => {
    setUpdating(true)

    try {
      const result = await updateGoalAction(goal.id, {
        status: newStatus as "not_started" | "in_progress" | "completed"
      })

      if (result.isSuccess) {
        setStatus(newStatus as "not_started" | "in_progress" | "completed")
        toast.success("Goal status updated")
        router.refresh()
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error("Failed to update goal status")
    } finally {
      setUpdating(false)
    }
  }

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Target className="w-5 h-5 text-primary" />
          <Badge variant={getStatusVariant(status)}>{status}</Badge>
        </div>

        <Select
          value={status}
          onValueChange={handleStatusChange}
          disabled={updating}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="not_started">Not Started</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <h1 className="text-2xl font-bold mb-2">{goal.title}</h1>
      <p className="text-gray-600 mb-6">{goal.description}</p>

      <div className="space-y-1">
        <div className="flex items-center justify-between text-sm">
          <span>Overall Progress</span>
          <span>{progress}%</span>
        </div>
        <Progress value={progress} />
      </div>
    </Card>
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