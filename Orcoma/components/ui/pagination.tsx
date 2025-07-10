"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  showFirstLast?: boolean
  className?: string
}

const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  ({ currentPage, totalPages, onPageChange, showFirstLast = true, className }, ref) => {
    const getVisiblePages = () => {
      const delta = 2
      const range = []
      const rangeWithDots = []

      for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
        range.push(i)
      }

      if (currentPage - delta > 2) {
        rangeWithDots.push(1, "...")
      } else {
        rangeWithDots.push(1)
      }

      rangeWithDots.push(...range)

      if (currentPage + delta < totalPages - 1) {
        rangeWithDots.push("...", totalPages)
      } else if (totalPages > 1) {
        rangeWithDots.push(totalPages)
      }

      return rangeWithDots
    }

    if (totalPages <= 1) return null

    const visiblePages = getVisiblePages()

    return (
      <div ref={ref} className={cn("flex items-center justify-center space-x-2", className)}>
        {/* Botón Primera Página */}
        {showFirstLast && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            className="hidden sm:flex"
          >
            Primera
          </Button>
        )}

        {/* Botón Anterior */}
        <Button variant="outline" size="sm" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Página anterior</span>
        </Button>

        {/* Números de página */}
        <div className="flex items-center space-x-1">
          {visiblePages.map((page, index) => {
            if (page === "...") {
              return (
                <div key={`dots-${index}`} className="px-2">
                  <MoreHorizontal className="h-4 w-4 text-gray-400" />
                </div>
              )
            }

            const pageNumber = page as number
            return (
              <Button
                key={pageNumber}
                variant={currentPage === pageNumber ? "default" : "outline"}
                size="sm"
                onClick={() => onPageChange(pageNumber)}
                className={cn(
                  "min-w-[40px]",
                  currentPage === pageNumber && "bg-orange-500 hover:bg-orange-600 text-white",
                )}
              >
                {pageNumber}
              </Button>
            )
          })}
        </div>

        {/* Botón Siguiente */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Página siguiente</span>
        </Button>

        {/* Botón Última Página */}
        {showFirstLast && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="hidden sm:flex"
          >
            Última
          </Button>
        )}
      </div>
    )
  },
)

Pagination.displayName = "Pagination"

export { Pagination }
