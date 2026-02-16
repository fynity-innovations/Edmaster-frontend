"use client"

import { useState, useEffect, useRef } from "react"
import { 
  Menu, X, ChevronDown, 
  Globe, School, BookOpen, 
  GraduationCap, LayoutGrid, Sparkles, Home,
  Plane, ShieldCheck, Banknote, Lock, MessageCircle, HeartHandshake
} from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"

/* ---------------- DATA ---------------- */

const exploreItems = [
  { 
    name: "Find Courses", 
    href: "/courses", 
    icon: BookOpen, 
    desc: "Browse programs across disciplines" 
  },
  { 
    name: "Universities", 
    href: "/universities", 
    icon: School, 
    desc: "Explore top global institutions" 
  },
  { 
    name: "Countries", 
    href: "/countries", 
    icon: Globe, 
    desc: "Popular study destinations" 
  },
]

const servicesItems = [
  { 
    name: "International Education Counselling", 
    href: "/services/counselling", 
    icon: MessageCircle 
  },
  { 
    name: "Health Insurance for Students", 
    href: "/services/health-insurance", 
    icon: ShieldCheck 
  },
  { 
    name: "Accommodation Support", 
    href: "/services/accommodation", 
    icon: Home 
  },
  { 
    name: "Pre-departure Orientation", 
    href: "/services/orientation", 
    icon: Plane 
  },
  { 
    name: "Education Loan", 
    href: "/services/loan", 
    icon: Banknote 
  },
  { 
    name: "Block Account For Germany", 
    href: "/services/block-account", 
    icon: Lock 
  },
]

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
  { name: "AI Profile Evaluation", href: "/ai-tools/profile-evaluation", icon: Sparkles },
  { name: "University Finder", href: "/universities", icon: School },
  { name: "Course Finder", href: "/courses", icon: BookOpen },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  // Desktop Dropdown State
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  
  // Mobile Accordion States
  const [mobileState, setMobileState] = useState({
    explore: false,
    services: false, // Added services state
    prephub: false,
    aitools: false
  })
  
  const [currentPath, setCurrentPath] = useState("/")
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    
    // Close dropdowns when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null)
      }
    }

    window.addEventListener("scroll", handleScroll)
    document.addEventListener("mousedown", handleClickOutside)
    
    if (typeof window !== 'undefined') {
        setCurrentPath(window.location.pathname)
    }
    
    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Close dropdowns on route change
  useEffect(() => {
    setActiveDropdown(null)
    setIsMobileMenuOpen(false)
  }, [currentPath])

  const toggleDropdown = (name: string) => {
    setActiveDropdown(prev => prev === name ? null : name)
  }

  const headerClass = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled
      ? "py-3 bg-background/95 backdrop-blur-md border-b border-border shadow-sm" 
      : "py-5 bg-transparent"
  }`

  const isActive = (href: string) => {
    if (href === "/") return currentPath === "/"
    return currentPath.startsWith(href)
  }

  const isParentActive = (items: { href: string }[]) => {
    return items.some(item => isActive(item.href))
  }

  return (
    <>
      {/* ================= HEADER ================= */}
      <header className={headerClass}>
        <div className="container mx-auto px-4 flex items-center justify-between">

          {/* Logo */}
          <a href="/" className="flex items-center gap-3 relative z-10">
            <img
              src="/edmaster_logo.svg"
              alt="Uconnect Logo"
              className={`transition-all duration-300 ${isScrolled ? "h-12" : "h-14"}`}
            />
          </a>

          {/* ================= DESKTOP NAV ================= */}
          <nav ref={navRef} className="hidden lg:flex items-center gap-1">

            {/* 0. Home Link */}
            <NavLink href="/" isActive={isActive("/")}>
              Home
            </NavLink>

            {/* 1. Explore Dropdown */}
            <DesktopDropdown 
              title="Explore" 
              isOpen={activeDropdown === 'explore'}
              onToggle={() => toggleDropdown('explore')}
              icon={<LayoutGrid className="w-4 h-4" />}
              isActive={isParentActive(exploreItems)}
            >
              <div className="w-80 p-2">
                {exploreItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-start gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors group"
                  >
                    <div className="mt-1 p-2.5 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                        {item.name}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1 leading-snug">
                        {item.desc}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </DesktopDropdown>

            {/* 2. Prep Hub Dropdown */}
            <DesktopDropdown 
              title="Prep Hub" 
              isOpen={activeDropdown === 'prephub'}
              onToggle={() => toggleDropdown('prephub')}
              icon={<GraduationCap className="w-4 h-4" />}
              isActive={isActive("/prep-hub")}
            >
              <div className="w-60 p-2">
                <div className="px-3 py-2 mb-2 border-b border-border/50">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Language Coaching</span>
                </div>
                <ul className="space-y-1">
                  {prepHubItems.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium hover:bg-secondary/50 hover:text-primary transition-colors group"
                      >
                        {item.name}
                        <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-xs text-primary">→</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </DesktopDropdown>

            {/* 3. Student Services Dropdown (NEW) */}
            <DesktopDropdown 
              title="Student Services" 
              isOpen={activeDropdown === 'services'}
              onToggle={() => toggleDropdown('services')}
              icon={<HeartHandshake className="w-4 h-4" />}
              isActive={isParentActive(servicesItems)}
            >
               <div className="w-80 p-2">
                {servicesItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors group"
                  >
                     <div className="p-2 rounded-md bg-secondary text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                        <item.icon className="w-4 h-4" />
                     </div>
                     <span className="text-sm font-medium">{item.name}</span>
                  </a>
                ))}
              </div>
            </DesktopDropdown>

            {/* 4. AI Tools Dropdown */}
            <DesktopDropdown 
              title="AI Tools" 
              isOpen={activeDropdown === 'aitools'}
              onToggle={() => toggleDropdown('aitools')}
              icon={<Sparkles className="w-3.5 h-3.5" />}
              isActive={isActive("/ai-tools")}
              badge="Free"
            >
               <div className="w-72 p-2">
                {aiToolsItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors group"
                  >
                     <div className="p-2 rounded-md bg-secondary text-foreground group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                        {item.icon && <item.icon className="w-4 h-4" />}
                     </div>
                     <span className="text-sm font-medium">{item.name}</span>
                  </a>
                ))}
              </div>
            </DesktopDropdown>

          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
             <a
              href="https://wa.me/9346421126"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all duration-300 hover:scale-110"
              title="Chat on WhatsApp"
            >
              <FaWhatsapp className="w-5 h-5" />
            </a>
            
            <a
              href="/get-started"
              className="px-6 py-2.5 text-sm font-semibold bg-primary text-primary-foreground rounded-full hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20"
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
            className="fixed inset-0 bg-black/60 z-50 animate-in fade-in duration-200 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div className="fixed top-0 right-0 bottom-0 w-[85%] max-w-xs bg-background border-l border-border z-50 animate-in slide-in-from-right duration-300 shadow-2xl flex flex-col">
            
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-5 border-b border-border/50">
              <span className="font-bold text-lg">Menu</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-secondary rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">

              <MobileLink href="/" close={() => setIsMobileMenuOpen(false)} isActive={isActive("/") && currentPath === "/"}>
                <div className="flex items-center gap-3">
                    <Home className="w-4 h-4 opacity-70" /> Home
                </div>
              </MobileLink>

              {/* Mobile Explore Accordion */}
              <MobileAccordion 
                title="Explore" 
                isOpen={mobileState.explore} 
                toggle={() => setMobileState(prev => ({...prev, explore: !prev.explore}))}
                isActive={isParentActive(exploreItems)}
                icon={<LayoutGrid className="w-4 h-4" />}
              >
                {exploreItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 py-2.5 px-4 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
                  >
                    <item.icon className="w-4 h-4 opacity-70" />
                    {item.name}
                  </a>
                ))}
              </MobileAccordion>
              
              {/* Mobile Prep Hub Accordion */}
              <MobileAccordion 
                title="Prep Hub" 
                isOpen={mobileState.prephub} 
                toggle={() => setMobileState(prev => ({...prev, prephub: !prev.prephub}))}
                isActive={isActive("/prep-hub")}
                icon={<GraduationCap className="w-4 h-4" />}
              >
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
              </MobileAccordion>

              {/* Mobile Student Services Accordion (NEW) */}
              <MobileAccordion 
                title="Student Services" 
                isOpen={mobileState.services} 
                toggle={() => setMobileState(prev => ({...prev, services: !prev.services}))}
                isActive={isParentActive(servicesItems)}
                icon={<HeartHandshake className="w-4 h-4" />}
              >
                {servicesItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 py-2.5 px-4 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
                  >
                    <item.icon className="w-4 h-4 opacity-70" />
                    {item.name}
                  </a>
                ))}
              </MobileAccordion>

              {/* Mobile AI Tools Accordion */}
              <MobileAccordion 
                title="AI Tools" 
                isOpen={mobileState.aitools} 
                toggle={() => setMobileState(prev => ({...prev, aitools: !prev.aitools}))}
                isActive={isActive("/ai-tools")}
                icon={<Sparkles className="w-4 h-4" />}
                badge="Free"
              >
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
              </MobileAccordion>
            </div>

            {/* Mobile Footer */}
            <div className="p-5 border-t border-border/50 bg-secondary/10 space-y-3">
              <a
                href="/get-started"
                className="block w-full px-4 py-3.5 text-center font-bold bg-primary text-primary-foreground rounded-xl shadow-lg"
              >
                Get Started
              </a>
               <a
                href="https://wa.me/9346421126"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-4 py-3.5 font-medium bg-[#25D366] text-white rounded-xl shadow-sm"
              >
                <FaWhatsapp className="w-5 h-5" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </>
      )}
    </>
  )
}

/* ---------------- COMPONENT HELPERS ---------------- */

// 1. Desktop Simple Link
function NavLink({ href, children, isActive }: { href: string, children: React.ReactNode, isActive: boolean }) {
  return (
    <a
      href={href}
      className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg hover:bg-secondary/50 ${
        isActive ? "text-primary bg-primary/5" : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </a>
  )
}

// 2. Desktop Dropdown
function DesktopDropdown({ 
  title, children, isActive, isOpen, onToggle, icon, badge 
}: { 
  title: string, children: React.ReactNode, isActive: boolean, isOpen: boolean, onToggle: () => void, icon?: React.ReactNode, badge?: string 
}) {
  return (
    <div className="relative">
      <button 
        onClick={onToggle}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium cursor-pointer transition-all duration-200 ${
          isActive || isOpen 
            ? "text-primary bg-primary/5" 
            : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
        }`}
      >
        {icon && <span className={`opacity-70 ${isActive ? "opacity-100" : ""}`}>{icon}</span>}
        {title}
        {badge && <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded ml-1 font-semibold">{badge}</span>}
        <ChevronDown 
          className={`w-3.5 h-3.5 transition-transform duration-300 opacity-50 ${isOpen ? "rotate-180" : ""}`} 
        />
      </button>

      {/* Dropdown Content */}
      <div 
        className={`absolute left-0 top-full pt-3 transition-all duration-200 transform origin-top-left z-50 ${
          isOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
        }`}
      >
        <div className="bg-background border border-border/80 shadow-xl rounded-xl overflow-hidden p-1 ring-1 ring-black/5 backdrop-blur-sm">
          {children}
        </div>
      </div>
    </div>
  )
}

