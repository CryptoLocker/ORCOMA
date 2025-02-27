"use client"

import { X } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CustomAlertProps {
  type: "info" | "success" | "danger" | "warning"
  message: string
  onClose?: () => void
  className?: string
}

const alertStyles = {
  info: "border-blue-500 bg-blue-50 text-blue-700",
  success: "border-green-500 bg-green-50 text-green-700",
  danger: "border-red-500 bg-red-50 text-red-700",
  warning: "border-yellow-500 bg-yellow-50 text-yellow-700",
}

const iconStyles = {
  info: "text-blue-500",
  success: "text-green-500",
  danger: "text-red-500",
  warning: "text-yellow-500",
}

export function CustomAlert({ type, message, onClose, className }: CustomAlertProps) {
  return (
    <Alert className={cn("relative", alertStyles[type], className)}>
      <AlertDescription className="flex items-center gap-2">
        {message}
        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            className={cn("absolute right-2 top-2 h-6 w-6 rounded-full p-0 hover:bg-transparent", iconStyles[type])}
            onClick={onClose}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        )}
      </AlertDescription>
    </Alert>
  )
}

