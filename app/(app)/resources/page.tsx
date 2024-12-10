"use server"

import { Suspense } from "react"
import { ResourcesList } from "./_components/resources-list"
import { ResourcesListSkeleton } from "./_components/resources-list-skeleton"
import { ResourceTypeFilter } from "./_components/resource-type-filter"

export default async function ResourcesPage() {
  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Resources</h1>
        <ResourceTypeFilter />
      </div>

      <Suspense fallback={<ResourcesListSkeleton />}>
        <ResourcesList />
      </Suspense>
    </div>
  )
} 