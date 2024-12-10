"use server"

import { db } from "@/db/db"
import { InsertSubGoal, SelectSubGoal, subGoalsTable } from "@/db/schema"
import { ActionState } from "@/types"
import { eq } from "drizzle-orm"

export async function createSubGoalAction(
  subGoal: InsertSubGoal
): Promise<ActionState<SelectSubGoal>> {
  try {
    const [newSubGoal] = await db.insert(subGoalsTable).values(subGoal).returning()
    return {
      isSuccess: true,
      message: "Sub-goal created successfully",
      data: newSubGoal
    }
  } catch (error) {
    console.error("Error creating sub-goal:", error)
    return { isSuccess: false, message: "Failed to create sub-goal" }
  }
}

export async function getSubGoalsAction(
  goalId: string
): Promise<ActionState<SelectSubGoal[]>> {
  try {
    const subGoals = await db.query.subGoals.findMany({
      where: eq(subGoalsTable.goalId, goalId)
    })
    return {
      isSuccess: true,
      message: "Sub-goals retrieved successfully",
      data: subGoals
    }
  } catch (error) {
    console.error("Error getting sub-goals:", error)
    return { isSuccess: false, message: "Failed to get sub-goals" }
  }
}

export async function getSubGoalAction(
  id: string
): Promise<ActionState<SelectSubGoal>> {
  try {
    const subGoal = await db.query.subGoals.findFirst({
      where: eq(subGoalsTable.id, id)
    })
    if (!subGoal) {
      return { isSuccess: false, message: "Sub-goal not found" }
    }
    return {
      isSuccess: true,
      message: "Sub-goal retrieved successfully",
      data: subGoal
    }
  } catch (error) {
    console.error("Error getting sub-goal:", error)
    return { isSuccess: false, message: "Failed to get sub-goal" }
  }
}

export async function updateSubGoalAction(
  id: string,
  data: Partial<InsertSubGoal>
): Promise<ActionState<SelectSubGoal>> {
  try {
    const [updatedSubGoal] = await db
      .update(subGoalsTable)
      .set(data)
      .where(eq(subGoalsTable.id, id))
      .returning()

    return {
      isSuccess: true,
      message: "Sub-goal updated successfully",
      data: updatedSubGoal
    }
  } catch (error) {
    console.error("Error updating sub-goal:", error)
    return { isSuccess: false, message: "Failed to update sub-goal" }
  }
}

export async function deleteSubGoalAction(id: string): Promise<ActionState<void>> {
  try {
    await db.delete(subGoalsTable).where(eq(subGoalsTable.id, id))
    return {
      isSuccess: true,
      message: "Sub-goal deleted successfully",
      data: undefined
    }
  } catch (error) {
    console.error("Error deleting sub-goal:", error)
    return { isSuccess: false, message: "Failed to delete sub-goal" }
  }
} 