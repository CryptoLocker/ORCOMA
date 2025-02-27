"use client"

import React from "react"
import { useState, useEffect, useRef } from "react"
import { AnimatePresence } from "framer-motion"
import CompanyName from "./components/CompanyName"
import TabButton from "./components/TabButton"
import LoginForm from "./components/LoginForm"
import SignupForm from "./components/SignupForm"
import SuccessNotification from "./components/SuccessNotification"

export default function LoginSignupPage() {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")
  const timeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const validateForm = () => {
    if (!email || !password) {
      setError("Please fill in all required fields")
      return false
    }
    if (activeTab === "signup" && !username) {
      setError("Username is required for signup")
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!validateForm()) return

    // Simulated submission
    setIsSuccess(true)
    timeoutRef.current = setTimeout(() => setIsSuccess(false), 3000)

    // Reset form
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
            Login
          </TabButton>
          <TabButton active={activeTab === "signup"} onClick={() => setActiveTab("signup")}>
            Sign Up
          </TabButton>
        </div>

        <div className="p-8">
          <AnimatePresence mode="wait">
            {activeTab === "login" ? (
              <React.Fragment key="login">
                <LoginForm
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  handleSubmit={handleSubmit}
                  
                />
              </React.Fragment>
            ) : (
              <React.Fragment key="signup">
                <SignupForm
                  username={username}
                  setUsername={setUsername}
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  handleSubmit={handleSubmit}
                  error={error}
                />
              </React.Fragment>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {isSuccess && (
          <SuccessNotification message={activeTab === "login" ? "Login successful!" : "Sign up successful!"} />
        )}
      </AnimatePresence>
    </div>
  )
}

