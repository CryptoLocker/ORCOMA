import { Bell } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import MessageThread from "@/components/MessageThread"
import { mockMessages } from "@/src/utils/mockData"

export default async function MessagesPage() {
  const messages = mockMessages

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold">Mensajes de Evaluación</h1>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 min-w-[1.25rem] px-1">1 nuevo</Badge>
          </Button>
        </div>
      </div>

      <div className="relative mb-6">
        <Input type="search" placeholder="Buscar en mensajes..." className="w-full pl-10" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <div className="space-y-4">
        {messages.map((message) => (
          <MessageThread key={message.id} message={message} />
        ))}
      </div>
    </div>
  )
}

