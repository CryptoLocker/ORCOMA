"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Send } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"

interface User {
  id: number
  name: string
  avatar: string
  lastMessage: string
  lastSeen: string
  isOnline: boolean
}

interface Message {
  id: number
  sender: string
  question: string
  answer: string
}

export default function ChatPage() {
  const [users, setUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newQuestion, setNewQuestion] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchUsers()
    fetchMessages()
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  const fetchUsers = async () => {
    // Simulate API call
    const usersData = [
      {
        id: 1,
        name: "Carlos Sainz",
        avatar: "/placeholder.svg",
        lastMessage: "¿Qué opina de los riesgos de los gases?",
        lastSeen: "Ahora",
        isOnline: true,
      },
      {
        id: 2,
        name: "Ana Martínez",
        avatar: "/placeholder.svg",
        lastMessage: "¿Cuáles son las mejores prácticas para...",
        lastSeen: "Hace 5m",
        isOnline: true,
      },
      {
        id: 3,
        name: "Roberto Sánchez",
        avatar: "/placeholder.svg",
        lastMessage: "Gracias por la información sobre...",
        lastSeen: "Hace 1h",
        isOnline: false,
      },
    ]
    setUsers(usersData)
    setSelectedUser(usersData[0])
  }

  const fetchMessages = async () => {
    // Simulate API call
    const messagesData = [
      {
        id: 1,
        sender: "Carlos Sainz",
        question: "¿Qué opina de los riesgos de los gases?",
        answer:
          "Los gases en el ámbito de la construcción pueden representar riesgos significativos para la salud y la seguridad. Es crucial implementar medidas preventivas como ventilación adecuada, uso de equipos de protección personal y monitoreo constante de la calidad del aire. La formación del personal en la identificación y manejo de gases peligrosos es esencial para mitigar estos riesgos.",
      },
      {
        id: 2,
        sender: "Ana Martínez",
        question: "¿Cuáles son las mejores prácticas para el manejo de residuos en obra?",
        answer:
          "Las mejores prácticas para el manejo de residuos en obra incluyen la clasificación adecuada de los materiales, el reciclaje cuando sea posible, la disposición segura de residuos peligrosos, y la implementación de un plan de gestión de residuos. Es importante también minimizar la generación de residuos desde la fase de planificación y considerar el uso de materiales reciclados o de bajo impacto ambiental.",
      },
    ]
    setMessages(messagesData)
  }

  const handleSendQuestion = async () => {
    if (!newQuestion.trim() || !selectedUser) return

    try {
      // Simulate API call
      const newMessage = {
        id: messages.length + 1,
        sender: selectedUser.name,
        question: newQuestion,
        answer:
          "Gracias por su pregunta. Nuestro equipo la revisará y proporcionará una respuesta detallada lo antes posible.",
      }

      setMessages([...messages, newMessage])
      setNewQuestion("")
    } catch (error) {
      console.error("Error al enviar pregunta:", error)
      toast({
        title: "Error",
        description: "No se pudo enviar la pregunta. Por favor, intente de nuevo.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="shadow-lg h-[calc(100vh-2rem)]">
      <CardHeader className="bg-orange-50">
        <CardTitle className="text-2xl text-orange-700">Chat Interno</CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex h-[calc(100%-4rem)]">
        {/* Left Sidebar */}
        <div className="w-80 border-r bg-orange-50/50 flex flex-col">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Buscar conversación..." className="pl-9" />
            </div>
          </div>
          <ScrollArea className="flex-1">
            {users.map((user) => (
              <button
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className={cn(
                  "w-full p-4 flex items-center gap-3 hover:bg-orange-50 transition-colors",
                  selectedUser?.id === user.id && "bg-orange-100",
                )}
              >
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {user.isOnline && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                  )}
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-muted-foreground truncate">{user.lastMessage}</p>
                </div>
                <span className="text-xs text-muted-foreground">{user.lastSeen}</span>
              </button>
            ))}
          </ScrollArea>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b bg-orange-50/30">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={selectedUser?.avatar} alt={selectedUser?.name} />
                <AvatarFallback>
                  {selectedUser?.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{selectedUser?.name}</h3>
                <p className="text-sm text-muted-foreground">{selectedUser?.isOnline ? "En línea" : "Desconectado"}</p>
              </div>
            </div>
          </div>

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className="space-y-2">
                  <div className="flex items-start">
                    <Avatar className="mr-2">
                      <AvatarImage src={users.find((u) => u.name === message.sender)?.avatar} alt={message.sender} />
                      <AvatarFallback>
                        {message.sender
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-orange-100 rounded-lg p-3 max-w-[80%]">
                      <p className="font-semibold">{message.sender}:</p>
                      <p>{message.question}</p>
                    </div>
                  </div>
                  <div className="ml-12 bg-white rounded-lg p-3 max-w-[80%] shadow">
                    <p>{message.answer}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <div className="p-4 border-t">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSendQuestion()
              }}
              className="flex gap-2"
            >
              <Input
                placeholder="Escribe tu pregunta..."
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
              />
              <Button type="submit" size="icon" className="bg-orange-500 hover:bg-orange-600">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

