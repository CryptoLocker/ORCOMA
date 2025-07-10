"use client"

import React from "react"
import { useState, useEffect, useCallback, useMemo } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useAuth } from "@/lib/auth-context"
import { Mail, Lock, Eye, EyeOff, AlertCircle, Shield } from "lucide-react"
import Image from "next/image"
import { LoadingDots } from "@/components/loading-dots"
import { FullScreenLoading } from "@/components/full-screen-loading"

// Componente memoizado para el formulario de login
const LoginForm = React.memo(
  ({
    formData,
    handleInputChange,
    handleLogin,
    showPassword,
    setShowPassword,
    isLoading,
    error,
  }: {
    formData: any
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleLogin: (e: React.FormEvent) => void
    showPassword: boolean
    setShowPassword: (show: boolean) => void
    isLoading: boolean
    error: string
  }) => (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleLogin}
      className="space-y-6"
    >
      {/* Email/Username */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">Email o Usuario</label>
        <div className="relative group">
          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 h-5 w-5 transition-colors duration-200" />
          <motion.input
            whileFocus={{
              scale: 1.01,
              boxShadow: "0 0 0 4px rgba(249, 115, 22, 0.1)",
            }}
            transition={{ duration: 0.2 }}
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Ingresa tu email o usuario"
            className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-0 focus:border-orange-500 transition-all duration-300 bg-white text-gray-900 placeholder-gray-400 shadow-sm hover:border-gray-300"
            required
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Password */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">Contraseña</label>
        <div className="relative group">
          <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 h-5 w-5 transition-colors duration-200" />
          <motion.input
            whileFocus={{
              scale: 1.01,
              boxShadow: "0 0 0 4px rgba(249, 115, 22, 0.1)",
            }}
            transition={{ duration: 0.2 }}
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Ingresa tu contraseña"
            className="w-full pl-12 pr-14 py-4 border-2 border-gray-200 rounded-xl focus:ring-0 focus:border-orange-500 transition-all duration-300 bg-white text-gray-900 placeholder-gray-400 shadow-sm hover:border-gray-300"
            required
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-500 transition-colors duration-200 p-1"
            disabled={isLoading}
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Remember me */}
      <div className="flex items-center justify-between">
        <label className="flex items-center cursor-pointer group">
          <input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleInputChange}
            className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded transition-colors duration-200"
            disabled={isLoading}
          />
          <span className="ml-3 text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-200">
            Recordar mi sesión
          </span>
        </label>
      </div>

      {/* Error message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="flex items-center space-x-3 text-red-700 text-sm bg-red-50 p-4 rounded-xl border border-red-200"
        >
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <span className="font-medium">{error}</span>
        </motion.div>
      )}

      {/* Submit button */}
      <motion.button
        whileHover={!isLoading ? { scale: 1.02, y: -2 } : {}}
        whileTap={!isLoading ? { scale: 0.98 } : {}}
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 hover:from-orange-600 hover:via-orange-700 hover:to-orange-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform"
      >
        {isLoading ? (
          <div className="flex items-center justify-center space-x-3">
            <LoadingDots size="sm" color="white" />
            <span>Iniciando sesión...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Iniciar Sesión</span>
          </div>
        )}
      </motion.button>
    </motion.form>
  ),
)

LoginForm.displayName = "LoginForm"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [showLoadingScreen, setShowLoadingScreen] = useState(false)

  const { login, user, isLoading } = useAuth()
  const router = useRouter()

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (user) {
      setShowLoadingScreen(true)
      // Mostrar loading screen por un momento antes de redirigir
      setTimeout(() => {
        router.push("/admin")
      }, 2000)
    }
  }, [user, router])

  // Handler para cambios en inputs
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
    setError("")
  }, [])

  // Handler para login
  const handleLogin = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      setError("")

      if (!formData.email || !formData.password) {
        setError("Por favor, completa todos los campos")
        return
      }

      try {
        const success = await login(formData.email, formData.password)
        if (success) {
          setShowLoadingScreen(true)
        } else {
          setError("Credenciales incorrectas. Prueba: admin@test.com / admin123")
        }
      } catch (error) {
        console.error("Error en login:", error)
        setError("Error al iniciar sesión. Intenta nuevamente.")
      }
    },
    [formData.email, formData.password, login],
  )

  // Memoizar el componente del formulario
  const loginFormComponent = useMemo(
    () => (
      <LoginForm
        formData={formData}
        handleInputChange={handleInputChange}
        handleLogin={handleLogin}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        isLoading={isLoading}
        error={error}
      />
    ),
    [formData, handleInputChange, handleLogin, showPassword, isLoading, error],
  )

  // Mostrar loading screen si el usuario está autenticado o se está autenticando
  if (showLoadingScreen || (user && !showLoadingScreen)) {
    return <FullScreenLoading message="Accediendo al sistema..." variant="login" showLogo={true} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 relative overflow-hidden">
      {/* Background decorativo */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-orange-200/30 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-orange-300/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-orange-100/40 to-transparent rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          {/* Logo y título */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-8"
          >
            {/* Logo container con efecto glassmorphism */}
            <div className="mb-6 relative">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/50"
              >
                <Image
                  src="/logo-orcoma-new.webp"
                  alt="Orlando Contreras Mantilla - Ingenieros Civiles S.A.S."
                  width={400}
                  height={120}
                  className="mx-auto filter drop-shadow-lg transform hover:scale-105 transition-transform duration-300"
                  priority
                  style={{
                    filter: "drop-shadow(0 8px 16px rgba(0, 0, 0, 0.15))",
                  }}
                />
              </motion.div>
            </div>

            {/* Eslogan */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mb-6"
            >
              <p className="text-gray-700 text-sm font-semibold tracking-wide uppercase bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">
                Soluciones con Calidad, Seriedad y Cumplimiento
              </p>
            </motion.div>
          </motion.div>

          {/* Formulario con glassmorphism */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-white/50"
          >
            <div className="p-8">
              {/* Header del formulario */}
              <div className="text-center mb-8">
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="text-3xl font-bold text-gray-800 mb-2"
                >
                  Bienvenido
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="text-gray-600"
                >
                  Accede a tu cuenta para continuar
                </motion.p>
              </div>

              {loginFormComponent}
            </div>
          </motion.div>

          {/* Información de prueba con mejor diseño */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg"
          >
            <div className="text-center">
              <p className="font-semibold text-gray-700 mb-4 flex items-center justify-center space-x-2">
                <Shield className="h-4 w-4 text-orange-500" />
                <span>Usuarios de Prueba</span>
              </p>
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-orange-50 to-orange-100 px-4 py-3 rounded-xl border border-orange-200">
                  <p className="font-mono text-sm text-orange-800">
                    <span className="font-bold">admin@test.com</span> / <span className="font-bold">admin123</span>
                  </p>
                  <p className="text-xs text-orange-600 mt-1">Administrador</p>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-4 py-3 rounded-xl border border-blue-200">
                  <p className="font-mono text-sm text-blue-800">
                    <span className="font-bold">user@orcoma.com</span> / <span className="font-bold">user123</span>
                  </p>
                  <p className="text-xs text-blue-600 mt-1">Usuario Estándar</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Footer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-center text-xs text-gray-500 mt-8"
          >
            © 2024 Orlando Contreras Mantilla - Ingenieros Civiles S.A.S.
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}
