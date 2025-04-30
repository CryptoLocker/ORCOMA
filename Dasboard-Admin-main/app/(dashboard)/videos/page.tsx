"use client"

import type React from "react"
import { useState, useCallback, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/components/ui/use-toast"
import { Pencil, Trash2, FileIcon } from "lucide-react"

interface Video {
  id: number
  titulo: string
  descripcion: string
  duracion: string
  fecha: string
}

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([
    {
      id: 1,
      titulo: "Introducción a la Seguridad",
      descripcion: "Video introductorio sobre seguridad laboral",
      duracion: "10:30",
      fecha: "2024-02-15",
    },
    {
      id: 2,
      titulo: "Manejo de Equipos",
      descripcion: "Guía para el manejo correcto de equipos",
      duracion: "15:45",
      fecha: "2024-02-16",
    },
    {
      id: 3,
      titulo: "Protocolos de Emergencia",
      descripcion: "Procedimientos a seguir en caso de emergencia",
      duracion: "12:20",
      fecha: "2024-02-17",
    },
  ])

  const [nuevoVideo, setNuevoVideo] = useState<{
    titulo: string
    descripcion: string
  }>({ titulo: "", descripcion: "" })

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // BACKEND: Cargar videos desde el backend
  // useEffect(() => {
  //   const fetchVideos = async () => {
  //     try {
  //       // const response = await fetch('/api/videos');
  //       // const data = await response.json();
  //       // setVideos(data);
  //     } catch (error) {
  //       console.error('Error al cargar videos:', error);
  //       toast({
  //         title: "Error",
  //         description: "No se pudieron cargar los videos. Intente nuevamente.",
  //         variant: "destructive",
  //       });
  //     }
  //   };
  //
  //   fetchVideos();
  // }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNuevoVideo((prev) => ({ ...prev, [name]: value }))
  }, [])

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0])
    }
  }, [])

  const handleAddVideo = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      if (!selectedFile) {
        toast({
          title: "Error",
          description: "Por favor, seleccione un archivo de video.",
          variant: "destructive",
        })
        return
      }

      setIsSubmitting(true)

      try {
        // BACKEND: Aquí iría la lógica para subir el video al servidor
        // const formData = new FormData();
        // formData.append('titulo', nuevoVideo.titulo);
        // formData.append('descripcion', nuevoVideo.descripcion);
        // formData.append('video', selectedFile);
        //
        // const response = await fetch('/api/videos', {
        //   method: 'POST',
        //   body: formData
        // });
        //
        // if (!response.ok) {
        //   throw new Error('Error al subir el video');
        // }
        //
        // const data = await response.json();

        // Simulación de carga de video
        await new Promise((resolve) => setTimeout(resolve, 1500))

        const newId = videos.length + 1
        const newVideo: Video = {
          id: newId,
          titulo: nuevoVideo.titulo,
          descripcion: nuevoVideo.descripcion,
          duracion: "00:00", // Se calcularía del archivo real
          fecha: new Date().toISOString().split("T")[0],
        }

        setVideos((prev) => [...prev, newVideo])
        setNuevoVideo({ titulo: "", descripcion: "" })
        setSelectedFile(null)

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
      } finally {
        setIsSubmitting(false)
      }
    },
    [nuevoVideo, selectedFile, videos],
  )

  const handleDeleteVideo = useCallback(async (id: number) => {
    try {
      // BACKEND: Aquí iría la lógica para eliminar el video del servidor
      // await fetch(`/api/videos/${id}`, {
      //   method: 'DELETE'
      // });

      setVideos((prev) => prev.filter((video) => video.id !== id))

      toast({
        title: "Video eliminado",
        description: "El video ha sido eliminado exitosamente.",
      })
    } catch (error) {
      console.error("Error al eliminar video:", error)
      toast({
        title: "Error",
        description: "No se pudo eliminar el video. Por favor, intente de nuevo.",
        variant: "destructive",
      })
    }
  }, [])

  const handleEditVideo = useCallback((id: number) => {
    // BACKEND: Aquí iría la lógica para editar un video
    toast({
      title: "Editar video",
      description: "Funcionalidad de edición aún no implementada.",
    })
  }, [])

  // Memoizar el nombre del archivo seleccionado para evitar re-renderizados
  const selectedFileName = useMemo(() => {
    return selectedFile?.name || ""
  }, [selectedFile])

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-medium text-orange-500">Gestión de Videos</h1>

      <Card className="shadow-sm border-gray-100">
        <CardContent className="pt-6">
          <h2 className="text-lg font-medium mb-6">Agregar Nuevo Video</h2>

          <form onSubmit={handleAddVideo} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">
                Título del Video
              </label>
              <Input
                id="titulo"
                name="titulo"
                placeholder="Ingrese el título del nuevo video"
                value={nuevoVideo.titulo}
                onChange={handleInputChange}
                required
                className="focus-visible:ring-orange-500"
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">
                Descripción del Video
              </label>
              <Textarea
                id="descripcion"
                name="descripcion"
                placeholder="Ingrese la descripción del nuevo video"
                value={nuevoVideo.descripcion}
                onChange={handleInputChange}
                rows={4}
                className="focus-visible:ring-orange-500"
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="file" className="block text-sm font-medium text-gray-700">
                Archivo de Video
              </label>
              <div
                className={`border-2 border-dashed rounded-md p-6 text-center ${
                  isDragging ? "border-orange-500 bg-orange-50" : "border-gray-300"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="flex flex-col items-center justify-center">
                  <FileIcon className="h-10 w-10 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">Arrastre y suelte el archivo aquí</p>
                  <p className="text-sm text-gray-500 mt-1">o</p>
                  <label htmlFor="file-upload" className="mt-2 cursor-pointer">
                    <span className="text-sm text-blue-500 hover:text-blue-700">seleccione un archivo</span>
                    <input
                      id="file-upload"
                      name="file"
                      type="file"
                      accept="video/mp4,video/webm,video/x-matroska"
                      onChange={handleFileChange}
                      className="sr-only"
                      disabled={isSubmitting}
                    />
                  </label>
                  {selectedFileName && (
                    <p className="mt-2 text-sm text-gray-500">Archivo seleccionado: {selectedFileName}</p>
                  )}
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">Formatos soportados: MP4, WebM, MKV (máx. 2GB)</p>
            </div>

            <Button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600"
              disabled={isSubmitting || !selectedFile}
            >
              {isSubmitting ? "Subiendo..." : "Agregar Video"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="shadow-sm border-gray-100">
        <CardContent className="pt-6">
          <h2 className="text-lg font-medium mb-4">Listado de Videos</h2>
          <div className="overflow-x-auto">
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
                {videos.length > 0 ? (
                  videos.map((video) => (
                    <TableRow key={video.id}>
                      <TableCell>{video.id}</TableCell>
                      <TableCell>{video.titulo}</TableCell>
                      <TableCell>{video.duracion}</TableCell>
                      <TableCell>{video.fecha}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => handleEditVideo(video.id)}>
                          <Pencil className="mr-2 h-4 w-4" /> Editar
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleDeleteVideo(video.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Eliminar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4 text-gray-500">
                      No hay videos disponibles
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
