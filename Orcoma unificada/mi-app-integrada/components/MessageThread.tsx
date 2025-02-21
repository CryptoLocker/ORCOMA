"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { es } from "date-fns/locale"

interface Message {
  id: string
  title: string
  content: string
  author_initials: string
  response?: string
  created_at: string
  read: boolean
}

export default function MessageThread({ message }: { message: Message }) {
  return (
    <Card className="border-l-4 border-l-orange-500">
      <CardHeader className="flex flex-row items-center gap-4 space-y-0">
        <Avatar className="h-10 w-10 bg-orange-100">
          <AvatarFallback className="text-orange-500">{message.author_initials}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{message.title}</h3>
            <div className="flex items-center gap-2">
              <time className="text-sm text-muted-foreground">
                {format(new Date(message.created_at), "d/M/yyyy", { locale: es })}
              </time>
              {!message.read && (
                <Badge variant="secondary" className="text-xs">
                  No leído
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="text-sm text-muted-foreground">
          <p>{message.content}</p>
        </div>
        {message.response && (
          <div className="grid gap-2 bg-orange-50 p-4 rounded-md">
            <h4 className="font-medium text-orange-500">Respuesta del administrador:</h4>
            <p className="text-sm text-muted-foreground">{message.response}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

