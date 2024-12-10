"use server"

import { getResourcesAction } from "@/actions/db/resources-actions"
import { ResourceCard } from "./resource-card"
import { EmptyState } from "@/components/ui/empty-state"
import { FileText } from "lucide-react"

export async function ResourcesList() {
  const result = await getResourcesAction()

  if (!result.isSuccess) {
    return (
      <div className="text-center text-red-500">
        Error loading resources: {result.message}
      </div>
    )
  }

  if (result.data.length === 0) {
    return (
      <EmptyState
        icon={FileText}
        title="No resources available"
        description="Check back later for guides, templates, and checklists"
      />
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {result.data.map((resource) => (
        <ResourceCard key={resource.id} resource={resource} />
      ))}
    </div>
  )
} 