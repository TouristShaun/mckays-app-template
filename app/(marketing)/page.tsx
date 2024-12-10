"use server"

import { Suspense } from "react"
import { StageSelection } from "./_components/stage-selection"
import { StageSelectionSkeleton } from "./_components/stage-selection-skeleton"
import { Hero } from "./_components/hero"

export default async function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gradient-to-b from-white to-gray-50">
      <Hero />

      <div className="w-full max-w-4xl px-4 mt-12">
        <Suspense fallback={<StageSelectionSkeleton />}>
          <StageSelection />
        </Suspense>
      </div>
    </div>
  )
}
