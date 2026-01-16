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
    
    // Set current path
    setCurrentPath(window.location.pathname)
    
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const headerClass = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled
      ? "py-2 glass border-b border-border/50 shadow-sm"
      : "py-4 bg-transparent"
  }`

  const isActive = (href) => {
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
            <div className={`font-bold transition-all duration-300 ${isScrolled ? "text-xl" : "text-2xl"}`}>
              <span className="text-primary">U</span>
              <span className="text-foreground">connect</span>
            </div>
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
              <div className="absolute left-0 top-full mt-3 w-64 rounded-xl bg-background border border-border shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <ul className="p-2">
                  {prepHubItems.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="block px-4 py-2 rounded-lg text-sm hover:bg-secondary transition"
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

            <NavLink href="/courses" isActive={isActive("/courses")}>
              Courses
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
                AI Tools <span className="text-primary">(Free)</span>
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </div>

              {/* Dropdown */}
              <div className="absolute left-0 top-full mt-3 w-64 rounded-xl bg-white border border-gray-200 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <ul className="p-2">
                  {aiToolsItems.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="block px-4 py-2 rounded-lg text-sm hover:bg-gray-100 transition"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex">
            <a
              href="/get-started"
              className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition"
            >
              Get Started
            </a>
          </div>

          <div className="hidden lg:flex">
              <a
                href="https://wa.me/9346421126?text=Hello%20I%20need%20study%20abroad%20assistance"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition bg-[#25D366] text-white hover:bg-[#1EBE5D] shadow-sm hover:shadow-md"
              >
                <FaWhatsapp className="w-4 h-4" />                
              </a>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden p-2" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* ================= MOBILE MENU ================= */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 animate-fade-in"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-background border-l z-50 animate-slide-in-right">
            <div className="flex flex-col h-full">

              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-2">
                  <img
                    src="/logo-uconnect.svg"
                    alt="Uconnect Logo"
                    className="h-8"
                  />
                  <span className="font-bold text-xl">
                    <span className="text-primary">U</span>connect
                  </span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Menu */}
              <div className="p-4 space-y-2 overflow-y-auto">

                <MobileLink 
                  href="/" 
                  close={() => setIsMobileMenuOpen(false)}
                  isActive={isActive("/") && currentPath === "/"}
                >
                  Study Abroad
                </MobileLink>

                {/* ---------- Mobile Prep Hub Accordion ---------- */}
                <button
                  onClick={() => setIsPrepHubOpen(!isPrepHubOpen)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg font-semibold transition ${
                    isActive("/prep-hub")
                      ? "bg-primary/10 text-primary"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  Prep Hub
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${isPrepHubOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isPrepHubOpen && (
                  <div className="pl-4 space-y-1 animate-fade-in">
                    {prepHubItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-2 px-3 rounded-md text-sm hover:bg-secondary"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                )}

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
                  href="/courses" 
                  close={() => setIsMobileMenuOpen(false)}
                  isActive={isActive("/courses")}
                >
                  Courses
                </MobileLink>

                <MobileLink 
                  href="/services" 
                  close={() => setIsMobileMenuOpen(false)}
                  isActive={isActive("/services")}
                >
                  Student Services
                </MobileLink>

                {/* ---------- Mobile AI Tools Accordion ---------- */}
                <button
                  onClick={() => setIsAiToolsOpen(!isAiToolsOpen)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg font-semibold transition ${
                    isActive("/ai-tools")
                      ? "bg-primary/10 text-primary"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  AI Tools
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${isAiToolsOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isAiToolsOpen && (
                  <div className="pl-4 space-y-1 animate-fade-in">
                    {aiToolsItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-2 px-3 rounded-md text-sm hover:bg-gray-100"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-auto p-4 border-t">
                <a
                  href="/get-started"
                  className="block w-full px-4 py-3 text-center font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition"
                >
                  Get Started
                </a>
              </div>
              <div className="hidden lg:flex">
              <a
                href="https://wa.me/9346421126?text=Hello%20I%20need%20study%20abroad%20assistance"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition bg-[#25D366] text-white hover:bg-[#1EBE5D] shadow-sm hover:shadow-md"
              >
                <FaWhatsapp className="w-4 h-4" />                
              </a>
          </div>
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-in-right {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
      `}</style>
    </>
  )
}

/* ---------------- HELPERS ---------------- */

function NavLink({ href, children, isActive }) {
  return (
    <a
      href={href}
      className={`relative text-sm font-medium transition group ${
        isActive 
          ? "text-foreground" 
          : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
      <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all ${
        isActive ? "w-full" : "w-0 group-hover:w-full"
      }`} />
    </a>
  )
}

function MobileLink({ href, children, close, isActive }) {
  return (
    <a
      href={href}
      onClick={close}
      className={`block px-4 py-3 rounded-lg text-lg transition ${
        isActive 
          ? "bg-primary/10 text-primary font-semibold" 
          : "hover:bg-secondary"
      }`}
    >
      {children}
    </a>
  )
}