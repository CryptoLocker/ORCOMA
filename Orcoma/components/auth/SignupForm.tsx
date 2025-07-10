"use client"

import type React from "react"
import { motion } from "framer-motion"
import AnimatedInput from "./AnimatedInput"
import GradientButton from "./GradientButton"

interface SignupFormProps {
  username: string
  setUsername: (username: string) => void
  email: string
  setEmail: (email: string) => void
  password: string
  setPassword: (password: string) => void
  handleSubmit: (e: React.FormEvent) => void
  error: string
}

const SignupForm: React.FC<SignupFormProps> = ({
  username,
  setUsername,
  email,
  setEmail,
  password,
  setPassword,
  handleSubmit,
  error,
}) => {
  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <AnimatedInput
        type="text"
        placeholder="Nombre de usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        icon="user"
        required
      />
      <AnimatedInput
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        icon="user"
        required
      />
      <AnimatedInput
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        icon="lock"
        required
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <GradientButton type="submit">Registrarse</GradientButton>
    </motion.form>
  )
}

export default SignupForm
