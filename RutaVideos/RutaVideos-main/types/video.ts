/**
 * Interfaz que define la estructura de un objeto de video
 */
export interface Video {
  id: string
  title: string
  description: string
  author: string
  thumbnailUrl: string
  videoUrl: string // URL firmado de GCS
  viewCount: number
  duration: string
}

/**
 * Interfaz para la respuesta de la API de videos
 */
export interface VideoApiResponse {
  videos: Video[]
  hasMore: boolean
  totalCount: number
}

/**
 * Interfaz para la respuesta de la API de URL firmada
 */
export interface SignedUrlResponse {
  signedUrl: string
  expiresAt: string
}
