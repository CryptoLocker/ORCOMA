"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { User, Lock, Mail, CheckCircle } from "lucide-react"
import AnimatedInput from "./components/AnimatedInput"
import GradientButton from "./components/GradientButton"
import CompanyName from "./components/CompanyName"
// import { supabase } from '../lib/supabase-client'

export default function LoginSignupPage() {
  const [activeTab, setActiveTab] = useState("login")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Supabase authentication logic (commented out)
    // try {
    //   if (activeTab === 'login') {
    //     const { data, error } = await supabase.auth.signInWithPassword({
    //       email,
    //       password,
    //     })
    //     if (error) throw error
    //   } else {
    //     const { data, error } = await supabase.auth.signUp({
    //       email,
    //       password,
    //       options: {
    //         data: {
    //           username,
    //         },
    //       },
    //     })
    //     if (error) throw error
    //   }
    //   setIsSuccess(true)
    // } catch (error) {
    //   console.error('Error:', error)
    //   setIsSuccess(false)
    // }

    // Simulating form submission (remove this when enabling Supabase)
    setIsSuccess(true)
    setTimeout(() => setIsSuccess(false), 3000)

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
              />
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

function TabButton({ children, active, onClick }) {
  return (
    <button
      className={`flex-1 py-4 text-center font-semibold transition-colors duration-300 ${
        active ? "text-orange-500 border-b-2 border-orange-500" : "text-gray-500 hover:text-orange-500"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

function LoginForm({ email, setEmail, password, setPassword, handleSubmit }) {
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
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <AnimatedInput
        icon={<Lock className="text-gray-400" />}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <GradientButton type="submit">Log In</GradientButton>
    </motion.form>
  )
}

function SignupForm({ username, setUsername, email, setEmail, password, setPassword, handleSubmit }) {
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
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <AnimatedInput
        icon={<Mail className="text-gray-400" />}
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <AnimatedInput
        icon={<Lock className="text-gray-400" />}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <GradientButton type="submit">Sign Up</GradientButton>
    </motion.form>
  )
}

function SuccessNotification({ message }) {
  return (
    <motion.div
      className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg flex items-center"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 50, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="mr-2"
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotate: 360 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <CheckCircle className="text-white" size={24} />
      </motion.div>
      <span className="font-semibold">{message}</span>
    </motion.div>
  )
}

