"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function StatsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Estadísticas</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Usuarios</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">1,234</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Visualizaciones Totales</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">5,678</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Tasa de Finalización</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">85%</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detalles de Visualizaciones</CardTitle>
        </CardHeader>
        <CardContent>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Últimos 7 días</SelectItem>
              <SelectItem value="30d">Últimos 30 días</SelectItem>
              <SelectItem value="90d">Últimos 90 días</SelectItem>
            </SelectContent>
          </Select>

          <Table className="mt-4">
            <TableHeader>
              <TableRow>
                <TableHead>Video</TableHead>
                <TableHead>Visualizaciones</TableHead>
                <TableHead>Tasa de Finalización</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Introducción a la Seguridad</TableCell>
                <TableCell>1,234</TableCell>
                <TableCell>92%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Manejo de Equipos</TableCell>
                <TableCell>987</TableCell>
                <TableCell>88%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Protocolos de Emergencia</TableCell>
                <TableCell>765</TableCell>
                <TableCell>95%</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

