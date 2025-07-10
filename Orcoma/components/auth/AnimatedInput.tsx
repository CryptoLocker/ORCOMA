"use client"

import type React from "react"
import { motion } from "framer-motion"
import { User, Lock } from "lucide-react"

interface AnimatedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: "user" | "lock"
}

const AnimatedInput: React.FC<AnimatedInputProps> = ({ icon, ...props }) => {
  const IconComponent = icon === "user" ? User : icon === "lock" ? Lock : null

  return (
    <div className="relative">
      {IconComponent && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10"
        >
          <IconComponent className="h-5 w-5 text-gray-400 transition-colors duration-200" />
        </motion.div>
      )}
      <motion.input
        whileFocus={{
          scale: 1.02,
          boxShadow: "0 0 0 3px rgba(249, 115, 22, 0.1)",
        }}
        transition={{ duration: 0.2 }}
        className={`w-full ${IconComponent ? "pl-12" : "pl-4"} pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-white text-gray-900 placeholder-gray-500`}
        {...props}
      />
    </div>
  )
}

export default AnimatedInput
