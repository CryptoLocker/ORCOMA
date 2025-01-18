"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search, ArrowLeft } from 'lucide-react'

// This will be replaced with actual video data from your backend
const initialVideos = [
  {
    id: 1,
    title: "Inducción y Reinducción",
    channel: "ORCOMA S.A.S",
    views: "15K visualizaciones",
    postedAgo: "hace 2 días",
    thumbnail: "/placeholder.svg?height=200&width=360&text=Inducción+y+Reinducción",
  },
  // Add placeholders for the other 4 videos
  ...Array(4).fill(null).map((_, index) => ({
    id: index + 2,
    title: `Video ${index + 2}`,
    channel: "ORCOMA S.A.S",
    views: "Pendiente",
    postedAgo: "Próximamente",
    thumbnail: `/placeholder.svg?height=200&width=360&text=Video+${index + 2}`,
  }))
]

export default function VideoPlayer() {
  const [searchQuery, setSearchQuery] = useState("")
  const [open, setOpen] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [quizStartTime, setQuizStartTime] = useState({})
  const [videos, setVideos] = useState(initialVideos)
  const router = useRouter()

  const handleSearch = (e) => {
    e.preventDefault()
    console.log("Buscando:", searchQuery)
    // Implement search functionality here
  }

  const handleStartEvaluation = (videoId) => {
    setQuizStartTime((prev) => ({ ...prev, [videoId]: Date.now() }))
    router.push(`/evaluation/${videoId}`)
  }

  const canWatchVideo = (videoId) => {
    const startTime = quizStartTime[videoId]
    if (!startTime) return true
    const elapsedTime = (Date.now() - startTime) / 1000 / 60 // en minutos
    return elapsedTime >= 30
  }

  useEffect(() => {
    // This effect would fetch the actual video data from your backend
    const fetchVideos = async () => {
      try {
        // Replace this with your actual API call
        // const response = await fetch('/api/videos');
        // const data = await response.json();
        // setVideos(data);
        console.log("Fetching videos...")
      } catch (error) {
        console.error("Error fetching videos:", error)
      }
    }

    fetchVideos()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold text-orange-600">ORCOMA S.A.S</h1>
          <div className="flex-1 max-w-xl mx-4">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="search"
                placeholder="Buscar videos..."
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

              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>{video.title}</DialogTitle>
                </DialogHeader>
                <div className="relative aspect-video bg-black">
                  <video
                    className="w-full h-full"
                    controls
                    src={video.videoUrl} // This will be the signedURL
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
                    {selectedVideo && !canWatchVideo(selectedVideo.id)
                      ? "Evaluación en progreso"
                      : "Realizar evaluación"}
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