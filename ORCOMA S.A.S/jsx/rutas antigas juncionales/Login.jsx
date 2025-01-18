'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { User, Lock, Mail } from 'lucide-react'

export default function FormularioLoginRegistro() {
  const [esLogin, setEsLogin] = useState(true)

  const cambiarFormulario = () => setEsLogin(!esLogin)

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="relative w-full max-w-[800px] h-[500px] bg-white shadow-lg overflow-hidden rounded-lg">
        {/* Barra superior con el logo */}
        <div className="absolute top-0 left-0 w-full h-20 bg-white z-10 flex items-center justify-between px-6">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download-qi8Pn7QGfpDG0MC1hhcfv0h1UjI3sc.jpeg"
            alt="Logo Orlando Contreras Mantilla Ingenieros Civiles S.A.S"
            width={200}
            height={60}
            className="object-contain"
          />
        </div>

        {/* Formulario de inicio de sesión */}
        <motion.div
          className="absolute top-20 left-0 w-1/2 h-[calc(100%-5rem)] bg-white flex flex-col justify-center px-10"
          initial={{ opacity: 1, zIndex: 2 }}
          animate={{ opacity: esLogin ? 1 : 0, zIndex: esLogin ? 2 : 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl mb-8 text-orange-500">Iniciar Sesión</h2>
          <div className="relative w-full mb-5">
            <input
              type="text"
              required
              placeholder="Nombre de usuario"
              className="w-full p-3 pl-10 border border-gray-300 rounded-md outline-none text-base transition-all focus:border-orange-500"
              aria-label="Nombre de usuario"
            />
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
          <div className="relative w-full mb-5">
            <input
              type="password"
              required
              placeholder="Contraseña"
              className="w-full p-3 pl-10 border border-gray-300 rounded-md outline-none text-base transition-all focus:border-orange-500"
              aria-label="Contraseña"
            />
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
          <button className="w-full py-3 bg-orange-500 text-white rounded-md cursor-pointer text-base transition-all hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50">
            Iniciar Sesión
          </button>
          <div className="mt-5 text-center text-gray-600">
            ¿No tienes una cuenta?{' '}
            <button 
              className="text-orange-500 font-bold cursor-pointer focus:outline-none focus:underline" 
              onClick={cambiarFormulario}
            >
              Regístrate
            </button>
          </div>
        </motion.div>

        {/* Formulario de registro */}
        <motion.div
          className="absolute top-20 right-0 w-1/2 h-[calc(100%-5rem)] bg-white flex flex-col justify-center px-10"
          initial={{ opacity: 0, zIndex: 1 }}
          animate={{ opacity: esLogin ? 0 : 1, zIndex: esLogin ? 1 : 2 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl mb-8 text-orange-500">Registrarse</h2>
          <div className="relative w-full mb-5">
            <input
              type="text"
              required
              placeholder="Nombre de usuario"
              className="w-full p-3 pl-10 border border-gray-300 rounded-md outline-none text-base transition-all focus:border-orange-500"
              aria-label="Nombre de usuario para registro"
            />
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
          <div className="relative w-full mb-5">
            <input
              type="email"
              required
              placeholder="Correo electrónico"
              className="w-full p-3 pl-10 border border-gray-300 rounded-md outline-none text-base transition-all focus:border-orange-500"
              aria-label="Correo electrónico"
            />
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
          <div className="relative w-full mb-5">
            <input
              type="password"
              required
              placeholder="Contraseña"
              className="w-full p-3 pl-10 border border-gray-300 rounded-md outline-none text-base transition-all focus:border-orange-500"
              aria-label="Contraseña para registro"
            />
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
          <button className="w-full py-3 bg-orange-500 text-white rounded-md cursor-pointer text-base transition-all hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50">
            Registrarse
          </button>
          <div className="mt-5 text-center text-gray-600">
            ¿Ya tienes una cuenta?{' '}
            <button 
              className="text-orange-500 font-bold cursor-pointer focus:outline-none focus:underline" 
              onClick={cambiarFormulario}
            >
              Inicia Sesión
            </button>
          </div>
        </motion.div>

        {/* Panel de información */}
        <motion.div
          className="absolute top-20 right-0 w-1/2 h-[calc(100%-5rem)] bg-orange-500 flex flex-col justify-center items-center px-10 text-white text-center"
          initial={{ x: '0%' }}
          animate={{ x: esLogin ? '0%' : '-100%' }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl mb-4">¡BIENVENIDO DE NUEVO!</h2>
          <p className="text-xl mb-4 font-semibold">SOLUCIONES CON CALIDAD, SERIEDAD Y CUMPLIMENTO</p>
        </motion.div>
      </div>
    </div>
  )
}

