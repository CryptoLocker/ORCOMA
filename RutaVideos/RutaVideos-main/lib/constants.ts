/**
 * Constantes utilizadas en la aplicación
 */

// Tiempo de bloqueo para evaluación en minutos
export const EVALUATION_LOCK_MINUTES = 30

// Tamaño de página para paginación
export const PAGE_SIZE = 8

// Tiempo de debounce para búsqueda en ms
export const SEARCH_DEBOUNCE_TIME = 500

// Duración de animaciones en ms
export const ANIMATION_DURATION = 300

// URL base de la API (para producción)
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"
