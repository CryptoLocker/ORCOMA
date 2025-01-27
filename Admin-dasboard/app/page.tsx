import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-orange-50">
        <CardTitle className="text-2xl text-orange-700">Bienvenido al Panel de Administración</CardTitle>
      </CardHeader>
      <CardContent className="mt-6">
        <p>Seleccione una opción del menú para comenzar.</p>
        <p className="mt-4">Puede acceder a las siguientes secciones:</p>
        <ul className="list-disc list-inside mt-2">
          <li>Gestión de Videos</li>
          <li>Gestión de Preguntas</li>
          <li>Estadísticas</li>
          <li>Reportes</li>
          <li>Chat Interno</li>
        </ul>
      </CardContent>
    </Card>
  )
}

