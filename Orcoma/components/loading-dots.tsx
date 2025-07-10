"use client"

import { memo } from "react"
import { motion } from "framer-motion"

interface LoadingDotsProps {
  size?: "sm" | "md" | "lg"
  color?: "orange" | "blue" | "gray" | "white"
}

const LoadingDotsComponent = ({ size = "md", color = "orange" }: LoadingDotsProps) => {
  const sizeClasses = {
    sm: "w-1 h-1",
    md: "w-2 h-2",
    lg: "w-3 h-3",
  }

  const colorClasses = {
    orange: {
      base: "bg-orange-500",
      light: "bg-orange-300",
    },
    blue: {
      base: "bg-blue-500",
      light: "bg-blue-300",
    },
    gray: {
      base: "bg-gray-500",
      light: "bg-gray-300",
    },
    white: {
      base: "bg-white",
      light: "bg-white/70",
    },
  }

  // Fallback para colores no definidos
  const currentColor = colorClasses[color] || colorClasses.orange

  const dotVariants = {
    initial: { y: 0 },
    animate: { y: -8 },
  }

  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.2,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse" as const,
        repeatDelay: 0.5,
      },
    },
  }

  return (
    <motion.div
      className="flex space-x-1 items-center justify-center"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className={`${sizeClasses[size]} ${currentColor.base} rounded-full`}
          variants={dotVariants}
          transition={{
            duration: 0.6,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.div>
  )
}

export const LoadingDots = memo(LoadingDotsComponent)
export default LoadingDots
