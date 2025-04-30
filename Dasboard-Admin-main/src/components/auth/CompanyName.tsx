"use client"

import type React from "react"
import { motion } from "framer-motion"

interface CompanyNameProps {
  isSuccess: boolean
}

const CompanyName: React.FC<CompanyNameProps> = ({ isSuccess }) => {
  return (
    <motion.h1
      className={`text-4xl font-bold ${isSuccess ? "text-green-600" : "text-orange-600"}`}
      animate={{ scale: isSuccess ? 1.1 : 1 }}
      transition={{ duration: 0.3 }}
    >
      ORCOMA S.A.S
    </motion.h1>
  )
}

export default CompanyName
