'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Lock, Mail } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { toast } from '@/components/ui/use-toast'

export default function FormularioLoginRegistro() {
  const [esLogin, setEsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const cambiarFormulario = () => {
    setEsLogin(!esLogin)
    setEmail('')
    setPassword('')
    setUsername('')
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      toast({
        title: "Inicio de sesión exitoso",
        description: "Has iniciado sesión correctamente.",
      })
      router.push('/dashboard') // Redirect to dashboard or home page
    } catch (error) {
      toast({
        title: "Error de inicio de sesión",
        description: error instanceof Error ? error.message : "Ha ocurrido un error",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
          },
        },
      })
      if (error) throw error
      toast({
        title: "Registro exitoso",
        description: "Se ha enviado un correo de confirmación a tu dirección de email.",
      })
    } catch (error) {
      toast({
        title: "Error de registro",
        description: error instanceof Error ? error.message : "Ha ocurrido un error",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="relative w-full max-w-[800px] h-[500px] bg-white shadow-lg overflow-hidden rounded-lg">
        {/* Formulario de inicio de sesión */}
        <motion.form
          className="absolute top-0 left-0 w-1/2 h-full bg-white flex flex-col justify-center px-10"
          initial={{ opacity: 1, zIndex: 2 }}
          animate={{ opacity: esLogin ? 1 : 0, zIndex: esLogin ? 2 : 1 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleLogin}
        >
          <h2 className="text-3xl mb-8 text-orange-500">Iniciar Sesión</h2>
          <div className="relative w-full mb-5">
            <Input
              type="email"
              required
              placeholder="Correo electrónico"
              className="pl-10"
              aria-label="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
          <div className="relative w-full mb-5">
            <Input
              type="password"
              required
              placeholder="Contraseña"
              className="pl-10"
              aria-label="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Cargando...' : 'Iniciar Sesión'}
          </Button>
          <div className="mt-5 text-center text-gray-600">
            ¿No tienes una cuenta?{' '}
            <Button 
              variant="link"
              className="text-orange-500 font-bold p-0 h-auto"
              onClick={cambiarFormulario}
            >
              Regístrate
            </Button>
          </div>
        </motion.form>

        {/* Formulario de registro */}
        <motion.form
          className="absolute top-0 right-0 w-1/2 h-full bg-white flex flex-col justify-center px-10"
          initial={{ opacity: 0, zIndex: 1 }}
          animate={{ opacity: esLogin ? 0 : 1, zIndex: esLogin ? 1 : 2 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleRegister}
        >
          <h2 className="text-3xl mb-8 text-orange-500">Registrarse</h2>
          <div className="relative w-full mb-5">
            <Input
              type="text"
              required
              placeholder="Nombre de usuario"
              className="pl-10"
              aria-label="Nombre de usuario para registro"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
          <div className="relative w-full mb-5">
            <Input
              type="email"
              required
              placeholder="Correo electrónico"
              className="pl-10"
              aria-label="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
          <div className="relative w-full mb-5">
            <Input
              type="password"
              required
              placeholder="Contraseña"
              className="pl-10"
              aria-label="Contraseña para registro"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Cargando...' : 'Registrarse'}
          </Button>
          <div className="mt-5 text-center text-gray-600">
            ¿Ya tienes una cuenta?{' '}
            <Button 
              variant="link"
              className="text-orange-500 font-bold p-0 h-auto"
              onClick={cambiarFormulario}
            >
              Inicia Sesión
            </Button>
          </div>
        </motion.form>

        {/* Panel de información */}
        <motion.div
          className="absolute top-0 right-0 w-1/2 h-full bg-orange-500 flex flex-col justify-center items-center px-10 text-white text-center"
          initial={{ x: '0%' }}
          animate={{ x: esLogin ? '0%' : '-100%' }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl mb-4">¡BIENVENIDO!</h2>
          <p className="text-xl mb-4 font-semibold">SOLUCIONES CON CALIDAD, SERIEDAD Y CUMPLIMENTO</p>
          <h3 className="text-2xl font-bold">Orlando Contreras Mantilla Ingenieros Civiles S.A.S</h3>
        </motion.div>
      </div>
    </div>
  )
}

