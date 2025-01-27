import { motion } from "framer-motion"
import type { ButtonHTMLAttributes } from "react"

export default function GradientButton({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <motion.button
      {...props}
      className="w-full bg-gradient-to-r from-orange-400 to-orange-600 text-white py-3 rounded-full font-semibold mt-6 transition-all duration-300"
      whileHover={{ scale: 1.05, backgroundImage: "linear-gradient(to right, #f97316, #ea580c)" }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  )
}

