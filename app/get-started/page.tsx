"use client"

import type React from "react"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle, User, Mail, Phone, GraduationCap, Globe, Calendar, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SearchableSelect } from "@/components/ui/searchable-select"
import { fadeInUp, staggerContainer } from "@/lib/motion"
import destinations from "@/data/countries.json"
import worldCountries from "@/data/world-countries.json"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"

const steps = [
  { id: 1, title: "Personal Info" },
  { id: 2, title: "Education" },
  { id: 3, title: "Preferences" },
  { id: 4, title: "Schedule" },
]

const INTAKE_SEASONS = ["Fall", "Winter", "Spring", "Summer"]

// Pre-filled intake year — a 4-digit box the student can type over.
const DEFAULT_INTAKE_YEAR = "2026"

// Matches the backend's phone rule: optional "+", then 9-15 digits.
const PHONE_RE = /^\+?\d{9,15}$/
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/
const NAME_RE = /^[A-Za-z\s'\-.]+$/

const todayISO = () => new Date().toISOString().split("T")[0]

type FormData = {
  firstName: string
  lastName: string
  email: string
  phone: string
  education: string
  country: string
  studyLevel: string
  preferredCountry: string
  intakeSeason: string
  intakeYear: string
  date: string
  time: string
}

type Errors = Partial<Record<keyof FormData, string>>

// Which fields belong to which step, so a server-side error can send the user back to it.
const STEP_FIELDS: Record<number, (keyof FormData)[]> = {
  1: ["firstName", "lastName", "email", "phone"],
  2: ["education", "country"],
  3: ["studyLevel", "preferredCountry", "intakeSeason", "intakeYear"],
  4: ["date", "time"],
}

function validateStep(step: number, data: FormData): Errors {
  const errors: Errors = {}

  if (step === 1) {
    if (!data.firstName.trim()) errors.firstName = "First name is required."
    else if (!NAME_RE.test(data.firstName.trim())) errors.firstName = "Use letters only — no digits or symbols."

    if (data.lastName.trim() && !NAME_RE.test(data.lastName.trim()))
      errors.lastName = "Use letters only — no digits or symbols."

    if (!data.email.trim()) errors.email = "Email is required."
    else if (!EMAIL_RE.test(data.email.trim())) errors.email = "Enter a valid email address."

    if (!data.phone.trim()) errors.phone = "Phone number is required."
    else if (!PHONE_RE.test(data.phone.replace(/[\s()\-]/g, "")))
      errors.phone = "Enter 9-15 digits, e.g. +919346421126."
  }

  if (step === 3) {
    const year = data.intakeYear.trim()
    if (year) {
      if (!/^\d{4}$/.test(year)) errors.intakeYear = "Enter a 4-digit year, e.g. 2026."
      else if (Number(year) < new Date().getFullYear()) errors.intakeYear = "Intake year can't be in the past."
      else if (Number(year) > new Date().getFullYear() + 10) errors.intakeYear = "That intake year is too far ahead."
    }
  }

  if (step === 4) {
    if (!data.date) errors.date = "Pick a preferred date."
    else if (data.date < todayISO()) errors.date = "Pick today or a future date."
    if (!data.time) errors.time = "Pick a preferred time."
  }

  return errors
}

export default function GetStartedPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    education: "",
    country: "",
    studyLevel: "",
    preferredCountry: "",
    intakeSeason: "",
    intakeYear: DEFAULT_INTAKE_YEAR,
    date: "",
    time: "",
  })
  const [errors, setErrors] = useState<Errors>({})
  const [formError, setFormError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const countryOptions = useMemo(
    () => worldCountries.map((c) => ({ value: c.name, label: c.name })),
    [],
  )
  const destinationOptions = useMemo(
    () =>
      [...destinations]
        .map((c) => ({ value: c.country_name, label: c.country_name }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    [],
  )
  const setField = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear a field's error as soon as the user edits it.
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev))
    setFormError("")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setField(e.target.name as keyof FormData, e.target.value)
  }

  const nextStep = () => {
    const stepErrors = validateStep(currentStep, formData)
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors)
      setFormError("Please fix the highlighted fields before continuing.")
      return
    }
    setErrors({})
    setFormError("")
    if (currentStep < 4) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    setErrors({})
    setFormError("")
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handleSubmit = async () => {
    // Re-check every step, not just the last one.
    const allErrors = [1, 2, 3, 4].reduce<Errors>(
      (acc, step) => ({ ...acc, ...validateStep(step, formData) }),
      {},
    )
    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors)
      const firstBadStep = [1, 2, 3, 4].find((s) => STEP_FIELDS[s].some((f) => allErrors[f]))
      setCurrentStep(firstBadStep ?? 1)
      setFormError("Please fix the highlighted fields before booking.")
      return
    }

    setIsSubmitting(true)
    setFormError("")

    const payload = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      // The backend rejects spaces, dashes and brackets — send digits and "+" only.
      phone: formData.phone.replace(/[\s()\-]/g, ""),
      education: formData.education,
      country: formData.country,
      studyLevel: formData.studyLevel,
      preferredCountry: formData.preferredCountry,
      intakeYear: [formData.intakeSeason, formData.intakeYear].filter(Boolean).join(" "),
      date: formData.date,
      time: formData.time,
    }

    try {
      const saveRes = await fetch(`${API_URL}/api/consultations/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!saveRes.ok) {
        // Surface per-field errors from the API and jump back to the step holding them.
        const body = await saveRes.json().catch(() => null)
        const fieldErrors: Errors = body?.errors ?? {}
        if (Object.keys(fieldErrors).length > 0) {
          setErrors(fieldErrors)
          const firstBadStep = [1, 2, 3, 4].find((s) => STEP_FIELDS[s].some((f) => fieldErrors[f]))
          setCurrentStep(firstBadStep ?? 1)
          setFormError("Please fix the highlighted fields and try again.")
        } else {
          setFormError(body?.message || "We couldn't book your consultation. Please try again.")
        }
        setIsSubmitting(false)
        return
      }

      // Email notification is best-effort — don't block the booking on it
      fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch(() => {})

      setIsSubmitted(true)
    } catch {
      setFormError("Cannot connect to the server. Please check your connection and try again.")
    }

    setIsSubmitting(false)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-10 h-10 text-primary" />
          </motion.div>
          <h1 className="text-3xl font-bold text-foreground mb-4">Consultation Booked!</h1>
          <p className="text-muted-foreground mb-8 max-w-md">
            Thank you for your interest! Our counselor will contact you within 24 hours to confirm your consultation.
          </p>
          <Button className="bg-primary hover:bg-primary/90" asChild>
            <a href="/">Return Home</a>
          </Button>
        </motion.div>
      </div>
    )
  }

  const inputClass = (field: keyof FormData) =>
    `w-full pl-10 pr-4 py-3 rounded-xl border bg-background text-foreground focus:ring-2 focus:ring-primary/20 ${
      errors[field] ? "border-destructive focus:border-destructive" : "border-border focus:border-primary"
    }`

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="text-center mb-12">
          <motion.h1 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Start Your Journey
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-muted-foreground">
            Book a free consultation with our expert counselors
          </motion.p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-12">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <motion.div
                    animate={{
                      scale: currentStep === step.id ? 1.1 : 1,
                      backgroundColor: currentStep >= step.id ? "var(--primary)" : "var(--secondary)",
                    }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                      currentStep >= step.id ? "text-primary-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {currentStep > step.id ? <CheckCircle className="w-5 h-5" /> : step.id}
                  </motion.div>
                  <span className="text-xs text-muted-foreground mt-2 hidden sm:block">{step.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className="flex-1 h-0.5 mx-2 bg-border">
                    <motion.div
                      className="h-full bg-primary"
                      initial={{ width: "0%" }}
                      animate={{ width: currentStep > step.id ? "100%" : "0%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="p-8 rounded-3xl bg-card border border-border"
        >
          {formError && (
            <div
              role="alert"
              className="mb-6 flex items-start gap-3 p-4 rounded-xl border border-destructive/30 bg-destructive/10 text-sm text-destructive"
            >
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <span>{formError}</span>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-foreground mb-6">Personal Information</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="text-sm text-muted-foreground mb-2 block">
                    First Name <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      id="firstName"
                      type="text"
                      name="firstName"
                      required
                      aria-invalid={!!errors.firstName}
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={inputClass("firstName")}
                      placeholder="John"
                    />
                  </div>
                  <FieldError message={errors.firstName} />
                </div>
                <div>
                  <label htmlFor="lastName" className="text-sm text-muted-foreground mb-2 block">
                    Last Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      id="lastName"
                      type="text"
                      name="lastName"
                      aria-invalid={!!errors.lastName}
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={inputClass("lastName")}
                      placeholder="Doe"
                    />
                  </div>
                  <FieldError message={errors.lastName} />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="text-sm text-muted-foreground mb-2 block">
                  Email <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    aria-invalid={!!errors.email}
                    value={formData.email}
                    onChange={handleInputChange}
                    className={inputClass("email")}
                    placeholder="john@example.com"
                  />
                </div>
                <FieldError message={errors.email} />
              </div>
              <div>
                <label htmlFor="phone" className="text-sm text-muted-foreground mb-2 block">
                  Phone <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    required
                    aria-invalid={!!errors.phone}
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={inputClass("phone")}
                    placeholder="+91 93464 21126"
                  />
                </div>
                <FieldError message={errors.phone} />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-foreground mb-6">Education Background</h2>
              <div>
                <label htmlFor="education" className="text-sm text-muted-foreground mb-2 block">
                  Highest Education
                </label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <select
                    id="education"
                    name="education"
                    value={formData.education}
                    onChange={handleInputChange}
                    className={`${inputClass("education")} appearance-none`}
                  >
                    <option value="">Select your education</option>
                    <option value="high-school">High School</option>
                    <option value="bachelors">Bachelor&apos;s Degree</option>
                    <option value="masters">Master&apos;s Degree</option>
                    <option value="phd">PhD</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="country" className="text-sm text-muted-foreground mb-2 block">
                  Country of Residence
                </label>
                <SearchableSelect
                  id="country"
                  options={countryOptions}
                  value={formData.country}
                  onChange={(v) => setField("country", v)}
                  placeholder="Select your country"
                  searchPlaceholder="Search countries..."
                  icon={<Globe className="w-5 h-5" />}
                  error={!!errors.country}
                />
                <FieldError message={errors.country} />
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-foreground mb-6">Study Preferences</h2>
              <div>
                <label htmlFor="studyLevel" className="text-sm text-muted-foreground mb-2 block">
                  Preferred Study Level
                </label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <select
                    id="studyLevel"
                    name="studyLevel"
                    value={formData.studyLevel}
                    onChange={handleInputChange}
                    className={`${inputClass("studyLevel")} appearance-none`}
                  >
                    <option value="">Select study level</option>
                    <option value="bachelors">Bachelor&apos;s</option>
                    <option value="masters">Master&apos;s</option>
                    <option value="phd">PhD</option>
                    <option value="diploma">Diploma</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="preferredCountry" className="text-sm text-muted-foreground mb-2 block">
                  Preferred Country
                </label>
                <SearchableSelect
                  id="preferredCountry"
                  options={destinationOptions}
                  value={formData.preferredCountry}
                  onChange={(v) => setField("preferredCountry", v)}
                  placeholder="Select preferred country"
                  searchPlaceholder="Search destinations..."
                  icon={<Globe className="w-5 h-5" />}
                  error={!!errors.preferredCountry}
                />
                <FieldError message={errors.preferredCountry} />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="intakeSeason" className="text-sm text-muted-foreground mb-2 block">
                    Target Intake
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <select
                      id="intakeSeason"
                      name="intakeSeason"
                      value={formData.intakeSeason}
                      onChange={handleInputChange}
                      className={`${inputClass("intakeSeason")} appearance-none`}
                    >
                      <option value="">Select intake</option>
                      {INTAKE_SEASONS.map((season) => (
                        <option key={season} value={season}>
                          {season}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="intakeYear" className="text-sm text-muted-foreground mb-2 block">
                    Intake Year
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      id="intakeYear"
                      name="intakeYear"
                      type="text"
                      inputMode="numeric"
                      maxLength={4}
                      autoComplete="off"
                      aria-invalid={!!errors.intakeYear}
                      value={formData.intakeYear}
                      // Digits only, capped at the 4 a year needs.
                      onChange={(e) => setField("intakeYear", e.target.value.replace(/\D/g, "").slice(0, 4))}
                      className={inputClass("intakeYear")}
                      placeholder={DEFAULT_INTAKE_YEAR}
                    />
                  </div>
                  <FieldError message={errors.intakeYear} />
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-foreground mb-6">Schedule Consultation</h2>
              <div>
                <label htmlFor="date" className="text-sm text-muted-foreground mb-2 block">
                  Preferred Date <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    id="date"
                    type="date"
                    name="date"
                    required
                    min={todayISO()}
                    aria-invalid={!!errors.date}
                    value={formData.date}
                    onChange={handleInputChange}
                    className={inputClass("date")}
                  />
                </div>
                <FieldError message={errors.date} />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  Preferred Time <span className="text-destructive">*</span>
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {["10:00 AM", "2:00 PM", "5:00 PM"].map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setField("time", time)}
                      className={`py-3 rounded-xl border transition-colors ${
                        formData.time === time
                          ? "bg-primary text-primary-foreground border-primary"
                          : errors.time
                            ? "border-destructive text-foreground hover:border-primary/50"
                            : "border-border hover:border-primary/50 text-foreground"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
                <FieldError message={errors.time} />
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            {currentStep > 1 ? (
              <Button variant="outline" onClick={prevStep} className="bg-transparent">
                Back
              </Button>
            ) : (
              <div />
            )}
            {currentStep < 4 ? (
              <Button onClick={nextStep} className="bg-primary hover:bg-primary/90">
                Continue <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="bg-primary hover:bg-primary/90" disabled={isSubmitting}>
                {isSubmitting ? "Booking..." : "Book Consultation"}
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return (
    <p className="mt-2 flex items-center gap-1.5 text-xs text-destructive">
      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
      {message}
    </p>
  )
}
