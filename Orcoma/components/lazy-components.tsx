"use client"

import dynamic from "next/dynamic"
import { LoadingDots } from "./loading-dots"

// Carga diferida para componentes pesados
export const LazyFullScreenLoading = dynamic(
  () => import("./full-screen-loading").then((mod) => mod.FullScreenLoading),
  {
    loading: () => (
      <div className="flex items-center justify-center h-screen">
        <LoadingDots size="lg" color="orange" />
      </div>
    ),
    ssr: false,
  },
)

// Carga diferida para el calendario
export const LazyCalendar = dynamic(() => import("@/components/ui/calendar").then((mod) => mod.Calendar), {
  loading: () => (
    <div className="h-[300px] flex items-center justify-center">
      <LoadingDots size="md" color="orange" />
    </div>
  ),
  ssr: false,
})

// Carga diferida para el generador de PDF
export const useLazyPdfGenerator = () => {
  const generatePdf = async (data: any) => {
    const { generarPDF } = await import("@/lib/pdf-generator")
    return generarPDF(data)
  }

  return { generatePdf }
}
