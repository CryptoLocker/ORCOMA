'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Menu, Users, VideoIcon, HelpCircle, BarChart, FileText, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { href: '/videos', icon: VideoIcon, label: 'Gestión de Videos' },
    { href: '/questions', icon: HelpCircle, label: 'Gestión de Preguntas' },
    { href: '/stats', icon: BarChart, label: 'Estadísticas' },
    { href: '/reports', icon: FileText, label: 'Reportes' },
    { href: '/chat', icon: MessageCircle, label: 'Chat Interno' },
  ]

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header for mobile */}
      <div className="lg:hidden bg-white shadow-md p-4">
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-orange-500">ORCOMA S.A.S</span>
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className={`
          sidebar fixed lg:static inset-y-0 left-0 z-50
          w-64 transform transition-transform duration-200 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          bg-[#1e3a8a] text-white flex flex-col
        `}>
          <div className="flex-1 overflow-y-auto">
            {/* Logo */}
            <div className="p-6 border-b border-blue-800">
              <span className="text-2xl font-bold text-orange-500">ORCOMA S.A.S</span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
              {navItems.map((item) => (
                <Button
                  key={item.href}
                  variant="ghost"
                  asChild
                  className={`w-full justify-start gap-2 ${
                    pathname === item.href ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-blue-800'
                  }`}
                >
                  <Link href={item.href}>
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                </Button>
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

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          <Card className="shadow-lg">
            <CardHeader className="bg-orange-50">
              <CardTitle className="text-2xl text-orange-700">
                {pathname === '/videos' && 'Gestión de Videos'}
                {pathname === '/questions' && 'Gestión de Preguntas'}
                {pathname === '/stats' && 'Estadísticas de Usuarios'}
                {pathname === '/reports' && 'Generación de Reportes'}
                {pathname === '/chat' && 'Chat Interno'}
              </CardTitle>
            </CardHeader>
            <CardContent className="mt-6 h-[calc(100vh-12rem)] overflow-hidden">
              {children}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}

