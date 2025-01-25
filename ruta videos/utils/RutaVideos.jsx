import { fetchYouTubeVideos } from "@/utils/youtubeApi"
import React, { useState, useEffect } from "react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@material-tailwind/react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

const initialVideos = [
  {
    id: "video1",
    snippet: {
      title: "Inducción y Reinducción",
      channelTitle: "ORCOMA S.A.S",
      thumbnails: {
        medium: {
          url: "/placeholder.svg?height=200&width=360&text=Inducción+y+Reinducción",
        },
      },
    },
    statistics: {
      viewCount: "15000",
    },
  },
  // Agrega placeholders para los otros 4 videos
  ...Array(4)
    .fill(null)
    .map((_, index) => ({
      id: `video${index + 2}`,
      snippet: {
        title: `Video ${index + 2}`,
        channelTitle: "ORCOMA S.A.S",
        thumbnails: {
          medium: {
            url: `/placeholder.svg?height=200&width=360&text=Video+${index + 2}`,
          },
        },
      },
      statistics: {
        viewCount: "0",
      },
    })),
]

const App = () => {
  const [videos, setVideos] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [open, setOpen] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState(null)

  const canWatchVideo = (videoId) => {
    // Replace with your actual logic to check if a video can be watched
    return true
  }

  const handleStartEvaluation = (videoId) => {
    // Replace with your actual logic to handle starting an evaluation
    console.log("Starting evaluation for video:", videoId)
  }

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // Esto será reemplazado con la llamada real a la API
        // const response = await fetch('/api/youtube-videos');
        // const data = await response.json();
        // setVideos(data.items);
        setVideos(initialVideos)
      } catch (error) {
        console.error("Error fetching videos:", error)
      }
    }

    fetchVideos()
  }, [])

  const handleSearch = async (e) => {
    e.preventDefault()
    try {
      const data = await fetchYouTubeVideos(searchQuery)
      setVideos(data.items)
    } catch (error) {
      console.error("Error searching videos:", error)
      // You might want to set an error state here and display it to the user
    }
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  return (
    <div>
      <h1>YouTube Videos</h1>
      <form onSubmit={handleSearch}>
        <input type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Search for videos..." />
        <button type="submit">Search</button>
      </form>
      <ul>
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
                      src={video.snippet.thumbnails.medium.url || "/placeholder.svg"}
                      alt={video.snippet.title}
                      className="absolute h-full w-full object-cover"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="font-semibold text-lg mb-1 line-clamp-2">{video.snippet.title}</CardTitle>
                  <p className="text-sm text-gray-600">{video.snippet.channelTitle}</p>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <span>{`${Number.parseInt(video.statistics.viewCount).toLocaleString()} visualizaciones`}</span>
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>

            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>{video.snippet.title}</DialogTitle>
              </DialogHeader>
              <div className="relative aspect-video bg-black">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${video.id}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
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
                  {selectedVideo && !canWatchVideo(selectedVideo.id) ? "Evaluación en progreso" : "Realizar evaluación"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </ul>
    </div>
  )
}

export default App

