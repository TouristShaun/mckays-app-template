"use server"

import { Suspense } from "react"
import { auth } from "@clerk/nextjs/server"
import { GoalsList } from "./_components/goals-list"
import { GoalsListSkeleton } from "./_components/goals-list-skeleton"
import { CreateGoalButton } from "./_components/create-goal-button"

export default async function DashboardPage() {
  const { userId } = auth()

  if (!userId) {
    throw new Error("Not authenticated")
  }

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Your Goals</h1>
        <CreateGoalButton />
      </div>

      <Suspense fallback={<GoalsListSkeleton />}>
        <GoalsList userId={userId} />
      </Suspense>
    </div>
  )
} 