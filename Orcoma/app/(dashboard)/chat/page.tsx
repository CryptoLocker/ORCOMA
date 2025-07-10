"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, Send, Users } from "lucide-react"

interface Message {
  id: number
  sender: string
  text: string
  timestamp: string
  isAdmin: boolean
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "Sistema",
      text: "¡Bienvenido al chat interno de ORCOMA! Aquí puedes comunicarte con el equipo.",
      timestamp: "10:00",
      isAdmin: true,
    },
    {
      id: 2,
      sender: "Carlos Martínez",
      text: "Buenos días, tengo una consulta sobre el protocolo de seguridad.",
      timestamp: "10:15",
      isAdmin: false,
    },
    {
      id: 3,
      sender: "Admin",
      text: "Hola Carlos, ¿en qué te puedo ayudar?",
      timestamp: "10:16",
      isAdmin: true,
    },
  ])
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      const message: Message = {
        id: messages.length + 1,
        sender: "Admin",
        text: newMessage,
        timestamp: new Date().toLocaleTimeString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isAdmin: true,
      }
      setMessages([...messages, message])
      setNewMessage("")
    }
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center space-x-3">
        <MessageCircle className="h-8 w-8 text-orange-500" />
        <h1 className="text-2xl font-medium text-orange-500">Chat Interno</h1>
      </div>

      <Card className="h-[calc(100vh-12rem)] flex flex-col">
        <CardHeader className="border-b border-gray-200">
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-gray-600" />
            <span>Canal General</span>
            <span className="text-sm text-gray-500 font-normal">• 3 participantes</span>
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.isAdmin ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      msg.isAdmin ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-semibold text-sm">{msg.sender}</span>
                      <span className={`text-xs ${msg.isAdmin ? "text-orange-100" : "text-gray-500"}`}>
                        {msg.timestamp}
                      </span>
                    </div>
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="border-t border-gray-200 p-4">
            <form onSubmit={handleSendMessage} className="flex space-x-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Escribe un mensaje..."
                className="flex-1 focus-visible:ring-orange-500"
              />
              <Button type="submit" className="bg-orange-500 hover:bg-orange-600" disabled={!newMessage.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
