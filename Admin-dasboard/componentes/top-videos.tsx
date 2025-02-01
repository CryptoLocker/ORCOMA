import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Video {
  id: string
  title: string
  views: number
}

interface TopVideosProps {
  videos: Video[]
}

export function TopVideos({ videos }: TopVideosProps) {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Top Videos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {videos.map((video) => (
            <div key={video.id} className="flex items-center">
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{video.title}</p>
                <p className="text-sm text-muted-foreground">{video.views.toLocaleString()} views</p>
              </div>
              <div className="ml-auto font-medium">{video.views.toLocaleString()}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

