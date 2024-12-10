"use server"

import { auth } from "@clerk/nextjs/server"
import { getSubGoalsAction } from "@/actions/db/sub-goals-actions"
import { SubGoalCard } from "./sub-goal-card"
import { DecomposeButton } from "./decompose-button"
import { EmptyState } from "@/components/ui/empty-state"
import { ListChecks } from "lucide-react"

interface SubGoalsListProps {
  goalId: string
}

export async function SubGoalsList({ goalId }: SubGoalsListProps) {
  const { userId } = auth()

  if (!userId) {
    throw new Error("Not authenticated")
  }

  const result = await getSubGoalsAction(goalId)

  if (!result.isSuccess) {
    return (
      <div className="text-center text-red-500">
        Error loading sub-goals: {result.message}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Sub-Goals</h2>
        <DecomposeButton goalId={goalId} userId={userId} />
      </div>

      {result.data.length === 0 ? (
        <EmptyState
          icon={ListChecks}
          title="No sub-goals yet"
          description="Click 'Decompose with Bit' to break down your goal into actionable steps"
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {result.data.map((subGoal) => (
            <SubGoalCard key={subGoal.id} subGoal={subGoal} />
          ))}
        </div>
      )}
    </div>
  )
} 