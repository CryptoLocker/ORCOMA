"use client"

import type React from "react"

import { useState, useEffect, useCallback, lazy, Suspense } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useDebounce } from "@/hooks/use-debounce"
import { useVideoData } from "@/hooks/use-video-data"
import { VideoList } from "@/components/video-list"
import { SearchBar } from "@/components/search-bar"
import { EVALUATION_LOCK_MINUTES } from "@/lib/constants"
import type { Video } from "@/types/video"

// Lazy load del componente TheaterMode para mejorar el rendimiento inicial
const TheaterMode = lazy(() => import("@/components/theater-mode").then((mod) => ({ default: mod.TheaterMode })))

/**
 * Componente principal del reproductor de video
 * Gestiona la búsqueda, selección y visualización de videos
 */
export default function VideoPlayer() {
  // Estados para manejar la búsqueda, videos seleccionados y modal
  const [searchQuery, setSearchQuery] = useState("")
  const debouncedSearchQuery = useDebounce(searchQuery, 500)
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [quizStartTime, setQuizStartTime] = useState<Record<string, number>>({})
  const [isTheaterMode, setIsTheaterMode] = useState(false)
  const [remainingTimes, setRemainingTimes] = useState<Record<string, string>>({})

  // Usar el hook personalizado para manejar los datos de videos
  const { videos, loading, fetchVideos } = useVideoData()

  // Efecto para buscar videos cuando cambia la consulta debounced
  useEffect(() => {
    if (debouncedSearchQuery !== "") {
      fetchVideos(debouncedSearchQuery)
    }
  }, [debouncedSearchQuery, fetchVideos])

  // Actualizar tiempos restantes
  useEffect(() => {
    const interval = setInterval(() => {
      const updatedTimes: Record<string, string> = {}

      Object.entries(quizStartTime).forEach(([videoId, startTime]) => {
        const elapsedSeconds = (Date.now() - startTime) / 1000
        const totalSeconds = EVALUATION_LOCK_MINUTES * 60
        const remainingSeconds = Math.max(0, totalSeconds - elapsedSeconds)

        const minutes = Math.floor(remainingSeconds / 60)
        const seconds = Math.floor(remainingSeconds % 60)

        updatedTimes[videoId] = `${minutes}:${seconds.toString().padStart(2, "0")}`
      })

      setRemainingTimes(updatedTimes)
    }, 1000)

    return () => clearInterval(interval)
  }, [quizStartTime])

  // Función para manejar la búsqueda de videos (memoizada)
  const handleSearch = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      if (searchQuery.trim()) {
        fetchVideos(searchQuery)
      }
    },
    [searchQuery, fetchVideos],
  )

  // Función para iniciar la evaluación de un video (memoizada)
  const handleStartEvaluation = useCallback((videoId: string) => {
    setQuizStartTime((prev) => ({ ...prev, [videoId]: Date.now() }))
    console.log(`Iniciando evaluación para el video: ${videoId}`)
    setSelectedVideo(null)
    setIsTheaterMode(false)
  }, [])

  // Función para verificar si se puede ver un video (memoizada)
  const canWatchVideo = useCallback(
    (videoId: string) => {
      const startTime = quizStartTime[videoId]
      if (!startTime) return true
      const elapsedTime = (Date.now() - startTime) / 1000 / 60 // en minutos
      return elapsedTime >= EVALUATION_LOCK_MINUTES
    },
    [quizStartTime],
  )

  // Función para seleccionar un video (memoizada)
  const handleSelectVideo = useCallback(
    (video: Video) => {
      if (canWatchVideo(video.id)) {
        setSelectedVideo(video)
        setIsTheaterMode(true)
        // Hacer scroll hacia arriba suavemente
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
    },
    [canWatchVideo],
  )

  // Función para cerrar el modo teatro (memoizada)
  const closeTheaterMode = useCallback(() => {
    setIsTheaterMode(false)
    setSelectedVideo(null)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Cabecera minimalista */}
      <motion.header
        className="border-b py-4 bg-white sticky top-0 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="w-10"></div> {/* Espacio para equilibrar el diseño */}
          <motion.h1
            className="text-2xl font-bold text-orange-500"
            style={{
              fontFamily: "'Montserrat', 'Arial', sans-serif",
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            ORCOMA
          </motion.h1>
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearch={handleSearch} />
        </div>
      </motion.header>

      <AnimatePresence mode="wait">
        {isTheaterMode && selectedVideo ? (
          <Suspense fallback={<div className="flex justify-center items-center h-[70vh]">Cargando reproductor...</div>}>
            <TheaterMode
              key="theater"
              selectedVideo={selectedVideo}
              closeTheaterMode={closeTheaterMode}
              handleStartEvaluation={handleStartEvaluation}
              canWatchVideo={canWatchVideo}
              remainingTimes={remainingTimes}
            />
          </Suspense>
        ) : (
          <VideoList
            key="list"
            videos={videos}
            loading={loading}
            handleSelectVideo={handleSelectVideo}
            canWatchVideo={canWatchVideo}
            remainingTimes={remainingTimes}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
