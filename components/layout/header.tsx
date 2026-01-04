"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { slideIn, staggerContainer, fadeInUp } from "@/lib/motion"

/* ---------------- PREP HUB DATA ---------------- */
const prepHubItems = [
  { name: "Spoken English", href: "/prep-hub/spoken-english" },
  { name: "IELTS Coaching", href: "/prep-hub/ielts" },
  { name: "TOEFL Coaching", href: "/prep-hub/toefl" },
  { name: "PTE Coaching", href: "/prep-hub/pte" },
  { name: "Duolingo Coaching", href: "/prep-hub/duolingo" },
  { name: "French Language", href: "/prep-hub/french" },
  { name: "German Language", href: "/prep-hub/german" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isPrepHubOpen, setIsPrepHubOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* ================= HEADER ================= */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "py-2 glass border-b border-border/50 shadow-sm"
            : "py-4 bg-transparent"
        )}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <motion.div
              className={cn("font-bold", isScrolled ? "text-xl" : "text-2xl")}
              whileHover={{ scale: 1.03 }}
            >
              <span className="text-primary">Study</span>
              <span className="text-foreground">Global</span>
            </motion.div>
          </Link>

          {/* ================= DESKTOP NAV ================= */}
          <nav className="hidden lg:flex items-center gap-6">

            <NavLink href="/">Study Abroad</NavLink>

            {/* ---------- Prep Hub (Clickable + Dropdown) ---------- */}
            <div className="relative group">
              <div
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm
                           hover:bg-primary/15 transition"
              >
                Prep Hub
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </div>

              {/* Dropdown */}
              <div
                className="absolute left-0 top-full mt-3 w-64 rounded-xl bg-background
                           border border-border shadow-lg
                           opacity-0 invisible group-hover:opacity-100 group-hover:visible
                           transition-all duration-200"
              >
                <ul className="p-2">
                  {prepHubItems.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="block px-4 py-2 rounded-lg text-sm
                                   hover:bg-secondary transition"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <NavLink href="/countries">Countries</NavLink>
            <NavLink href="/universities">Universities</NavLink>
            <NavLink href="/courses">Courses</NavLink>
            <NavLink href="/services">Student Services</NavLink>
            <NavLink href="/ai-tools">
              AI Tools <span className="text-primary">(Free)</span>
            </NavLink>
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex">
            <Button size="sm" className="bg-primary hover:bg-primary/90" asChild>
              <Link href="/get-started">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden p-2" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </motion.header>

      {/* ================= MOBILE MENU ================= */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.div
              variants={slideIn}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-background border-l z-50"
            >
              <div className="flex flex-col h-full">

                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                  <span className="font-bold text-xl">
                    <span className="text-primary">Study</span>Global
                  </span>
                  <button onClick={() => setIsMobileMenuOpen(false)}>
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Menu */}
                <div className="p-4 space-y-2">

                  <MobileLink href="/" close={() => setIsMobileMenuOpen(false)}>
                    Study Abroad
                  </MobileLink>

                  {/* ---------- Mobile Prep Hub Accordion ---------- */}
                  <button
                    onClick={() => setIsPrepHubOpen(!isPrepHubOpen)}
                    className="w-full flex items-center justify-between px-4 py-3
                               rounded-lg font-semibold bg-primary/10 text-primary"
                  >
                    Prep Hub
                    <ChevronDown
                      className={cn(
                        "w-5 h-5 transition-transform",
                        isPrepHubOpen && "rotate-180"
                      )}
                    />
                  </button>

                  <AnimatePresence>
                    {isPrepHubOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="pl-4 space-y-1"
                      >
                        {prepHubItems.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block py-2 px-3 rounded-md text-sm hover:bg-secondary"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <MobileLink href="/countries" close={() => setIsMobileMenuOpen(false)}>
                    Countries
                  </MobileLink>

                  <MobileLink href="/universities" close={() => setIsMobileMenuOpen(false)}>
                    Universities
                  </MobileLink>

                  <MobileLink href="/courses" close={() => setIsMobileMenuOpen(false)}>
                    Courses
                  </MobileLink>

                  <MobileLink href="/services" close={() => setIsMobileMenuOpen(false)}>
                    Student Services
                  </MobileLink>

                  <MobileLink href="/ai-tools" close={() => setIsMobileMenuOpen(false)}>
                    AI Tools
                  </MobileLink>
                </div>

                <div className="mt-auto p-4 border-t">
                  <Button className="w-full bg-primary" asChild>
                    <Link href="/get-started">Get Started</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

/* ---------------- HELPERS ---------------- */

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition group"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
    </Link>
  )
}

function MobileLink({
  href,
  children,
  close,
}: {
  href: string
  children: React.ReactNode
  close: () => void
}) {
  return (
    <Link
      href={href}
      onClick={close}
      className="block px-4 py-3 rounded-lg text-lg hover:bg-secondary"
    >
      {children}
    </Link>
  )
}
