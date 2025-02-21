"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

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
  {
    id: "video2",
    snippet: {
      title: "Video 2",
      channelTitle: "ORCOMA S.A.S",
      thumbnails: {
        medium: {
          url: "https://picsum.photos/seed/1/360/200",
        },
      },
    },
    statistics: {
      viewCount: "0",
    },
  },
  {
    id: "video3",
    snippet: {
      title: "Video 3",
      channelTitle: "ORCOMA S.A.S",
      thumbnails: {
        medium: {
          url: "https://picsum.photos/seed/2/360/200",
        },
      },
    },
    statistics: {
      viewCount: "0",
    },
  },
  {
    id: "video4",
    snippet: {
      title: "Video 4",
      channelTitle: "ORCOMA S.A.S",
      thumbnails: {
        medium: {
          url: "https://picsum.photos/seed/3/360/200",
        },
      },
    },
    statistics: {
      viewCount: "0",
    },
  },
  {
    id: "video5",
    snippet: {
      title: "Video 5",
      channelTitle: "ORCOMA S.A.S",
      thumbnails: {
        medium: {
          url: "https://picsum.photos/seed/4/360/200",
        },
      },
    },
    statistics: {
      viewCount: "0",
    },
  },
]

interface Video {
  id: string
  snippet: {
    title: string
    channelTitle: string
    thumbnails: {
      medium: {
        url: string
      }
    }
  }
  statistics: {
    viewCount: string
  }
}

export default function VideoPlayer() {
  const [open, setOpen] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [quizStartTime, setQuizStartTime] = useState<Record<string, number>>({})

  const handleStartEvaluation = (videoId: string) => {
    setQuizStartTime((prev) => ({ ...prev, [videoId]: Date.now() }))
    console.log(`Iniciando evaluación para el video: ${videoId}`)
  }

  const canWatchVideo = (videoId: string) => {
    const startTime = quizStartTime[videoId]
    if (!startTime) return true
    const elapsedTime = (Date.now() - startTime) / 1000 / 60 // en minutos
    return elapsedTime >= 30
  }

  return (
    <>
      {initialVideos.map((video) => (
        <Card
          key={video.id}
          className="cursor-pointer hover:shadow-lg transition-shadow"
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
            <CardTitle className="text-base mb-1 line-clamp-2">{video.snippet.title}</CardTitle>
            <p className="text-sm text-muted-foreground">{video.snippet.channelTitle}</p>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <span>{`${Number.parseInt(video.statistics.viewCount).toLocaleString()} visualizaciones`}</span>
            </div>
          </CardContent>
        </Card>
      ))}

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
    </>
  )
}

