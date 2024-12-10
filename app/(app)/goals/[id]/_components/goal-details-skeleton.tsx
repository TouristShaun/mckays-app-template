"use client"

import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function GoalDetailsSkeleton() {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Skeleton className="w-5 h-5 rounded-full" />
          <Skeleton className="h-6 w-24" />
        </div>
        <Skeleton className="h-10 w-[180px]" />
      </div>

      <Skeleton className="h-8 w-3/4 mb-2" />
      <Skeleton className="h-4 w-full mb-6" />

      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-12" />
        </div>
        <Skeleton className="h-2 w-full" />
      </div>
    </Card>
  )
} 