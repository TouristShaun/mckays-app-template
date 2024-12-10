"use client"

import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function SubGoalsListSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-7 w-24" />
        <Skeleton className="h-10 w-40" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Skeleton className="w-5 h-5 rounded-full" />
                <Skeleton className="h-6 w-24" />
              </div>
              <Skeleton className="h-5 w-5 rounded" />
            </div>

            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full" />
          </Card>
        ))}
      </div>
    </div>
  )
} 