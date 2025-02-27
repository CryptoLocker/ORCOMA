"use client";
import React from 'react';
import { motion } from 'framer-motion';
import type { ButtonHTMLAttributes } from 'react';

export default function GradientButton({ children, className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <motion.button
      {...(props as {})}
      className="relative w-full bg-gradient-to-r from-orange-400 to-orange-600 text-white py-3 rounded-full font-semibold mt-6 overflow-hidden"
      whileHover={{ 
        scale: 1.05, 
        backgroundImage: "linear-gradient(to right, #f97316, #ea580c)" 
      }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
      
      {/* Capa adicional para efecto de hover suave */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-700 opacity-0"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
}
