"use client"

import type React from "react"
import { useState } from "react"
import { fetchYouTubeVideos } from "@/utils/youtubeApi"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input" 
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Datos iniciales de videos para demostración
const initialVideos = [
  {
    id: "dQw4w9WgXcQ",
    snippet: {
      title: "Inducción y Reinducción",
      channelTitle: "ORCOMA S.A.S",
      thumbnails: {
        medium: {
          url: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
        },
      },
    },
    statistics: {
      viewCount: "15000",
    },
  },
  ...Array(4)
    .fill(null)
    .map((_, index) => ({
      id: `video${index + 2}`,
      snippet: {
        title: `Video ${index + 2}`,
        channelTitle: "ORCOMA S.A.S",
        thumbnails: {
          medium: {
            url: `https://picsum.photos/seed/${index}/360/200`,
          },
        },
      },
      statistics: {
        viewCount: "0",
      },
    })),
]

export default function VideoPlayer() {
  // Estados para manejar la búsqueda, videos seleccionados y modal
  const [searchQuery, setSearchQuery] = useState("")
  const [open, setOpen] = useState(false)
  interface Video {
    id: string;
    snippet: {
      title: string;
      channelTitle: string;
      thumbnails: {
        medium: {
          url: string;
        };
      };
    };
    statistics: {
      viewCount: string;
    };
  }
  
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [quizStartTime, setQuizStartTime] = useState<Record<string, number>>({})
  const [videos, setVideos] = useState(initialVideos)

  // Función para manejar la búsqueda de videos
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const data = await fetchYouTubeVideos(searchQuery)
      setVideos(data.items)
    } catch (error) {
      console.error("Error al buscar videos:", error)
    }
  }

  // Función para iniciar la evaluación de un video
  const handleStartEvaluation = (videoId: string) => {
    setQuizStartTime((prev) => ({ ...prev, [videoId]: Date.now() }))
    console.log(`Iniciando evaluación para el video: ${videoId}`)
  }

  // Función para verificar si se puede ver un video
  const canWatchVideo = (videoId: string) => {
    const startTime = quizStartTime[videoId]
    if (!startTime) return true
    const elapsedTime = (Date.now() - startTime) / 1000 / 60 // en minutos
    return elapsedTime >= 30
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Cabecera con logo y barra de búsqueda */}
      <header className="bg-card shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold text-primary">ORCOMA S.A.S</h1>
          <div className="flex-1 max-w-xl mx-4">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="search"
                placeholder="Buscar videos..."
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)} // Added event type
                className="w-full pl-10 pr-4"
              />
              <Button type="submit" variant="ghost" className="absolute right-0 top-0 h-full">
                🔍
              </Button>
            </form>
          </div>
          <div className="w-10 h-10 bg-muted rounded-full"></div>
        </div>
      </header>

      {/* Contenido principal con la lista de videos */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {videos.map((video) => (
            <Card
              key={video.id}
              className="cursor-pointer"
              onClick={() => {
                if (canWatchVideo(video.id)) {
                  setSelectedVideo(video)
                  setOpen(true)
                }
              }}
            >
              <CardHeader className="p-0">
                <div className="relative pb-[56.25%]">
                  <img
                    src={video.snippet.thumbnails.medium.url || "/placeholder.svg"}
                    alt={video.snippet.title}
                    className="absolute h-full w-full object-cover rounded-t-lg"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-lg mb-1 line-clamp-2">{video.snippet.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{video.snippet.channelTitle}</p>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <span>{`${Number.parseInt(video.statistics.viewCount).toLocaleString()} visualizaciones`}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{selectedVideo?.snippet.title}</DialogTitle>
            <DialogDescription>
              <div className="relative aspect-video bg-black mt-4">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${selectedVideo?.id}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 flex justify-center">
            <Button
              onClick={() => {
                if (selectedVideo) {
                  handleStartEvaluation(selectedVideo.id)
                  setOpen(false)
                }
              }}
              disabled={selectedVideo ? !canWatchVideo(selectedVideo.id) : true}
            >
              {selectedVideo && !canWatchVideo(selectedVideo.id) ? "Evaluación en progreso" : "Realizar evaluación"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}