"use client"

import type React from "react"
import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import CompanyName from "@/components/auth/CompanyName"
import TabButton from "@/components/auth/TabButton"
import LoginForm from "@/components/auth/LoginForm"
import SignupForm from "@/components/auth/SignupForm"
import SuccessNotification from "@/components/auth/SuccessNotification"

// Componente principal de la página de inicio de sesión y registro
export default function LoginSignupPage() {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  // Maneja el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Simulación de envío de formulario
    setIsSuccess(true)
    setTimeout(() => setIsSuccess(false), 3000)
    // Reiniciar formulario
    setUsername("")
    setEmail("")
    setPassword("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-orange-50 flex flex-col items-center justify-center p-4">
      <CompanyName isSuccess={isSuccess} />

      <div className="bg-white shadow-xl rounded-lg overflow-hidden w-full max-w-md mt-8">
        <div className="flex border-b border-gray-200">
          <TabButton active={activeTab === "login"} onClick={() => setActiveTab("login")}>
            Iniciar Sesión
          </TabButton>
          <TabButton active={activeTab === "signup"} onClick={() => setActiveTab("signup")}>
            Registrarse
          </TabButton>
        </div>

        <div className="p-8">
          <AnimatePresence mode="wait">
            {activeTab === "login" ? (
              <LoginForm
                key="login"
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                handleSubmit={handleSubmit}
              />
            ) : (
              <SignupForm
                key="signup"
                username={username}
                setUsername={setUsername}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                handleSubmit={handleSubmit}
                error=""
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {isSuccess && (
          <SuccessNotification message={activeTab === "login" ? "¡Inicio de sesión exitoso!" : "¡Registro exitoso!"} />
        )}
      </AnimatePresence>
    </div>
  )
}
