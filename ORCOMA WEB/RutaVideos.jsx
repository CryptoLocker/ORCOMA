"use client"

import React, { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search, ArrowLeft } from "lucide-react"

/**
 * @constant {Array} videos 
 */
const videos = [
  {
    id: 1,
    title: "Técnicas avanzadas de albañilería",
    channel: "MasterBuilder",
    views: "15K visualizaciones",
    postedAgo: "hace 2 días",
    thumbnail: "/placeholder.svg?height=200&width=360&text=Video+1",
  },
  {
    id: 2,
    title: "Instalación de sistemas eléctricos en edificios",
    channel: "ElectroTech",
    views: "8K visualizaciones",
    postedAgo: "hace 1 semana",
    thumbnail: "/placeholder.svg?height=200&width=360&text=Video+2",
  },
  {
    id: 3,
    title: "Diseño y construcción de estructuras antisísmicas",
    channel: "SeismicSafe",
    views: "20K visualizaciones",
    postedAgo: "hace 3 días",
    thumbnail: "/placeholder.svg?height=200&width=360&text=Video+3",
  },
  {
    id: 4,
    title: "Técnicas de acabado en interiores",
    channel: "InteriorPro",
    views: "12K visualizaciones",
    postedAgo: "hace 5 días",
    thumbnail: "/placeholder.svg?height=200&width=360&text=Video+4",
  },
]

/**
 * Componente principal de la plataforma de videos
 * @returns {JSX.Element} Interfaz de usuario completa
 */
export default function VideoPlayer() {
  // Estados para manejar la búsqueda, diálogo de video y tiempos de cuestionario
  const [searchQuery, setSearchQuery] = useState("")
  const [open, setOpen] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [quizStartTime, setQuizStartTime] = useState({})

  /**
   * Maneja el evento de búsqueda
   * @param {Event} e - Evento del formulario
   */
  const handleSearch = (e) => {
    e.preventDefault()
    console.log("Buscando:", searchQuery)
  }

  /**
   * Inicia el temporizador para el cuestionario de un video
   * @param {number} videoId - ID del video seleccionado
   */
  const handleStartQuiz = (videoId) => {
    setQuizStartTime((prev) => ({ ...prev, [videoId]: Date.now() }))
    // TODO: Implementar navegación a la página del cuestionario
    // Ejemplo: router.push(`/questionnaire/${videoId}`)
  }

  /**
   * Verifica si un video puede ser visualizado basado en el tiempo transcurrido desde el último intento
   * @param {number} videoId - ID del video a verificar
   * @returns {boolean} true si el video puede ser visualizado
   */
  const canWatchVideo = (videoId) => {
    const startTime = quizStartTime[videoId]
    if (!startTime) return true
    const elapsedTime = (Date.now() - startTime) / 1000 / 60 // en minutos
    return elapsedTime >= 30
  }

  /**
   * Efecto para cerrar el diálogo si el video no puede ser visualizado
   */
  useEffect(() => {
    if (open && selectedVideo && !canWatchVideo(selectedVideo.id)) {
      setOpen(false)
    }
  }, [open, selectedVideo])

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Encabezado con logo, barra de búsqueda y avatar */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold text-orange-600">ORCOMA S.A.S</h1>
          <div className="flex-1 max-w-xl mx-4">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="search"
                placeholder="Buscar videos de construcción..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </form>
          </div>
          <Avatar className="w-10 h-10">
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Contenido principal - Grid de videos */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {videos.map((video) => (
            <Dialog
              key={video.id}
              open={open && selectedVideo?.id === video.id}
              onOpenChange={(isOpen) => {
                if (isOpen && canWatchVideo(video.id)) {
                  setSelectedVideo(video)
                  setOpen(true)
                } else {
                  setOpen(false)
                  setSelectedVideo(null)
                }
              }}
            >
              {/* Tarjeta de video */}
              <DialogTrigger asChild>
                <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader className="p-0">
                    <div className="relative pb-[56.25%]">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="absolute h-full w-full object-cover"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="font-semibold text-lg mb-1 line-clamp-2">
                      {video.title}
                    </CardTitle>
                    <p className="text-sm text-gray-600">{video.channel}</p>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <span>{video.views}</span>
                      <span className="mx-1">•</span>
                      <span>{video.postedAgo}</span>
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>

              {/* Diálogo de reproducción de video */}
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>{video.title}</DialogTitle>
                </DialogHeader>
                <div className="relative aspect-video bg-black">
                  {/* Reemplazar con un componente real de reproductor de video */}
                  <div className="w-full h-full flex items-center justify-center text-white">
                    Video Player Placeholder
                  </div>
                  <Button
                    variant="ghost"
                    onClick={() => setOpen(false)}
                    className="absolute left-4 top-4 bg-black/50 text-white hover:bg-black/70"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Volver
                  </Button>
                </div>
                <div className="mt-4 flex justify-center">
                  <Button
                    onClick={() => {
                      if (selectedVideo) {
                        handleStartQuiz(selectedVideo.id)
                      }
                    }}
                    disabled={selectedVideo ? !canWatchVideo(selectedVideo.id) : true}
                  >
                    {selectedVideo && !canWatchVideo(selectedVideo.id)
                      ? "Cuestionario en progreso"
                      : "Iniciar cuestionario"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </main>
    </div>
  )
}