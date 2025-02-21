import VideoPlayer from "@/components/VideoPlayer"
import NotificationBell from "@/components/NotificationBell"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function VideosPage() {
  return (
    <>
      {/* Header con búsqueda y notificación */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold text-[#ff4400]">ORCOMA S.A.S</h1>
          <div className="flex-1 max-w-xl mx-4">
            <div className="relative">
              <Input
                type="search"
                placeholder="Buscar videos..."
                className="w-full pl-10 pr-4 rounded-full border border-gray-200"
              />
              <Button type="submit" variant="ghost" className="absolute right-0 top-0 h-full">
                🔍
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <NotificationBell />
            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </header>

      {/* VideoPlayer Component */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <VideoPlayer />
        </div>
      </main>
    </>
  )
}

