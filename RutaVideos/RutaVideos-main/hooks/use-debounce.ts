"use client"

import { useState, useEffect } from "react"

/**
 * Hook personalizado para debounce de valores
 * Evita múltiples llamadas a funciones durante la entrada del usuario
 *
 * @param value El valor a debouncer
 * @param delay El tiempo de espera en ms
 * @returns El valor debounced
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    // Actualizar el valor debounced después del tiempo de espera
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Cancelar el timeout si el valor cambia o el componente se desmonta
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
