"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { SignInButton } from "@clerk/nextjs"

const stages = [
  {
    id: "exploring",
    title: "I'm Exploring My Purpose",
    description: "Discover what meaningful business aligns with your values."
  },
  {
    id: "idea",
    title: "I Have an Idea but Need Direction",
    description: "Get guidance on validating and launching your business idea."
  },
  {
    id: "growing",
    title: "I'm Ready to Grow My Business",
    description: "Scale your impact and reach more customers."
  }
]

export function StageSelection() {
  const [selectedStage, setSelectedStage] = useState<string | null>(null)
  const [guidance, setGuidance] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleStageSelect = async (stageId: string) => {
    setSelectedStage(stageId)
    setLoading(true)

    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setGuidance(
        "Based on your stage, I recommend starting with defining your core values and exploring potential business ideas that align with them. Let's work together to find your path."
      )
    } catch (error) {
      console.error("Error getting guidance:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-3">
        {stages.map((stage) => (
          <motion.div
            key={stage.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card
              className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
                selectedStage === stage.id
                  ? "border-primary shadow-lg"
                  : "hover:border-gray-300"
              }`}
              onClick={() => handleStageSelect(stage.id)}
            >
              <h3 className="text-lg font-semibold">{stage.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{stage.description}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {loading && (
        <div className="flex justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      )}

      {guidance && !loading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">Your Personalized Guidance</h3>
            <p className="text-gray-600">{guidance}</p>
          </Card>

          <div className="flex justify-center">
            <SignInButton mode="modal">
              <Button size="lg">Get Started</Button>
            </SignInButton>
          </div>
        </motion.div>
      )}
    </div>
  )
} 