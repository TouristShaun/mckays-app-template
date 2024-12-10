"use server"

import { db } from "@/db/db"
import { InsertGoal, SelectGoal, goalsTable } from "@/db/schema"
import { ActionState } from "@/types"
import { eq } from "drizzle-orm"

export async function createGoalAction(
  goal: InsertGoal
): Promise<ActionState<SelectGoal>> {
  try {
    const [newGoal] = await db.insert(goalsTable).values(goal).returning()
    return {
      isSuccess: true,
      message: "Goal created successfully",
      data: newGoal
    }
  } catch (error) {
    console.error("Error creating goal:", error)
    return { isSuccess: false, message: "Failed to create goal" }
  }
}

export async function getGoalsAction(
  userId: string
): Promise<ActionState<SelectGoal[]>> {
  try {
    const goals = await db.query.goals.findMany({
      where: eq(goalsTable.userId, userId)
    })
    return {
      isSuccess: true,
      message: "Goals retrieved successfully",
      data: goals
    }
  } catch (error) {
    console.error("Error getting goals:", error)
    return { isSuccess: false, message: "Failed to get goals" }
  }
}

export async function getGoalAction(
  id: string
): Promise<ActionState<SelectGoal>> {
  try {
    const goal = await db.query.goals.findFirst({
      where: eq(goalsTable.id, id)
    })
    if (!goal) {
      return { isSuccess: false, message: "Goal not found" }
    }
    return {
      isSuccess: true,
      message: "Goal retrieved successfully",
      data: goal
    }
  } catch (error) {
    console.error("Error getting goal:", error)
    return { isSuccess: false, message: "Failed to get goal" }
  }
}

export async function updateGoalAction(
  id: string,
  data: Partial<InsertGoal>
): Promise<ActionState<SelectGoal>> {
  try {
    const [updatedGoal] = await db
      .update(goalsTable)
      .set(data)
      .where(eq(goalsTable.id, id))
      .returning()

    return {
      isSuccess: true,
      message: "Goal updated successfully",
      data: updatedGoal
    }
  } catch (error) {
    console.error("Error updating goal:", error)
    return { isSuccess: false, message: "Failed to update goal" }
  }
}

export async function deleteGoalAction(id: string): Promise<ActionState<void>> {
  try {
    await db.delete(goalsTable).where(eq(goalsTable.id, id))
    return {
      isSuccess: true,
      message: "Goal deleted successfully",
      data: undefined
    }
  } catch (error) {
    console.error("Error deleting goal:", error)
    return { isSuccess: false, message: "Failed to delete goal" }
  }
} 