"use client"

import { useState, useEffect } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"

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

const aiToolsItems = [
  { name: "AI Profile Evaluation", href: "/ai-tools/profile-evaluation" },
  { name: "University Finder", href: "/universities" },
  { name: "Course Finder", href: "/courses" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isPrepHubOpen, setIsPrepHubOpen] = useState(false)
  const [isAiToolsOpen, setIsAiToolsOpen] = useState(false)
  const [currentPath, setCurrentPath] = useState("/")

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    
    if (typeof window !== 'undefined') {
        setCurrentPath(window.location.pathname)
    }
    
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // UPDATED: Removed opacity/blur. Background is now fully solid when scrolled.
  const headerClass = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled
      ? "py-2 bg-background border-b border-border shadow-sm" 
      : "py-4 bg-transparent"
  }`

  const isActive = (href: string) => {
    if (href === "/") return currentPath === "/"
    return currentPath.startsWith(href)
  }

  return (
    <>
      {/* ================= HEADER ================= */}
      <header className={headerClass}>
        <div className="container mx-auto px-4 flex items-center justify-between">

          {/* Logo */}
          <a href="/" className="flex items-center gap-3">
            <img
              src="/logo-uconnect.svg"
              alt="Uconnect Logo"
              className={`transition-all duration-300 ${isScrolled ? "h-8" : "h-11"}`}
            />
          </a>

          {/* ================= DESKTOP NAV ================= */}
          <nav className="hidden lg:flex items-center gap-6">

            <NavLink href="/" isActive={isActive("/") && currentPath === "/"}>
              Study Abroad
            </NavLink>

            {/* ---------- Prep Hub Dropdown ---------- */}
            <div className="relative group">
              <div className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition cursor-pointer ${
                isActive("/prep-hub") 
                  ? "text-foreground" 
                  : "text-muted-foreground hover:text-foreground"
              }`}>
                Prep Hub
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </div>

              {/* Dropdown */}
              <div className="absolute left-0 top-full mt-2 w-56 rounded-xl bg-background border border-border shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-2">
                <ul className="space-y-1">
                  {prepHubItems.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="block px-4 py-2 rounded-lg text-sm hover:bg-secondary/50 transition-colors"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <NavLink href="/countries" isActive={isActive("/countries")}>
              Countries
            </NavLink>

            <NavLink href="/universities" isActive={isActive("/universities")}>
              Universities
            </NavLink>

            <NavLink href="/services" isActive={isActive("/services")}>
              Student Services
            </NavLink>

            {/* ---------- AI Tools Dropdown ---------- */}
            <div className="relative group">
              <div className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition cursor-pointer ${
                isActive("/ai-tools") 
                  ? "text-foreground" 
                  : "text-muted-foreground hover:text-foreground"
              }`}>
                AI Tools <span className="text-primary text-xs ml-1">(Free)</span>
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </div>

              {/* Dropdown */}
              <div className="absolute left-0 top-full mt-2 w-56 rounded-xl bg-background border border-border shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-2">
                <ul className="space-y-1">
                  {aiToolsItems.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="block px-4 py-2 rounded-lg text-sm hover:bg-secondary/50 transition-colors"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
             <a
              href="https://wa.me/9346421126?text=Hello%20I%20need%20study%20abroad%20assistance"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-[#25D366] text-white hover:bg-[#1EBE5D] transition-all shadow-sm hover:shadow-md"
              title="Chat on WhatsApp"
            >
              <FaWhatsapp className="w-5 h-5" />
            </a>
            
            <a
              href="/get-started"
              className="px-5 py-2.5 text-sm font-medium bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all shadow-md hover:shadow-lg"
            >
              Get Started
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden p-2 text-foreground" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* ================= MOBILE MENU ================= */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 z-50 animate-in fade-in duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div className="fixed top-0 right-0 bottom-0 w-[85%] max-w-xs bg-background border-l border-border z-50 animate-in slide-in-from-right duration-300 shadow-2xl">
            <div className="flex flex-col h-full">

              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-border/50">
                <div className="flex items-center gap-2">
                  <img
                    src="/logo-uconnect.svg"
                    alt="Uconnect Logo"
                    className="h-7"
                  />
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-secondary rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Menu */}
              <div className="flex-1 overflow-y-auto p-4 space-y-2">

                <MobileLink 
                  href="/" 
                  close={() => setIsMobileMenuOpen(false)}
                  isActive={isActive("/") && currentPath === "/"}
                >
                  Study Abroad
                </MobileLink>

                {/* ---------- Mobile Prep Hub Accordion ---------- */}
                <div>
                    <button
                    onClick={() => setIsPrepHubOpen(!isPrepHubOpen)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-all ${
                        isActive("/prep-hub")
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-secondary text-foreground"
                    }`}
                    >
                    Prep Hub
                    <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${isPrepHubOpen ? "rotate-180" : ""}`}
                    />
                    </button>

                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isPrepHubOpen ? "max-h-96 opacity-100 mt-1" : "max-h-0 opacity-0"}`}>
                        <div className="pl-4 space-y-1 border-l-2 border-border ml-4 my-1">
                            {prepHubItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block py-2.5 px-4 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
                            >
                                {item.name}
                            </a>
                            ))}
                        </div>
                    </div>
                </div>

                <MobileLink 
                  href="/countries" 
                  close={() => setIsMobileMenuOpen(false)}
                  isActive={isActive("/countries")}
                >
                  Countries
                </MobileLink>

                <MobileLink 
                  href="/universities" 
                  close={() => setIsMobileMenuOpen(false)}
                  isActive={isActive("/universities")}
                >
                  Universities
                </MobileLink>

                <MobileLink 
                  href="/services" 
                  close={() => setIsMobileMenuOpen(false)}
                  isActive={isActive("/services")}
                >
                  Student Services
                </MobileLink>

                {/* ---------- Mobile AI Tools Accordion ---------- */}
                <div>
                    <button
                    onClick={() => setIsAiToolsOpen(!isAiToolsOpen)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-all ${
                        isActive("/ai-tools")
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-secondary text-foreground"
                    }`}
                    >
                    <span>AI Tools <span className="text-xs text-primary font-normal ml-1">(Free)</span></span>
                    <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${isAiToolsOpen ? "rotate-180" : ""}`}
                    />
                    </button>

                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isAiToolsOpen ? "max-h-48 opacity-100 mt-1" : "max-h-0 opacity-0"}`}>
                        <div className="pl-4 space-y-1 border-l-2 border-border ml-4 my-1">
                            {aiToolsItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block py-2.5 px-4 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
                            >
                                {item.name}
                            </a>
                            ))}
                        </div>
                    </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-5 border-t border-border/50 bg-secondary/20 space-y-3">
                <a
                  href="/get-started"
                  className="block w-full px-4 py-3.5 text-center font-bold bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition shadow-lg"
                >
                  Get Started
                </a>
                 <a
                  href="https://wa.me/9346421126?text=Hello%20I%20need%20study%20abroad%20assistance"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3.5 font-medium bg-[#25D366] text-white rounded-xl hover:bg-[#1EBE5D] transition shadow-sm"
                >
                  <FaWhatsapp className="w-5 h-5" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

/* ---------------- HELPERS ---------------- */

function NavLink({ href, children, isActive }: { href: string, children: React.ReactNode, isActive: boolean }) {
  return (
    <a
      href={href}
      className={`relative text-sm font-medium transition-colors duration-200 ${
        isActive 
          ? "text-primary font-semibold" 
          : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
      <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-primary rounded-full transition-all duration-300 ${
        isActive ? "w-full" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
      }`} />
    </a>
  )
}

function MobileLink({ href, children, close, isActive }: { href: string, children: React.ReactNode, close: () => void, isActive: boolean }) {
  return (
    <a
      href={href}
      onClick={close}
      className={`block px-4 py-3 rounded-xl font-medium transition-all ${
        isActive 
          ? "bg-primary/10 text-primary" 
          : "text-foreground hover:bg-secondary"
      }`}
    >
      {children}
    </a>
  )
}