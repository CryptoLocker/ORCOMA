"use client"

import type * as React from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Trash2, Info } from "lucide-react"
import { LoadingDots } from "@/components/loading-dots"

interface ConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  onConfirm: () => void
  loading?: boolean
  variant?: "default" | "destructive" | "warning"
  confirmText?: string
  cancelText?: string
  icon?: React.ReactNode
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  loading = false,
  variant = "default",
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  icon,
}: ConfirmDialogProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "destructive":
        return {
          iconBg: "bg-red-100",
          iconColor: "text-red-600",
          buttonClass: "bg-red-600 hover:bg-red-700 focus:ring-red-500",
          defaultIcon: <Trash2 className="h-6 w-6" />,
        }
      case "warning":
        return {
          iconBg: "bg-yellow-100",
          iconColor: "text-yellow-600",
          buttonClass: "bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500",
          defaultIcon: <AlertTriangle className="h-6 w-6" />,
        }
      default:
        return {
          iconBg: "bg-blue-100",
          iconColor: "text-blue-600",
          buttonClass: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
          defaultIcon: <Info className="h-6 w-6" />,
        }
    }
  }

  const styles = getVariantStyles()

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <div className="flex items-center space-x-3">
            <div className={`flex h-12 w-12 items-center justify-center rounded-full ${styles.iconBg}`}>
              <div className={styles.iconColor}>{icon || styles.defaultIcon}</div>
            </div>
            <div className="flex-1">
              <AlertDialogTitle className="text-lg font-semibold text-gray-900">{title}</AlertDialogTitle>
            </div>
          </div>
        </AlertDialogHeader>

        <AlertDialogDescription className="text-gray-600 text-base leading-relaxed mt-4">
          {description}
        </AlertDialogDescription>

        <AlertDialogFooter className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
          <AlertDialogCancel asChild>
            <Button variant="outline" disabled={loading} className="mt-3 sm:mt-0 w-full sm:w-auto bg-transparent">
              {cancelText}
            </Button>
          </AlertDialogCancel>

          <AlertDialogAction asChild>
            <Button
              onClick={onConfirm}
              disabled={loading}
              className={`w-full sm:w-auto ${styles.buttonClass} text-white`}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <LoadingDots color="white" />
                  <span>Procesando...</span>
                </div>
              ) : (
                confirmText
              )}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
