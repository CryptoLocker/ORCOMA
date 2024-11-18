"use client"

import { useState, useEffect } from "react"
import { Bell, BellDot, Search, Send } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface Message {
  id: string
  questionText: string
  userAnswer: string
  adminResponse?: string
  timestamp: string
  read: boolean
}

export default function UserChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [unreadCount, setUnreadCount] = useState(0)

  // Simulated fetch of messages - replace with your actual API call
  useEffect(() => {
    const fetchMessages = async () => {
      // This would be your actual API endpoint
      const mockMessages: Message[] = [
        {
          id: "1",
          questionText: "ANOTACIÓN DEL TRABAJADOR",
          userAnswer: "Los riesgos en el manejo de gases comprimidos requieren especial atención...",
          adminResponse: "Gracias por tu observación. Es importante añadir que siempre se debe verificar la presión...",
          timestamp: "2024-02-20T10:30:00",
          read: false
        },
        {
          id: "2",
          questionText: "ANOTACIÓN DEL TRABAJADOR",
          userAnswer: "Considero que las medidas de seguridad actuales son adecuadas pero podrían mejorarse...",
          adminResponse: "Excelente punto. Implementaremos revisiones adicionales...",
          timestamp: "2024-02-19T15:45:00",
          read: true
        }
      ]
      setMessages(mockMessages)
      setUnreadCount(mockMessages.filter(m => !m.read).length)
    }

    fetchMessages()
  }, [])

  const filteredMessages = messages.filter(message =>
    message.questionText.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.userAnswer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (message.adminResponse && message.adminResponse.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const markAsRead = (messageId: string) => {
    setMessages(prevMessages =>
      prevMessages.map(msg =>
        msg.id === messageId ? { ...msg, read: true } : msg
      )
    )
    setUnreadCount(prev => Math.max(0, prev - 1))
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold">Mensajes de Evaluación</CardTitle>
          <div className="relative">
            {unreadCount > 0 ? (
              <div className="flex items-center">
                <BellDot className="h-6 w-6 text-orange-500" />
                <Badge variant="destructive" className="ml-2">
                  {unreadCount} nuevo{unreadCount !== 1 ? 's' : ''}
                </Badge>
              </div>
            ) : (
              <Bell className="h-6 w-6 text-muted-foreground" />
            )}
          </div>
        </div>
        <div className="relative mt-4">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar en mensajes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        {filteredMessages.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No hay mensajes para mostrar</p>
        ) : (
          filteredMessages.map((message) => (
            <Card
              key={message.id}
              className={`p-4 ${!message.read ? 'border-orange-500' : ''}`}
              onClick={() => !message.read && markAsRead(message.id)}
            >
              <div className="flex items-start space-x-4">
                <Avatar>
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">{message.questionText}</h4>
                    <span className="text-sm text-muted-foreground">
                      {new Date(message.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">Tu respuesta:</p>
                  <p className="text-sm">{message.userAnswer}</p>
                  {message.adminResponse && (
                    <>
                      <p className="text-sm font-semibold text-orange-500 mt-2">Respuesta del administrador:</p>
                      <p className="text-sm">{message.adminResponse}</p>
                    </>
                  )}
                  {!message.read && (
                    <Badge variant="secondary" className="mt-2">
                      No leído
                    </Badge>
                  )}
                </div>
              </div>
            </Card>
          ))
        )}
      </CardContent>
    </Card>
  )
}