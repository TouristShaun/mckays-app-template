"use client"

import { SelectResource } from "@/db/schema"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Link as LinkIcon } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

interface ResourceCardProps {
  resource: SelectResource
}

export function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6 h-full flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-primary" />
            <Badge variant={getTypeVariant(resource.type)}>{resource.type}</Badge>
          </div>
        </div>

        <h3 className="text-lg font-semibold mb-2">{resource.title}</h3>
        <p className="text-sm text-gray-600 mb-4 flex-grow">
          {resource.description}
        </p>

        <div className="flex items-center space-x-2">
          <Link href={`/resources/${resource.id}`} className="flex-1">
            <Button className="w-full" variant="outline">
              View Resource
            </Button>
          </Link>

          {resource.link && (
            <Link href={resource.link} target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon">
                <LinkIcon className="w-4 h-4" />
              </Button>
            </Link>
          )}
        </div>
      </Card>
    </motion.div>
  )
}

function getTypeVariant(type: string) {
  switch (type) {
    case "guide":
      return "default"
    case "template":
      return "secondary"
    case "checklist":
      return "outline"
    default:
      return "default"
  }
} 