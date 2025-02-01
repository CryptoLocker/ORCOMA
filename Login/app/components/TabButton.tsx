import React from "react"

interface TabButtonProps {
  children: React.ReactNode
  active: boolean
  onClick: () => void
}

// Botón de pestaña para cambiar entre inicio de sesión y registro

export default function TabButton({ children, active, onClick }: TabButtonProps) {
  return (
    <button
      className={`flex-1 py-4 text-center font-semibold transition-colors duration-300 ${
        active ? "text-orange-500 border-b-2 border-orange-500" : "text-gray-500 hover:text-orange-500"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

