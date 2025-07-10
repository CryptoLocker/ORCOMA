"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { showToast } from "@/lib/toast"

interface User {
  id: string
  username: string
  email: string
  role: "admin" | "user"
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Usuarios de prueba
const testUsers = [
  {
    id: "1",
    username: "Admin ORCOMA",
    email: "admin@orcoma.com",
    password: "admin123",
    role: "admin" as const,
  },
  {
    id: "2",
    username: "Usuario ORCOMA",
    email: "user@orcoma.com",
    password: "user123",
    role: "user" as const,
  },
  // Usuarios alternativos
  {
    id: "3",
    username: "Admin Test",
    email: "admin@test.com",
    password: "admin123",
    role: "admin" as const,
  },
  {
    id: "4",
    username: "Admin",
    email: "admin",
    password: "admin1234",
    role: "admin" as const,
  },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Verificar si hay un usuario guardado al cargar
  useEffect(() => {
    const savedUser = localStorage.getItem("orcoma_user")
    const savedToken = document.cookie.includes("orcoma_auth=")

    if (savedUser && savedToken) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error("Error parsing saved user:", error)
        localStorage.removeItem("orcoma_user")
        showToast.error("Error de sesión", "Se ha cerrado la sesión por seguridad")
      }
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    try {
      // Simular delay de red más realista
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Buscar usuario en la lista de prueba
      const foundUser = testUsers.find((u) => (u.email === email || u.username === email) && u.password === password)

      if (foundUser) {
        const userData: User = {
          id: foundUser.id,
          username: foundUser.username,
          email: foundUser.email,
          role: foundUser.role,
        }

        setUser(userData)

        // Guardar en localStorage y cookie
        localStorage.setItem("orcoma_user", JSON.stringify(userData))
        document.cookie = `orcoma_auth=true; path=/; max-age=86400` // 24 horas

        // Toast de bienvenida
        showToast.success(
          `¡Bienvenido, ${foundUser.username}!`,
          `Has iniciado sesión como ${foundUser.role === "admin" ? "Administrador" : "Usuario"}`,
        )

        return true
      }

      // Toast de error para credenciales incorrectas
      showToast.error("Credenciales incorrectas", "Verifica tu email/usuario y contraseña")
      return false
    } catch (error) {
      console.error("Login error:", error)
      showToast.error("Error de conexión", "No se pudo conectar con el servidor. Intenta nuevamente.")
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    const currentUser = user?.username || "Usuario"

    setUser(null)
    localStorage.removeItem("orcoma_user")
    document.cookie = "orcoma_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"

    // Toast de despedida
    showToast.info(`¡Hasta luego, ${currentUser}!`, "Has cerrado sesión correctamente")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
