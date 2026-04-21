"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Phone, Check, Download, Copy, FileText, ArrowLeft } from "lucide-react"
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
    label: "PERSONAL & PROGRAM INFORMATION",
    heading: "Share your background and target program details.",
    tip: "Be specific about the program name as listed on the university website. Explore faculty research and mention professors whose work aligns with your interests.",
    owlMood: "curious",
  },
  {
    label: "PROJECTS & WORK EXPERIENCE",
    heading: "Showcase your key projects or work experiences and outcomes.",
    tip: "Quantify your achievements where possible — mention the problem you solved, your approach, and the measurable impact or outcome of each project.",
    owlMood: "search",
  },
  {
    label: "MOTIVATION & ADDITIONAL DETAILS",
    heading: "Explain your university choice and share any extra relevant details.",
    tip: "Mention specific reasons like program strengths, faculty, or campus culture. Use the additional section to highlight anything not covered elsewhere.",
    owlMood: "read",
  },
]

function OwlMascot({ mood }: { mood: string }) {
  const expressions: Record<string, string> = {
    curious: "❓",
    search: "🔍",
    read: "📖",
    trophy: "🏆",
  }
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <div className="w-28 h-28 rounded-full bg-violet-100 flex items-center justify-center shadow-lg">
          <span className="text-5xl select-none">🦉</span>
        </div>
        <div className="absolute -top-1 -right-1 w-9 h-9 bg-amber-400 rounded-full flex items-center justify-center shadow text-lg">
          {expressions[mood] || "✨"}
        </div>
      </div>
    </div>
  )
}

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

  // OTP verification state
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

    // Header bar
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

    // Footer on each page
    const totalPages = (doc.internal as any).getNumberOfPages()
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i)
      doc.setFontSize(8)
      doc.setTextColor(160, 160, 160)
      doc.text(`EdMaster AI — Page ${i} of ${totalPages}`, pageWidth / 2, pageHeight - 8, { align: "center" })
    }

    doc.save(`SOP_${formData.name.replace(/\s+/g, "_")}.pdf`)
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(sopText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // ── Step 4: SOP Result ───────────────────────────────────────────────────────
  if (step === 4) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-10">
            <p className="text-violet-600 font-semibold text-xs tracking-widest uppercase mb-4">
              Your AI-Generated Statement of Purpose
            </p>
            <div className="flex items-center justify-center gap-4 mb-2">
              <span className="text-4xl">🦉</span>
              <h1 className="text-2xl sm:text-3xl font-bold text-left leading-snug">
                Review your SOP below. You can copy or download it when you&apos;re ready.
              </h1>
            </div>
          </div>

          {/* SOP Card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-6">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-bold text-base text-gray-800">Generated SOP</h2>
              <span className="text-xs text-gray-400">{formData.targetProgram}</span>
            </div>
            <div className="relative">
              <div className="px-6 py-6 whitespace-pre-line text-sm leading-relaxed text-gray-700">
                {sopText}
              </div>
              {!verified && (
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleCopy}
              className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors text-sm"
            >
              {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy Text"}
            </button>

            {verified ? (
              <button
                onClick={triggerDownload}
                className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold transition-colors text-sm"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            ) : (
              <button
                onClick={() => setShowOtpModal(true)}
                className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold transition-colors text-sm"
              >
                <FileText className="w-4 h-4" />
                Get PDF Document
              </button>
            )}
          </div>

          {!verified && (
            <p className="text-center text-xs text-gray-400 mt-3">
              Verify your phone number to unlock the full SOP and download the PDF
            </p>
          )}

          <button
            onClick={() => { setStep(3); setSopText(""); setVerified(false) }}
            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 mt-8 mx-auto transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Edit details
          </button>
        </div>

        {/* OTP Modal */}
        <AnimatePresence>
          {showOtpModal && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white p-8 rounded-2xl w-full max-w-sm space-y-5 shadow-2xl"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-7 h-7 text-violet-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-1">Verify to Download</h3>
                  <p className="text-sm text-gray-500">
                    Name: <span className="font-semibold text-gray-800">{formData.name}</span>
                  </p>
                </div>

                {!otpSent ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <Input
                        placeholder="+91 9876543210"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        className="h-12 rounded-xl"
                        autoFocus
                      />
                    </div>
                    <Button
                      onClick={handleSendOtp}
                      disabled={otpLoading || phone.trim() === ""}
                      className="w-full h-12 rounded-xl bg-violet-600 hover:bg-violet-700"
                    >
                      {otpLoading ? (
                        <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin mr-2" />Sending…</>
                      ) : "Send OTP"}
                    </Button>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-center text-gray-500">
                      We sent a 6-digit code to{" "}
                      <span className="font-semibold text-gray-800">{phone}</span>
                    </p>
                    <Input
                      value={otp}
                      onChange={e => setOtp(e.target.value.replace(/\D/g, ""))}
                      placeholder="• • • • • •"
                      maxLength={6}
                      className="h-16 text-center text-2xl tracking-[0.5em] font-bold rounded-xl bg-slate-50"
                      autoFocus
                    />
                    <Button
                      onClick={handleVerifyAndDownload}
                      disabled={otpLoading || otp.length !== 6}
                      className="w-full h-12 rounded-xl bg-violet-600 hover:bg-violet-700"
                    >
                      {otpLoading ? (
                        <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin mr-2" />Verifying…</>
                      ) : "Verify & Download PDF"}
                    </Button>
                  </>
                )}

                <button
                  onClick={() => { setShowOtpModal(false); setOtpSent(false); setOtp("") }}
                  className="w-full text-sm text-gray-400 hover:text-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success toast */}
        <AnimatePresence>
          {verified && (
            <motion.div
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }}
              className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 text-sm font-medium z-50"
            >
              <Check className="w-4 h-4" /> Verified! Your PDF is downloading.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  // ── Steps 1–3 ────────────────────────────────────────────────────────────────
  const meta = STEP_META[step - 1]

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 flex overflow-hidden">

        {/* Left panel — owl + tips */}
        <aside className="hidden lg:flex flex-col items-center pt-20 px-8 w-72 shrink-0 gap-8">
          <OwlMascot mood={meta.owlMood} />
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 w-full">
            <p className="font-semibold text-sm text-amber-900 mb-2">Tips</p>
            <p className="text-sm text-amber-800 leading-relaxed">{meta.tip}</p>
          </div>
        </aside>

        {/* Right panel — form */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-2xl mx-auto pt-16 pb-36 px-6 lg:px-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.28 }}
              >
                <p className="text-violet-600 font-semibold text-xs tracking-widest uppercase mb-4">
                  {meta.label}
                </p>
                <h1 className="text-2xl sm:text-3xl font-bold mb-10 leading-snug">
                  {meta.heading}
                </h1>

                {step === 1 && (
                  <div className="space-y-6">
                    <Field label="Name">
                      <Input
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={e => update("name", e.target.value)}
                        className="h-14 rounded-xl border-gray-200 text-sm"
                      />
                    </Field>
                    <Field label="Target program and university">
                      <Input
                        placeholder="eg. MS in Computer Science at Stanford"
                        value={formData.targetProgram}
                        onChange={e => update("targetProgram", e.target.value)}
                        className="h-14 rounded-xl border-gray-200 text-sm"
                      />
                    </Field>
                    <Field label="Area of interest">
                      <Input
                        placeholder="eg. Computer Vision for Healthcare"
                        value={formData.areaOfInterest}
                        onChange={e => update("areaOfInterest", e.target.value)}
                        className="h-14 rounded-xl border-gray-200 text-sm"
                      />
                    </Field>
                    <Field label="Career goal">
                      <Input
                        placeholder="eg. I want to work as an AI researcher"
                        value={formData.careerGoal}
                        onChange={e => update("careerGoal", e.target.value)}
                        className="h-14 rounded-xl border-gray-200 text-sm"
                      />
                    </Field>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <Field label="First project (Description, achievement / outcome)">
                      <Textarea
                        placeholder="eg. I analysed the problem of mapping an indoor environment, identified the limitations of current approaches through a literature survey, proposed a novel system that addressed some of these problems, and implemented it using ROS. This project led to a research paper I presented at an international conference."
                        value={formData.project1}
                        onChange={e => update("project1", e.target.value)}
                        rows={6}
                      />
                    </Field>
                    <Field label="Work experience / second project (Description, achievement / outcome)">
                      <Textarea
                        placeholder="eg. Developed a cost-effective AI system to reduce electricity consumption by 12% per household, enabling remote monitoring and efficient usage of household appliances."
                        value={formData.project2}
                        onChange={e => update("project2", e.target.value)}
                        rows={6}
                      />
                    </Field>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <Field label="Why do you want to apply to this university?">
                      <Textarea
                        placeholder="eg. Stanford has a wide range of CS electives and renowned faculty in AI research."
                        value={formData.whyUniversity}
                        onChange={e => update("whyUniversity", e.target.value)}
                        rows={6}
                      />
                    </Field>
                    <Field label="Any additional information">
                      <Textarea
                        placeholder="eg. I like photography. I also volunteered to help differently abled people with accessible software."
                        value={formData.additionalInfo}
                        onChange={e => update("additionalInfo", e.target.value)}
                        rows={6}
                      />
                    </Field>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* Sticky footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-200 z-40">
        <div className="max-w-4xl mx-auto h-20 flex items-center justify-between px-6">
          {/* Back */}
          {step > 1 ? (
            <button
              onClick={() => setStep(s => s - 1)}
              className="flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          ) : <div />}

          {/* Proceed */}
          <button
            onClick={handleProceed}
            disabled={!canProceed() || generating}
            className="w-44 h-12 rounded-full bg-black hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm transition-colors flex items-center justify-center gap-2"
          >
            {generating ? (
              <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Generating…</>
            ) : "Proceed"}
          </button>

          {/* Step dots */}
          <div className="flex items-center gap-1.5">
            {[1, 2, 3].map(i => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === step ? "w-6 bg-black" : i < step ? "w-2 bg-gray-400" : "w-2 bg-gray-200"
                }`}
              />
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-800 mb-2">{label}</label>
      {children}
    </div>
  )
}

function Textarea({
  placeholder, value, onChange, rows = 5,
}: {
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  rows?: number
}) {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows}
      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent placeholder:text-gray-400 leading-relaxed"
    />
  )
}
