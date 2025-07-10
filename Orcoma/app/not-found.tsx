"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Home, ArrowLeft, HelpCircle, Mail } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-orange-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Logo Container */}
        <Card className="mb-8 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardContent className="p-8">
            <div className="flex justify-center mb-6">
              <div className="relative w-24 h-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Image
                  src="/logo-orcoma.png"
                  alt="ORCOMA Logo"
                  width={48}
                  height={48}
                  className="filter brightness-0 invert"
                />
              </div>
            </div>

            {/* 404 Display */}
            <div className="mb-6">
              <h1 className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600 mb-2">
                404
              </h1>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Página No Encontrada</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Lo sentimos, la página que estás buscando no existe o ha sido movida.
              </p>
            </div>

            {/* Company Slogan */}
            <div className="mb-8 p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border-l-4 border-orange-500">
              <p className="text-orange-800 font-medium italic">
                "Optimizando la Gestión de Riesgos y Cumplimiento Organizacional con Tecnología Avanzada"
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3">
                <Link href="/">
                  <Home className="w-4 h-4 mr-2" />
                  Ir al Inicio
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="border-orange-300 text-orange-700 hover:bg-orange-50 px-6 py-3 bg-transparent"
              >
                <Link href="/login">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver al Login
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Help Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
          <Card className="bg-white/60 backdrop-blur-sm border-0 hover:bg-white/80 transition-all duration-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-orange-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-gray-800">Centro de Ayuda</h3>
                  <p className="text-sm text-gray-600">Encuentra respuestas</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-0 hover:bg-white/80 transition-all duration-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-orange-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-gray-800">Contacto</h3>
                  <p className="text-sm text-gray-600">Soporte técnico</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">© 2024 ORCOMA. Todos los derechos reservados.</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}
