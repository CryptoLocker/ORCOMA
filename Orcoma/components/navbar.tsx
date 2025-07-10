"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Shield, BarChart2, LogOut, VideoIcon } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { motion } from "framer-motion"
import { memo, useCallback, useMemo } from "react"

// Función para obtener elementos de navegación basados en el rol del usuario
const getNavItems = (userRole: string) => {
  if (userRole === "admin") {
    // Solo administradores ven estas opciones
    return [
      { name: "Panel de Admin", href: "/admin", icon: Shield },
      { name: "Gestión Videos", href: "/videos", icon: VideoIcon },
      { name: "Estadísticas", href: "/stats", icon: BarChart2 },
    ]
  } else {
    // Usuarios regulares solo ven videos
    return [{ name: "Videos de Capacitación", href: "/watch", icon: VideoIcon }]
  }
}

const NavItem = memo(
  ({
    item,
    isActive,
  }: {
    item: { name: string; href: string; icon: any }
    isActive: boolean
  }) => {
    const Icon = item.icon

    return (
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Link
          href={item.href}
          className={`
          flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
          ${isActive ? "bg-orange-500 text-white shadow-md" : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"}
        `}
        >
          <Icon className="mr-2 h-4 w-4" />
          <span className="hidden lg:inline">{item.name}</span>
        </Link>
      </motion.div>
    )
  },
)

NavItem.displayName = "NavItem"

function NavbarComponent() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()

  const handleLogout = useCallback(() => {
    logout()
    router.push("/login")
  }, [logout, router])

  // Obtener elementos de navegación basados en el rol
  const navLinks = useMemo(() => {
    if (!user) return null

    const items = getNavItems(user.role)
    return items.map((item) => {
      const isActive = pathname === item.href
      return <NavItem key={item.href} item={item} isActive={isActive} />
    })
  }, [pathname, user])

  if (!user) return null

  return (
    <div className="w-full bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex-shrink-0">
            <Link href={user.role === "admin" ? "/admin" : "/watch"} className="flex items-center">
              <img src="/logo-orcoma-full.webp" alt="ORCOMA Logo" className="h-10 w-auto object-contain" />
            </Link>
          </motion.div>

          {/* Navigation */}
          <div className="flex items-center space-x-3">
            {navLinks}

            {/* User info and logout */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3 ml-6 pl-6 border-l border-gray-200"
            >
              <div className="text-sm text-gray-600 hidden md:block">
                <span className="font-medium">{user.username}</span>
                <span className="block text-xs text-gray-500 capitalize">
                  {user.role === "admin" ? "Administrador" : "Usuario"}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-all duration-200"
              >
                <LogOut className="h-4 w-4 mr-1" />
                <span className="hidden md:inline">Salir</span>
              </button>
            </motion.div>
          </div>
        </div>
      </div>
      <div className="h-0.5 w-full bg-gradient-to-r from-orange-400 to-orange-600"></div>
    </div>
  )
}

export const Navbar = memo(NavbarComponent)
export default Navbar
