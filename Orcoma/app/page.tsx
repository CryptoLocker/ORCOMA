"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import dynamic from "next/dynamic"

// Carga diferida del componente de carga
const FullScreenLoading = dynamic(() => import("@/components/full-screen-loading"), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
    </div>
  ),
  ssr: false,
})

export default function HomePage() {
  const { user, isLoading, isInitializing } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isInitializing && !isLoading) {
      if (user) {
        // Redirect based on user role
        if (user.role === "admin") {
          router.push("/admin")
        } else {
          router.push("/watch")
        }
      } else {
        router.push("/login")
      }
    }
  }, [user, isLoading, isInitializing, router])

  if (isInitializing) {
    return <FullScreenLoading message="Inicializando sistema ORCOMA..." />
  }

  return <FullScreenLoading message="Redirigiendo al dashboard..." />
}
