import { Users } from 'lucide-react'
import { ScrollArea } from "@/components/ui/scroll-area"

export default function Stats() {
  return (
    <ScrollArea className="h-full">
      <div className="text-center py-8">
        <Users className="mx-auto h-12 w-12 text-orange-500 mb-4" />
        <p className="text-xl text-gray-600">Las estadísticas de usuarios se mostrarán aquí.</p>
        <p className="text-gray-500">Esta sección está en desarrollo.</p>
      </div>
    </ScrollArea>
  )
}

