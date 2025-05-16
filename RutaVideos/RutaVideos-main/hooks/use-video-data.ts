"use client"

import { useState, useCallback, useEffect } from "react"
import { fetchVideosFromAPI } from "@/lib/api"
import type { Video } from "@/types/video"

/**
 * Hook personalizado para manejar los datos de videos
 * Gestiona la carga, búsqueda y paginación de videos
 *
 * @returns Objeto con videos, estado de carga y funciones para obtener videos
 */
export function useVideoData() {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  // Función para obtener videos (memoizada)
  const fetchVideos = useCallback(
    async (query?: string, loadMore = false) => {
      try {
        setLoading(true)
        const newPage = loadMore ? page + 1 : 1

        // Llamada a la API para obtener videos
        // En un entorno de producción, esta función se conectaría al backend real
        const result = await fetchVideosFromAPI(query, newPage)

        if (loadMore) {
          setVideos((prev) => [...prev, ...result.videos])
        } else {
          setVideos(result.videos)
        }

        setPage(newPage)
        setHasMore(result.hasMore)
      } catch (error) {
        console.error("Error al obtener videos:", error)
      } finally {
        setLoading(false)
      }
    },
    [page],
  )

  // Cargar videos iniciales
  useEffect(() => {
    fetchVideos()
  }, [fetchVideos])

  // Función para cargar más videos
  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      fetchVideos(undefined, true)
    }
  }, [fetchVideos, loading, hasMore])

  return { videos, loading, fetchVideos, loadMore, hasMore }
}
