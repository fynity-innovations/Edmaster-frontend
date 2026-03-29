import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import ConditionalLayout from "@/components/layout/conditional-layout"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "StudyGlobal - Your Gateway to International Education",
  description: "Discover world-class universities, courses, and study abroad opportunities with AI-powered guidance.",
  icons: {
    icon: "/edmaster_logo_copy.jpeg",
  },
  keywords: ["study abroad", "international education", "universities", "courses", "student visa"],
  generator: 'v0.app'
}

// export const viewport: Viewport = {
//   themeColor: "#4F46E5",
//   width: "device-width",
//   initialScale: 1,
// }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <ConditionalLayout>{children}</ConditionalLayout>
        <Analytics />
      </body>
    </html>
  )
}
