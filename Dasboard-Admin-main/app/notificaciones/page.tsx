"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Bell } from "lucide-react"

interface Notificacion {
  id: number
  mensaje: string
  fecha: string
  leida: boolean
}

export default function NotificacionesPage() {
  const [notificaciones] = useState<Notificacion[]>([
    {
      id: 1,
      mensaje: "Nuevo video disponible: Seguridad en el trabajo",
      fecha: "2024-02-21",
      leida: false,
    },
    {
      id: 2,
      mensaje: "Recordatorio: Completar evaluación pendiente",
      fecha: "2024-02-20",
      leida: true,
    },
  ])

  return (
    <div className="space-y-4 p-4">
      {notificaciones.map((notificacion) => (
        <Card key={notificacion.id} className={notificacion.leida ? "opacity-60" : ""}>
          <CardContent className="p-4 flex items-start gap-3">
            <Bell className={`h-5 w-5 ${notificacion.leida ? "text-gray-400" : "text-orange-500"}`} />
            <div>
              <p className="text-sm">{notificacion.mensaje}</p>
              <p className="text-xs text-gray-500 mt-1">{notificacion.fecha}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
