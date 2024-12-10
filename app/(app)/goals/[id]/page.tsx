"use server"

import { Suspense } from "react"
import { auth } from "@clerk/nextjs/server"
import { GoalDetails } from "./_components/goal-details"
import { GoalDetailsSkeleton } from "./_components/goal-details-skeleton"
import { SubGoalsList } from "./_components/sub-goals-list"
import { SubGoalsListSkeleton } from "./_components/sub-goals-list-skeleton"
import { getGoalAction } from "@/actions/db/goals-actions"
import { notFound } from "next/navigation"

interface GoalPageProps {
  params: {
    id: string
  }
}

export default async function GoalPage({ params }: GoalPageProps) {
  const { userId } = auth()

  if (!userId) {
    throw new Error("Not authenticated")
  }

  const result = await getGoalAction(params.id)

  if (!result.isSuccess) {
    notFound()
  }

  // Verify ownership
  if (result.data.userId !== userId) {
    notFound()
  }

  return (
    <div className="container py-8">
      <Suspense fallback={<GoalDetailsSkeleton />}>
        <GoalDetails goal={result.data} />
      </Suspense>

      <div className="mt-8">
        <Suspense fallback={<SubGoalsListSkeleton />}>
          <SubGoalsList goalId={params.id} />
        </Suspense>
      </div>
    </div>
  )
} 