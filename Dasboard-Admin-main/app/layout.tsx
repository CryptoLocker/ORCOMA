import "./globals.css"
import { Inter } from "next/font/google"
import Navbar from "@/components/navbar"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "ORCOMA S.A.S - Gestión de Videos",
  description: "Plataforma de gestión de videos para ORCOMA S.A.S",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-white`}>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1 p-4 sm:p-6">{children}</main>
        </div>
      </body>
    </html>
  )
}
