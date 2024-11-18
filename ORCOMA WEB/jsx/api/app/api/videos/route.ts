
import { NextResponse } from 'next/server'

// This is a mock function. Replace it with your actual signed URL generation logic
async function generateSignedUrl(videoId: string): Promise<string> {
  // In a real implementation, this would interact with your cloud storage provider
  // to generate a signed URL for the video
  return `https://example.com/videos/${videoId}?signature=mock`
}

export async function GET() {
  const videos = [
    {
      id: 1,
      title: "Inducción y Reinducción",
      channel: "ORCOMA S.A.S",
      views: "15K visualizaciones",
      postedAgo: "hace 2 días",
      thumbnail: "/placeholder.svg?height=200&width=360&text=Inducción+y+Reinducción",
    },
    // Add placeholders for the other 4 videos
    ...Array(4).fill(null).map((_, index) => ({
      id: index + 2,
      title: `Video ${index + 2}`,
      channel: "ORCOMA S.A.S",
      views: "Pendiente",
      postedAgo: "Próximamente",
      thumbnail: `/placeholder.svg?height=200&width=360&text=Video+${index + 2}`,
    }))
  ]

  // Generate signed URLs for each video
  const videosWithUrls = await Promise.all(videos.map(async (video) => ({
    ...video,
    videoUrl: await generateSignedUrl(video.id.toString())
  })))

  return NextResponse.json(videosWithUrls)
}