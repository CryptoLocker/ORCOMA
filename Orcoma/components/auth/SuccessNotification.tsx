"use client"

import type React from "react"
import { motion } from "framer-motion"

interface SuccessNotificationProps {
  message: string
}

const SuccessNotification: React.FC<SuccessNotificationProps> = ({ message }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg"
    >
      {message}
    </motion.div>
  )
}

export default SuccessNotification
