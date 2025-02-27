"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function ChatPage() {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([])
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      setMessages([...messages, { sender: "Admin", text: newMessage }])
      setNewMessage("")
    }
  }

  return (
    <Card className="h-[calc(100vh-2rem)]">
      <CardHeader>
        <CardTitle>Chat Interno</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col h-full">
        <ScrollArea className="flex-grow mb-4 p-4 border rounded">
          {messages.map((msg, index) => (
            <div key={index} className="mb-2">
              <span className="font-bold">{msg.sender}: </span>
              {msg.text}
            </div>
          ))}
        </ScrollArea>
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Escribe un mensaje..."
          />
          <Button type="submit">Enviar</Button>
        </form>
      </CardContent>
    </Card>
  )
}

