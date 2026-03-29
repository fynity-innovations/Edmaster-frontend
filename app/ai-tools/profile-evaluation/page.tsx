"use client"

import { useState, useMemo, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import {
  Zap, Search, Check, ArrowRight, X, MessageCircle,
  GraduationCap, BookOpen, Microscope, FileText,
  Sparkles, Globe, Layout, Target,
  Wallet, Trophy, Calendar, Mail, Phone, User, ExternalLink,
  Clock, Send, Bot, User2, Star, MapPin, Layers, BadgeCheck
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { ScrollArea } from "@/components/ui/scroll-area"

import countriesData from "@/data/countries.json"
import coursesData from "@/data/courses_final.json"

const STEP_META = [
  { label: "Destination", icon: MapPin },
  { label: "Degree", icon: GraduationCap },
  { label: "Field", icon: Layers },
  { label: "Intake", icon: Calendar },
  { label: "Academics", icon: Trophy },
  { label: "Budget", icon: Wallet },
  { label: "Profile", icon: User },
  { label: "Results", icon: Star },
]

export default function AIProfileEvaluator() {
  const router = useRouter()
  const totalSteps = 8
  const [step, setStep] = useState(1)
  const [search, setSearch] = useState("")
  const [courseSearch, setCourseSearch] = useState("")
  const [loading, setLoading] = useState(false)
  const [showOtpInput, setShowOtpInput] = useState(false)
  const [otp, setOtp] = useState("")
  const [verificationSuccess, setVerificationSuccess] = useState(false)
  const [processingFilters, setProcessingFilters] = useState(false)
  const [filteredCourses, setFilteredCourses] = useState<any[]>([])
  const [chatMessages, setChatMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([])
  const [currentQuestion, setCurrentQuestion] = useState("")
  const [isChatLoading, setIsChatLoading] = useState(false)

  const NEXT_PUBLIC_API_URL = "http://127.0.0.1:8000"
  // const NEXT_PUBLIC_API_URL = "https://sap-backend-production-e729.up.railway.app"

  const getDurationRange = (degree: string) => {
    switch (degree) {
      case "Undergraduate": return { min: 3, max: 4, step: 0.1 }
      case "Postgraduate":  return { min: 1, max: 2, step: 0.1 }
      case "Doctorate":     return { min: 3, max: 5, step: 0.5 }
      case "Diploma":       return { min: 0.5, max: 2, step: 0.5 }
      default:              return { min: 1, max: 4, step: 0.1 }
    }
  }

  const [formData, setFormData] = useState({
    countries: [] as string[],
    degree: "",
    fields: [] as string[],   // kept as string[] for API compatibility
    intakes: [] as string[],
    completedDegree: "",
    cgpa: 0.0,
    gradYear: "2025",
    budget: [20],
    duration: [1],
    name: "",
    email: "",
    phone: "",
  })

  // Derived single field string for Step 3 UI (single select)
  const selectedField = formData.fields[0] || ""
  const setFieldAsList = (value: string) => setFormData(p => ({ ...p, fields: value ? [value] : [] }))

  useEffect(() => {
    if (formData.degree) {
      const range = getDurationRange(formData.degree)
      setFormData(prev => ({ ...prev, duration: [range.min] }))
    }
  }, [formData.degree])

  // ── Filter courses for Step 8 results ──
  const filterCourses = useMemo(() => {
    let filtered = coursesData as any[]

    if (selectedField) {
      const fl = selectedField.toLowerCase()
      filtered = filtered.filter(c => {
        const title = (c.course_title || "").toLowerCase()
        const field = (c.field_of_study || "").toLowerCase()
        const desc  = (c.course_description || "").toLowerCase()
        return title.includes(fl) || field.includes(fl) || desc.includes(fl)
      })
    }
    if (formData.countries.length > 0)
      filtered = filtered.filter(c => formData.countries.includes(c.country_name))
    if (formData.degree) {
      const levelMap: Record<string, string[]> = {
        Undergraduate: ["Bachelor", "Bachelors"],
        Postgraduate:  ["Master", "Masters"],
        Doctorate:     ["PhD", "Doctorate"],
        Diploma:       ["Diploma", "Certificate"],
      }
      const levels = levelMap[formData.degree] || []
      filtered = filtered.filter(c => levels.some(l => c.level?.includes(l)))
    }
    if (formData.duration[0] > 0) {
      const targetDuration = formData.duration[0]
      const range = getDurationRange(formData.degree)
      filtered = filtered.filter(c => {
        const m = (c.duration || "").match(/(\d+\.?\d*)/)
        const d = m ? parseFloat(m[1]) : 0
        return d >= range.min && d <= targetDuration
      })
    }
    if (formData.intakes.length > 0)
      filtered = filtered.filter(c => formData.intakes.some(i => c.intake?.includes(i)))
    if (formData.budget[0] > 0) {
      const budgetUSD = formData.budget[0] * 1200
      filtered = filtered.filter(c => parseFloat(c.annual_fee_usd || "0") <= budgetUSD)
    }
    return filtered
  }, [formData, selectedField])

  useEffect(() => { setFilteredCourses(filterCourses) }, [filterCourses])

  // ── API handlers ──
  const handleGenerateReport = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${NEXT_PUBLIC_API_URL}/api/profile/initiate/`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formData.name, email: formData.email, phone: formData.phone }),
      })
      const data = await res.json()
      if (!res.ok) { alert(data.errors?.phone?.[0] || data.message || "Something went wrong"); return }
      setShowOtpInput(true)
    } catch { alert("Server error") } finally { setLoading(false) }
  }

  const handleVerifyOtp = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${NEXT_PUBLIC_API_URL}/api/profile/verify/`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: formData.phone, otp }),
      })
      const data = await res.json()
      if (!res.ok) { alert(data.message || "Invalid OTP"); return }
      setVerificationSuccess(true)
    } catch { alert("Verification failed") } finally { setLoading(false) }
  }

  const handleViewResults = async () => {
    try {
      setProcessingFilters(true)
      const courseSample = (coursesData as any[]).slice(0, 100)
      const res = await fetch(`${NEXT_PUBLIC_API_URL}/api/profile/process-filters/`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          countries: formData.countries, degree: formData.degree, fields: formData.fields,
          intakes: formData.intakes, completedDegree: formData.completedDegree,
          cgpa: formData.cgpa, gradYear: formData.gradYear, budget: formData.budget, courseSample,
        }),
      })
      const result = await res.json()
      if (!result.success) throw new Error(result.error || "Failed to process filters")
      const { filters } = result
      const params = new URLSearchParams()
      if (filters.countries?.length > 0) filters.countries.forEach((c: string) => params.append("country", c))
      if (filters.level) params.append("level", filters.level)
      if (filters.course) {
        params.append("course", Array.isArray(filters.course) ? filters.course.join(" ") : filters.course)
      }
      if (filters.duration) params.append("duration", filters.duration)
      if (filters.intakes?.length > 0) filters.intakes.forEach((i: string) => params.append("intake", i))
      if (filters.searchQuery) params.append("search", filters.searchQuery)
      if (filters.maxBudgetUSD) params.append("maxBudget", filters.maxBudgetUSD.toString())
      router.push(`/courses?${params.toString()}`)
    } catch (e: any) { alert(`Failed to process your preferences: ${e.message}`) }
    finally { setProcessingFilters(false) }
  }

  const handleAskQuestion = async () => {
    if (!currentQuestion.trim() || isChatLoading) return
    setChatMessages(prev => [...prev, { role: "user", content: currentQuestion }])
    setIsChatLoading(true)
    try {
      const res = await fetch(`${NEXT_PUBLIC_API_URL}/api/course-suggestion/`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: currentQuestion, courseSample: filteredCourses.slice(0, 20), phone: formData.phone }),
      })
      const data = await res.json()
      if (data.success && data.suggestions) {
        setChatMessages(prev => [...prev, {
          role: "assistant",
          content: `Based on your filtered courses:\n\n${data.suggestions.map((s: any) =>
            `• ${s.course_title} at ${s.university_name}\n  Duration: ${s.duration} | ${s.country_name}\n  Fee: ${s.currency} ${s.tuition_fees}/year`
          ).join("\n\n")}`,
        }])
      } else {
        setChatMessages(prev => [...prev, { role: "assistant", content: "I couldn't find specific recommendations. Try asking about requirements, career prospects, or admission details." }])
      }
    } catch {
      setChatMessages(prev => [...prev, { role: "assistant", content: "Sorry, I encountered an error. Please try again." }])
    } finally { setIsChatLoading(false); setCurrentQuestion("") }
  }

  // ── Helpers ──
  const progress = (step / totalSteps) * 100

  const toggleValue = (key: "countries" | "intakes", value: string) => {
    setFormData(prev => ({
      ...prev,
      [key]: prev[key].includes(value) ? prev[key].filter(v => v !== value) : [...prev[key], value],
    }))
  }

  const canProceed = () => {
    switch (step) {
      case 1: return formData.countries.length > 0
      case 2: return formData.degree !== ""
      case 3: return formData.fields.length > 0
      case 4: return formData.intakes.length > 0
      case 5: return formData.completedDegree !== "" && formData.cgpa > 0 && formData.gradYear !== ""
      case 6: return formData.budget[0] > 0
      case 7: return formData.name.trim() !== "" && formData.email.trim() !== "" && formData.phone.trim() !== ""
      case 8: return true
      default: return true
    }
  }

  const nextStep = () => {
    if (canProceed()) {
      if (step === 7) handleGenerateReport()
      else {
        if (step === 3) setCourseSearch("")
        setStep(s => Math.min(s + 1, totalSteps))
      }
    }
  }
  const prevStep = () => {
    if (step === 3) setCourseSearch("")
    setStep(s => Math.max(1, s - 1))
  }

  const stepTitles = [
    "Where do you want to study?",
    "What's your academic goal?",
    "What sparks your interest?",
    "When do you want to start?",
    "Your academic background",
    "What's your financial plan?",
    "Let's finalize your report",
    "Your personalized results",
  ]

  // ── Sidebar summary ──
  const summaryItems = [
    { label: "Countries",   icon: Globe,          value: formData.countries.length > 0 ? formData.countries.join(", ") : "",                                          step: 1 },
    { label: "Degree",      icon: Target,         value: formData.degree,                                                                                               step: 2 },
    { label: "Field",       icon: Layout,         value: selectedField,                                                                                                  step: 3 },
    { label: "Intake",      icon: Calendar,       value: formData.intakes.length > 0 ? formData.intakes.join(", ") : "",                                              step: 4 },
    { label: "Background",  icon: GraduationCap,  value: formData.completedDegree ? `${formData.completedDegree}${formData.cgpa > 0 ? ` · ${formData.cgpa} CGPA` : ""}` : "", step: 5 },
    { label: "Budget",      icon: Wallet,         value: formData.budget[0] > 0 ? `₹${formData.budget[0]}L / year` : "",                                              step: 6 },
    { label: "Profile",     icon: User,           value: formData.name,                                                                                                 step: 7 },
  ]

  // ── Domain groups for Step 3 ──
  const domainGroups = [
    { sector: "Technology",            color: "blue",    domains: ["Artificial Intelligence", "Data Science", "Cybersecurity", "Software Engineering", "Cloud Computing", "Machine Learning", "Web Development", "Blockchain"] },
    { sector: "Business",              color: "amber",   domains: ["MBA", "Finance", "Marketing", "Entrepreneurship", "Supply Chain Management", "Human Resources", "International Business", "Accounting"] },
    { sector: "Healthcare",            color: "rose",    domains: ["Nursing", "Public Health", "Pharmacy", "Biomedical Science", "Healthcare Management", "Medicine", "Nutrition", "Physiotherapy"] },
    { sector: "Social & Arts",         color: "purple",  domains: ["Psychology", "Social Work", "Education", "Law", "Media & Communications", "Graphic Design", "Architecture", "Journalism"] },
    { sector: "Engineering & Science", color: "emerald", domains: ["Mechanical Engineering", "Civil Engineering", "Electrical Engineering", "Environmental Science", "Physics", "Chemistry", "Mathematics", "Biotechnology"] },
  ]
  const colorMap: Record<string, { chip: string; chipSel: string; dot: string }> = {
    blue:    { dot: "bg-blue-500",    chip: "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 hover:border-blue-400 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-300",       chipSel: "bg-primary border-primary text-white shadow-lg shadow-primary/20" },
    amber:   { dot: "bg-amber-500",   chip: "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 hover:border-amber-400 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-300", chipSel: "bg-amber-500 border-amber-500 text-white shadow-lg shadow-amber-200" },
    rose:    { dot: "bg-rose-500",    chip: "border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 hover:border-rose-400 dark:bg-rose-900/20 dark:border-rose-800 dark:text-rose-300",         chipSel: "bg-rose-500 border-rose-500 text-white shadow-lg shadow-rose-200" },
    purple:  { dot: "bg-purple-500",  chip: "border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100 hover:border-purple-400 dark:bg-purple-900/20 dark:border-purple-800 dark:text-purple-300", chipSel: "bg-purple-600 border-purple-600 text-white shadow-lg shadow-purple-200" },
    emerald: { dot: "bg-emerald-500", chip: "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 hover:border-emerald-400 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-300", chipSel: "bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-200" },
  }

  // ── All unique course titles for autocomplete ──
  const allTitles: string[] = useMemo(() =>
    Array.from(new Set((coursesData as any[]).map(c => c.course_title).filter(Boolean))).sort() as string[]
  , [])

  const autoSuggestions = courseSearch.length >= 2
    ? allTitles.filter(t => t.toLowerCase().includes(courseSearch.toLowerCase())).slice(0, 8)
    : []

  // ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-black text-[15px] selection:bg-primary/20">

      {/* ══════════ HEADER ══════════ */}
      <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-11 h-11 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white dark:border-black rounded-full animate-pulse" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-none tracking-tight">AI Profile Evaluator</h1>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" /> SmartMatch Engine Active
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Analysis Progress</span>
              <span className="text-sm font-bold text-primary">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="w-32 sm:w-48 h-2" />
          </div>
        </div>
      </nav>

      {/* ══════════ BODY ══════════ */}
      <div className="container mx-auto px-4 pt-12 pb-40 max-w-6xl grid lg:grid-cols-12 gap-12">

        {/* ── SIDEBAR ── */}
        <aside className="lg:col-span-4 hidden lg:block">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sticky top-32 shadow-sm space-y-5">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <BadgeCheck className="w-4 h-4 text-primary" /> Your Profile
              </h3>
              {filteredCourses.length > 0 && (
                <Badge className="bg-primary/10 text-primary border-none text-xs">
                  {filteredCourses.length} matches
                </Badge>
              )}
            </div>

            {summaryItems.map(item => (
              <SummaryRow
                key={item.label}
                icon={item.icon}
                label={item.label}
                value={item.value}
                isCurrent={step === item.step}
                isFilled={!!item.value && step > item.step}
                onEdit={() => setStep(item.step)}
              />
            ))}

            {filteredCourses.length > 0 && (
              <div className="mt-2 p-4 rounded-2xl bg-gradient-to-br from-primary to-indigo-600 text-white">
                <div className="text-[10px] font-bold uppercase tracking-widest opacity-70">AI-Matched Courses</div>
                <div className="text-3xl font-black mt-0.5">{filteredCourses.length}</div>
                <div className="text-[10px] opacity-60 mt-0.5">based on your profile</div>
              </div>
            )}
          </div>
        </aside>

        {/* ── MAIN ── */}
        <main className="lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.22 }}
              className="space-y-8"
            >
              {/* Step label */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-primary font-bold text-xs uppercase tracking-widest">Step {String(step).padStart(2, "0")}</span>
                  {step < 8 && canProceed() && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-[10px] font-bold border border-green-200 dark:border-green-800">
                      <Check className="w-2.5 h-2.5" /> Ready
                    </span>
                  )}
                </div>
                <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  {stepTitles[step - 1]}
                </h2>
              </div>

              {/* ════ STEP 1: COUNTRIES ════ */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="relative max-w-md group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input className="pl-12 h-14 bg-white dark:bg-slate-900 rounded-xl" placeholder="Search country..." onChange={e => setSearch(e.target.value)} />
                  </div>

                  {formData.countries.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.countries.map(c => (
                        <span key={c} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary text-white text-xs font-semibold shadow-sm shadow-primary/20">
                          {c}
                          <button onClick={() => toggleValue("countries", c)}><X className="w-3 h-3 opacity-70 hover:opacity-100" /></button>
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {(countriesData as any[])
                      .filter(c => c.country_name.toLowerCase().includes(search.toLowerCase()))
                      .map(c => {
                        const sel = formData.countries.includes(c.country_name)
                        return (
                          <button
                            key={c.country_id}
                            onClick={() => toggleValue("countries", c.country_name)}
                            className={`group relative p-5 rounded-2xl border transition-all flex flex-col items-center gap-3 ${
                              sel ? "border-primary bg-primary/[0.04] ring-1 ring-primary shadow-md shadow-primary/10" : "bg-white dark:bg-slate-900 hover:border-primary/50 shadow-sm"
                            }`}
                          >
                            <img src={`https://flagcdn.com/w80/${c.country_code.toLowerCase()}.png`} className="w-12 h-8 rounded object-cover shadow-sm" alt="" />
                            <span className={`font-semibold text-sm text-center ${sel ? "text-primary" : ""}`}>{c.country_name}</span>
                            {sel && <Check className="absolute top-3 right-3 w-4 h-4 text-primary" />}
                          </button>
                        )
                      })}
                  </div>
                </div>
              )}

              {/* ════ STEP 2: DEGREE ════ */}
              {step === 2 && (
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { name: "Undergraduate", icon: GraduationCap, desc: "Bachelor's Degrees", detail: "3–4 years" },
                    { name: "Postgraduate",  icon: BookOpen,       desc: "Master's & PG Diplomas", detail: "1–2 years" },
                    { name: "Doctorate",     icon: Microscope,     desc: "Research & PhD", detail: "3–5 years" },
                    { name: "Diploma",       icon: FileText,       desc: "Specialized Short Courses", detail: "0.5–2 years" },
                  ].map(d => {
                    const sel = formData.degree === d.name
                    return (
                      <button
                        key={d.name}
                        onClick={() => setFormData({ ...formData, degree: d.name })}
                        className={`p-6 rounded-2xl border transition-all text-left flex items-start gap-4 ${
                          sel ? "border-primary bg-primary/[0.03] ring-1 ring-primary shadow-md shadow-primary/10" : "bg-white dark:bg-slate-900 hover:border-primary/50 shadow-sm"
                        }`}
                      >
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                          <d.icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-lg text-slate-800 dark:text-white">{d.name}</div>
                          <div className="text-sm text-muted-foreground">{d.desc}</div>
                          <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 text-xs font-medium">
                            <Clock className="w-3 h-3" /> {d.detail}
                          </div>
                        </div>
                        {sel && <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />}
                      </button>
                    )
                  })}
                </div>
              )}

              {/* ════ STEP 3: DOMAIN PICKER ════ */}
              {step === 3 && (
                <div className="space-y-6 max-w-3xl">
                  {/* Search input */}
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Type your interest or pick a domain below</p>
                    <div className="relative max-w-md group">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none" />
                      <Input
                        className="pl-12 pr-10 h-14 bg-white dark:bg-slate-900 rounded-xl"
                        placeholder="e.g. Data Science, MBA, Nursing..."
                        value={courseSearch}
                        onChange={e => {
                          setCourseSearch(e.target.value)
                          if (!e.target.value) setFieldAsList("")
                        }}
                        onKeyDown={e => {
                          if (e.key === "Enter" && courseSearch.trim()) setFieldAsList(courseSearch.trim())
                        }}
                      />
                      {courseSearch && (
                        <button
                          onClick={() => { setCourseSearch(""); setFieldAsList("") }}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}

                      {/* Autocomplete dropdown */}
                      {autoSuggestions.length > 0 && !selectedField && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-20 overflow-hidden">
                          {autoSuggestions.map(s => (
                            <button
                              key={s}
                              onClick={() => { setFieldAsList(s); setCourseSearch(s) }}
                              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-primary/5 hover:text-primary text-left transition-colors"
                            >
                              <BookOpen className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                              {s}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Use custom text hint */}
                    {courseSearch.trim() && courseSearch.trim() !== selectedField && (
                      <button
                        onClick={() => setFieldAsList(courseSearch.trim())}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline transition-colors"
                      >
                        <Check className="w-3.5 h-3.5" /> Use &ldquo;{courseSearch.trim()}&rdquo;
                      </button>
                    )}
                  </div>

                  {/* Selected badge */}
                  {selectedField && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 p-3 bg-primary/5 border border-primary/30 rounded-xl"
                    >
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm font-bold text-primary flex-1">{selectedField}</span>
                      <button onClick={() => { setFieldAsList(""); setCourseSearch("") }} className="text-primary/50 hover:text-primary transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    </motion.div>
                  )}

                  {/* Domain chip groups */}
                  {!courseSearch && (
                    <div className="space-y-5">
                      {domainGroups.map(group => {
                        const c = colorMap[group.color]
                        return (
                          <div key={group.sector}>
                            <div className="flex items-center gap-2 mb-3">
                              <div className={`w-2 h-2 rounded-full ${c.dot}`} />
                              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{group.sector}</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {group.domains.map(domain => {
                                const sel = selectedField === domain
                                return (
                                  <button
                                    key={domain}
                                    onClick={() => {
                                      if (sel) { setFieldAsList(""); setCourseSearch("") }
                                      else { setFieldAsList(domain); setCourseSearch(domain) }
                                    }}
                                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-semibold transition-all duration-150 ${sel ? c.chipSel : c.chip}`}
                                  >
                                    {sel && <Check className="w-3 h-3" />}
                                    {domain}
                                  </button>
                                )
                              })}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}

                  {/* No results */}
                  {courseSearch && autoSuggestions.length === 0 && !selectedField && (
                    <div className="py-6 text-center">
                      <p className="text-muted-foreground text-sm">No matching titles found.</p>
                      <button
                        onClick={() => setFieldAsList(courseSearch.trim())}
                        className="mt-2 text-sm font-semibold text-primary hover:underline"
                      >
                        Use &ldquo;{courseSearch}&rdquo; as your interest →
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* ════ STEP 4: INTAKES ════ */}
              {step === 4 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {["Spring 2026", "Fall 2026", "Winter 2026", "Summer 2026", "Any Intake"].map(intake => {
                    const sel = formData.intakes.includes(intake)
                    return (
                      <button
                        key={intake}
                        onClick={() => toggleValue("intakes", intake)}
                        className={`p-6 rounded-2xl border flex flex-col items-center gap-3 transition-all ${
                          sel ? "border-primary bg-primary/5 ring-1 ring-primary shadow-md shadow-primary/10" : "bg-white dark:bg-slate-900 hover:border-primary/50 shadow-sm"
                        }`}
                      >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${sel ? "bg-primary text-white" : "bg-primary/10 text-primary"}`}>
                          <Calendar className="w-6 h-6" />
                        </div>
                        <span className={`font-bold text-sm text-center ${sel ? "text-primary" : ""}`}>{intake}</span>
                        {sel && <Check className="w-4 h-4 text-primary" />}
                      </button>
                    )
                  })}
                </div>
              )}

              {/* ════ STEP 5: ACADEMICS ════ */}
              {step === 5 && (
                <div className="max-w-md space-y-10">
                  <div className="space-y-4">
                    <label className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">
                      <GraduationCap className="w-4 h-4" /> Completed Degree
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {["High School", "Undergraduate", "Postgraduate", "Doctorate"].map(deg => {
                        const sel = formData.completedDegree === deg
                        return (
                          <button
                            key={deg}
                            onClick={() => setFormData({ ...formData, completedDegree: deg })}
                            className={`py-4 px-3 rounded-xl border font-semibold text-sm transition-all ${
                              sel ? "border-primary bg-primary text-white shadow-lg shadow-primary/20" : "bg-white dark:bg-slate-900 hover:border-primary/50 shadow-sm"
                            }`}
                          >
                            {deg}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">
                      <Trophy className="w-4 h-4" /> CGPA / Percentage
                    </label>
                    <div className="relative">
                      <Input
                        type="number"
                        className="h-16 text-2xl font-bold pl-6 rounded-2xl bg-white dark:bg-slate-900"
                        value={formData.cgpa || ""}
                        onChange={e => setFormData({ ...formData, cgpa: +e.target.value })}
                        min="0" max="10" step="0.1" placeholder="0.0"
                      />
                      <span className="absolute right-6 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">/ 10</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> Graduation Year
                    </label>
                    <div className="flex gap-3">
                      {["2024", "2025", "2026", "2027"].map(y => {
                        const sel = formData.gradYear === y
                        return (
                          <button
                            key={y}
                            onClick={() => setFormData({ ...formData, gradYear: y })}
                            className={`flex-1 py-4 rounded-xl border font-bold transition-all ${
                              sel ? "border-primary bg-primary text-white shadow-lg shadow-primary/20" : "bg-white dark:bg-slate-900 shadow-sm"
                            }`}
                          >
                            {y}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* ════ STEP 6: BUDGET & DURATION ════ */}
              {step === 6 && (
                <div className="space-y-5 max-w-xl">
                  {/* Budget gradient card */}
                  <div className="p-8 rounded-[2rem] bg-gradient-to-br from-primary to-indigo-700 text-white shadow-2xl shadow-primary/30">
                    <div className="flex justify-between items-start mb-8">
                      <div>
                        <p className="text-white/70 text-sm font-bold uppercase tracking-widest">Yearly Tuition Budget</p>
                        <h3 className="text-5xl font-black mt-1">₹{formData.budget[0]}L<span className="text-xl opacity-60">/yr</span></h3>
                      </div>
                      <Wallet className="w-10 h-10 opacity-20" />
                    </div>
                    <Slider value={formData.budget} min={5} max={80} step={1} onValueChange={v => setFormData({ ...formData, budget: v })} className="py-4 cursor-pointer" />
                    <div className="flex justify-between text-xs font-bold mt-4 opacity-70 uppercase tracking-tighter">
                      <span>Min: ₹5 Lakhs</span><span>Max: ₹80 Lakhs+</span>
                    </div>
                  </div>

                  {/* Duration card */}
                  {formData.degree && (
                    <div className="p-8 rounded-[2rem] bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-2xl shadow-purple-600/20">
                      <div className="flex justify-between items-start mb-8">
                        <div>
                          <p className="text-white/70 text-sm font-bold uppercase tracking-widest">Course Duration</p>
                          <h3 className="text-5xl font-black mt-1">{formData.duration[0]}<span className="text-xl opacity-60"> yrs</span></h3>
                        </div>
                        <Clock className="w-10 h-10 opacity-20" />
                      </div>
                      <Slider
                        value={formData.duration}
                        min={getDurationRange(formData.degree).min}
                        max={getDurationRange(formData.degree).max}
                        step={getDurationRange(formData.degree).step}
                        onValueChange={v => setFormData({ ...formData, duration: v })}
                        className="py-4 cursor-pointer"
                      />
                      <div className="flex justify-between text-xs font-bold mt-4 opacity-70 uppercase tracking-tighter">
                        <span>Min: {getDurationRange(formData.degree).min}y</span>
                        <span>Max: {getDurationRange(formData.degree).max}y</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ════ STEP 7: CONTACT ════ */}
              {step === 7 && (
                <div className="max-w-md space-y-4">
                  {[
                    { icon: User,  placeholder: "Full Name",     key: "name",  type: "text" },
                    { icon: Mail,  placeholder: "Email Address", key: "email", type: "email" },
                    { icon: Phone, placeholder: "Phone Number",  key: "phone", type: "tel" },
                  ].map(field => (
                    <div key={field.key} className="relative group">
                      <field.icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <Input
                        type={field.type}
                        className="h-14 pl-12 rounded-xl bg-white dark:bg-slate-900"
                        placeholder={field.placeholder}
                        value={formData[field.key as keyof typeof formData] as string}
                        onChange={e => setFormData({ ...formData, [field.key]: e.target.value })}
                      />
                    </div>
                  ))}
                  <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                    <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
                      🔒 By clicking Generate, you agree to receive an AI analysis report via email. Your data is secure and never shared.
                    </p>
                  </div>
                </div>
              )}

              {/* ════ STEP 8: RESULTS ════ */}
              {step === 8 && (
                <div className="grid lg:grid-cols-3 gap-5">
                  {/* Course list */}
                  <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-slate-800 dark:text-white">Matched Courses</h3>
                      <Badge className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800 gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        {filteredCourses.length} found
                      </Badge>
                    </div>
                    <ScrollArea className="h-[580px] pr-1">
                      <div className="space-y-3">
                        {filteredCourses.slice(0, 20).map((course, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.03 }}
                            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary/40 hover:shadow-md transition-all shadow-sm group"
                          >
                            <div className="flex justify-between items-start mb-3">
                              <div className="flex-1 min-w-0 pr-3">
                                <h4 className="font-bold text-slate-800 dark:text-white text-sm leading-snug group-hover:text-primary transition-colors">
                                  {course.course_title}
                                </h4>
                                <p className="text-muted-foreground text-xs mt-1">{course.university_name} · {course.country_name}</p>
                              </div>
                              <span className="flex-shrink-0 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase">
                                {course.level}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{course.duration}</span>
                              <span className="flex items-center gap-1.5"><Wallet className="w-3.5 h-3.5" />{course.currency} {course.tuition_fees}/yr</span>
                              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{course.intake}</span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>

                  {/* AI Chat */}
                  <div className="lg:col-span-1">
                    <div className="h-[580px] rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col overflow-hidden">
                      <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3 bg-slate-50 dark:bg-slate-900/50">
                        <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-md shadow-primary/20">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div className="font-bold text-sm">AI Assistant</div>
                          <div className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1 font-semibold">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Online
                          </div>
                        </div>
                      </div>

                      <ScrollArea className="flex-1 p-4">
                        <div className="space-y-4">
                          {chatMessages.length === 0 && (
                            <div className="flex flex-col items-center justify-center h-40 text-center">
                              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                                <MessageCircle className="w-5 h-5 text-primary" />
                              </div>
                              <p className="text-slate-500 text-sm font-semibold">Ask me anything!</p>
                              <p className="text-muted-foreground text-xs mt-1">Requirements, careers, admissions...</p>
                            </div>
                          )}
                          {chatMessages.map((msg, idx) => (
                            <div key={idx} className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                              {msg.role === "assistant" && (
                                <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center flex-shrink-0 mt-0.5 shadow">
                                  <Bot className="w-3.5 h-3.5 text-white" />
                                </div>
                              )}
                              <div className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                                msg.role === "user"
                                  ? "bg-primary text-white rounded-tr-sm shadow-sm shadow-primary/20"
                                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-tl-sm"
                              }`}>
                                <p className="whitespace-pre-wrap">{msg.content}</p>
                              </div>
                              {msg.role === "user" && (
                                <div className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <User2 className="w-3.5 h-3.5 text-slate-500" />
                                </div>
                              )}
                            </div>
                          ))}
                          {isChatLoading && (
                            <div className="flex gap-2.5">
                              <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center flex-shrink-0 mt-0.5 shadow">
                                <Bot className="w-3.5 h-3.5 text-white" />
                              </div>
                              <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl rounded-tl-sm px-4 py-3">
                                <div className="flex gap-1">
                                  {[0,1,2].map(i => (
                                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: `${i*150}ms` }} />
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </ScrollArea>

                      <div className="p-3 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex gap-2">
                          <input
                            className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all disabled:opacity-50"
                            placeholder="Ask about courses..."
                            value={currentQuestion}
                            onChange={e => setCurrentQuestion(e.target.value)}
                            onKeyPress={e => e.key === "Enter" && handleAskQuestion()}
                            disabled={isChatLoading}
                          />
                          <button
                            onClick={handleAskQuestion}
                            disabled={!currentQuestion.trim() || isChatLoading}
                            className="w-10 h-10 rounded-xl bg-primary hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-all shadow shadow-primary/20 flex-shrink-0"
                          >
                            <Send className="w-4 h-4 text-white" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* ══════════ OTP MODAL ══════════ */}
      <AnimatePresence>
        {showOtpInput && !verificationSuccess && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 p-8 rounded-2xl w-full max-w-sm space-y-6 shadow-2xl border border-slate-200 dark:border-slate-800"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Verify Your Phone</h3>
                <p className="text-sm text-muted-foreground">We sent a 6-digit code to <span className="font-semibold text-foreground">{formData.phone}</span></p>
              </div>
              <Input
                value={otp}
                onChange={e => setOtp(e.target.value.replace(/\D/g, ""))}
                placeholder="• • • • • •"
                maxLength={6}
                className="h-16 text-center text-2xl tracking-[0.5em] font-bold rounded-xl bg-slate-50 dark:bg-slate-800"
                autoFocus
              />
              <Button onClick={handleVerifyOtp} disabled={loading || otp.length !== 6} className="w-full h-12 rounded-xl font-bold shadow-lg shadow-primary/20">
                {loading ? <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin mr-2" />Verifying...</> : "Verify OTP"}
              </Button>
              <button onClick={() => { setShowOtpInput(false); setOtp("") }} className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors">Cancel</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════ SUCCESS MODAL ══════════ */}
      <AnimatePresence>
        {verificationSuccess && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 p-8 rounded-2xl w-full max-w-sm space-y-6 shadow-2xl border border-slate-200 dark:border-slate-800 text-center"
            >
              <motion.div
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-2xl flex items-center justify-center mx-auto"
              >
                <Check className="w-9 h-9 text-green-600 dark:text-green-400" />
              </motion.div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-green-600 dark:text-green-400">Profile Verified! 🎉</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">Your profile has been verified. View your personalized course recommendations now.</p>
              </div>
              <div className="space-y-3">
                <Button onClick={handleViewResults} disabled={processingFilters} size="lg" className="w-full h-12 rounded-xl font-bold gap-2 shadow-lg shadow-primary/20">
                  {processingFilters ? <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> AI Processing...</> : <>View My Results <ExternalLink className="w-4 h-4" /></>}
                </Button>
                <button
                  onClick={() => { setShowOtpInput(false); setVerificationSuccess(false); setOtp("") }}
                  disabled={processingFilters}
                  className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════ STICKY FOOTER ══════════ */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 h-24 flex items-center justify-between">
          <button
            onClick={prevStep}
            className={`text-sm font-bold text-slate-500 hover:text-primary transition-colors flex items-center gap-1.5 ${step === 1 ? "invisible" : ""}`}
          >
            <ArrowRight className="w-4 h-4 rotate-180" /> Back
          </button>

          {/* Mobile dots */}
          <div className="flex items-center gap-1.5 lg:hidden">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div key={i} className={`rounded-full transition-all duration-300 ${
                i + 1 === step ? "w-5 h-1.5 bg-primary"
                : i + 1 < step ? "w-1.5 h-1.5 bg-green-500"
                : "w-1.5 h-1.5 bg-slate-300 dark:bg-slate-700"
              }`} />
            ))}
          </div>

          <Button
            onClick={nextStep}
            disabled={!canProceed() || loading}
            className="h-14 px-10 rounded-xl font-bold shadow-xl shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />Sending...</>
              : <>{step === totalSteps ? "Done" : step === 7 ? "Generate Full Report" : "Continue"} <ArrowRight className="ml-2 w-5 h-5" /></>
            }
          </Button>
        </div>
      </footer>
    </div>
  )
}

// ── Sidebar summary row component ──
function SummaryRow({
  icon: Icon, label, value, isCurrent, isFilled, onEdit
}: {
  icon: any; label: string; value: string; isCurrent: boolean; isFilled: boolean; onEdit: () => void
}) {
  return (
    <div className={`flex gap-3 p-2 rounded-xl transition-all ${isFilled ? "bg-primary/5" : isCurrent ? "bg-slate-50 dark:bg-slate-800/50 ring-1 ring-slate-200 dark:ring-slate-700" : ""}`}>
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${isFilled ? "bg-primary text-white shadow-sm shadow-primary/20" : "bg-slate-100 dark:bg-slate-800 text-slate-400"}`}>
        {isFilled ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
      </div>
      <div className="flex-1 min-w-0">
        <div className={`text-[10px] font-bold uppercase tracking-widest ${isFilled ? "text-primary" : isCurrent ? "text-slate-500 dark:text-slate-400" : "text-slate-300 dark:text-slate-600"}`}>
          {label}
        </div>
        {isFilled ? (
          <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-0.5 truncate">{value}</div>
        ) : (
          <div className="text-xs text-slate-300 dark:text-slate-600 mt-0.5">{isCurrent ? "Selecting now..." : "—"}</div>
        )}
      </div>
      {isFilled && (
        <button onClick={onEdit} className="text-[10px] font-bold text-primary/50 hover:text-primary transition-colors flex-shrink-0 mt-1 hover:underline">Edit</button>
      )}
    </div>
  )
}