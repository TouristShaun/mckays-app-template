"use client"

import { SelectResource } from "@/db/schema"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, FileText, Link as LinkIcon } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { MDXRemote } from "next-mdx-remote"

interface ResourceContentProps {
  resource: SelectResource
}

export function ResourceContent({ resource }: ResourceContentProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <Link href="/resources">
          <Button variant="ghost">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Resources
          </Button>
        </Link>

        {resource.link && (
          <Link href={resource.link} target="_blank" rel="noopener noreferrer">
            <Button>
              <LinkIcon className="w-4 h-4 mr-2" />
              External Link
            </Button>
          </Link>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-8">
          <div className="flex items-center space-x-2 mb-6">
            <FileText className="w-5 h-5 text-primary" />
            <Badge variant={getTypeVariant(resource.type)}>{resource.type}</Badge>
          </div>

          <h1 className="text-3xl font-bold mb-4">{resource.title}</h1>
          <p className="text-gray-600 mb-8">{resource.description}</p>

          <div className="prose prose-gray max-w-none">
            <MDXRemote source={resource.content} />
          </div>
        </Card>
      </motion.div>
    </div>
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