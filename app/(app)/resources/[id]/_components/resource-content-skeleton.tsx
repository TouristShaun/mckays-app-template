"use client"

import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function ResourceContentSkeleton() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-10 w-36" />
        <Skeleton className="h-10 w-36" />
      </div>

      <Card className="p-8">
        <div className="flex items-center space-x-2 mb-6">
          <Skeleton className="w-5 h-5 rounded-full" />
          <Skeleton className="h-6 w-24" />
        </div>

        <Skeleton className="h-10 w-3/4 mb-4" />
        <Skeleton className="h-6 w-full mb-8" />

        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </Card>
    </div>
  )
} 