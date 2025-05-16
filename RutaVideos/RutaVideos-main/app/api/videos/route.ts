import { NextResponse } from "next/server"
import type { Video } from "@/types/video"

/**
 * API endpoint para obtener videos
 *
 * NOTA: Esta es una implementación simulada para desarrollo.
 * En producción, esta ruta debe conectarse a un backend real.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("query") || ""
  const page = Number.parseInt(searchParams.get("page") || "1")

  try {
    // SIMULACIÓN: Reemplazar con lógica real de backend
    // -------------------------------------------------
    // Ejemplo de implementación real:
    // const videos = await db.videos.findMany({
    //   where: {
    //     OR: [
    //       { title: { contains: query, mode: 'insensitive' } },
    //       { description: { contains: query, mode: 'insensitive' } }
    //     ]
    //   },
    //   skip: (page - 1) * 8,
    //   take: 8,
    //   orderBy: { createdAt: 'desc' }
    // });
    // -------------------------------------------------

    // Simular un retraso de red
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Datos simulados
    const videos: Video[] = [
      {
        id: "video1",
        title: "Inducción y Reinducción",
        description: "Video de inducción para nuevos empleados",
        author: "ORCOMA S.A.S",
        thumbnailUrl: "https://picsum.photos/seed/1/640/360",
        videoUrl:
          "https://storage.googleapis.com/example-bucket/videos/induccion.mp4?X-Goog-Signature=EXAMPLE_SIGNATURE",
        viewCount: 15000,
        duration: "10:30",
      },
      // ... más videos
    ]

    return NextResponse.json({
      success: true,
      message: "Videos obtenidos correctamente",
      data: {
        videos: videos.filter(
          (v) =>
            v.title.toLowerCase().includes(query.toLowerCase()) ||
            v.description.toLowerCase().includes(query.toLowerCase()),
        ),
        hasMore: page < 3, // Simulación de paginación
        totalCount: 20,
      },
    })
  } catch (error) {
    console.error("Error al obtener videos:", error)
    return NextResponse.json({ success: false, message: "Error al obtener videos" }, { status: 500 })
  }
}

/**
 * API endpoint para generar URL firmada
 *
 * NOTA: Esta es una implementación simulada para desarrollo.
 * En producción, esta ruta debe conectarse a un backend real.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { videoId } = body

    if (!videoId) {
      return NextResponse.json({ success: false, message: "ID de video no proporcionado" }, { status: 400 })
    }

    // SIMULACIÓN: Reemplazar con lógica real de backend
    // -------------------------------------------------
    // Ejemplo de implementación real:
    // const storage = new Storage();
    // const bucket = storage.bucket(process.env.GCS_BUCKET_NAME);
    // const file = bucket.file(`videos/${videoId}.mp4`);
    // const [signedUrl] = await file.getSignedUrl({
    //   version: 'v4',
    //   action: 'read',
    //   expires: Date.now() + 3600 * 1000
    // });
    // -------------------------------------------------

    // Simular un retraso de red
    await new Promise((resolve) => setTimeout(resolve, 300))

    return NextResponse.json({
      success: true,
      message: "URL firmada generada correctamente",
      data: {
        signedUrl: `https://storage.googleapis.com/example-bucket/videos/${videoId}.mp4?X-Goog-Signature=GENERATED_SIGNATURE&X-Goog-Expires=3600`,
        expiresAt: new Date(Date.now() + 3600 * 1000).toISOString(),
      },
    })
  } catch (error) {
    console.error("Error al generar URL firmada:", error)
    return NextResponse.json({ success: false, message: "Error al generar URL firmada" }, { status: 500 })
  }
}
