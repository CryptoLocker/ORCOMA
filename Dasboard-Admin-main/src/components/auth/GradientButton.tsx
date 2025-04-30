"use client"

import type React from "react"
import { motion } from "framer-motion"

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

const GradientButton: React.FC<GradientButtonProps> = ({ children, ...props }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="w-full py-2 px-4 bg-gradient-to-r from-orange-400 to-orange-600 text-white font-bold rounded-md shadow-md"
      {...props}
    >
      {children}
    </motion.button>
  )
}

export default GradientButton
