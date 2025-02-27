"use client"

/**
 * Componente de Chat Interno
 *
 * Este componente implementa un sistema de chat simple para la comunicación
 * entre el administrador y los usuarios del sistema.
 *
 * Características principales:
 * - Lista de usuarios
 * - Área de chat vacía lista para recibir mensajes
 * - Envío de mensajes
 * - Indicador discreto de estado de mensajes
 */

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Send, Check, CheckCheck } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Interfaz para los datos de usuario
 */
interface User {
  id: number
  name: string
  avatar: string
}

/**
 * Interfaz para los mensajes
 */
interface Message {
  id: number
  sender: string
  content: string
  timestamp: Date
  status: "sent" | "delivered" | "read"
}

export default function ChatPage() {
  // Estado para la lista de usuarios
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "Carlos Sainz", avatar: "/placeholder.svg" },
    { id: 2, name: "Ana Martínez", avatar: "/placeholder.svg" },
    { id: 3, name: "Roberto Sánchez", avatar: "/placeholder.svg" },
  ])

  // Estados para el manejo del chat
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")

  // Referencias para el scroll automático y el input
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Seleccionar el primer usuario al cargar
  useEffect(() => {
    if (users.length > 0) {
      setSelectedUser(users[0])
    }
  }, [users])

  // Scroll automático a los nuevos mensajes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  /**
   * Maneja el envío de nuevos mensajes
   */
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedUser) return

    try {
      const newMessageObj: Message = {
        id: messages.length + 1,
        sender: "Admin",
        content: newMessage,
        timestamp: new Date(),
        status: "sent",
      }

      setMessages([...messages, newMessageObj])
      setNewMessage("")

      // Simulación de actualización de estado del mensaje
      setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg) => (msg.id === newMessageObj.id ? { ...msg, status: "delivered" as const } : msg)),
        )
      }, 1000)

      setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg) => (msg.id === newMessageObj.id ? { ...msg, status: "read" as const } : msg)),
        )
      }, 2000)
    } catch (error) {
      console.error("Error al enviar mensaje:", error)
    }
  }

  /**
   * Componente para mostrar el estado del mensaje
   */
  const MessageStatus = ({ status }: { status: Message["status"] }) => {
    switch (status) {
      case "sent":
        return <Check className="h-3 w-3 text-gray-400" />
      case "delivered":
        return <CheckCheck className="h-3 w-3 text-gray-400" />
      case "read":
        return <CheckCheck className="h-3 w-3 text-blue-500" />
      default:
        return null
    }
  }

  return (
    <Card className="shadow-lg h-[calc(100vh-2rem)]">
      <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100/50 border-b py-4">
        <CardTitle className="text-2xl text-orange-700">Chat Interno</CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex h-[calc(100%-4rem)]">
        {/* Lista de usuarios */}
        <div className="w-80 border-r bg-gradient-to-b from-orange-50/50 to-transparent flex flex-col">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Buscar usuario" className="pl-9 bg-white/50 border-none focus-visible:ring-1" />
            </div>
          </div>
          <ScrollArea className="flex-1">
            {users.map((user) => (
              <button
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className={cn(
                  "w-full p-4 flex items-center gap-3 hover:bg-orange-50/50 transition-colors border-b border-orange-100/20",
                  selectedUser?.id === user.id && "bg-orange-100/50",
                )}
              >
                <Avatar className="border-2 border-white shadow-sm">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="bg-orange-100 text-orange-700">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-left">
                  <p className="font-medium">{user.name}</p>
                </div>
              </button>
            ))}
          </ScrollArea>
        </div>

        {/* Área de chat */}
        <div className="flex-1 flex flex-col bg-gradient-to-b from-orange-50/20 to-transparent">
          {selectedUser && (
            <>
              <div className="p-4 border-b bg-white/50 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <Avatar className="border-2 border-white shadow-sm">
                    <AvatarImage src={selectedUser.avatar} />
                    <AvatarFallback className="bg-orange-100 text-orange-700">
                      {selectedUser.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-medium">{selectedUser.name}</h3>
                </div>
              </div>

              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex items-start gap-2 max-w-[80%]",
                        message.sender === "Admin" && "ml-auto flex-row-reverse",
                      )}
                    >
                      {message.sender !== "Admin" && (
                        <Avatar className="mt-1 border-2 border-white shadow-sm">
                          <AvatarImage src={users.find((u) => u.name === message.sender)?.avatar} />
                          <AvatarFallback className="bg-orange-100 text-orange-700">
                            {message.sender
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={cn(
                          "rounded-2xl p-3",
                          message.sender === "Admin" ? "bg-orange-500 text-white" : "bg-white shadow-sm",
                        )}
                      >
                        <p>{message.content}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs opacity-70">
                            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </span>
                          {message.sender === "Admin" && <MessageStatus status={message.status} />}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              <div className="p-4 border-t bg-white/50 backdrop-blur-sm">
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSendMessage()
                  }}
                  className="flex gap-2"
                >
                  <Input
                    ref={inputRef}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Escribe un mensaje..."
                    className="bg-white/50 border-none focus-visible:ring-1"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="bg-orange-500 hover:bg-orange-600 shadow-sm shrink-0"
                    disabled={!newMessage.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

