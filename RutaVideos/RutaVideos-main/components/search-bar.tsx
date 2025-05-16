"use client"

import type React from "react"

import { useState, memo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface SearchBarProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  handleSearch: (e: React.FormEvent) => void
}

/**
 * Componente de barra de búsqueda
 * Optimizado con memo para evitar re-renderizados innecesarios
 */
export const SearchBar = memo(function SearchBar({ searchQuery, setSearchQuery, handleSearch }: SearchBarProps) {
  const [isSearchVisible, setIsSearchVisible] = useState(false)

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible)
    if (!isSearchVisible) {
      // Dar tiempo para que la animación termine antes de enfocar
      setTimeout(() => {
        const searchInput = document.getElementById("search-input")
        if (searchInput) {
          searchInput.focus()
        }
      }, 300)
    }
  }

  return (
    <div className="relative">
      <motion.button
        onClick={toggleSearch}
        className="text-orange-500 hover:text-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 rounded-full p-1"
        aria-label="Buscar"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Search className="h-5 w-5" />
      </motion.button>

      <AnimatePresence>
        {isSearchVisible && (
          <motion.form
            onSubmit={handleSearch}
            className="absolute right-0 top-10 z-10"
            initial={{ opacity: 0, width: 0, y: -10 }}
            animate={{ opacity: 1, width: "auto", y: 0 }}
            exit={{ opacity: 0, width: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Input
              id="search-input"
              type="search"
              placeholder="Buscar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 border border-orange-200 bg-white focus:ring-orange-500 focus:border-orange-500"
              aria-label="Buscar videos"
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  setIsSearchVisible(false)
                }
              }}
              onBlur={() => {
                if (searchQuery === "") {
                  setIsSearchVisible(false)
                }
              }}
            />
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
})
