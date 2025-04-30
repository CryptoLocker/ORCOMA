"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { VideoIcon, BarChart2 } from "lucide-react"

const navItems = [
  { name: "Gestión de Videos", href: "/videos", icon: VideoIcon },
  { name: "Estadísticas", href: "/stats", icon: BarChart2 },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <div className="w-full bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold text-orange-500">ORCOMA S.A.S</span>
          </div>

          {/* Navigation */}
          <div className="flex space-x-4">
            {navItems.map((item) => {
              // Verificar si la ruta actual coincide exactamente con la ruta del ítem
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center px-4 py-2 rounded-md text-sm font-medium
                    ${isActive ? "bg-orange-500 text-white" : "text-gray-700 hover:bg-gray-100"}
                  `}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
      <div className="h-0.5 w-full bg-orange-500"></div>
    </div>
  )
}

export default Navbar
