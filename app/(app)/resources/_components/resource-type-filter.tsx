"use client"

import { useRouter, useSearchParams } from "next/navigation"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"

const types = [
  { value: "all", label: "All Resources" },
  { value: "guide", label: "Guides" },
  { value: "template", label: "Templates" },
  { value: "checklist", label: "Checklists" }
]

export function ResourceTypeFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentType = searchParams.get("type") || "all"

  const handleTypeChange = (type: string) => {
    const params = new URLSearchParams(searchParams)
    if (type === "all") {
      params.delete("type")
    } else {
      params.set("type", type)
    }
    router.push(`/resources?${params.toString()}`)
  }

  return (
    <Select value={currentType} onValueChange={handleTypeChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select type" />
      </SelectTrigger>
      <SelectContent>
        {types.map((type) => (
          <SelectItem key={type.value} value={type.value}>
            {type.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
} 