"use client"

import { memo } from "react"
import { motion } from "framer-motion"
import { LoadingDots } from "./loading-dots"
import Image from "next/image"

interface FullScreenLoadingProps {
  message?: string
  showLogo?: boolean
  variant?: "default" | "login" | "dashboard"
}

function FullScreenLoadingComponent({
  message = "Cargando...",
  showLogo = true,
  variant = "default",
}: FullScreenLoadingProps) {
  const getBackgroundClass = () => {
    switch (variant) {
      case "login":
        return "bg-gradient-to-br from-orange-50 via-white to-orange-100"
      case "dashboard":
        return "bg-gradient-to-br from-gray-50 to-gray-100"
      default:
        return "bg-gradient-to-br from-orange-50 via-white to-orange-100"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 ${getBackgroundClass()} flex items-center justify-center z-50 overflow-hidden`}
    >
      {/* Background decorativo similar al login */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-orange-200/30 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-orange-300/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-orange-100/40 to-transparent rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 text-center">
        {showLogo && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <div className="relative">
              {/* Contenedor glassmorphism para el logo */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/50 mx-auto inline-block"
              >
                <Image
                  src="/logo-orcoma-new.webp"
                  alt="Orlando Contreras Mantilla - Ingenieros Civiles S.A.S."
                  width={350}
                  height={100}
                  className="mx-auto filter drop-shadow-lg"
                  priority
                  style={{
                    filter: "drop-shadow(0 8px 16px rgba(0, 0, 0, 0.15))",
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="space-y-6"
        >
          {/* Eslogan corporativo */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-gray-700 text-sm font-semibold tracking-wide uppercase bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent mb-8"
          >
            Soluciones con Calidad, Seriedad y Cumplimiento
          </motion.p>

          {/* Loading dots */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 1 }}
          >
            <LoadingDots size="lg" color="orange" />
          </motion.div>

          {/* Mensaje de carga */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="text-gray-600 text-lg font-medium"
          >
            {message}
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  )
}

// Memoizamos el componente para evitar re-renders innecesarios
export const FullScreenLoading = memo(FullScreenLoadingComponent)

export default FullScreenLoading
