import type { LucideIcon } from "lucide-react"

export interface FormConfig {
  id: string
  title: string
  description: string
  code?: string
  version?: string
  date?: string
  icon?: LucideIcon | null
}

export interface FormData {
  [key: string]: any
}
