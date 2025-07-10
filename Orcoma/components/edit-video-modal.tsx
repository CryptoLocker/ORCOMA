"use client"

import type React from "react"

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
import { Textarea } from "@/components/ui/textarea"
import { LoadingDots } from "@/components/loading-dots"
import { showToast } from "@/lib/toast"
import { FileIcon, VideoIcon } from "lucide-react"

interface Video {
  id: number
  titulo: string
  descripcion: string
  duracion: string
  fecha: string
}

interface EditVideoModalProps {
  video: Video | null
  isOpen: boolean
  onClose: () => void
  onSave: (video: Video) => void
}

export function EditVideoModal({ video, isOpen, onClose, onSave }: EditVideoModalProps) {
  const [formData, setFormData] = useState<Video>({
    id: 0,
    titulo: "",
    descripcion: "",
    duracion: "",
    fecha: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  // Cargar datos del video cuando se abre el modal
  useEffect(() => {
    if (video && isOpen) {
      setFormData(video)
      setErrors({})
      setSelectedFile(null)
    }
  }, [video, isOpen])

  const handleInputChange = (field: keyof Video, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.titulo.trim()) {
      newErrors.titulo = "El título es requerido"
    }

    if (!formData.descripcion.trim()) {
      newErrors.descripcion = "La descripción es requerida"
    }

    if (!formData.duracion.trim()) {
      newErrors.duracion = "La duración es requerida"
    } else if (!/^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/.test(formData.duracion)) {
      newErrors.duracion = "Formato de duración inválido (HH:MM:SS)"
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
    const loadingToast = showToast.loading("Guardando cambios del video...")

    try {
      // Simular llamada a API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Si hay un archivo nuevo, simular la subida
      if (selectedFile) {
        showToast.info("Archivo actualizado", `Nuevo archivo: ${selectedFile.name}`)
      }

      onSave(formData)
      showToast.dismiss(loadingToast)
      showToast.success("Video actualizado", `Los datos de "${formData.titulo}" han sido actualizados correctamente`)
      onClose()
    } catch (error) {
      showToast.dismiss(loadingToast)
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
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <VideoIcon className="h-5 w-5 text-orange-500" />
            <span>Editar Video</span>
          </DialogTitle>
          <DialogDescription>
            Modifica la información del video. Los cambios se guardarán automáticamente.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Título */}
          <div className="grid gap-2">
            <Label htmlFor="titulo">Título del Video</Label>
            <Input
              id="titulo"
              value={formData.titulo}
              onChange={(e) => handleInputChange("titulo", e.target.value)}
              placeholder="Título del video"
              disabled={isLoading}
              className={errors.titulo ? "border-red-500" : ""}
            />
            {errors.titulo && <span className="text-sm text-red-500">{errors.titulo}</span>}
          </div>

          {/* Descripción */}
          <div className="grid gap-2">
            <Label htmlFor="descripcion">Descripción</Label>
            <Textarea
              id="descripcion"
              value={formData.descripcion}
              onChange={(e) => handleInputChange("descripcion", e.target.value)}
              placeholder="Descripción del contenido del video"
              disabled={isLoading}
              rows={3}
              className={errors.descripcion ? "border-red-500" : ""}
            />
            {errors.descripcion && <span className="text-sm text-red-500">{errors.descripcion}</span>}
          </div>

          {/* Duración */}
          <div className="grid gap-2">
            <Label htmlFor="duracion">Duración</Label>
            <Input
              id="duracion"
              value={formData.duracion}
              onChange={(e) => handleInputChange("duracion", e.target.value)}
              placeholder="HH:MM:SS (ej: 10:30:00)"
              disabled={isLoading}
              className={errors.duracion ? "border-red-500" : ""}
            />
            {errors.duracion && <span className="text-sm text-red-500">{errors.duracion}</span>}
            <span className="text-xs text-gray-500">Formato: Horas:Minutos:Segundos</span>
          </div>

          {/* Archivo de video (opcional para edición) */}
          <div className="grid gap-2">
            <Label htmlFor="video-file">Reemplazar Archivo de Video (Opcional)</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
              <div className="flex flex-col items-center justify-center">
                <FileIcon className="h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 mb-2">Seleccionar nuevo archivo de video</p>
                <label htmlFor="video-file-input" className="cursor-pointer">
                  <span className="text-sm text-blue-500 hover:text-blue-700">Examinar archivos</span>
                  <input
                    id="video-file-input"
                    type="file"
                    accept="video/mp4,video/webm,video/x-matroska"
                    onChange={handleFileChange}
                    className="sr-only"
                    disabled={isLoading}
                  />
                </label>
                {selectedFile && (
                  <p className="mt-2 text-sm text-green-600 font-medium">Nuevo archivo: {selectedFile.name}</p>
                )}
              </div>
            </div>
            <span className="text-xs text-gray-500">
              Formatos soportados: MP4, WebM, MKV. Dejar vacío para mantener el archivo actual.
            </span>
          </div>

          {/* Información actual */}
          <div className="bg-gray-50 p-3 rounded-md">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Información Actual:</h4>
            <div className="text-xs text-gray-600 space-y-1">
              <p>
                <span className="font-medium">Fecha de subida:</span> {formData.fecha}
              </p>
              <p>
                <span className="font-medium">ID del video:</span> {formData.id}
              </p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={isLoading}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={isLoading} className="bg-orange-500 hover:bg-orange-600">
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <LoadingDots size="sm" color="orange" />
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
