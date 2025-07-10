"use client"

import type React from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { LayoutDashboard, Video, BarChart3, Settings, LogOut, Play } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { FullScreenLoading } from "@/components/full-screen-loading"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, logout, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [showLoadingScreen, setShowLoadingScreen] = useState(true)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
      return
    }

    // Redirigir usuarios regulares que intenten acceder a rutas de admin
    if (user && user.role === "user") {
      const adminPaths = ["/admin", "/stats", "/videos"]
      const isAdminPath = adminPaths.some((path) => pathname.startsWith(path))

      if (isAdminPath) {
        router.push("/watch")
        return
      }
    }

    // Mostrar loading screen por un momento al cargar el dashboard
    if (user && showLoadingScreen) {
      const timer = setTimeout(() => {
        setShowLoadingScreen(false)
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [user, isLoading, router, pathname, showLoadingScreen])

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  // Navigation items based on user role
  const getNavigationItems = () => {
    const baseItems = [
      {
        name: "Videos",
        href: "/watch",
        icon: Play,
        description: "Ver contenido de capacitación",
      },
      {
        name: "Formulario",
        href: "/formulario",
        icon: Settings,
        description: "Completar formularios",
      },
    ]

    if (user?.role === "admin") {
      return [
        {
          name: "Dashboard",
          href: "/admin",
          icon: LayoutDashboard,
          description: "Panel de administración",
        },
        {
          name: "Gestión Videos",
          href: "/videos",
          icon: Video,
          description: "Administrar contenido",
        },
        {
          name: "Estadísticas",
          href: "/stats",
          icon: BarChart3,
          description: "Métricas y reportes",
        },
      ]
    }

    // Usuarios regulares SOLO ven videos
    return baseItems
  }

  // Mostrar loading screen mientras se carga o verifica la autenticación
  if (isLoading || !user || showLoadingScreen) {
    return (
      <FullScreenLoading
        message={
          isLoading
            ? "Verificando credenciales..."
            : showLoadingScreen
              ? `Bienvenido, ${user?.username || "Usuario"}`
              : "Cargando dashboard..."
        }
        variant="dashboard"
        showLogo={true}
      />
    )
  }

  const navigationItems = getNavigationItems()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href={user.role === "admin" ? "/admin" : "/watch"} className="flex items-center">
                <Image
                  src="/logo-orcoma-new.webp"
                  alt="ORLANDO CONTRERAS MANTILLA - INGENIEROS CIVILES S.A.S."
                  width={250}
                  height={60}
                  className="h-10 w-auto object-contain"
                />
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive ? "bg-orange-100 text-orange-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    <item.icon className="h-4 w-4 mr-2" />
                    {item.name}
                  </Link>
                )
              })}
            </div>

            {/* User Menu - Hamburger Style */}
            <div className="flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-lg bg-white hover:bg-gray-50 border border-gray-200 shadow-sm transition-all duration-200 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                  >
                    <div className="flex flex-col items-center justify-center space-y-1">
                      <div className="w-4 h-0.5 bg-gray-700 rounded-full transition-all duration-200"></div>
                      <div className="w-4 h-0.5 bg-gray-700 rounded-full transition-all duration-200"></div>
                      <div className="w-4 h-0.5 bg-gray-700 rounded-full transition-all duration-200"></div>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 bg-white border border-gray-200 shadow-lg rounded-lg"
                  align="end"
                  forceMount
                >
                  {/* User Info Section */}
                  <div className="flex items-center gap-3 p-4 border-b border-gray-100 bg-gray-50/50">
                    <Avatar className="h-10 w-10 ring-2 ring-orange-100">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback className="bg-gradient-to-br from-orange-400 to-orange-600 text-white font-semibold text-sm">
                        {user.username.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <p className="font-semibold text-gray-900 text-sm">{user.username}</p>
                      <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                    </div>
                  </div>

                  {/* Logout Option */}
                  <div className="p-1">
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="flex items-center px-3 py-2.5 text-gray-700 hover:bg-red-50 hover:text-red-600 cursor-pointer transition-colors rounded-md group"
                    >
                      <LogOut className="mr-3 h-4 w-4 group-hover:text-red-600" />
                      <span className="font-medium">Cerrar sesión</span>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive ? "bg-orange-100 text-orange-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  <div>
                    <div>{item.name}</div>
                    <div className="text-xs text-gray-500">{item.description}</div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          {children}
        </motion.div>
      </main>
    </div>
  )
}
