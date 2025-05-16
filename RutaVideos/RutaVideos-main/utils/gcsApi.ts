// Interfaz para los videos con URLs firmados de GCS
interface Video {
  id: string
  title: string
  description: string
  author: string
  thumbnailUrl: string
  videoUrl: string // URL firmado de GCS
  viewCount: number
  duration: string
}

// Datos de ejemplo para simular videos de GCS
const sampleVideos: Video[] = [
  {
    id: "video1",
    title: "Inducción y Reinducción",
    description: "Video de inducción para nuevos empleados",
    author: "ORCOMA S.A.S",
    thumbnailUrl: "https://picsum.photos/seed/1/640/360",
    videoUrl: "https://storage.googleapis.com/example-bucket/videos/induccion.mp4?X-Goog-Signature=EXAMPLE_SIGNATURE",
    viewCount: 15000,
    duration: "10:30",
  },
  {
    id: "video2",
    title: "Seguridad en el Trabajo",
    description: "Protocolos de seguridad laboral",
    author: "ORCOMA S.A.S",
    thumbnailUrl: "https://picsum.photos/seed/2/640/360",
    videoUrl: "https://storage.googleapis.com/example-bucket/videos/seguridad.mp4?X-Goog-Signature=EXAMPLE_SIGNATURE",
    viewCount: 8500,
    duration: "15:45",
  },
  {
    id: "video3",
    title: "Manejo de Equipos",
    description: "Guía para el uso correcto de equipos",
    author: "ORCOMA S.A.S",
    thumbnailUrl: "https://picsum.photos/seed/3/640/360",
    videoUrl: "https://storage.googleapis.com/example-bucket/videos/equipos.mp4?X-Goog-Signature=EXAMPLE_SIGNATURE",
    viewCount: 6200,
    duration: "8:15",
  },
  {
    id: "video4",
    title: "Primeros Auxilios",
    description: "Procedimientos básicos de primeros auxilios",
    author: "ORCOMA S.A.S",
    thumbnailUrl: "https://picsum.photos/seed/4/640/360",
    videoUrl:
      "https://storage.googleapis.com/example-bucket/videos/primeros_auxilios.mp4?X-Goog-Signature=EXAMPLE_SIGNATURE",
    viewCount: 9700,
    duration: "12:20",
  },
  {
    id: "video5",
    title: "Manejo de Residuos",
    description: "Protocolos para el manejo adecuado de residuos",
    author: "ORCOMA S.A.S",
    thumbnailUrl: "https://picsum.photos/seed/5/640/360",
    videoUrl: "https://storage.googleapis.com/example-bucket/videos/residuos.mp4?X-Goog-Signature=EXAMPLE_SIGNATURE",
    viewCount: 4300,
    duration: "7:50",
  },
  {
    id: "video6",
    title: "Trabajo en Equipo",
    description: "Estrategias para mejorar el trabajo colaborativo",
    author: "ORCOMA S.A.S",
    thumbnailUrl: "https://picsum.photos/seed/6/640/360",
    videoUrl:
      "https://storage.googleapis.com/example-bucket/videos/trabajo_equipo.mp4?X-Goog-Signature=EXAMPLE_SIGNATURE",
    viewCount: 7800,
    duration: "11:05",
  },
  {
    id: "video7",
    title: "Comunicación Efectiva",
    description: "Técnicas para una comunicación clara y efectiva",
    author: "ORCOMA S.A.S",
    thumbnailUrl: "https://picsum.photos/seed/7/640/360",
    videoUrl:
      "https://storage.googleapis.com/example-bucket/videos/comunicacion.mp4?X-Goog-Signature=EXAMPLE_SIGNATURE",
    viewCount: 5600,
    duration: "9:40",
  },
  {
    id: "video8",
    title: "Gestión del Tiempo",
    description: "Métodos para optimizar la gestión del tiempo",
    author: "ORCOMA S.A.S",
    thumbnailUrl: "https://picsum.photos/seed/8/640/360",
    videoUrl: "https://storage.googleapis.com/example-bucket/videos/tiempo.mp4?X-Goog-Signature=EXAMPLE_SIGNATURE",
    viewCount: 6900,
    duration: "13:25",
  },
]

/**
 * Simula la obtención de videos desde Google Cloud Storage con URLs firmados
 * En un entorno real, esta función haría una llamada a tu API backend
 * que generaría las URLs firmadas para acceder a los videos en GCS
 */
export const fetchVideos = async (query?: string): Promise<Video[]> => {
  // Simular una llamada a la API con un retraso
  await new Promise((resolve) => setTimeout(resolve, 800))

  if (!query) {
    return sampleVideos
  }

  // Filtrar videos por título o descripción si hay una consulta
  const normalizedQuery = query.toLowerCase()
  return sampleVideos.filter(
    (video) =>
      video.title.toLowerCase().includes(normalizedQuery) || video.description.toLowerCase().includes(normalizedQuery),
  )
}

/**
 * En un entorno real, esta función solicitaría una URL firmada al backend
 * para un video específico, permitiendo acceso temporal al archivo en GCS
 */
export const getSignedUrl = async (videoId: string): Promise<string> => {
  // Simular una llamada a la API con un retraso
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Encontrar el video por ID
  const video = sampleVideos.find((v) => v.id === videoId)

  if (!video) {
    throw new Error(`Video con ID ${videoId} no encontrado`)
  }

  // En un entorno real, aquí se generaría una nueva URL firmada con tiempo de expiración
  // Para la simulación, simplemente devolvemos la URL existente
  return video.videoUrl
}
