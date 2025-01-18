"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search, ArrowLeft } from 'lucide-react'

interface Form {
  id: string;
  title: string;
  type: string;
  required: boolean;
}

interface Video {
  id: number;
  title: string;
  channel: string;
  views: string;
  postedAgo: string;
  thumbnail: string;
  forms?: Form[];
}

export default function VideoPlayer() {
  const [searchQuery, setSearchQuery] = useState("")
  const [open, setOpen] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [videos, setVideos] = useState<Video[]>([])
  const router = useRouter()

  useEffect(() => {
    // Fetch videos and their associated forms
    const fetchVideos = async () => {
      try {
        // Aquí iría la llamada real a Supabase
        const mockVideos: Video[] = [
          {
            id: 1,
            title: "Inducción y Reinducción",
            channel: "ORCOMA S.A.S",
            views: "15K visualizaciones",
            postedAgo: "hace 2 días",
            thumbnail: "/placeholder.svg?height=200&width=360&text=Inducción+y+Reinducción",
            forms: [
              { id: "1", title: "Evaluación de Inducción", type: "evaluation", required: true },
              { id: "2", title: "Identificación de Riesgos", type: "risk", required: true }
            ]
          },
          // ... otros videos
        ]
        setVideos(mockVideos)
      } catch (error) {
        console.error("Error fetching videos:", error)
      }
    }

    fetchVideos()
  }, [])

  const handleFormSelection = (videoId: number, formId: string, formType: string) => {
    switch (formType) {
      case 'evaluation':
        router.push(`/evaluation/${videoId}`)
        break
      case 'risk':
        router.push(`/risk-form`)
        break
      // Agregar más casos según los tipos de formularios
      default:
        router.push(`/forms/${formId}`)
    }
    setOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ... Header code remains the same ... */}

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {videos.map((video) => (
            <Dialog
              key={video.id}
              open={open && selectedVideo?.id === video.id}
              onOpenChange={(isOpen) => {
                setSelectedVideo(isOpen ? video : null)
                setOpen(isOpen)
              }}
            >
              <DialogTrigger asChild>
                <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
                  {/* ... Card content remains the same ... */}
                </Card>
              </DialogTrigger>

              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>{video.title}</DialogTitle>
                </DialogHeader>
                <div className="relative aspect-video bg-black">
                  <video
                    className="w-full h-full"
                    controls
                    src={video.videoUrl}
                    poster={video.thumbnail}
                  >
                    Your browser does not support the video tag.
                  </video>
                  <Button
                    variant="ghost"
                    onClick={() => setOpen(false)}
                    className="absolute left-4 top-4 bg-black/50 text-white hover:bg-black/70"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Volver
                  </Button>
                </div>
                <div className="mt-4 space-y-4">
                  <h3 className="text-lg font-semibold">Formularios Disponibles:</h3>
                  <div className="grid gap-2">
                    {video.forms?.map((form) => (
                      <Button
                        key={form.id}
                        onClick={() => handleFormSelection(video.id, form.id, form.type)}
                        className="w-full justify-start text-left"
                      >
                        {form.title}
                        {form.required && (
                          <span className="ml-2 text-sm text-red-500">*</span>
                        )}
                      </Button>
                    ))}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </main>
    </div>
  )
}