"use client"

import type React from "react"
import { useEffect, memo } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import dynamic from "next/dynamic"

// Carga diferida del componente de carga
const FullScreenLoading = dynamic(() => import("./full-screen-loading"), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
    </div>
  ),
  ssr: false,
})

interface ProtectedRouteProps {
  children: React.ReactNode
}

function ProtectedRouteComponent({ children }: ProtectedRouteProps) {
  const { user, isLoading, isInitializing } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isInitializing && !isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, isInitializing, router])

  if (isInitializing) {
    return <FullScreenLoading message="Verificando autenticación..." />
  }

  if (isLoading) {
    return <FullScreenLoading message="Cargando dashboard..." showLogo={false} />
  }

  if (!user) {
    return <FullScreenLoading message="Redirigiendo al login..." showLogo={false} />
  }

  return <>{children}</>
}

// Memoizamos el componente para evitar re-renders innecesarios
export const ProtectedRoute = memo(ProtectedRouteComponent)
