import type React from "react"

export default function NotificacionesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="notificaciones-layout">
      {/* Aquí puedes agregar elementos comunes para la sección de notificaciones */}
      <main>{children}</main>
    </div>
  )
}

