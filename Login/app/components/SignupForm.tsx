"use client"

import React from "react"
import { motion } from "framer-motion"
import { User, Mail, Lock } from "lucide-react"
import AnimatedInput from "./AnimatedInput"
import GradientButton from "./GradientButton"

interface SignupFormProps {
  username: string
  setUsername: (value: string) => void
  email: string
  setEmail: (value: string) => void
  password: string
  setPassword: (value: string) => void
  handleSubmit: (e: React.FormEvent) => void
  error: string

}


// Formulario de registro
// Signup form
export default function SignupForm({
  username,
  setUsername,
  email,
  setEmail,
  password,
  setPassword,
  handleSubmit,
}: SignupFormProps) {
  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -20, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <AnimatedInput
        icon={<User className="text-gray-400" />}
        type="text"
        label="Nombre de usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <AnimatedInput
        icon={<Mail className="text-gray-400" />}
        type="email"
        label="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <AnimatedInput
        icon={<Lock className="text-gray-400" />}
        type="password"
        label="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <GradientButton type="submit">Registrarse</GradientButton>
    </motion.form>
  )
}

