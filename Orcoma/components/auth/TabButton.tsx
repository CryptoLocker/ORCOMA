"use client"

import type React from "react"

interface TabButtonProps {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}

const TabButton: React.FC<TabButtonProps> = ({ active, onClick, children }) => {
  return (
    <button
      className={`flex-1 py-4 text-sm font-medium ${
        active ? "text-orange-600 border-b-2 border-orange-600" : "text-gray-500"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default TabButton
