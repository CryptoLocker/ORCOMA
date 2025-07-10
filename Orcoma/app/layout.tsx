import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/lib/auth-context"
import { Toaster } from "react-hot-toast"
import { toastConfig } from "@/lib/toast"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ORCOMA S.A.S - Sistema de Gestión",
  description:
    "Orlando Contreras Mantilla - Ingenieros Civiles S.A.S. - Soluciones con Calidad, Seriedad y Cumplimiento",
  keywords: ["ORCOMA", "Ingenieros Civiles", "Orlando Contreras Mantilla", "Construcción", "Ingeniería"],
  authors: [{ name: "ORCOMA S.A.S" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#f97316",
  colorScheme: "light",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" style={{ colorScheme: "light" }}>
      <head>
        <meta name="color-scheme" content="light" />
        <style
          dangerouslySetInnerHTML={{
            __html: `
            :root { color-scheme: light !important; }
            * { color-scheme: light !important; }
            html { color-scheme: light !important; }
            body { color-scheme: light !important; background-color: #ffffff !important; }
          `,
          }}
        />
      </head>
      <body className={inter.className} style={{ colorScheme: "light" }}>
        <AuthProvider>
          {children}
          <Toaster
            position={toastConfig.position}
            reverseOrder={toastConfig.reverseOrder}
            gutter={toastConfig.gutter}
            containerClassName={toastConfig.containerClassName}
            containerStyle={toastConfig.containerStyle}
            toastOptions={toastConfig.toastOptions}
          />
        </AuthProvider>
      </body>
    </html>
  )
}
