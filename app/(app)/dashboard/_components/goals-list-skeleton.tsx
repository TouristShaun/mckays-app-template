"use client"

import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function GoalsListSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="p-6">
          <div className="flex items-start justify-between mb-4">
            <Skeleton className="h-6 w-24" />
          </div>

          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-full mb-4" />

          <div className="space-y-4">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-8" />
              </div>
              <Skeleton className="h-2 w-full" />
            </div>

            <Skeleton className="h-10 w-full" />
          </div>
        </Card>
      ))}
    </div>
  )
} 