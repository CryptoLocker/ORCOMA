import type React from "react"
export default function NotificacionesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="p-4 bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">Centro de Notificaciones</h1>
      <div className="bg-white rounded-lg shadow">{children}</div>
    </div>
  )
}
