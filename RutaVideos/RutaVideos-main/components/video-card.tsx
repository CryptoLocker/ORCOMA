"use client"

import { memo } from "react"
import { motion } from "framer-motion"
import { Clock } from "lucide-react"
import type { Video } from "@/types/video"

interface VideoCardProps {
  video: Video
  handleSelectVideo: (video: Video) => void
  canWatchVideo: (videoId: string) => boolean
  remainingTime: string
}

/**
 * Componente de tarjeta de video individual
 * Optimizado con memo para evitar re-renderizados innecesarios
 */
export const VideoCard = memo(function VideoCard({
  video,
  handleSelectVideo,
  canWatchVideo,
  remainingTime,
}: VideoCardProps) {
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      className="cursor-pointer group"
      onClick={() => handleSelectVideo(video)}
      variants={item}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      tabIndex={0}
      role="button"
      aria-label={`Ver video: ${video.title}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleSelectVideo(video)
        }
      }}
    >
      <div className="relative pb-[56.25%] overflow-hidden mb-2 rounded-lg shadow-sm">
        <img
          src={video.thumbnailUrl || "/placeholder.svg"}
          alt={video.title}
          className="absolute h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-1 rounded">
          {video.duration}
        </div>
        {!canWatchVideo(video.id) && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-white text-center px-3 py-2 bg-black bg-opacity-70 rounded">
              <div className="flex items-center justify-center mb-1">
                <Clock className="w-4 h-4 mr-2 text-orange-400" />
                <span className="text-sm font-medium">Evaluación en progreso</span>
              </div>
              <div className="text-xs text-orange-400 font-mono">{remainingTime} restantes</div>
            </div>
          </div>
        )}

        {/* Indicador de progreso visual */}
        {!canWatchVideo(video.id) && (
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-orange-500"
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{
              duration: 30 * 60, // 30 minutos en segundos
              ease: "linear",
            }}
          />
        )}
      </div>
      <h3 className="text-base font-normal line-clamp-1">{video.title}</h3>
      <p className="text-xs text-gray-500 mt-1">{video.author}</p>
    </motion.div>
  )
})
