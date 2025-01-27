import { motion } from "framer-motion"

export default function CompanyName({ isSuccess }: { isSuccess: boolean }) {
  return (
    <motion.h1
      className="text-4xl font-bold text-gray-800 relative"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      ORCOMA S.A.S
      <motion.div
        className="absolute bottom-0 left-0 w-full h-1 bg-orange-500"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-300 to-transparent"
        initial={{ x: "-100%", opacity: 0 }}
        animate={isSuccess ? { x: "100%", opacity: 1 } : { x: "-100%", opacity: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
    </motion.h1>
  )
}

