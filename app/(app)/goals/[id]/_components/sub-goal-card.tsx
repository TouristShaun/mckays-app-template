"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { SelectSubGoal } from "@/db/schema"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { ListChecks } from "lucide-react"
import { updateSubGoalAction } from "@/actions/db/sub-goals-actions"
import { toast } from "sonner"
import { motion } from "framer-motion"

interface SubGoalCardProps {
  subGoal: SelectSubGoal
}

export function SubGoalCard({ subGoal }: SubGoalCardProps) {
  const router = useRouter()
  const [status, setStatus] = useState(subGoal.status)
  const [updating, setUpdating] = useState(false)

  const handleStatusChange = async (checked: boolean) => {
    const newStatus = checked ? "completed" : "not_started"
    setUpdating(true)

    try {
      const result = await updateSubGoalAction(subGoal.id, {
        status: newStatus
      })

      if (result.isSuccess) {
        setStatus(newStatus)
        toast.success("Sub-goal status updated")
        router.refresh()
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error("Failed to update sub-goal status")
    } finally {
      setUpdating(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-2">
            <ListChecks className="w-5 h-5 text-primary" />
            <Badge variant={getStatusVariant(status)}>{status}</Badge>
          </div>

          <Checkbox
            checked={status === "completed"}
            onCheckedChange={handleStatusChange}
            disabled={updating}
          />
        </div>

        <h3 className="text-lg font-semibold mb-2">{subGoal.title}</h3>
        <p className="text-sm text-gray-600">{subGoal.description}</p>
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