import type { Video } from "@/types/video"

/**
 * Obtiene videos desde la API
 *
 * NOTA: Esta es una implementación simulada para desarrollo.
 * En producción, esta función debe ser reemplazada por llamadas reales al backend.
 *
 * @param query Consulta de búsqueda opcional
 * @param page Número de página para paginación
 * @returns Objeto con videos y estado de paginación
 */
export async function fetchVideosFromAPI(query?: string, page = 1): Promise<{ videos: Video[]; hasMore: boolean }> {
  // SIMULACIÓN: Reemplazar con llamada real al backend
  // -------------------------------------------------
  // Ejemplo de implementación real:
  // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/videos?query=${query}&page=${page}`);
  // const data = await response.json();
  // return { videos: data.videos, hasMore: data.hasMore };
  // -------------------------------------------------

  // Simular una llamada a la API con un retraso
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Datos de ejemplo - REEMPLAZAR EN PRODUCCIÓN
  const allVideos: Video[] = [
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
    // Más videos para paginación
    {
      id: "video9",
      title: "Liderazgo Efectivo",
      description: "Estrategias para un liderazgo efectivo en equipos",
      author: "ORCOMA S.A.S",
      thumbnailUrl: "https://picsum.photos/seed/9/640/360",
      videoUrl: "https://storage.googleapis.com/example-bucket/videos/liderazgo.mp4?X-Goog-Signature=EXAMPLE_SIGNATURE",
      viewCount: 7200,
      duration: "14:10",
    },
    {
      id: "video10",
      title: "Gestión de Conflictos",
      description: "Técnicas para resolver conflictos en el entorno laboral",
      author: "ORCOMA S.A.S",
      thumbnailUrl: "https://picsum.photos/seed/10/640/360",
      videoUrl:
        "https://storage.googleapis.com/example-bucket/videos/conflictos.mp4?X-Goog-Signature=EXAMPLE_SIGNATURE",
      viewCount: 5100,
      duration: "9:55",
    },
    {
      id: "video11",
      title: "Ergonomía en el Trabajo",
      description: "Principios de ergonomía para prevenir lesiones",
      author: "ORCOMA S.A.S",
      thumbnailUrl: "https://picsum.photos/seed/11/640/360",
      videoUrl: "https://storage.googleapis.com/example-bucket/videos/ergonomia.mp4?X-Goog-Signature=EXAMPLE_SIGNATURE",
      viewCount: 4800,
      duration: "8:30",
    },
    {
      id: "video12",
      title: "Atención al Cliente",
      description: "Mejores prácticas para la atención al cliente",
      author: "ORCOMA S.A.S",
      thumbnailUrl: "https://picsum.photos/seed/12/640/360",
      videoUrl: "https://storage.googleapis.com/example-bucket/videos/atencion.mp4?X-Goog-Signature=EXAMPLE_SIGNATURE",
      viewCount: 6300,
      duration: "11:45",
    },
  ]

  // Filtrar videos por consulta si existe
  let filteredVideos = allVideos
  if (query) {
    const normalizedQuery = query.toLowerCase()
    filteredVideos = allVideos.filter(
      (video) =>
        video.title.toLowerCase().includes(normalizedQuery) ||
        video.description.toLowerCase().includes(normalizedQuery),
    )
  }

  // Simular paginación
  const PAGE_SIZE = 8
  const startIndex = (page - 1) * PAGE_SIZE
  const paginatedVideos = filteredVideos.slice(startIndex, startIndex + PAGE_SIZE)
  const hasMore = startIndex + PAGE_SIZE < filteredVideos.length

  return { videos: paginatedVideos, hasMore }
}

/**
 * Obtiene una URL firmada para un video específico
 *
 * NOTA: Esta es una implementación simulada para desarrollo.
 * En producción, esta función debe ser reemplazada por llamadas reales al backend.
 *
 * @param videoId ID del video
 * @returns URL firmada
 */
export async function getSignedUrl(videoId: string): Promise<string> {
  // SIMULACIÓN: Reemplazar con llamada real al backend
  // -------------------------------------------------
  // Ejemplo de implementación real:
  // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/videos/${videoId}/signed-url`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${localStorage.getItem('token')}`
  //   }
  // });
  // const data = await response.json();
  // return data.signedUrl;
  // -------------------------------------------------

  // Simular una llamada a la API con un retraso
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Datos de ejemplo - REEMPLAZAR EN PRODUCCIÓN
  const video = {
    id: videoId,
    videoUrl: `https://storage.googleapis.com/example-bucket/videos/${videoId}.mp4?X-Goog-Signature=EXAMPLE_SIGNATURE`,
  }

  return video.videoUrl
}
