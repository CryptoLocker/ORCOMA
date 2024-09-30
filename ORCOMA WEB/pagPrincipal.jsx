import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Menu } from "lucide-react"

const constructionVideos = [
  { id: 1, title: "Técnicas avanzadas de albañilería", author: "MasterBuilder", views: "15K", time: "2 días" },
  { id: 2, title: "Seguridad en obras de gran altura", author: "SafetyFirst", views: "8.5K", time: "1 semana" },
  { id: 3, title: "Instalación eficiente de sistemas eléctricos", author: "ElectroTech", views: "12K", time: "3 días" },
  { id: 4, title: "Diseño y construcción de cimientos", author: "FoundationPro", views: "20K", time: "5 días" },
  { id: 5, title: "Técnicas de pintura industrial", author: "ColorMaster", views: "7K", time: "1 día" },
  { id: 6, title: "Instalación de sistemas de plomería", author: "PlumbingExpert", views: "10K", time: "4 días" },
  { id: 7, title: "Construcción sostenible y materiales ecológicos", author: "EcoBuilder", views: "18K", time: "1 semana" },
  { id: 8, title: "Manejo de maquinaria pesada en obra", author: "HeavyEquipmentOps", views: "25K", time: "2 semanas" },
  { id: 9, title: "Técnicas de soldadura en construcción", author: "WeldMaster", views: "13K", time: "6 días" },
  { id: 10, title: "Gestión de proyectos de construcción", author: "ProjectManagerPro", views: "30K", time: "1 mes" },
  { id: 11, title: "Instalación de paneles solares en edificios", author: "SolarConstructor", views: "22K", time: "1 semana" },
  { id: 12, title: "Restauración de estructuras históricas", author: "HeritageBuilder", views: "9K", time: "3 días" },
]

export default function ORCOMASAS() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
            <h1 className="text-xl font-bold text-orange-600">ORCOMA S.A.S</h1>
          </div>
          <div className="flex-1 max-w-xl mx-4">
            <form className="relative">
              <Input
                type="search"
                placeholder="Buscar videos de construcción..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-orange-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </form>
          </div>
          <Avatar>
            <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {constructionVideos.map((video) => (
            <div key={video.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative pb-[56.25%]">
                <img
                  src={`/placeholder.svg?height=200&width=360&text=Video+${video.id}`}
                  alt={video.title}
                  className="absolute h-full w-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1 line-clamp-2">{video.title}</h3>
                <p className="text-sm text-gray-600">{video.author}</p>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <span>{video.views} visualizaciones</span>
                  <span className="mx-1">•</span>
                  <span>hace {video.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}