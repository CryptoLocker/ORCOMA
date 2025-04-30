"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

interface NewUser {
  name: string
  email: string
  role: string
}

export default function AdminPage() {
  const [newUser, setNewUser] = useState<NewUser>({ name: "", email: "", role: "" })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewUser((prev) => ({ ...prev, [name]: value }))
  }

  const handleRoleChange = (value: string) => {
    setNewUser((prev) => ({ ...prev, role: value }))
  }

  const handleAddUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      // Aquí iría la lógica para añadir un nuevo usuario
      console.log("Añadiendo nuevo usuario:", newUser)

      // Simulación de una llamada a API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Usuario añadido",
        description: `Se ha añadido el usuario ${newUser.name} exitosamente.`,
      })

      setNewUser({ name: "", email: "", role: "" })
    } catch (error) {
      console.error("Error al añadir usuario:", error)
      toast({
        title: "Error",
        description: "No se pudo añadir el usuario. Por favor, intente de nuevo.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Panel de Administración</h1>

      <Card>
        <CardHeader>
          <CardTitle>Añadir Nuevo Usuario</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddUser} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                name="name"
                placeholder="Nombre completo"
                value={newUser.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="correo@ejemplo.com"
                value={newUser.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Rol</Label>
              <Select onValueChange={handleRoleChange} value={newUser.role}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Seleccionar rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrador</SelectItem>
                  <SelectItem value="user">Usuario</SelectItem>
                  <SelectItem value="viewer">Visualizador</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full">
              Añadir Usuario
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Aquí puedes añadir más componentes para gestión de usuarios, roles, etc. */}
    </div>
  )
}
