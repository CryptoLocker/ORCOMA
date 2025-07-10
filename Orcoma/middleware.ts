import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Si está en modo desarrollo y la autenticación está deshabilitada, permitir todo
  if (process.env.NEXT_PUBLIC_DISABLE_AUTH_DEV === "true") {
    return NextResponse.next()
  }

  const { pathname } = request.nextUrl

  // Rutas que NO requieren autenticación
  const publicPaths = ["/login"]
  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path))

  // Si es una ruta pública, permitir acceso
  if (isPublicPath) {
    return NextResponse.next()
  }

  // Rutas solo para administradores
  const adminOnlyPaths = ["/admin", "/stats", "/videos"]
  const isAdminOnlyPath = adminOnlyPaths.some((path) => pathname.startsWith(path))

  // Rutas para usuarios regulares
  const userPaths = ["/watch"]
  const isUserPath = userPaths.some((path) => pathname.startsWith(path))

  if (isAdminOnlyPath || isUserPath) {
    const token = request.cookies.get("orcoma_auth")

    if (!token) {
      console.log("No se encontró token, redirigiendo al login")
      return NextResponse.redirect(new URL("/login", request.url))
    }

    // Si un usuario regular intenta acceder a rutas de admin, redirigir a videos
    if (isAdminOnlyPath) {
      // Aquí necesitaríamos verificar el rol del usuario desde el token/cookie
      // Por simplicidad, redirigimos a /watch si no es admin
      // En una implementación real, decodificarías el token para verificar el rol
      const userData = request.cookies.get("orcoma_user")
      if (userData) {
        try {
          // En una implementación real, verificarías el rol aquí
          // Por ahora, asumimos que si accede a rutas admin sin ser admin, lo redirigimos
          return NextResponse.redirect(new URL("/watch", request.url))
        } catch (error) {
          return NextResponse.redirect(new URL("/login", request.url))
        }
      }
    }
  }

  // Redirigir root basado en autenticación
  if (pathname === "/") {
    const token = request.cookies.get("orcoma_auth")
    if (token) {
      // Redirigir a videos por defecto (para usuarios regulares)
      return NextResponse.redirect(new URL("/watch", request.url))
    } else {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|logo-orcoma.png|placeholder.svg).*)",
  ],
}
