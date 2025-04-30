"use client"

import type React from "react"
import { motion } from "framer-motion"

interface AnimatedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const AnimatedInput: React.FC<AnimatedInputProps> = (props) => {
  return (
    <motion.input
      whileFocus={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
      {...props}
    />
  )
}

export default AnimatedInput
