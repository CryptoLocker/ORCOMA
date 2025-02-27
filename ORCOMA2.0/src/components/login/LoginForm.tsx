"use client"

import React from "react"
import { motion } from 'framer-motion'
import { Mail, Lock } from "lucide-react"
import AnimatedInput from "./AnimatedInput"
import GradientButton from "./GradientButton"


interface LoginFormProps extends React.ComponentPropsWithoutRef<'form'> {

  email: string;

  setEmail: (email: string) => void;

  password: string;

  setPassword: (password: string) => void;

  handleSubmit: (e: React.FormEvent) => Promise<void>;

}


// Formulario de inicio de sesión
export default function LoginForm({ email, setEmail, password, setPassword, handleSubmit }: LoginFormProps) {
  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 20, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
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
      <GradientButton type="submit">Iniciar Sesión</GradientButton>
    </motion.form>
  )
}

