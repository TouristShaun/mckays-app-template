"use server"

import { db } from "@/db/db"
import {
  InsertMetapromptCommand,
  InsertMetapromptSession,
  InsertMetapromptTmuxLog,
  SelectMetapromptCommand,
  SelectMetapromptSession,
  SelectMetapromptTmuxLog,
  metapromptCommandsTable,
  metapromptSessionsTable,
  metapromptTmuxLogsTable
} from "@/db/schema"
import { ActionState } from "@/types"
import { eq } from "drizzle-orm"

// Session Actions
export async function createMetapromptSessionAction(
  session: InsertMetapromptSession
): Promise<ActionState<SelectMetapromptSession>> {
  try {
    const [newSession] = await db
      .insert(metapromptSessionsTable)
      .values(session)
      .returning()
    return {
      isSuccess: true,
      message: "Metaprompt session created successfully",
      data: newSession
    }
  } catch (error) {
    console.error("Error creating metaprompt session:", error)
    return { isSuccess: false, message: "Failed to create metaprompt session" }
  }
}

export async function getMetapromptSessionAction(
  id: string
): Promise<ActionState<SelectMetapromptSession>> {
  try {
    const session = await db.query.metapromptSessions.findFirst({
      where: eq(metapromptSessionsTable.id, id)
    })
    if (!session) {
      return { isSuccess: false, message: "Metaprompt session not found" }
    }
    return {
      isSuccess: true,
      message: "Metaprompt session retrieved successfully",
      data: session
    }
  } catch (error) {
    console.error("Error getting metaprompt session:", error)
    return { isSuccess: false, message: "Failed to get metaprompt session" }
  }
}

// Command Actions
export async function createMetapromptCommandAction(
  command: InsertMetapromptCommand
): Promise<ActionState<SelectMetapromptCommand>> {
  try {
    const [newCommand] = await db
      .insert(metapromptCommandsTable)
      .values(command)
      .returning()
    return {
      isSuccess: true,
      message: "Metaprompt command created successfully",
      data: newCommand
    }
  } catch (error) {
    console.error("Error creating metaprompt command:", error)
    return { isSuccess: false, message: "Failed to create metaprompt command" }
  }
}

export async function getMetapromptCommandsAction(
  sessionId: string
): Promise<ActionState<SelectMetapromptCommand[]>> {
  try {
    const commands = await db.query.metapromptCommands.findMany({
      where: eq(metapromptCommandsTable.sessionId, sessionId)
    })
    return {
      isSuccess: true,
      message: "Metaprompt commands retrieved successfully",
      data: commands
    }
  } catch (error) {
    console.error("Error getting metaprompt commands:", error)
    return { isSuccess: false, message: "Failed to get metaprompt commands" }
  }
}

// Tmux Log Actions
export async function createMetapromptTmuxLogAction(
  log: InsertMetapromptTmuxLog
): Promise<ActionState<SelectMetapromptTmuxLog>> {
  try {
    const [newLog] = await db
      .insert(metapromptTmuxLogsTable)
      .values(log)
      .returning()
    return {
      isSuccess: true,
      message: "Metaprompt tmux log created successfully",
      data: newLog
    }
  } catch (error) {
    console.error("Error creating metaprompt tmux log:", error)
    return { isSuccess: false, message: "Failed to create metaprompt tmux log" }
  }
}

export async function getMetapromptTmuxLogsAction(
  sessionId: string
): Promise<ActionState<SelectMetapromptTmuxLog[]>> {
  try {
    const logs = await db.query.metapromptTmuxLogs.findMany({
      where: eq(metapromptTmuxLogsTable.sessionId, sessionId)
    })
    return {
      isSuccess: true,
      message: "Metaprompt tmux logs retrieved successfully",
      data: logs
    }
  } catch (error) {
    console.error("Error getting metaprompt tmux logs:", error)
    return { isSuccess: false, message: "Failed to get metaprompt tmux logs" }
  }
} 