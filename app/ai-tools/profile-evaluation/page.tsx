"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import {
  Zap, Search, Check, ArrowRight,
  GraduationCap, BookOpen, Microscope, FileText,
  Monitor, Building2, Heart, Brain, Sparkles,
  Globe, Layout, Target, Wallet, UserCircle,
  Trophy, Calendar, Mail, Phone, User, ExternalLink
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"

// Mock data structures - replace with your actual imports
import countriesData from "@/data/countries.json" 
import universitiesData from "@/data/universities.json"
import coursesData from "@/data/courses_final.json" 

export default function AIProfileEvaluator() {
  const router = useRouter()
  const totalSteps = 7 // Changed from 6 to 7
  const [step, setStep] = useState(1)
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)
  const [showOtpInput, setShowOtpInput] = useState(false)
  const [otp, setOtp] = useState("")
  const [verificationSuccess, setVerificationSuccess] = useState(false)
  const [processingFilters, setProcessingFilters] = useState(false)

  const NEXT_PUBLIC_API_URL = 'https://sap-backend-production-e729.up.railway.app'
  // const NEXT_PUBLIC_API_URL = 'http://127.0.0.1:8000'


  const handleGenerateReport = async () => {
    try {
      setLoading(true)

      const response = await fetch(
        `${NEXT_PUBLIC_API_URL}/api/profile/initiate/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone
          })
        }
      )

      const data = await response.json()

      if (!response.ok) {
        alert(
          data.errors?.phone?.[0] ||
          data.message ||
          "Something went wrong"
        )
        return
      }

      setShowOtpInput(true)

    } catch (error) {
      console.error(error)
      alert("Server error")
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOtp = async () => {
    try {
      setLoading(true)

      const response = await fetch(
        `${NEXT_PUBLIC_API_URL}/api/profile/verify/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            phone: formData.phone,
            otp: otp
          })
        }
      )

      const data = await response.json()

      if (!response.ok) {
        alert(data.message || "Invalid OTP")
        return
      }

      // Success - show verification success state
      setVerificationSuccess(true)

    } catch (error) {
      console.error(error)
      alert("Verification failed")
    } finally {
      setLoading(false)
    }
  }

  const handleViewResults = async () => {
    try {
      setProcessingFilters(true)

      // Get MORE courses for better AI context
      const courseSample = (coursesData as any[]).slice(0, 100)

      console.log('Sending to AI:', {
        countries: formData.countries,
        degree: formData.degree,
        fields: formData.fields,
        intakes: formData.intakes,
        completedDegree: formData.completedDegree,
        budget: formData.budget,
        sampleSize: courseSample.length
      })

      // Call Django backend to process filters with AI
      const response = await fetch(
        `${NEXT_PUBLIC_API_URL}/api/profile/process-filters/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            countries: formData.countries,
            degree: formData.degree,
            fields: formData.fields,
            intakes: formData.intakes,
            completedDegree: formData.completedDegree,
            cgpa: formData.cgpa,
            gradYear: formData.gradYear,
            budget: formData.budget,
            courseSample
          })
        }
      )

      const result = await response.json()

      console.log('AI Response:', result)

      if (!result.success) {
        console.error('AI Error:', result.error)
        throw new Error(result.error || 'Failed to process filters')
      }

      const { filters } = result

      console.log('Generated Filters:', filters)

      // Build query parameters from AI-generated filters
      const params = new URLSearchParams()
      
      // Handle multiple countries
      if (filters.countries && filters.countries.length > 0) {
        filters.countries.forEach((country: string) => {
          params.append('country', country)
        })
        console.log('✓ Country filters:', filters.countries)
      }
      
      if (filters.level) {
        params.append('level', filters.level)
        console.log('✓ Level filter:', filters.level)
      }
      
      if (filters.course) {
        params.append('course', filters.course)
        console.log('✓ Course filter:', filters.course)
      }
      
      if (filters.duration) {
        params.append('duration', filters.duration)
        console.log('✓ Duration filter:', filters.duration)
      }

      // Handle multiple intakes
      if (filters.intakes && filters.intakes.length > 0) {
        filters.intakes.forEach((intake: string) => {
          params.append('intake', intake)
        })
        console.log('✓ Intake filters:', filters.intakes)
      }

      if (filters.searchQuery) {
        params.append('search', filters.searchQuery)
        console.log('✓ Search query:', filters.searchQuery)
      }

      if (filters.maxBudgetUSD) {
        params.append('maxBudget', filters.maxBudgetUSD.toString())
        console.log('✓ Budget filter:', filters.maxBudgetUSD)
      }
      
      const finalUrl = `/courses?${params.toString()}`
      console.log('Navigating to:', finalUrl)
      
      // Navigate to courses page with AI-generated filters
      router.push(finalUrl)

    } catch (error: any) {
      console.error('Error processing filters:', error)
      alert(`Failed to process your preferences: ${error.message}`)
    } finally {
      setProcessingFilters(false)
    }
  }

  const [formData, setFormData] = useState({
    countries: [] as string[],
    degree: "",
    fields: [] as string[],
    intakes: [] as string[], // NEW: Added intakes
    completedDegree: "",
    cgpa: 0.0,
    gradYear: "2025",
    budget: [20],
    name: "",
    email: "",
    phone: ""
  })

  const progress = (step / totalSteps) * 100

  const matches = useMemo(() => {
    if (!formData.countries.length) return universitiesData.length
    return universitiesData.filter(u =>
      formData.countries.includes(u.country_name)
    ).length
  }, [formData.countries])

  const toggleValue = (key: "countries" | "fields" | "intakes", value: string) => {
    setFormData(prev => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter(v => v !== value)
        : [...prev[key], value]
    }))
  }

  const canProceed = () => {
    switch(step) {
      case 1: return formData.countries.length > 0
      case 2: return formData.degree !== ""
      case 3: return formData.fields.length > 0
      case 4: return formData.intakes.length > 0 // NEW: Intake validation
      case 5: return formData.completedDegree !== "" && formData.cgpa > 0 && formData.gradYear !== ""
      case 6: return formData.budget[0] > 0
      case 7: return formData.name.trim() !== "" && formData.email.trim() !== "" && formData.phone.trim() !== ""
      default: return true
    }
  }

  const nextStep = () => {
    if (canProceed()) {
      setStep(s => Math.min(s + 1, totalSteps))
    }
  }
  
  const prevStep = () => setStep(s => Math.max(1, s - 1))

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-black text-[15px] selection:bg-primary/20">
      
      {/* ===== REFINED HEADER ===== */}
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

      {/* ===== MAIN CONTENT ===== */}
      <div className="container mx-auto px-4 pt-12 pb-40 max-w-6xl grid lg:grid-cols-12 gap-12">

        {/* ===== SIDEBAR ===== */}
        <aside className="lg:col-span-4 hidden lg:block">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sticky top-32 shadow-sm space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-bold">Summary</h3>
              <Badge className="bg-primary/10 text-primary border-none">{matches} Unis</Badge>
            </div>

            <Summary icon={Globe} label="Countries" value={formData.countries.join(", ")} />
            <Summary icon={Target} label="Degree" value={formData.degree} />
            <Summary icon={Layout} label="Fields" value={formData.fields.join(", ")} />
            <Summary icon={Calendar} label="Intakes" value={formData.intakes.join(", ")} />
            <Summary icon={GraduationCap} label="Completed" value={formData.completedDegree} />
            <Summary icon={Trophy} label="Performance" value={`${formData.cgpa} CGPA (${formData.gradYear})`} />
            <Summary icon={Wallet} label="Budget" value={`₹${formData.budget[0]}L / year`} />
          </div>
        </aside>

        {/* ===== STEPS PANELS ===== */}
        <main className="lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="space-y-2">
                <span className="text-primary font-bold text-xs uppercase tracking-widest">Step 0{step}</span>
                <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  {[
                    "Where do you want to study?",
                    "What's your academic goal?",
                    "What sparks your interest?",
                    "When do you want to start?", // NEW: Intake step
                    "Your academic background",
                    "What's your financial plan?",
                    "Let's finalize your report"
                  ][step - 1]}
                </h2>
              </div>

              {/* STEP 1: COUNTRIES */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="relative max-w-md group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                      className="pl-12 h-14 bg-white dark:bg-slate-900 rounded-xl"
                      placeholder="Search country..."
                      onChange={e => setSearch(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {countriesData
                      .filter(c => c.country_name.toLowerCase().includes(search.toLowerCase()))
                      .map(c => (
                        <button
                          key={c.country_id}
                          onClick={() => toggleValue("countries", c.country_name)}
                          className={`group relative p-6 rounded-2xl border transition-all flex flex-col items-center gap-4
                          ${formData.countries.includes(c.country_name) ? "border-primary bg-primary/[0.03] ring-1 ring-primary" : "bg-white dark:bg-slate-900 hover:border-primary/50"}`}
                        >
                          <img src={`https://flagcdn.com/w80/${c.country_code.toLowerCase()}.png`} className="w-12 h-8 rounded object-cover shadow-sm" alt="" />
                          <span className="font-semibold text-sm">{c.country_name}</span>
                          {formData.countries.includes(c.country_name) && <Check className="absolute top-3 right-3 w-4 h-4 text-primary" />}
                        </button>
                      ))}
                  </div>
                  {formData.countries.length > 0 && (
                    <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        Selected {formData.countries.length} {formData.countries.length === 1 ? 'country' : 'countries'}: <strong>{formData.countries.join(", ")}</strong>
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 2: DEGREE */}
              {step === 2 && (
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { name: "Undergraduate", icon: GraduationCap, desc: "Bachelor's Degrees" },
                    { name: "Postgraduate", icon: BookOpen, desc: "Master's & PG Diplomas" },
                    { name: "Doctorate", icon: Microscope, desc: "Research & PhD" },
                    { name: "Diploma", icon: FileText, desc: "Specialized Courses" }
                  ].map(d => (
                    <button
                      key={d.name}
                      onClick={() => setFormData({ ...formData, degree: d.name })}
                      className={`p-6 rounded-2xl border transition-all text-left flex items-start gap-4
                      ${formData.degree === d.name ? "border-primary bg-primary/[0.03] ring-1 ring-primary" : "bg-white dark:bg-slate-900 hover:border-primary/50"}`}
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary"><d.icon className="w-6 h-6" /></div>
                      <div className="flex-1">
                        <div className="font-bold text-lg">{d.name}</div>
                        <div className="text-sm text-muted-foreground">{d.desc}</div>
                      </div>
                      {formData.degree === d.name && <Check className="w-5 h-5 text-primary" />}
                    </button>
                  ))}
                </div>
              )}

              {/* STEP 3: FIELDS */}
              {step === 3 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { name: "IT & Computer Science", icon: Monitor },
                    { name: "Business & Management", icon: Building2 },
                    { name: "Healthcare & Medicine", icon: Heart },
                    { name: "Psychology & Social", icon: Brain }
                  ].map(f => (
                    <button
                      key={f.name}
                      onClick={() => toggleValue("fields", f.name)}
                      className={`p-6 rounded-2xl border flex items-center gap-4 transition-all
                      ${formData.fields.includes(f.name) ? "border-primary bg-primary/5" : "bg-white dark:bg-slate-900"}`}
                    >
                      <f.icon className="w-6 h-6 text-primary" />
                      <span className="font-bold flex-1 text-left">{f.name}</span>
                      {formData.fields.includes(f.name) && <Check className="w-5 h-5 text-primary" />}
                    </button>
                  ))}
                </div>
              )}

              {/* STEP 4: INTAKES - NEW */}
              {step === 4 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[
                    "Fall 2025",
                    "Spring 2026",
                    "Fall 2026",
                    "Winter 2026",
                    "Summer 2026",
                    "Any Intake"
                  ].map(intake => (
                    <button
                      key={intake}
                      onClick={() => toggleValue("intakes", intake)}
                      className={`p-6 rounded-2xl border flex flex-col items-center gap-3 transition-all
                      ${formData.intakes.includes(intake) ? "border-primary bg-primary/5 ring-1 ring-primary" : "bg-white dark:bg-slate-900 hover:border-primary/50"}`}
                    >
                      <Calendar className="w-8 h-8 text-primary" />
                      <span className="font-bold text-sm text-center">{intake}</span>
                      {formData.intakes.includes(intake) && <Check className="w-5 h-5 text-primary" />}
                    </button>
                  ))}
                </div>
              )}

              {/* STEP 5: ACADEMICS */}
              {step === 5 && (
                <div className="max-w-md space-y-10">
                  <div className="space-y-4">
                    <label className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                      <GraduationCap className="w-4 h-4" /> Completed Degree
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {["High School", "Undergraduate", "Postgraduate", "Doctorate"].map(deg => (
                        <button
                          key={deg}
                          onClick={() => setFormData({ ...formData, completedDegree: deg })}
                          className={`py-4 px-3 rounded-xl border font-semibold text-sm transition-all
                          ${formData.completedDegree === deg ? "border-primary bg-primary text-white shadow-lg shadow-primary/20" : "bg-white dark:bg-slate-900 hover:border-primary/50"}`}
                        >
                          {deg}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                      <Trophy className="w-4 h-4" /> Current CGPA / Percentage
                    </label>
                    <div className="relative">
                       <Input
                        type="number"
                        className="h-16 text-2xl font-bold pl-6 rounded-2xl"
                        value={formData.cgpa}
                        onChange={e => setFormData({ ...formData, cgpa: +e.target.value })}
                        min="0"
                        max="10"
                        step="0.1"
                      />
                      <span className="absolute right-6 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">Out of 10</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> Graduation Year
                    </label>
                    <div className="flex gap-3">
                      {["2024", "2025", "2026", "2027"].map(y => (
                        <button
                          key={y}
                          onClick={() => setFormData({ ...formData, gradYear: y })}
                          className={`flex-1 py-4 rounded-xl border font-bold transition-all
                          ${formData.gradYear === y ? "border-primary bg-primary text-white shadow-lg shadow-primary/20" : "bg-white dark:bg-slate-900"}`}
                        >
                          {y}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 6: BUDGET */}
              {step === 6 && (
                <div className="max-w-xl p-8 rounded-[2rem] bg-gradient-to-br from-primary to-indigo-700 text-white shadow-2xl shadow-primary/30">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <p className="text-primary-foreground/80 text-sm font-bold uppercase tracking-widest">Yearly Tuition Budget</p>
                      <h3 className="text-5xl font-black mt-1">₹{formData.budget[0]}L<span className="text-xl opacity-60">/yr</span></h3>
                    </div>
                    <Wallet className="w-10 h-10 opacity-20" />
                  </div>
                  <Slider
                    value={formData.budget}
                    min={5}
                    max={80}
                    step={1}
                    onValueChange={v => setFormData({ ...formData, budget: v })}
                    className="py-4 cursor-pointer"
                  />
                  <div className="flex justify-between text-xs font-bold mt-4 opacity-70 uppercase tracking-tighter">
                    <span>Min: ₹5 Lakhs</span>
                    <span>Max: ₹80 Lakhs+</span>
                  </div>
                </div>
              )}

              {/* STEP 7: CONTACT */}
              {step === 7 && (
                <div className="max-w-md space-y-4">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input className="h-14 pl-12 rounded-xl" placeholder="Full Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input className="h-14 pl-12 rounded-xl" placeholder="Email Address" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input className="h-14 pl-12 rounded-xl" placeholder="Phone Number" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                  </div>
                  <p className="text-[12px] text-muted-foreground px-2">By clicking generate, you agree to receive a detailed AI analysis report via email.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* OTP Modal - Same as before */}
          {showOtpInput && (
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white dark:bg-slate-900 p-8 rounded-2xl w-full max-w-sm space-y-6 shadow-2xl"
              >
                {!verificationSuccess ? (
                  <>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Phone className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">
                        Enter OTP
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        We've sent a 6-digit code to {formData.phone}
                      </p>
                    </div>

                    <Input
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                      placeholder="Enter 6 digit OTP"
                      maxLength={6}
                      className="h-14 text-center text-xl tracking-widest font-bold"
                      autoFocus
                    />

                    <Button
                      onClick={handleVerifyOtp}
                      disabled={loading || otp.length !== 6}
                      className="w-full h-12"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Verifying...
                        </>
                      ) : (
                        "Verify OTP"
                      )}
                    </Button>

                    <button
                      onClick={() => {
                        setShowOtpInput(false)
                        setOtp("")
                      }}
                      className="text-sm text-muted-foreground w-full hover:text-foreground transition-colors"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <div className="text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4"
                      >
                        <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
                      </motion.div>
                      <h3 className="text-xl font-bold mb-2 text-green-600 dark:text-green-400">
                        Verification Successful! 🎉
                      </h3>
                      <p className="text-sm text-muted-foreground mb-6">
                        Your profile has been verified. Click below to view your personalized course recommendations.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <Button
                        onClick={handleViewResults}
                        disabled={processingFilters}
                        className="w-full h-12 gap-2"
                        size="lg"
                      >
                        {processingFilters ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            AI Processing...
                          </>
                        ) : (
                          <>
                            View Results
                            <ExternalLink className="w-4 h-4" />
                          </>
                        )}
                      </Button>
                      
                      <button
                        onClick={() => {
                          setShowOtpInput(false)
                          setVerificationSuccess(false)
                          setOtp("")
                        }}
                        disabled={processingFilters}
                        className="text-sm text-muted-foreground w-full hover:text-foreground transition-colors disabled:opacity-50"
                      >
                        Close
                      </button>
                    </div>
                  </>
                )}
              </motion.div>
            </div>
          )}
        </main>
      </div>

      {/* ===== STICKY FOOTER ===== */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 h-24 flex items-center justify-between">
          <button 
            onClick={prevStep} 
            className={`text-sm font-bold text-slate-500 hover:text-primary transition-colors ${step === 1 ? 'invisible' : 'visible'}`}
          >
            Back
          </button>
          <Button
            onClick={() => {
              if (step === totalSteps) {
                handleGenerateReport()
              } else {
                nextStep()
              }
            }}
            disabled={!canProceed() || loading}
            className="h-14 px-10 rounded-xl font-bold shadow-xl shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Sending...
              </>
            ) : (
              <>
                {step === totalSteps ? "Generate Full Report" : "Continue"}
                <ArrowRight className="ml-2 w-5 h-5" />
              </>
            )}
          </Button>
        </div>
      </footer>
    </div>
  )
}

function Summary({ label, value, icon: Icon }: { label: string; value: string; icon: any }) {
  return (
    <div className="flex gap-4">
      <div className="w-10 h-10 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400"><Icon className="w-5 h-5" /></div>
      <div className="flex-1 min-w-0">
        <div className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">{label}</div>
        <div className="font-semibold truncate text-slate-700 dark:text-slate-200">{value || "—"}</div>
      </div>
    </div>
  )
}