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
  Sparkles,
  ArrowUpRight,
  Plane,
  Building2,
  BookOpen,Star
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
    <div className="min-h-screen bg-white font-sans selection:bg-primary/20 text-slate-900">
      
      {/* --- LIGHT & AIRY HERO SECTION --- */}
      <div ref={heroRef} className="relative min-h-[500px] lg:h-[65vh] overflow-hidden bg-slate-50 flex items-center pt-20 pb-12 lg:py-0 border-b border-slate-200">
        {/* Soft Background Gradients */}
        <motion.div style={{ y }} className="absolute inset-0 opacity-100">
           <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
           <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-100/50 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3" />
           {/* Grid Pattern */}
           <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]" />
        </motion.div>

        <motion.div style={{ opacity }} className="relative container mx-auto px-4 z-10">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="max-w-4xl mx-auto text-center">
            {/* Value Badges */}
            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-3 mb-6">
              <Badge variant="outline" className="border-primary/20 text-primary bg-primary/5 px-4 py-1.5 text-sm uppercase tracking-wide font-semibold">
                <Trophy className="w-3.5 h-3.5 mr-2" />
                World Rank #{university.rankings?.world}
              </Badge>
              {university.badge && (
                <Badge className="bg-slate-900 text-white border-none hover:bg-slate-800 transition-colors">
                  {university.badge}
                </Badge>
              )}
            </motion.div>

            {/* Main Headline */}
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-6 leading-[1.15]">
              {university.university_name}
            </motion.h1>
            
            {/* Sub-info */}
            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 text-slate-600 text-base md:text-lg font-medium">
              <span className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" /> {university.location}
              </span>
              <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-slate-300" />
              <span className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" /> {university.country_name}
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* --- STICKY NAV --- */}
      <div className={cn(
        "sticky top-0 z-50 transition-all duration-300 border-b border-transparent backdrop-blur-md",
        isScrolled ? "bg-white/90 border-slate-200 py-2 shadow-sm" : "bg-transparent -mt-16 py-4"
      )}>
        <div className="container mx-auto px-4 flex justify-between items-center overflow-x-auto no-scrollbar">
          <div className="flex bg-slate-100 p-1 rounded-full border border-slate-200 min-w-max mx-auto md:mx-0">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={cn(
                  "px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-semibold transition-all whitespace-nowrap",
                  activeSection === section.id 
                    ? "bg-white text-slate-900 shadow-sm" 
                    : "text-slate-500 hover:text-slate-900"
                )}
              >
                {section.label}
              </button>
            ))}
          </div>
          
          <AnimatePresence>
            {isScrolled && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="hidden md:block">
                <Button size="sm" className="rounded-full px-6 font-bold bg-primary hover:bg-primary/90 text-white">
                  Apply Now
                </Button>
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
            
            {/* 1. OVERVIEW */}
            <section id="overview" className="space-y-6 scroll-mt-24">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Why {university.university_name}?</h2>
              </div>
              <p className="text-lg text-slate-600 leading-relaxed">
                {university.long_description || university.description}
                <br /><br />
                Recognized globally for its research output and high employability rates, {university.university_name} offers a dynamic environment for {university.programs_count}+ academic programs.
              </p>
            </section>

            {/* 2. STATS GRID (Responsive) */}
            <section id="stats" className="scroll-mt-24">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-auto md:auto-rows-[140px]">
                
                {/* Large Card: Rankings */}
                <div className="md:col-span-2 md:row-span-2 rounded-3xl bg-white border border-slate-200 p-8 flex flex-col justify-between hover:border-primary/50 transition-all shadow-sm group">
                  <div className="flex justify-between items-start">
                    <div className="p-3 bg-yellow-50 rounded-2xl text-yellow-600">
                      <Trophy className="w-8 h-8" />
                    </div>
                    <Badge variant="secondary" className="bg-slate-100 text-slate-600">RANKING</Badge>
                  </div>
                  <div className="mt-6 md:mt-0">
                    <div className="text-5xl font-black text-slate-900 mb-2">#{university.rankings?.world}</div>
                    <h3 className="text-lg font-bold text-slate-500">Global University Ranking</h3>
                    <p className="text-sm text-slate-400 mt-2">Consistent top-tier performance in research quality.</p>
                  </div>
                </div>

                {/* Tall Card: Employability */}
                <div className="md:col-span-1 md:row-span-2 rounded-3xl bg-primary text-white p-6 flex flex-col justify-between shadow-xl shadow-primary/20">
                  <div className="flex justify-between items-start">
                    <Briefcase className="w-8 h-8 opacity-80" />
                    <ArrowUpRight className="w-6 h-6 opacity-60" />
                  </div>
                  <div className="mt-6 md:mt-0">
                    <div className="text-4xl font-black mb-1">{university.employability}</div>
                    <div className="text-white/80 font-medium text-sm">Employability Rate</div>
                    <div className="mt-4 pt-4 border-t border-white/20 text-xs text-white/70">
                      Top recruiters include Google & Microsoft.
                    </div>
                  </div>
                </div>

                {/* Small Card: Tuition */}
                <div className="rounded-3xl bg-white border border-slate-200 p-6 flex flex-col justify-center hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <Wallet className="w-5 h-5 text-green-600" />
                    <span className="text-xs font-bold uppercase text-slate-400">Avg. Tuition</span>
                  </div>
                  <div className="text-2xl font-bold text-slate-900 truncate">{university.average_tuition_fees?.split(' ')[0]}</div>
                </div>

                {/* Small Card: Intakes */}
                <div className="rounded-3xl bg-white border border-slate-200 p-6 flex flex-col justify-center hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span className="text-xs font-bold uppercase text-slate-400">Next Intake</span>
                  </div>
                  <div className="text-2xl font-bold text-slate-900">{university.intakes?.[0]}</div>
                </div>

                {/* Wide Card: Programs */}
                <div className="md:col-span-2 rounded-3xl bg-white border border-slate-200 p-6 flex items-center justify-between hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-slate-100 rounded-2xl text-slate-900">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-slate-900">{university.programs_count}+ Programs</div>
                      <div className="text-sm text-slate-500">Engineering, Business, Arts & Sciences</div>
                    </div>
                  </div>
                  <Button variant="ghost" className="hidden sm:flex gap-2 text-primary hover:text-primary hover:bg-primary/5">
                    View Catalog <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </section>

            {/* 3. ADMISSIONS TIMELINE */}
            <section id="admissions" className="space-y-6 scroll-mt-24">
              <h2 className="text-2xl font-bold flex items-center gap-3 text-slate-900">
                <Plane className="w-6 h-6 text-primary" /> Admission Journey
              </h2>
              <div className="bg-white border border-slate-200 rounded-3xl p-8">
                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                  {[
                    { title: "Select Program", desc: "Choose from our wide range of accredited courses.", icon: BookOpen },
                    { title: "Document Submission", desc: "Upload transcripts, CV, and language scores.", icon: GraduationCap },
                    { title: "Receive Offer", desc: "Get your conditional or unconditional offer letter.", icon: Star },
                    { title: "Visa Application", desc: "Apply for your student visa with our guidance.", icon: Globe },
                  ].map((step, i) => (
                    <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-slate-100 text-slate-500 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                        <step.icon className="w-5 h-5" />
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-4 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-md transition-all">
                        <div className="font-bold text-slate-900">{step.title}</div>
                        <div className="text-sm text-slate-500">{step.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 4. CAMPUS FACILITIES */}
            <section id="campus" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-slate-900">
                <Building2 className="w-6 h-6 text-primary" /> Campus Facilities
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {university.facilities?.map((facility: string, i: number) => (
                  <div key={i} className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white border border-slate-200 hover:border-primary/50 hover:shadow-md transition-all text-center">
                    <CheckCircle2 className="w-8 h-8 text-primary mb-3" />
                    <span className="font-semibold text-sm text-slate-700">{facility}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* SIDEBAR (4 cols) */}
          <div className="lg:col-span-4 space-y-8 mt-8 lg:mt-0">
            {/* Quick Apply Card */}
            <div className="sticky top-24">
              <div className="rounded-[2rem] bg-slate-900 text-white p-8 shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-2xl font-black mb-2">Ready to Apply?</h3>
                  <p className="text-slate-400 text-sm mb-6">Our experts manage the entire process for you.</p>
                  
                  <div className="space-y-4 mb-8 bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/10">
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
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/30 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl" />
              </div>

              {/* Contact Widget */}
              <div className="mt-6 rounded-3xl border border-slate-200 p-6 bg-white shadow-sm">
                <h4 className="font-bold mb-4 text-slate-900">Contact Admissions</h4>
                <div className="space-y-3">
                  <a href={`mailto:${university.contact?.email}`} className="flex items-center gap-3 text-sm font-medium text-slate-500 hover:text-primary transition-colors">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
                      <Mail className="w-4 h-4" />
                    </div>
                    {university.contact?.email}
                  </a>
                  <a href="#" className="flex items-center gap-3 text-sm font-medium text-slate-500 hover:text-primary transition-colors">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
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