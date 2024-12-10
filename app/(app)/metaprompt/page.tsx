"use server"

import { Suspense } from "react"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { SessionsList } from "./_components/sessions-list"
import { SessionsListSkeleton } from "./_components/sessions-list-skeleton"

// List of admin user IDs
const ADMIN_IDS = ["user_1", "user_2"] // TODO: Move to env

export default async function MetapromptPage() {
  const { userId } = auth()

  if (!userId || !ADMIN_IDS.includes(userId)) {
    redirect("/")
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Metaprompt Developer View</h1>
        <p className="text-gray-600 mt-2">
          Inspect metaprompt sessions, commands, and tmux logs
        </p>
      </div>

      <Suspense fallback={<SessionsListSkeleton />}>
        <SessionsList />
      </Suspense>
    </div>
  )
} 