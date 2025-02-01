"use client"
import React from "react"
import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"

interface SuccessNotificationProps {
  message: string
}

// Notificación de éxito animada
// Animated success notification
export default function SuccessNotification({ message }: SuccessNotificationProps) {
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

