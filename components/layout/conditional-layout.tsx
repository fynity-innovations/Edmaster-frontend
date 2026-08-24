"use client"

import { usePathname } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import Chatbot from "@/components/chatbot"
// TEMPORARY — soft-launch birthday greeting; remove after the event
import BirthdayPopup from "@/components/birthday-popup"

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith("/admin")

  if (isAdmin) {
    return <>{children}</>
  }

  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <Chatbot />
      <BirthdayPopup />
    </>
  )
}
