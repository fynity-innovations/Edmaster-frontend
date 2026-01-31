"use client"

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import {
  ArrowRight,
  MapPin,
  Trophy,
  Calendar,
  Wallet,
  CheckCircle2,
  ExternalLink,
  GraduationCap,
  Mail,
  Globe,
  Briefcase,
  Info,
  ChevronDown,
  Star,
  Clock,
  Landmark,
  Plane,
  Building2,
  Users,
  BookOpen,
  Sparkles,
  ArrowUpRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { fadeInUp, staggerContainer } from "@/lib/motion"
import { cn } from "@/lib/utils"

// --- Types ---
interface UniversityContentProps {
  university: any
  courses?: any[]
}

const sections = [
  { id: "overview", label: "Overview" },
  { id: "stats", label: "Key Stats" },
  { id: "admissions", label: "Admissions" },
  { id: "campus", label: "Campus" },
]

export function UniversityContent({ university, courses = [] }: UniversityContentProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const [activeSection, setActiveSection] = useState("overview")
  const [isScrolled, setIsScrolled] = useState(false)

  const { scrollYProgress } = useScroll({ target: heroRef })
  const y = useTransform(scrollYProgress, [0, 1], [0, 100])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 400)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    setActiveSection(id)
    const element = document.getElementById(id)
    if (element) {
      const offset = 120
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset
      window.scrollTo({ top: offsetPosition, behavior: "smooth" })
    }
  }

  if (!university) return null

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 font-sans">
      
      {/* --- TRENDY GRADIENT HERO --- */}
      <div ref={heroRef} className="relative h-[65vh] min-h-[500px] overflow-hidden bg-slate-950 flex items-center">
        {/* Animated Background Mesh */}
        <motion.div style={{ y }} className="absolute inset-0 opacity-60">
           <div className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] bg-blue-600/20 rounded-full blur-[120px]" />
           <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-purple-600/10 rounded-full blur-[100px]" />
           {/* Grid Pattern */}
           <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
        </motion.div>

        <motion.div style={{ opacity }} className="relative container mx-auto px-4 z-10 pt-10">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="max-w-4xl mx-auto text-center">
            {/* Value Badges */}
            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-3 mb-8">
              <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5 backdrop-blur-sm px-4 py-1.5 text-sm uppercase tracking-wide">
                <Trophy className="w-3.5 h-3.5 mr-2" />
                World Rank #{university.rankings?.world}
              </Badge>
              {university.badge && (
                <Badge className="bg-white/10 text-white border-none hover:bg-white/20 transition-colors">
                  {university.badge}
                </Badge>
              )}
            </motion.div>

            {/* Main Headline */}
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6 leading-[1.1] drop-shadow-sm">
              {university.university_name}
            </motion.h1>
            
            {/* Sub-info */}
            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 text-slate-300 text-lg font-medium">
              <span className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-400" /> {university.location}
              </span>
              <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-slate-700" />
              <span className="flex items-center gap-2">
                <Landmark className="w-5 h-5 text-purple-400" /> Est. {university.established || "1900"}
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* --- STICKY NAV --- */}
      <div className={cn(
        "sticky top-0 z-50 transition-all duration-300 border-b border-transparent backdrop-blur-xl",
        isScrolled ? "bg-background/80 border-border py-2 shadow-sm" : "bg-transparent -mt-16 py-4"
      )}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex bg-slate-100 dark:bg-slate-800/50 p-1 rounded-full border border-border/50">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-semibold transition-all",
                  activeSection === section.id 
                    ? "bg-white dark:bg-slate-700 text-foreground shadow-sm" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {section.label}
              </button>
            ))}
          </div>
          
          <AnimatePresence>
            {isScrolled && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <Button size="sm" className="rounded-full px-6 font-bold">Apply Now</Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* --- CONTENT AREA --- */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* MAIN COLUMN (8 cols) */}
          <div className="lg:col-span-8 space-y-16">
            
            {/* 1. OVERVIEW (Introduction) */}
            <section id="overview" className="space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Why {university.university_name}?</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {university.long_description || university.description}
                <br /><br />
                Recognized globally for its research output and high employability rates, {university.university_name} offers a dynamic environment for {university.programs_count}+ academic programs.
              </p>
            </section>

            {/* 2. BENTO GRID STATS (Trendy) */}
            <section id="stats">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[140px]">
                {/* Large Card: Rankings */}
                <div className="md:col-span-2 row-span-2 rounded-3xl bg-card border border-border p-8 flex flex-col justify-between group hover:border-primary/30 transition-all shadow-sm">
                  <div className="flex justify-between items-start">
                    <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-2xl text-yellow-600 dark:text-yellow-400">
                      <Trophy className="w-8 h-8" />
                    </div>
                    <Badge variant="secondary" className="font-mono">RANKING</Badge>
                  </div>
                  <div>
                    <div className="text-5xl font-black text-foreground mb-2">#{university.rankings?.world}</div>
                    <h3 className="text-lg font-bold text-muted-foreground">Global University Ranking</h3>
                    <p className="text-sm text-muted-foreground mt-2">Consistent top-tier performance in research and education quality.</p>
                  </div>
                </div>

                {/* Tall Card: Employability */}
                <div className="md:col-span-1 row-span-2 rounded-3xl bg-blue-600 text-white p-6 flex flex-col justify-between shadow-lg shadow-blue-900/20">
                  <div className="flex justify-between items-start">
                    <Briefcase className="w-8 h-8 opacity-80" />
                    <ArrowUpRight className="w-6 h-6 opacity-60" />
                  </div>
                  <div>
                    <div className="text-4xl font-black mb-1">{university.employability}</div>
                    <div className="text-blue-100 font-medium text-sm">Graduate Employability Rate</div>
                    <div className="mt-4 pt-4 border-t border-white/20 text-xs text-blue-100">
                      Top recruiters include Google, Microsoft, and Deloitte.
                    </div>
                  </div>
                </div>

                {/* Small Card: Tuition */}
                <div className="rounded-3xl bg-card border border-border p-6 flex flex-col justify-center hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <Wallet className="w-5 h-5 text-green-500" />
                    <span className="text-xs font-bold uppercase text-muted-foreground">Avg. Tuition</span>
                  </div>
                  <div className="text-2xl font-bold text-foreground truncate">{university.average_tuition_fees?.split(' ')[0]}</div>
                </div>

                {/* Small Card: Intakes */}
                <div className="rounded-3xl bg-card border border-border p-6 flex flex-col justify-center hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="w-5 h-5 text-purple-500" />
                    <span className="text-xs font-bold uppercase text-muted-foreground">Next Intake</span>
                  </div>
                  <div className="text-2xl font-bold text-foreground">{university.intakes?.[0]}</div>
                </div>

                {/* Wide Card: Programs */}
                <div className="md:col-span-2 rounded-3xl bg-card border border-border p-6 flex items-center justify-between hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-secondary rounded-2xl">
                      <BookOpen className="w-6 h-6 text-foreground" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">{university.programs_count}+ Programs</div>
                      <div className="text-sm text-muted-foreground">Engineering, Business, Arts & Sciences</div>
                    </div>
                  </div>
                  <Button variant="ghost" className="hidden sm:flex gap-2">
                    View Catalog <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </section>

            {/* 3. ADMISSIONS (Step List) */}
            <section id="admissions" className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Plane className="w-6 h-6 text-primary" /> Admission Journey
              </h2>
              <div className="bg-card border border-border rounded-3xl p-8">
                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                  {[
                    { title: "Select Program", desc: "Choose from our wide range of accredited courses.", icon: BookOpen },
                    { title: "Document Submission", desc: "Upload transcripts, CV, and language scores.", icon: GraduationCap },
                    { title: "Receive Offer", desc: "Get your conditional or unconditional offer letter.", icon: Star },
                    { title: "Visa Application", desc: "Apply for your student visa with our guidance.", icon: Globe },
                  ].map((step, i) => (
                    <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-background bg-slate-100 dark:bg-slate-800 text-slate-500 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow">
                        <step.icon className="w-5 h-5" />
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-4 rounded-2xl border border-border/50 bg-secondary/20 hover:bg-secondary/40 transition-colors">
                        <div className="font-bold text-foreground">{step.title}</div>
                        <div className="text-sm text-muted-foreground">{step.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 4. CAMPUS (Facilities List) */}
            <section id="campus">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Building2 className="w-6 h-6 text-primary" /> Campus Facilities
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {university.facilities?.map((facility: string, i: number) => (
                  <div key={i} className="flex flex-col items-center justify-center p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-md transition-all text-center">
                    <CheckCircle2 className="w-8 h-8 text-primary/80 mb-3" />
                    <span className="font-semibold text-sm">{facility}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* SIDEBAR (4 cols) */}
          <div className="lg:col-span-4 space-y-8">
            {/* Quick Apply Card */}
            <div className="sticky top-24">
              <div className="rounded-[2rem] bg-slate-900 text-white p-8 shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-2xl font-black mb-2">Ready to Apply?</h3>
                  <p className="text-slate-400 text-sm mb-6">Our experts manage the entire process for you.</p>
                  
                  <div className="space-y-4 mb-8 bg-white/5 p-4 rounded-xl backdrop-blur-sm">
                    <div className="flex justify-between text-sm pb-3 border-b border-white/10">
                      <span className="text-slate-400">Living Cost</span>
                      <span className="font-bold">{university.living_costs}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Scholarships</span>
                      <span className="font-bold text-green-400">{university.scholarships_available ? "Available" : "Check Info"}</span>
                    </div>
                  </div>

                  <Button size="lg" className="w-full bg-white text-slate-900 hover:bg-slate-200 font-bold h-12 rounded-xl mb-4" asChild>
                    <Link href="/get-started">
                      Start Free Application
                    </Link>
                  </Button>
                  
                  <div className="text-center text-xs text-slate-500 font-medium">
                    Limited seats for {university.intakes?.[0]} intake
                  </div>
                </div>

                {/* Abstract Shapes */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/30 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl" />
              </div>

              {/* Contact Widget */}
              <div className="mt-6 rounded-3xl border border-border p-6 bg-card">
                <h4 className="font-bold mb-4">Contact Admissions</h4>
                <div className="space-y-3">
                  <a href={`mailto:${university.contact?.email}`} className="flex items-center gap-3 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                      <Mail className="w-4 h-4" />
                    </div>
                    {university.contact?.email}
                  </a>
                  <a href="#" className="flex items-center gap-3 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                      <ExternalLink className="w-4 h-4" />
                    </div>
                    Visit Official Website
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}