"use client"

import { useState, useMemo, useCallback } from "react"
import { motion } from "framer-motion"
import { Search, Play, Eye, ArrowLeft } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useDebounce } from "use-debounce"

interface Video {
  id: number
  titulo: string
  descripcion: string
  duracion: string
  empresa: string
  visualizaciones: number
  thumbnail: string
  videoUrl: string
  categoria: string
}

const videosData: Video[] = [
  {
    id: 1,
    titulo: "Inducción y Reinducción",
    descripcion:
      "Proceso completo de inducción para nuevos empleados y reinducción para personal existente en seguridad industrial",
    duracion: "10:30",
    empresa: "ORCOMA S.A.S",
    visualizaciones: 1250,
    thumbnail: "https://img.youtube.com/vi/ScMzIvxBSi4/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
    categoria: "Inducción",
  },
  {
    id: 2,
    titulo: "Seguridad en el Trabajo",
    descripcion:
      "Protocolos y medidas de seguridad esenciales en el lugar de trabajo para prevenir accidentes laborales",
    duracion: "15:45",
    empresa: "ORCOMA S.A.S",
    visualizaciones: 2100,
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    categoria: "Seguridad",
  },
  {
    id: 3,
    titulo: "Manejo de Equipos",
    descripcion: "Guía completa para el uso correcto de equipos industriales y maquinaria pesada",
    duracion: "8:15",
    empresa: "ORCOMA S.A.S",
    visualizaciones: 6200,
    thumbnail: "https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/9bZkp7q19f0",
    categoria: "Equipos",
  },
  {
    id: 4,
    titulo: "Primeros Auxilios",
    descripcion: "Técnicas básicas de primeros auxilios en emergencias y situaciones críticas en el trabajo",
    duracion: "12:20",
    empresa: "ORCOMA S.A.S",
    visualizaciones: 890,
    thumbnail: "https://img.youtube.com/vi/kJQP7kiw5Fk/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/kJQP7kiw5Fk",
    categoria: "Emergencias",
  },
  {
    id: 5,
    titulo: "Manejo de Residuos",
    descripcion: "Gestión adecuada de residuos industriales y materiales de desecho según normativas ambientales",
    duracion: "7:50",
    empresa: "ORCOMA S.A.S",
    visualizaciones: 1420,
    thumbnail: "https://img.youtube.com/vi/L_jWHffIx5E/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/L_jWHffIx5E",
    categoria: "Medio Ambiente",
  },
  {
    id: 6,
    titulo: "Trabajo en Equipo",
    descripcion: "Estrategias efectivas para mejorar la colaboración y trabajo en equipo en entornos industriales",
    duracion: "11:05",
    empresa: "ORCOMA S.A.S",
    visualizaciones: 750,
    thumbnail: "https://img.youtube.com/vi/astISOttCQ0/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/astISOttCQ0",
    categoria: "Desarrollo",
  },
  {
    id: 7,
    titulo: "Comunicación Efectiva",
    descripcion: "Técnicas de comunicación para mejorar las relaciones laborales y la productividad del equipo",
    duracion: "9:40",
    empresa: "ORCOMA S.A.S",
    visualizaciones: 1680,
    thumbnail: "https://img.youtube.com/vi/fC4HzhZdeTY/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/fC4HzhZdeTY",
    categoria: "Comunicación",
  },
  {
    id: 8,
    titulo: "Gestión del Tiempo",
    descripcion: "Técnicas de optimización del tiempo y mejora de la productividad en el ambiente laboral",
    duracion: "13:25",
    empresa: "ORCOMA S.A.S",
    visualizaciones: 2300,
    thumbnail: "https://img.youtube.com/vi/frAEmhqdLFs/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/frAEmhqdLFs",
    categoria: "Productividad",
  },
]

export default function WatchPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300)
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [videoLoading, setVideoLoading] = useState(false)

  // Filtrar videos basado en búsqueda
  const filteredVideos = useMemo(() => {
    return videosData.filter((video) => {
      return (
        video.titulo.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        video.descripcion.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        video.categoria.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      )
    })
  }, [debouncedSearchTerm])

  const handleVideoClick = useCallback((video: Video) => {
    console.log("Video clicked:", video.titulo)
    setSelectedVideo(video)
  }, [])

  const handleBackToGallery = useCallback(() => {
    console.log("Back to gallery")
    setSelectedVideo(null)
  }, [])

  // Si hay un video seleccionado, mostrar modo teatro
  if (selectedVideo) {
    return (
      <div className="min-h-screen bg-black">
        {/* Header del modo teatro */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center items-center h-16">
              <img src="/logo-orcoma-full.webp" alt="ORCOMA Logo" className="h-10 w-auto object-contain" />
            </div>
          </div>
        </div>

        {/* Contenido del modo teatro */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Reproductor de video */}
          <div className="aspect-video mb-6 bg-gray-900 rounded-lg overflow-hidden">
            {videoLoading && (
              <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
              </div>
            )}
            <iframe
              src={selectedVideo.videoUrl}
              title={selectedVideo.titulo}
              className="w-full h-full"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              onError={() => {
                console.error("Error loading video")
                setVideoLoading(false)
              }}
              onLoadStart={() => setVideoLoading(true)}
              onLoad={() => setVideoLoading(false)}
            />
          </div>

          {/* Información del video */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedVideo.titulo}</h2>
                <p className="text-gray-600 mb-2">{selectedVideo.empresa}</p>
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <Eye className="h-4 w-4 mr-1" />
                  <span>{selectedVideo.visualizaciones.toLocaleString()} visualizaciones</span>
                </div>
                <p className="text-gray-700 leading-relaxed">{selectedVideo.descripcion}</p>
              </div>
            </div>
          </div>

          {/* Botón para volver */}
          <div className="mt-8 text-center">
            <Button
              variant="outline"
              onClick={handleBackToGallery}
              className="text-gray-600 hover:text-gray-800 bg-white border-gray-300 hover:bg-gray-50"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a la galería
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Vista de galería (cuando no hay video seleccionado)
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"></div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Barra de búsqueda */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Buscar videos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3 text-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* Grid de videos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredVideos.map((video) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="cursor-pointer group"
              onClick={() => handleVideoClick(video)}
            >
              <div className="relative overflow-hidden rounded-lg shadow-md bg-white">
                {/* Thumbnail */}
                <div className="relative aspect-video bg-gray-200">
                  <img
                    src={video.thumbnail || "/placeholder.svg"}
                    alt={video.titulo}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/placeholder.svg?height=200&width=300"
                    }}
                  />

                  {/* Overlay de play en hover */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <Play className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Duración en la esquina inferior derecha */}
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm font-medium">
                    {video.duracion}
                  </div>
                </div>

                {/* Información del video */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 text-lg mb-1 line-clamp-2">{video.titulo}</h3>
                  <p className="text-gray-600 text-sm">{video.empresa}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mensaje cuando no hay resultados */}
        {filteredVideos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No se encontraron videos que coincidan con tu búsqueda.</p>
          </div>
        )}
      </div>
    </div>
  )
}