// 3. Mobile Simple Link
function MobileLink({ href, children, close, isActive }: { href: string, children: React.ReactNode, close: () => void, isActive: boolean }) {
  return (
    <a
      href={href}
      onClick={close}
      className={`block px-4 py-3 rounded-xl font-medium transition-all ${
        isActive ? "bg-primary/10 text-primary" : "text-foreground hover:bg-secondary"
      }`}
    >
      {children}
    </a>
  )
}

// 4. Mobile Accordion
function MobileAccordion({ 
  title, children, isOpen, toggle, isActive, icon, badge 
}: { 
  title: string, children: React.ReactNode, isOpen: boolean, toggle: () => void, isActive: boolean, icon?: React.ReactNode, badge?: string 
}) {
  return (
    <div className="overflow-hidden">
      <button
        onClick={toggle}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-all ${
          isActive || isOpen ? "bg-secondary/50 text-foreground" : "text-muted-foreground hover:bg-secondary/30"
        }`}
      >
        <div className="flex items-center gap-2.5">
          {icon}
          <span className={isActive ? "text-primary font-semibold" : ""}>{title}</span>
          {badge && <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded font-bold">{badge}</span>}
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <div className={`transition-all duration-300 ease-in-out ${isOpen ? "max-h-[500px] opacity-100 mt-1" : "max-h-0 opacity-0"}`}>
        <div className="pl-4 border-l-2 border-border ml-4 my-1 space-y-1">
          {children}
        </div>
      </div>
    </div>
  )
}