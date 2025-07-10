"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Eye, Calendar, TrendingUp, Users, AlertTriangle } from "lucide-react"

interface Reporte {
  id: number
  nombre: string
  tipo: string
  fecha: string
  estado: "completado" | "pendiente" | "en_proceso"
  descargas: number
}

export default function ReportesPage() {
  const reportes: Reporte[] = [
    {
      id: 1,
      nombre: "Reporte de Seguridad Mensual",
      tipo: "Seguridad",
      fecha: "2024-02-20",
      estado: "completado",
      descargas: 15,
    },
    {
      id: 2,
      nombre: "Análisis de Productividad Q1",
      tipo: "Productividad",
      fecha: "2024-02-19",
      estado: "completado",
      descargas: 8,
    },
    {
      id: 3,
      nombre: "Registro de Incidentes",
      tipo: "Incidentes",
      fecha: "2024-02-18",
      estado: "en_proceso",
      descargas: 3,
    },
    {
      id: 4,
      nombre: "Evaluación de Capacitaciones",
      tipo: "Capacitación",
      fecha: "2024-02-17",
      estado: "pendiente",
      descargas: 0,
    },
  ]

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "completado":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completado</Badge>
      case "en_proceso":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">En Proceso</Badge>
      case "pendiente":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Pendiente</Badge>
      default:
        return <Badge variant="secondary">{estado}</Badge>
    }
  }

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case "Seguridad":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "Productividad":
        return <TrendingUp className="h-4 w-4 text-blue-500" />
      case "Incidentes":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />
      case "Capacitación":
        return <Users className="h-4 w-4 text-green-500" />
      default:
        return <FileText className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center space-x-3">
        <FileText className="h-8 w-8 text-orange-500" />
        <h1 className="text-2xl font-medium text-orange-500">Reportes</h1>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Completados</p>
              <p className="text-3xl font-medium">2</p>
            </div>
            <FileText className="h-6 w-6 text-green-500" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">En Proceso</p>
              <p className="text-3xl font-medium">1</p>
            </div>
            <Calendar className="h-6 w-6 text-orange-500" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-gray-500">
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Pendientes</p>
              <p className="text-3xl font-medium">1</p>
            </div>
            <AlertTriangle className="h-6 w-6 text-gray-500" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Total Descargas</p>
              <p className="text-3xl font-medium">26</p>
            </div>
            <Download className="h-6 w-6 text-blue-500" />
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm border-gray-100">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-gray-600" />
            <span>Listado de Reportes</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Nombre del Reporte</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Descargas</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reportes.map((reporte) => (
                  <TableRow key={reporte.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{reporte.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getTipoIcon(reporte.tipo)}
                        <span>{reporte.tipo}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{reporte.nombre}</TableCell>
                    <TableCell>{reporte.fecha}</TableCell>
                    <TableCell>{getEstadoBadge(reporte.estado)}</TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-600">{reporte.descargas}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="mr-2 h-4 w-4" />
                          Ver
                        </Button>
                        {reporte.estado === "completado" && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 bg-transparent"
                          >
                            <Download className="mr-2 h-4 w-4" />
                            Descargar
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
