"use client"

import type { ChangeEvent, ComponentType, ReactNode } from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Phone,
  Check,
  Download,
  Copy,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  FilePenLine,
  CheckCircle2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const NEXT_PUBLIC_API_URL = "http://127.0.0.1:8000"

interface FormData {
  name: string
  targetProgram: string
  areaOfInterest: string
  careerGoal: string
  project1: string
  project2: string
  whyUniversity: string
  additionalInfo: string
}

const STEP_META = [
  {
    label: "Step 1",
    heading: "Personal and program information",
    description: "Start with the applicant profile and exact program details you want the SOP to target.",
    tip: "Use the official program name and university name exactly as listed on the institution website.",
  },
  {
    label: "Step 2",
    heading: "Projects and work experience",
    description: "Highlight the strongest evidence of your preparation, execution quality, and measurable outcomes.",
    tip: "Focus on impact. Mention the problem, your contribution, and what changed because of your work.",
  },
  {
    label: "Step 3",
    heading: "Motivation and final context",
    description: "Explain program fit clearly and add any supporting context that strengthens the narrative.",
    tip: "Name the academic reasons for your choice first, then use the additional section for anything distinctive.",
  },
]

const STEP_FEATURES = [
  "Tailored structure for university applications",
  "Focused prompts to improve academic relevance",
  "Editable output with copy and PDF export",
]

