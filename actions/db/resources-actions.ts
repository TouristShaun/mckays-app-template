"use server"

import { db } from "@/db/db"
import { InsertResource, SelectResource, resourcesTable } from "@/db/schema"
import { ActionState } from "@/types"
import { eq } from "drizzle-orm"

export async function getResourcesAction(): Promise<ActionState<SelectResource[]>> {
  try {
    const resources = await db.query.resources.findMany()
    return {
      isSuccess: true,
      message: "Resources retrieved successfully",
      data: resources
    }
  } catch (error) {
    console.error("Error getting resources:", error)
    return { isSuccess: false, message: "Failed to get resources" }
  }
}

export async function getResourcesByTypeAction(
  type: string
): Promise<ActionState<SelectResource[]>> {
  try {
    const resources = await db.query.resources.findMany({
      where: eq(resourcesTable.type, type)
    })
    return {
      isSuccess: true,
      message: "Resources retrieved successfully",
      data: resources
    }
  } catch (error) {
    console.error("Error getting resources:", error)
    return { isSuccess: false, message: "Failed to get resources" }
  }
}

export async function getResourceAction(
  id: string
): Promise<ActionState<SelectResource>> {
  try {
    const resource = await db.query.resources.findFirst({
      where: eq(resourcesTable.id, id)
    })
    if (!resource) {
      return { isSuccess: false, message: "Resource not found" }
    }
    return {
      isSuccess: true,
      message: "Resource retrieved successfully",
      data: resource
    }
  } catch (error) {
    console.error("Error getting resource:", error)
    return { isSuccess: false, message: "Failed to get resource" }
  }
} 