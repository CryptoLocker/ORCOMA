'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'


export default function FormularioLoginRegistro() {
  // Estado para controlar si se muestra el formulario de inicio de sesión o de registro
  const [esLogin, setEsLogin] = useState(true)

  // Función para cambiar entre los formularios de inicio de sesión y registro
  const cambiarFormulario = () => setEsLogin(!esLogin)

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="relative w-[800px] h-[500px] bg-white shadow-lg overflow-hidden rounded-lg">
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
              className="w-full p-3 border border-gray-300 rounded-md outline-none text-base transition-all focus:border-orange-500"
            />
            <i className="bx bxs-user absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <div className="relative w-full mb-5">
            <input
              type="password"
              required
              placeholder="Contraseña"
              className="w-full p-3 border border-gray-300 rounded-md outline-none text-base transition-all focus:border-orange-500"
            />
            <i className="bx bxs-lock-alt absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <button className="w-full py-3 bg-orange-500 text-white rounded-md cursor-pointer text-base transition-all hover:bg-orange-600">
            Iniciar Sesión
          </button>
          <div className="mt-5 text-center text-gray-600">
            ¿No tienes una cuenta?{' '}
            <span className="text-orange-500 font-bold cursor-pointer" onClick={cambiarFormulario}>
              Regístrate
            </span>
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
              className="w-full p-3 border border-gray-300 rounded-md outline-none text-base transition-all focus:border-orange-500"
            />
            <i className="bx bxs-user absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <div className="relative w-full mb-5">
            <input
              type="email"
              required
              placeholder="Correo electrónico"
              className="w-full p-3 border border-gray-300 rounded-md outline-none text-base transition-all focus:border-orange-500"
            />
            <i className="bx bxs-envelope absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <div className="relative w-full mb-5">
            <input
              type="password"
              required
              placeholder="Contraseña"
              className="w-full p-3 border border-gray-300 rounded-md outline-none text-base transition-all focus:border-orange-500"
            />
            <i className="bx bxs-lock-alt absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <button className="w-full py-3 bg-orange-500 text-white rounded-md cursor-pointer text-base transition-all hover:bg-orange-600">
            Registrarse
          </button>
          <div className="mt-5 text-center text-gray-600">
            ¿Ya tienes una cuenta?{' '}
            <span className="text-orange-500 font-bold cursor-pointer" onClick={cambiarFormulario}>
              Inicia Sesión
            </span>
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
          <p className="mt-4"></p>
        </motion.div>
      </div>
    </div>
  )
}