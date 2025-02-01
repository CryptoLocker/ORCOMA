"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { VideoIcon, BarChart, MessageCircle, Users, Menu } from "lucide-react"

const navItems = [
  { name: "Gestión de Videos", href: "/videos", icon: VideoIcon },
  { name: "Estadísticas", href: "/stats", icon: BarChart },
  { name: "Chat Interno", href: "/chat", icon: MessageCircle },
]

export function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* Mobile header */}
      <div className="lg:hidden bg-white shadow-md p-4 fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-orange-500">
            ORCOMA S.A.S
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Sidebar */}
      <aside
        className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-64 transform transition-transform duration-200 ease-in-out
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        bg-[#1e3a8a] text-white flex flex-col
      `}
      >
        <div className="flex-1 overflow-y-auto">
          {/* Logo */}
          <Link href="/" className="p-6 border-b border-blue-800 block">
            <span className="text-2xl font-bold text-orange-500">ORCOMA S.A.S</span>
          </Link>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`w-full flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                  pathname === item.href ? "bg-blue-700 text-white" : "text-gray-300 hover:bg-blue-800"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* User Info */}
        <div className="p-4 border-t border-blue-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="font-medium">Administrador</p>
              <p className="text-sm text-gray-300">admin@orcoma.com</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar

