import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Chatbot } from "@/components/chatbot"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "StudyGlobal - Your Gateway to International Education",
  description: "Discover world-class universities, courses, and study abroad opportunities with AI-powered guidance.",
  keywords: ["study abroad", "international education", "universities", "courses", "student visa"],
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: "#8B1E1E",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Chatbot />
        <Analytics />
      </body>
    </html>
  )
}
