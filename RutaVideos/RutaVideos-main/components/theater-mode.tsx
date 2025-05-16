"use client"

import { motion } from "framer-motion"
import { X, ChevronLeft, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Video } from "@/types/video"

interface TheaterModeProps {
  selectedVideo: Video
  closeTheaterMode: () => void
  handleStartEvaluation: (videoId: string) => void
  canWatchVideo: (videoId: string) => boolean
  remainingTimes: Record<string, string>
}

/**
 * Componente que muestra el modo teatro para reproducir videos
 * Permite ver el video a pantalla completa y realizar evaluaciones
 */
export function TheaterMode({
  selectedVideo,
  closeTheaterMode,
  handleStartEvaluation,
  canWatchVideo,
  remainingTimes,
}: TheaterModeProps) {
  return (
    <motion.div
      className="bg-black text-white min-h-[calc(100vh-64px)]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4">
        <div className="relative">
          {/* Botón para cerrar el modo teatro */}
          <motion.button
            onClick={closeTheaterMode}
            className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 rounded-full p-1 hover:bg-opacity-70 transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Cerrar reproductor"
          >
            <X className="w-5 h-5" />
          </motion.button>

          {/* Reproductor de video */}
          <motion.div
            className="aspect-video w-full max-h-[70vh]"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <video
              controls
              autoPlay
              className="w-full h-full rounded-lg"
              poster={selectedVideo.thumbnailUrl}
              src={selectedVideo.videoUrl}
              aria-label={`Reproduciendo: ${selectedVideo.title}`}
              preload="metadata"
            >
              Tu navegador no soporta la reproducción de videos.
            </video>
          </motion.div>

          {/* Información del video y botón de evaluación */}
          <motion.div
            className="py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div>
              <h2 className="text-xl font-medium">{selectedVideo.title}</h2>
              <p className="text-sm text-gray-400">
                {selectedVideo.author} • {selectedVideo.viewCount.toLocaleString()} visualizaciones
              </p>
              <p className="text-sm mt-2">{selectedVideo.description}</p>
            </div>
            <div className="md:min-w-[200px]">
              {!canWatchVideo(selectedVideo.id) ? (
                <motion.div
                  className="w-full bg-gray-800 text-white p-2 rounded flex items-center justify-center"
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", duration: 1.5 }}
                >
                  <div className="flex flex-col items-center">
                    <div className="flex items-center mb-1">
                      <Clock className="w-4 h-4 mr-2 text-orange-400" />
                      <span className="text-sm">Evaluación en progreso</span>
                    </div>
                    <div className="text-orange-400 font-mono">
                      {remainingTimes[selectedVideo.id] || "30:00"} restantes
                    </div>
                  </div>
                </motion.div>
              ) : (
                <Button
                  onClick={() => {
                    if (selectedVideo) {
                      handleStartEvaluation(selectedVideo.id)
                    }
                  }}
                  className="w-full bg-orange-500 text-white hover:bg-orange-600"
                >
                  Realizar evaluación
                </Button>
              )}
            </div>
          </motion.div>

          {/* Botón para volver a la lista */}
          <motion.div className="pb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <Button variant="ghost" className="text-gray-400 hover:text-white" onClick={closeTheaterMode}>
              <ChevronLeft className="w-4 h-4 mr-2" />
              Volver a la lista
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
