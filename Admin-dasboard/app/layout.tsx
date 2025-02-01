import "./globals.css"
import { Inter } from "next/font/google"
import Sidebar from "@/components/sidebar"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "ORCOMA S.A.S Admin Dashboard",
  description: "Admin dashboard for ORCOMA S.A.S",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen bg-gray-100">
          <Sidebar />
          <main className="flex-1 overflow-auto p-6 lg:p-8">{children}</main>
        </div>
      </body>
    </html>
  )
}

