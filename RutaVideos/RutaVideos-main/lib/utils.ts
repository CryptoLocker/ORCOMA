import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utilidad para combinar clases de Tailwind de manera eficiente
 * @param inputs Clases a combinar
 * @returns Clases combinadas y optimizadas
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formatea un número como una cadena con separadores de miles
 * @param num Número a formatear
 * @returns Cadena formateada
 */
export function formatNumber(num: number): string {
  return num.toLocaleString()
}

/**
 * Formatea una duración en segundos a formato mm:ss
 * @param seconds Duración en segundos
 * @returns Cadena formateada
 */
export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
}
