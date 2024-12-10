"use server"

import { Suspense } from "react"
import { getResourceAction } from "@/actions/db/resources-actions"
import { ResourceContent } from "./_components/resource-content"
import { ResourceContentSkeleton } from "./_components/resource-content-skeleton"
import { notFound } from "next/navigation"

interface ResourcePageProps {
  params: {
    id: string
  }
}

export default async function ResourcePage({ params }: ResourcePageProps) {
  const result = await getResourceAction(params.id)

  if (!result.isSuccess) {
    notFound()
  }

  return (
    <div className="container py-8">
      <Suspense fallback={<ResourceContentSkeleton />}>
        <ResourceContent resource={result.data} />
      </Suspense>
    </div>
  )
} 