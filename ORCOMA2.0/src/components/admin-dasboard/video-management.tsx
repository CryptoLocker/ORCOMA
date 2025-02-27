"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Edit, Trash, FileIcon } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface Video {
  id: number
  title: string
  views: number
  completionRate: string
}

export function VideoManagement() {
  const [videos, setVideos] = useState<Video[]>([])
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false)
  const [newVideoTitle, setNewVideoTitle] = useState("")
  const [newVideoDescription, setNewVideoDescription] = useState("")
  const [deletedVideoTitle, setDeletedVideoTitle] = useState("")

  useEffect(() => {
    fetchVideos()
  }, [])

  const fetchVideos = async () => {
    try {
      // Simulate API call
      const videosData = [
        { id: 1, title: "Técnicas avanzadas de albañilería", views: 1500, completionRate: "85%" },
        { id: 2, title: "Seguridad en obras de gran altura", views: 2000, completionRate: "78%" },
        { id: 3, title: "Instalación eficiente de sistemas eléctricos", views: 1200, completionRate: "92%" },
      ]
      setVideos(videosData)
    } catch (error) {
      console.error("Error al obtener videos:", error)
      toast({
        title: "Error",
        description: "No se pudieron cargar los videos. Por favor, intente de nuevo.",
        variant: "destructive",
      })
    }
  }

  const handleEditVideo = (video: Video) => {
    setSelectedVideo(video)
    setNewVideoTitle(video.title)
    setIsEditDialogOpen(true)
  }

  const handleUpdateVideo = async () => {
    if (selectedVideo) {
      try {
        // Simulate API call
        const updatedVideos = videos.map((video) =>
          video.id === selectedVideo.id ? { ...video, title: newVideoTitle } : video,
        )
        setVideos(updatedVideos)
        setIsEditDialogOpen(false)
        toast({
          title: "Éxito",
          description: "El video ha sido actualizado correctamente.",
        })
      } catch (error) {
        console.error("Error al actualizar video:", error)
        toast({
          title: "Error",
          description: "No se pudo actualizar el video. Por favor, intente de nuevo.",
          variant: "destructive",
        })
      }
    }
  }

  const handleDeleteVideo = (video: Video) => {
    setSelectedVideo(video)
    setIsDeleteDialogOpen(true)
  }

  const confirmDeleteVideo = async () => {
    if (selectedVideo) {
      try {
        // Simulate API call
        const updatedVideos = videos.filter((video) => video.id !== selectedVideo.id)
        setVideos(updatedVideos)
        setIsDeleteDialogOpen(false)
        setDeletedVideoTitle(selectedVideo.title)
        setIsSuccessDialogOpen(true)
      } catch (error) {
        console.error("Error al eliminar video:", error)
        toast({
          title: "Error",
          description: "No se pudo eliminar el video. Por favor, intente de nuevo.",
          variant: "destructive",
        })
      }
    }
  }

  const handleAddVideo = async () => {
    try {
      // Simulate API call
      const newVideo = {
        id: videos.length + 1,
        title: newVideoTitle,
        views: 0,
        completionRate: "0%",
      }
      setVideos([...videos, newVideo])
      setNewVideoTitle("")
      setNewVideoDescription("")
      toast({
        title: "Éxito",
        description: "El nuevo video ha sido agregado correctamente.",
      })
    } catch (error) {
      console.error("Error al agregar video:", error)
      toast({
        title: "Error",
        description: "No se pudo agregar el video. Por favor, intente de nuevo.",
        variant: "destructive",
      })
    }
  }

  return (
    <ScrollArea className="h-[calc(100vh-16rem)] pr-4">
      <div className="space-y-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Visualizaciones</TableHead>
              <TableHead>Tasa de Finalización</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {videos.map((video) => (
              <TableRow key={video.id}>
                <TableCell>{video.title}</TableCell>
                <TableCell>{video.views}</TableCell>
                <TableCell>{video.completionRate}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEditVideo(video)}>
                    <Edit className="h-4 w-4 mr-1" /> Editar
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDeleteVideo(video)}>
                    <Trash className="h-4 w-4 mr-1" /> Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Agregar Nuevo Video</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="newVideoTitle">Título del Video</Label>
              <Input
                id="newVideoTitle"
                value={newVideoTitle}
                onChange={(e) => setNewVideoTitle(e.target.value)}
                placeholder="Ingrese el título del nuevo video"
              />
            </div>
            <div>
              <Label htmlFor="newVideoDescription">Descripción del Video</Label>
              <Textarea
                id="newVideoDescription"
                value={newVideoDescription}
                onChange={(e) => setNewVideoDescription(e.target.value)}
                placeholder="Ingrese la descripción del nuevo video"
              />
            </div>
            <div>
              <Label htmlFor="videoFile">Archivo de Video</Label>
              <div className="mt-2">
                <label
                  htmlFor="videoFile"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FileIcon className="w-10 h-10 mb-3 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Arrastre y suelte el archivo aquí</span>
                    </p>
                    <p className="text-xs text-gray-500">o</p>
                    <p className="text-sm text-blue-600 hover:underline">seleccione un archivo</p>
                  </div>
                  <Input
                    id="videoFile"
                    type="file"
                    className="hidden"
                    accept="video/*"
                    onChange={(e) => {
                      console.log("Archivo seleccionado:", e.target.files?.[0])
                    }}
                  />
                </label>
              </div>
              <p className="mt-1 text-sm text-gray-500">Formatos soportados: MP4, WebM, MKV (máx. 2GB)</p>
            </div>
            <Button onClick={handleAddVideo} className="bg-orange-500 hover:bg-orange-600 text-white">
              Agregar Video
            </Button>
          </div>
        </div>
      </div>

      {/* Edit Video Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Video</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="editVideoTitle" className="text-right">
              Nuevo Título
            </Label>
            <Input
              id="editVideoTitle"
              value={newVideoTitle}
              onChange={(e) => setNewVideoTitle(e.target.value)}
              className="col-span-3"
            />
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleUpdateVideo}>
              Guardar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Video Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Está seguro de eliminar el video?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente el video "{selectedVideo?.title}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteVideo}>Sí, eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Success Dialog */}
      <Dialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Video Eliminado</DialogTitle>
          </DialogHeader>
          <p>El video "{deletedVideoTitle}" ha sido eliminado satisfactoriamente.</p>
          <DialogFooter>
            <Button onClick={() => setIsSuccessDialogOpen(false)}>Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ScrollArea>
  )
}

