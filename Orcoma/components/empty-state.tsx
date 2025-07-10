"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

export function EmptyState({ icon: Icon, title, description, action, className = "" }: EmptyStateProps) {
  return (
    <Card className={`border-dashed border-2 border-gray-200 ${className}`}>
      <CardContent className="flex flex-col items-center justify-center py-12 px-6 text-center">
        {Icon && (
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <Icon className="h-8 w-8 text-gray-400" />
          </div>
        )}

        <h3 className="mb-2 text-lg font-semibold text-gray-900">{title}</h3>

        <p className="mb-6 text-sm text-gray-500 max-w-sm leading-relaxed">{description}</p>

        {action && (
          <Button onClick={action.onClick} className="bg-orange-500 hover:bg-orange-600 text-white">
            {action.label}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
