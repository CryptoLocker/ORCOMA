"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/components/ui/use-toast"
import { Pencil, Trash2, Upload } from "lucide-react"

interface Video {
  id: number
  titulo: string
  duracion: string
  fecha: string
}

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([
    { id: 1, titulo: "Introducción a la Seguridad", duracion: "10:30", fecha: "2024-02-15" },
    { id: 2, titulo: "Manejo de Equipos", duracion: "15:45", fecha: "2024-02-16" },
    { id: 3, titulo: "Protocolos de Emergencia", duracion: "12:20", fecha: "2024-02-17" },
  ])

  const [nuevoVideo, setNuevoVideo] = useState<Omit<Video, "id" | "fecha">>({ titulo: "", duracion: "" })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNuevoVideo((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddVideo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const newId = videos.length + 1
      const newVideo: Video = {
        id: newId,
        ...nuevoVideo,
        fecha: new Date().toISOString().split("T")[0],
      }

      // Simulación de carga de video
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setVideos((prev) => [...prev, newVideo])
      setNuevoVideo({ titulo: "", duracion: "" })

      toast({
        title: "Video añadido",
        description: `Se ha añadido el video "${newVideo.titulo}" exitosamente.`,
      })
    } catch (error) {
      console.error("Error al añadir video:", error)
      toast({
        title: "Error",
        description: "No se pudo añadir el video. Por favor, intente de nuevo.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteVideo = (id: number) => {
    setVideos((prev) => prev.filter((video) => video.id !== id))
    toast({
      title: "Video eliminado",
      description: "El video ha sido eliminado exitosamente.",
    })
  }

  const handleEditVideo = (id: number) => {
    // Aquí iría la lógica para editar un video
    toast({
      title: "Editar video",
      description: "Funcionalidad de edición aún no implementada.",
    })
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Gestión de Videos</h1>

      <Card>
        <CardHeader>
          <CardTitle>Añadir Nuevo Video</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddVideo} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="titulo">Título del video</Label>
              <Input
                id="titulo"
                name="titulo"
                placeholder="Ingrese el título del video"
                value={nuevoVideo.titulo}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duracion">Duración</Label>
              <Input
                id="duracion"
                name="duracion"
                placeholder="HH:MM:SS"
                value={nuevoVideo.duracion}
                onChange={handleInputChange}
                required
                pattern="^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$"
                title="Formato de duración: HH:MM:SS"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="file">Archivo de video</Label>
              <Input id="file" type="file" accept="video/*" />
            </div>
            <Button type="submit" className="w-full">
              <Upload className="mr-2 h-4 w-4" /> Subir Video
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Listado de Videos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Duración</TableHead>
                <TableHead>Fecha de Subida</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {videos.map((video) => (
                <TableRow key={video.id}>
                  <TableCell>{video.id}</TableCell>
                  <TableCell>{video.titulo}</TableCell>
                  <TableCell>{video.duracion}</TableCell>
                  <TableCell>{video.fecha}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => handleEditVideo(video.id)}>
                      <Pencil className="mr-2 h-4 w-4" /> Editar
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="ml-2"
                      onClick={() => handleDeleteVideo(video.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" /> Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
