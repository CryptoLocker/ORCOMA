import "./globals.css"
import type { Metadata } from "next"
import { Inter, Montserrat } from "next/font/google"
import type React from "react"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
})

export const metadata: Metadata = {
  title: "ORCOMA S.A.S Video Player",
  description: "Plataforma de videos educativos para ORCOMA S.A.S",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${inter.variable} ${montserrat.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
