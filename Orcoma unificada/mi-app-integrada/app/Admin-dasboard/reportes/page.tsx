"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

export default function ReportsPage() {
  const [isGeneratingReport, setIsGeneratingReport] = useState(false)
  const [reportType, setReportType] = useState("")
  const [dateRange, setDateRange] = useState({ start: "", end: "" })

  const handleGenerateReport = async () => {
    if (!reportType || !dateRange.start || !dateRange.end) {
      toast({
        title: "Error",
        description: "Por favor, seleccione el tipo de reporte y el rango de fechas.",
        variant: "destructive",
      })
      return
    }

    setIsGeneratingReport(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Éxito",
        description: "El reporte se ha generado correctamente.",
      })
    } catch (error) {
      console.error("Error al generar reporte:", error)
      toast({
        title: "Error",
        description: "Hubo un problema al generar el reporte. Por favor, intente de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsGeneratingReport(false)
    }
  }

  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-orange-50">
        <CardTitle className="text-2xl text-orange-700">Generación de Reportes</CardTitle>
      </CardHeader>
      <CardContent className="mt-6">
        <form className="space-y-6">
          <div>
            <label htmlFor="reportType" className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Reporte
            </label>
            <Select onValueChange={(value) => setReportType(value)}>
              <SelectTrigger id="reportType" className="w-full">
                <SelectValue placeholder="Selecciona el tipo de reporte" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user-progress">Progreso de Usuarios</SelectItem>
                <SelectItem value="course-completion">Finalización de Cursos</SelectItem>
                <SelectItem value="video-analytics">Analíticas de Videos</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de Inicio
              </label>
              <Input
                type="date"
                id="startDate"
                onChange={(e) => setDateRange((prev) => ({ ...prev, start: e.target.value }))}
                required
                className="w-full"
              />
            </div>
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de Fin
              </label>
              <Input
                type="date"
                id="endDate"
                onChange={(e) => setDateRange((prev) => ({ ...prev, end: e.target.value }))}
                required
                className="w-full"
              />
            </div>
          </div>
          <Button
            onClick={handleGenerateReport}
            disabled={isGeneratingReport}
            className={`w-full ${isGeneratingReport ? "bg-orange-300" : "bg-orange-500 hover:bg-orange-600"} text-white`}
          >
            {isGeneratingReport ? "Generando..." : "Generar Reporte"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

