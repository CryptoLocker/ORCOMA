"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LoadingDots } from "@/components/loading-dots"
import { showToast } from "@/lib/toast"

interface User {
  id: string
  name: string
  email: string
  role: "admin" | "user" | "viewer"
  status: "active" | "inactive"
}

interface EditUserModalProps {
  user: User | null
  isOpen: boolean
  onClose: () => void
  onSave: (user: User) => void
}

export function EditUserModal({ user, isOpen, onClose, onSave }: EditUserModalProps) {
  const [formData, setFormData] = useState<User>({
    id: "",
    name: "",
    email: "",
    role: "user",
    status: "active",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Cargar datos del usuario cuando se abre el modal
  useEffect(() => {
    if (user && isOpen) {
      setFormData(user)
      setErrors({})
    }
  }, [user, isOpen])

  const handleInputChange = (field: keyof User, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido"
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "El email no es válido"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = async () => {
    if (!validateForm()) {
      showToast.error("Error de validación", "Por favor, corrige los errores en el formulario")
      return
    }

    setIsLoading(true)
    const loadingToastId = showToast.loading("Guardando cambios...")

    try {
      // Simular llamada a API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      onSave(formData)
      showToast.dismiss(loadingToastId)
      showToast.success("Usuario actualizado", `Los datos de ${formData.name} han sido actualizados correctamente`)
      onClose()
    } catch (error) {
      showToast.dismiss(loadingToastId)
      showToast.error("Error al guardar", "No se pudieron guardar los cambios. Intenta nuevamente.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    if (!isLoading) {
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Usuario</DialogTitle>
          <DialogDescription>
            Modifica la información del usuario. Los cambios se guardarán automáticamente.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Nombre */}
          <div className="grid gap-2">
            <Label htmlFor="name">Nombre Completo</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Nombre completo del usuario"
              disabled={isLoading}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && <span className="text-sm text-red-500">{errors.name}</span>}
          </div>

          {/* Email */}
          <div className="grid gap-2">
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="correo@ejemplo.com"
              disabled={isLoading}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && <span className="text-sm text-red-500">{errors.email}</span>}
          </div>

          {/* Rol */}
          <div className="grid gap-2">
            <Label htmlFor="role">Rol del Usuario</Label>
            <Select
              value={formData.role}
              onValueChange={(value: "admin" | "user" | "viewer") => handleInputChange("role", value)}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar rol" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Administrador</SelectItem>
                <SelectItem value="user">Usuario</SelectItem>
                <SelectItem value="viewer">Visualizador</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Estado */}
          <div className="grid gap-2">
            <Label htmlFor="status">Estado</Label>
            <Select
              value={formData.status}
              onValueChange={(value: "active" | "inactive") => handleInputChange("status", value)}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Activo</SelectItem>
                <SelectItem value="inactive">Inactivo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={isLoading}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={isLoading} className="bg-orange-500 hover:bg-orange-600">
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <LoadingDots size="sm" color="white" />
                <span>Guardando...</span>
              </div>
            ) : (
              "Guardar Cambios"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
