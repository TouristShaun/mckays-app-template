"use server"

import { createSubGoalAction } from "@/actions/db/sub-goals-actions"
import { getGoalAction } from "@/actions/db/goals-actions"
import {
  createMetapromptCommandAction,
  createMetapromptSessionAction
} from "@/actions/db/metaprompt-actions"
import { ActionState } from "@/types"
import { SelectSubGoal } from "@/db/schema"

export async function decomposeGoalAction(
  goalId: string,
  userId: string
): Promise<ActionState<SelectSubGoal[]>> {
  try {
    // Get the goal
    const goalResult = await getGoalAction(goalId)
    if (!goalResult.isSuccess) {
      return { isSuccess: false, message: "Goal not found" }
    }

    // Create a metaprompt session
    const sessionResult = await createMetapromptSessionAction({
      userId,
      bitId: "meaningfulpath-bit"
    })
    if (!sessionResult.isSuccess) {
      return { isSuccess: false, message: "Failed to create metaprompt session" }
    }

    // TODO: Replace with actual GPT call
    const suggestedSubGoals = [
      {
        title: "Define target audience",
        description: "Research and identify ideal customer segments"
      },
      {
        title: "Create landing page",
        description: "Design and develop a compelling landing page"
      },
      {
        title: "Set up analytics",
        description: "Implement tracking and reporting tools"
      }
    ]

    // Record the command
    await createMetapromptCommandAction({
      sessionId: sessionResult.data.id,
      commandType: "create",
      resource: "sub_goals",
      commandContent: JSON.stringify({
        action: "decompose_goal",
        goalId,
        suggestedSubGoals
      })
    })

    // Create the sub-goals
    const createdSubGoals: SelectSubGoal[] = []
    for (const subGoal of suggestedSubGoals) {
      const result = await createSubGoalAction({
        goalId,
        ...subGoal
      })
      if (result.isSuccess) {
        createdSubGoals.push(result.data)
      }
    }

    return {
      isSuccess: true,
      message: "Goal decomposed successfully",
      data: createdSubGoals
    }
  } catch (error) {
    console.error("Error decomposing goal:", error)
    return { isSuccess: false, message: "Failed to decompose goal" }
  }
} 