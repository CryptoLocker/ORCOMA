"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function ReportesPage() {
  const reportes = [
    { id: 1, nombre: "Reporte de Seguridad", fecha: "2024-02-20" },
    { id: 2, nombre: "Reporte de Productividad", fecha: "2024-02-19" },
    { id: 3, nombre: "Reporte de Incidentes", fecha: "2024-02-18" },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Reportes</h1>

      <Card>
        <CardHeader>
          <CardTitle>Listado de Reportes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nombre del Reporte</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reportes.map((reporte) => (
                <TableRow key={reporte.id}>
                  <TableCell>{reporte.id}</TableCell>
                  <TableCell>{reporte.nombre}</TableCell>
                  <TableCell>{reporte.fecha}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      Ver
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

