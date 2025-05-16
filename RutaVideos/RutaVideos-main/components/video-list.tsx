"use client"

import { memo } from "react"
import { motion } from "framer-motion"
import type { Video } from "@/types/video"
import { VideoCard } from "@/components/video-card"

interface VideoListProps {
  videos: Video[]
  loading: boolean
  handleSelectVideo: (video: Video) => void
  canWatchVideo: (videoId: string) => boolean
  remainingTimes: Record<string, string>
}

/**
 * Componente que muestra la lista de videos disponibles
 * Optimizado con memo para evitar re-renderizados innecesarios
 */
export const VideoList = memo(function VideoList({
  videos,
  loading,
  handleSelectVideo,
  canWatchVideo,
  remainingTimes,
}: VideoListProps) {
  // Animaciones para la lista
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <motion.main
      className="container mx-auto px-4 py-8"
      initial="hidden"
      animate="show"
      exit={{ opacity: 0 }}
      variants={container}
    >
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {[...Array(8)].map((_, index) => (
            <VideoCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {videos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              handleSelectVideo={handleSelectVideo}
              canWatchVideo={canWatchVideo}
              remainingTime={remainingTimes[video.id] || "30:00"}
            />
          ))}
        </div>
      )}
    </motion.main>
  )
})

/**
 * Componente de esqueleto para mostrar durante la carga de videos
 */
const VideoCardSkeleton = () => {
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div className="animate-pulse" variants={item}>
      <div className="bg-gray-200 pb-[56.25%] mb-2 rounded"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
    </motion.div>
  )
}
