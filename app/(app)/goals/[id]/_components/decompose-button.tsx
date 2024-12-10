"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import { decomposeGoalAction } from "@/actions/goals-decomposition-action"
import { toast } from "sonner"

interface DecomposeButtonProps {
  goalId: string
  userId: string
}

export function DecomposeButton({ goalId, userId }: DecomposeButtonProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleDecompose = async () => {
    setLoading(true)

    try {
      const result = await decomposeGoalAction(goalId, userId)

      if (result.isSuccess) {
        toast.success("Goal decomposed successfully")
        router.refresh()
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error("Failed to decompose goal")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button onClick={handleDecompose} disabled={loading}>
      <Sparkles className="w-4 h-4 mr-2" />
      {loading ? "Decomposing..." : "Decompose with Bit"}
    </Button>
  )
} 