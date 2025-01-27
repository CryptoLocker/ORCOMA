import { motion } from "framer-motion"
import type { InputHTMLAttributes } from "react"

interface AnimatedInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: React.ReactNode
}

export default function AnimatedInput({ icon, placeholder, ...props }: AnimatedInputProps) {
  return (
    <div className="mb-6 relative">
      <motion.div
        className="absolute left-3 top-1/2 transform -translate-y-1/2"
        initial={{ y: 0 }}
        animate={{ y: props.value ? -28 : 0 }}
        transition={{ duration: 0.2 }}
      >
        {icon}
      </motion.div>
      <motion.input
        {...props}
        placeholder="" // Remove placeholder from input
        className="w-full pl-10 pr-3 py-2 bg-transparent border-b-2 border-gray-300 focus:border-orange-500 transition-all duration-300 outline-none"
        initial={{ scale: 1 }}
        whileFocus={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="absolute left-10 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
        initial={{ y: 0, opacity: 1 }}
        animate={{
          y: props.value ? -30 : 0,
          opacity: 1, // Keep the label visible
        }}
        transition={{ duration: 0.2 }}
      >
        {placeholder}
      </motion.span>
      <motion.div
        className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500"
        initial={{ width: "0%" }}
        whileFocus={{ width: "100%" }}
        transition={{ duration: 0.3 }}
      />
    </div>
  )
}

