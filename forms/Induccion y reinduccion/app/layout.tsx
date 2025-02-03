import "@/styles/globals.css"
import { Inter } from "next/font/google"
import type React from "react" // Import React

// Configuración de la fuente Inter de Google Fonts
const inter = Inter({ subsets: ["latin"] })

// Metadatos de la aplicación
export const metadata = {
  title: "Formulario de Inducción y Riesgos",
  description: "Formulario combinado para inducción, reinducción e identificación de riesgos",
}

// Componente de diseño raíz
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