export default function SOPGeneratorPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    targetProgram: "",
    areaOfInterest: "",
    careerGoal: "",
    project1: "",
    project2: "",
    whyUniversity: "",
    additionalInfo: "",
  })
  const [sopText, setSopText] = useState("")
  const [generating, setGenerating] = useState(false)

  const [showOtpModal, setShowOtpModal] = useState(false)
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [otpLoading, setOtpLoading] = useState(false)
  const [verified, setVerified] = useState(false)
  const [copied, setCopied] = useState(false)

  const update = (key: keyof FormData, value: string) =>
    setFormData(prev => ({ ...prev, [key]: value }))

  const canProceed = () => {
    if (step === 1) return formData.name.trim() !== "" && formData.targetProgram.trim() !== ""
    if (step === 2) return formData.project1.trim() !== ""
    if (step === 3) return formData.whyUniversity.trim() !== ""
    return false
  }

  const handleProceed = async () => {
    if (step < 3) {
      setStep(s => s + 1)
      return
    }
    setGenerating(true)
    try {
      const res = await fetch(`${NEXT_PUBLIC_API_URL}/api/sop/generate/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (data.success) {
        setSopText(data.sop)
        setStep(4)
      } else {
        alert(data.error || "Failed to generate SOP. Please try again.")
      }
    } catch {
      alert("Server error. Please try again.")
    } finally {
      setGenerating(false)
    }
  }

  const handleSendOtp = async () => {
    setOtpLoading(true)
    try {
      const res = await fetch(`${NEXT_PUBLIC_API_URL}/api/sop/initiate/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone,
          targetProgram: formData.targetProgram,
        }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setOtpSent(true)
      } else {
        const errMsg = data.errors?.phone || data.errors?.name || data.message || "Failed to send OTP"
        alert(errMsg)
      }
    } catch {
      alert("Server error. Please try again.")
    } finally {
      setOtpLoading(false)
    }
  }

  const handleVerifyAndDownload = async () => {
    setOtpLoading(true)
    try {
      const res = await fetch(`${NEXT_PUBLIC_API_URL}/api/sop/verify/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setVerified(true)
        setShowOtpModal(false)
        setOtpSent(false)
        setOtp("")
        await triggerDownload()
      } else {
        alert(data.message || "Invalid or expired OTP")
      }
    } catch {
      alert("Verification failed. Please try again.")
    } finally {
      setOtpLoading(false)
    }
  }

  const triggerDownload = async () => {
    const { default: jsPDF } = await import("jspdf")
    const doc = new jsPDF({ unit: "mm", format: "a4" })
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    const margin = 20
    const maxWidth = pageWidth - margin * 2
    let y = 0

    doc.setFillColor(88, 28, 135)
    doc.rect(0, 0, pageWidth, 20, "F")
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(13)
    doc.setFont("helvetica", "bold")
    doc.text("Statement of Purpose", margin, 13)
    doc.setFontSize(8)
    doc.setFont("helvetica", "normal")
    doc.text("Generated by EdMaster AI", pageWidth - margin, 13, { align: "right" })

    y = 30
    doc.setTextColor(80, 80, 80)
    doc.setFontSize(10)
    doc.text(`Program: ${formData.targetProgram}`, margin, y)
    y += 6
    doc.text(`Candidate: ${formData.name}`, margin, y)
    y += 10

    doc.setDrawColor(220, 220, 220)
    doc.line(margin, y, pageWidth - margin, y)
    y += 10

    doc.setTextColor(30, 30, 30)
    doc.setFontSize(11)
    doc.setFont("helvetica", "normal")

    const paragraphs = sopText.split(/\n\n+/)
    for (const para of paragraphs) {
      const trimmed = para.trim()
      if (!trimmed) continue
      const lines = doc.splitTextToSize(trimmed, maxWidth)
      if (y + lines.length * 7 > pageHeight - 15) {
        doc.addPage()
        y = 20
      }
      doc.text(lines, margin, y)
      y += lines.length * 7 + 5
    }

    const totalPages = (doc.internal as any).getNumberOfPages()
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i)
      doc.setFontSize(8)
      doc.setTextColor(160, 160, 160)
      doc.text(`EdMaster AI - Page ${i} of ${totalPages}`, pageWidth / 2, pageHeight - 8, { align: "center" })
    }

    doc.save(`SOP_${formData.name.replace(/\s+/g, "_")}.pdf`)
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(sopText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (step === 4) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-background via-background to-secondary/40 pt-24 pb-16">
        <BackgroundGlow />

        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                  <Sparkles className="h-4 w-4" />
                  SOP Ready
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">
                  Review, refine, and export your statement of purpose.
                </h1>
                <p className="mt-4 text-base text-muted-foreground md:text-lg">
                  Your draft is generated and ready to use. Copy the text instantly or verify your number to unlock PDF download.
                </p>
              </div>

              <div className="grid gap-3 rounded-3xl border border-border/70 bg-card/80 p-5 shadow-sm backdrop-blur sm:grid-cols-2 lg:min-w-[320px]">
                <MetricCard label="Program" value={formData.targetProgram || "Not provided"} />
                <MetricCard label="Status" value={verified ? "Verified" : "Verification required"} />
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
              <div className="overflow-hidden rounded-[28px] border border-border/70 bg-card/90 shadow-xl backdrop-blur">
                <div className="flex flex-col gap-3 border-b border-border/70 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-foreground">Generated SOP</p>
                    <p className="text-sm text-muted-foreground">Structured from the information you submitted.</p>
                  </div>
                  <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                    {formData.name}
                  </span>
                </div>

                <div className="relative">
                  <div className="max-h-[70vh] overflow-y-auto px-6 py-6 whitespace-pre-line text-sm leading-7 text-foreground/85 sm:text-[15px]">
                    {sopText}
                  </div>
                  {!verified && (
                    <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-card via-card/95 to-transparent" />
                  )}
                </div>
              </div>

              <div className="space-y-5">
                <div className="rounded-[28px] border border-border/70 bg-card/85 p-6 shadow-sm backdrop-blur">
                  <p className="text-sm font-semibold text-foreground">Actions</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Export stays locked until phone verification is complete.
                  </p>

                  <div className="mt-5 space-y-3">
                    <button
                      onClick={handleCopy}
                      className="flex w-full items-center justify-center gap-2 rounded-2xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition hover:border-primary/30 hover:bg-secondary"
                    >
                      {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                      {copied ? "Copied" : "Copy SOP Text"}
                    </button>

                    {verified ? (
                      <button
                        onClick={triggerDownload}
                        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                      >
                        <Download className="h-4 w-4" />
                        Download PDF
                      </button>
                    ) : (
                      <button
                        onClick={() => setShowOtpModal(true)}
                        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                      >
                        <ShieldCheck className="h-4 w-4" />
                        Verify to Download
                      </button>
                    )}
                  </div>
                </div>

                <div className="rounded-[28px] border border-primary/15 bg-gradient-to-br from-primary/10 via-card to-card p-6 shadow-sm">
                  <p className="text-sm font-semibold text-foreground">What happens next</p>
                  <div className="mt-4 space-y-3">
                    <InfoRow
                      icon={FilePenLine}
                      title="Edit details"
                      text="Go back if you want to regenerate the SOP with stronger academic or project context."
                    />
                    <InfoRow
                      icon={ShieldCheck}
                      title="Verify phone"
                      text="OTP verification unlocks the PDF export flow and stores the lead in your system."
                    />
                    <InfoRow
                      icon={CheckCircle2}
                      title="Use as a draft"
                      text="Treat this as a strong first version and refine tone, facts, and university-specific details."
                    />
                  </div>
                </div>

                <button
                  onClick={() => {
                    setStep(3)
                    setSopText("")
                    setVerified(false)
                  }}
                  className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Edit submitted details
                </button>
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {showOtpModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-sm"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 18 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 18 }}
                className="w-full max-w-md rounded-[28px] border border-border/70 bg-card p-7 shadow-2xl"
              >
                <div className="mb-6">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Phone className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Verify to unlock PDF export</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Lead will be saved for <span className="font-medium text-foreground">{formData.name}</span>.
                  </p>
                </div>

                {!otpSent ? (
                  <div className="space-y-5">
                    <Field label="Phone Number">
                      <Input
                        placeholder="+91 9876543210"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        className="h-12 rounded-2xl border-border bg-background"
                        autoFocus
                      />
                    </Field>

                    <Button
                      onClick={handleSendOtp}
                      disabled={otpLoading || phone.trim() === ""}
                      className="h-12 w-full rounded-2xl bg-primary hover:bg-primary/90"
                    >
                      {otpLoading ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                          Sending OTP...
                        </>
                      ) : "Send OTP"}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <p className="text-sm text-muted-foreground">
                      Enter the 6-digit code sent to <span className="font-medium text-foreground">{phone}</span>.
                    </p>
                    <Input
                      value={otp}
                      onChange={e => setOtp(e.target.value.replace(/\D/g, ""))}
                      placeholder="000000"
                      maxLength={6}
                      className="h-16 rounded-2xl border-border bg-secondary text-center text-2xl font-bold tracking-[0.45em]"
                      autoFocus
                    />
                    <Button
                      onClick={handleVerifyAndDownload}
                      disabled={otpLoading || otp.length !== 6}
                      className="h-12 w-full rounded-2xl bg-primary hover:bg-primary/90"
                    >
                      {otpLoading ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                          Verifying...
                        </>
                      ) : "Verify & Download PDF"}
                    </Button>
                  </div>
                )}

                <button
                  onClick={() => {
                    setShowOtpModal(false)
                    setOtpSent(false)
                    setOtp("")
                  }}
                  className="mt-5 w-full text-sm font-medium text-muted-foreground transition hover:text-foreground"
                >
                  Cancel
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {verified && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-green-600 px-6 py-3 text-sm font-medium text-white shadow-lg"
            >
              <Check className="h-4 w-4" />
              Verified. Your PDF is downloading.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  const meta = STEP_META[step - 1]

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-background via-background to-secondary/40 pt-24 pb-32">
      <BackgroundGlow />

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid gap-8 xl:grid-cols-[300px_minmax(0,1fr)_320px]">
          <aside className="order-1 xl:order-1 xl:sticky xl:self-start">
            <div className="overflow-hidden rounded-[32px] border border-primary/15 bg-card/90 shadow-xl backdrop-blur">
              <div className="border-b border-border/70 bg-gradient-to-br from-primary/10 via-card to-card px-6 py-6">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                  <Sparkles className="h-4 w-4" />
                  AI SOP Generator
                </div>

                <h1 className="text-2xl font-bold tracking-tight text-foreground">
                  Build a polished SOP draft for your university application.
                </h1>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  Share your academic background, project highlights, and motivation. The tool converts that into a clean first draft you can refine.
                </p>
              </div>

              <div className="space-y-3 px-6 py-6">
                {STEP_FEATURES.map(feature => (
                  <div key={feature} className="flex items-start gap-3 rounded-2xl bg-background/80 px-4 py-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <p className="text-sm text-foreground/80">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <main className="order-3 xl:order-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.28 }}
                className="overflow-hidden rounded-[32px] border border-border/70 bg-card/90 shadow-xl backdrop-blur"
              >
                <div className="border-b border-border/70 px-6 py-6 sm:px-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">{meta.label}</p>
                  <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    {meta.heading}
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                    {meta.description}
                  </p>
                </div>

                <div className="px-6 py-6 sm:px-8 sm:py-8">
                  {step === 1 && (
                    <div className="grid gap-6 md:grid-cols-2">
                      <Field label="Name">
                        <Input
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={e => update("name", e.target.value)}
                          className="h-12 rounded-2xl border-border bg-background"
                        />
                      </Field>
                      <Field label="Career goal">
                        <Input
                          placeholder="Your long-term career direction"
                          value={formData.careerGoal}
                          onChange={e => update("careerGoal", e.target.value)}
                          className="h-12 rounded-2xl border-border bg-background"
                        />
                      </Field>
                      <Field label="Target program and university" className="md:col-span-2">
                        <Input
                          placeholder="MS in Computer Science at Stanford University"
                          value={formData.targetProgram}
                          onChange={e => update("targetProgram", e.target.value)}
                          className="h-12 rounded-2xl border-border bg-background"
                        />
                      </Field>
                      <Field label="Area of interest" className="md:col-span-2">
                        <Input
                          placeholder="Computer vision, robotics, finance, public policy, etc."
                          value={formData.areaOfInterest}
                          onChange={e => update("areaOfInterest", e.target.value)}
                          className="h-12 rounded-2xl border-border bg-background"
                        />
                      </Field>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-6">
                      <Field label="First project" hint="Describe the problem, your role, approach, and measurable result.">
                        <Textarea
                          placeholder="Example: I designed a ROS-based indoor mapping system, validated it against baseline methods, and presented the results at a research conference."
                          value={formData.project1}
                          onChange={e => update("project1", e.target.value)}
                          rows={7}
                        />
                      </Field>
                      <Field label="Work experience or second project" hint="Use this for internships, professional work, or another strong academic project.">
                        <Textarea
                          placeholder="Example: Built an energy optimization model that reduced consumption by 12% across pilot households and improved remote appliance monitoring."
                          value={formData.project2}
                          onChange={e => update("project2", e.target.value)}
                          rows={7}
                        />
                      </Field>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-6">
                      <Field label="Why this university?" hint="Mention faculty, curriculum, research strength, labs, or fit with your future goals.">
                        <Textarea
                          placeholder="Explain why this institution and program specifically fit your academic and professional trajectory."
                          value={formData.whyUniversity}
                          onChange={e => update("whyUniversity", e.target.value)}
                          rows={7}
                        />
                      </Field>
                      <Field label="Additional information" hint="Add achievements, volunteering, leadership, or context that improves the overall narrative.">
                        <Textarea
                          placeholder="Include anything useful that has not appeared above."
                          value={formData.additionalInfo}
                          onChange={e => update("additionalInfo", e.target.value)}
                          rows={7}
                        />
                      </Field>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </main>

          <aside className="order-2 xl:order-3 xl:sticky xl:top-24 xl:self-start">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-1">
              <div className="rounded-[30px] border border-border/70 bg-card/85 p-6 shadow-sm backdrop-blur">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-foreground">Progress</p>
                  <span className="text-sm text-muted-foreground">0{step} / 03</span>
                </div>

                <div className="mt-4 flex gap-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          i <= step ? "bg-primary" : "bg-transparent"
                        }`}
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-5 space-y-4">
                  {STEP_META.map((item, index) => {
                    const itemStep = index + 1
                    const active = itemStep === step
                    const complete = itemStep < step

                    return (
                      <div
                        key={item.heading}
                        className={`rounded-2xl border px-4 py-4 transition ${
                          active
                            ? "border-primary/30 bg-primary/5"
                            : "border-border/70 bg-background"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${
                              complete || active
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary text-secondary-foreground"
                            }`}
                          >
                            {complete ? <Check className="h-4 w-4" /> : `0${itemStep}`}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">{item.heading}</p>
                            <p className="mt-1 text-xs leading-5 text-muted-foreground">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="rounded-[30px] border border-border/70 bg-card/85 p-6 shadow-sm backdrop-blur">
                <p className="text-sm font-semibold text-foreground">Current step guidance</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Use this section to strengthen the final draft quality before generation.
                </p>

                <div className="mt-5 rounded-2xl border border-primary/15 bg-primary/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Prompt Tip</p>
                  <p className="mt-2 text-sm leading-6 text-foreground/80">{meta.tip}</p>
                </div>

                <div className="mt-4 rounded-2xl bg-background px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Current focus</p>
                  <p className="mt-2 text-sm font-medium text-foreground">{meta.heading}</p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{meta.description}</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <footer className="fixed bottom-0 left-0 right-0 z-40 border-t border-border/70 bg-background/88 backdrop-blur-xl">
        <div className="container mx-auto flex h-24 items-center justify-between gap-4 px-4">
          <div className="flex items-center gap-3">
            {step > 1 ? (
              <button
                onClick={() => setStep(s => s - 1)}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition hover:border-primary/30 hover:text-primary"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>
            ) : (
              <div className="text-sm text-muted-foreground">Complete all 3 sections for best results.</div>
            )}
          </div>

          <div className="hidden items-center gap-2 md:flex">
            {[1, 2, 3].map(i => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all ${
                  i === step ? "w-10 bg-primary" : i < step ? "w-6 bg-primary/50" : "w-6 bg-border"
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleProceed}
            disabled={!canProceed() || generating}
            className="inline-flex h-12 min-w-[168px] items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {generating ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Generating...
              </>
            ) : step === 3 ? "Generate SOP" : "Continue"}
          </button>
        </div>
      </footer>
    </div>
  )
}

function BackgroundGlow() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -right-32 top-0 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute left-0 top-1/3 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
    </div>
  )
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-background px-4 py-3">
      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
      <p className="mt-2 line-clamp-2 text-sm font-semibold text-foreground">{value}</p>
    </div>
  )
}

function InfoRow({
  icon: Icon,
  title,
  text,
}: {
  icon: ComponentType<{ className?: string }>
  title: string
  text: string
}) {
  return (
    <div className="flex gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-background text-primary">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">{text}</p>
      </div>
    </div>
  )
}

function Field({
  label,
  children,
  hint,
  className = "",
}: {
  label: string
  children: ReactNode
  hint?: string
  className?: string
}) {
  return (
    <div className={className}>
      <label className="mb-2 block text-sm font-medium text-foreground">{label}</label>
      {children}
      {hint && <p className="mt-2 text-xs leading-5 text-muted-foreground">{hint}</p>}
    </div>
  )
}

function Textarea({
  placeholder,
  value,
  onChange,
  rows = 5,
}: {
  placeholder: string
  value: string
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  rows?: number
}) {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows}
      className="w-full resize-none rounded-2xl border border-border bg-background px-4 py-3 text-sm leading-7 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15 placeholder:text-muted-foreground"
    />
  )
}
