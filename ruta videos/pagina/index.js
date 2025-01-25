"use client"

import React, { useState, useEffect } from "react"
import { ArrowLeft } from "lucide-react"

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
  const [searchQuery, setSearchQuery] = useState("")
  const [open, setOpen] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [quizStartTime, setQuizStartTime] = useState({})
  const [videos, setVideos] = useState(initialVideos)

  const handleSearch = (e) => {
    e.preventDefault()
    console.log("Buscando:", searchQuery)
    // Implement search functionality here
  }

  const handleStartEvaluation = (videoId) => {
    setQuizStartTime((prev) => ({ ...prev, [videoId]: Date.now() }))
    console.log(`Starting evaluation for video: ${videoId}`)
  }

  const canWatchVideo = (videoId) => {
    const startTime = quizStartTime[videoId]
    if (!startTime) return true
    const elapsedTime = (Date.now() - startTime) / 1000 / 60 // en minutos
    return elapsedTime >= 30
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold text-orange-600">ORCOMA S.A.S</h1>
          <div className="flex-1 max-w-xl mx-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="search"
                placeholder="Buscar videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300"
              />
              <button type="submit" className="absolute right-3 top-2">
                🔍
              </button>
            </form>
          </div>
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {videos.map((video) => (
            <div key={video.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div
                className="cursor-pointer"
                onClick={() => {
                  if (canWatchVideo(video.id)) {
                    setSelectedVideo(video)
                    setOpen(true)
                  }
                }}
              >
                <div className="relative pb-[56.25%]">
                  <img
                    src={video.snippet.thumbnails.medium.url || "/placeholder.svg"}
                    alt={video.snippet.title}
                    className="absolute h-full w-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1 line-clamp-2">{video.snippet.title}</h3>
                  <p className="text-sm text-gray-600">{video.snippet.channelTitle}</p>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <span>{`${Number.parseInt(video.statistics.viewCount).toLocaleString()} visualizaciones`}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {open && selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-auto max-w-4xl mx-auto my-6">
            <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                <h3 className="text-2xl font-semibold">{selectedVideo.snippet.title}</h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setOpen(false)}
                >
                  <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              <div className="relative p-6 flex-auto">
                <div className="relative aspect-video bg-black">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${selectedVideo.id}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  <button
                    onClick={() => setOpen(false)}
                    className="absolute left-4 top-4 bg-black/50 text-white hover:bg-black/70 p-2 rounded"
                  >
                    <ArrowLeft className="h-6 w-6" />
                  </button>
                </div>
                <div className="mt-4 flex justify-center">
                  <button
                    onClick={() => {
                      handleStartEvaluation(selectedVideo.id)
                      setOpen(false)
                    }}
                    disabled={!canWatchVideo(selectedVideo.id)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                  >
                    {!canWatchVideo(selectedVideo.id) ? "Evaluación en progreso" : "Realizar evaluación"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

