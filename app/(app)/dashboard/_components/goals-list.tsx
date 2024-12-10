"use server"

import { getGoalsAction } from "@/actions/db/goals-actions"
import { GoalCard } from "./goal-card"
import { EmptyState } from "@/components/ui/empty-state"
import { Target } from "lucide-react"

interface GoalsListProps {
  userId: string
}

export async function GoalsList({ userId }: GoalsListProps) {
  const result = await getGoalsAction(userId)

  if (!result.isSuccess) {
    return (
      <div className="text-center text-red-500">
        Error loading goals: {result.message}
      </div>
    )
  }

  if (result.data.length === 0) {
    return (
      <EmptyState
        icon={Target}
        title="No goals yet"
        description="Create your first goal to get started"
      />
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {result.data.map((goal) => (
        <GoalCard key={goal.id} goal={goal} />
      ))}
    </div>
  )
} 