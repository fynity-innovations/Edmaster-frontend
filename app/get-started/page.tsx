"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle, User, Mail, Phone, GraduationCap, Globe, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { fadeInUp, staggerContainer } from "@/lib/motion"

const steps = [
  { id: 1, title: "Personal Info" },
  { id: 2, title: "Education" },
  { id: 3, title: "Preferences" },
  { id: 4, title: "Schedule" },
]

export default function GetStartedPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    education: "",
    country: "",
    studyLevel: "",
    preferredCountry: "",
    intakeYear: "",
    date: "",
    time: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsSubmitted(true);
      } else {
        alert("Failed to send email");
      }
    } catch (error) {
      alert("Something went wrong");
    }

    setIsSubmitting(false);
  };


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
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-foreground mb-6">Personal Information</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">First Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder="John"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Last Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder="Doe"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Phone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-foreground mb-6">Education Background</h2>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Highest Education</label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <select
                    name="education"
                    value={formData.education}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 appearance-none"
                  >
                    <option value="">Select your education</option>
                    <option value="high-school">High School</option>
                    <option value="bachelors">Bachelor's Degree</option>
                    <option value="masters">Master's Degree</option>
                    <option value="phd">PhD</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Country of Residence</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="United States"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-foreground mb-6">Study Preferences</h2>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Preferred Study Level</label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <select
                    name="studyLevel"
                    value={formData.studyLevel}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 appearance-none"
                  >
                    <option value="">Select study level</option>
                    <option value="bachelors">Bachelor's</option>
                    <option value="masters">Master's</option>
                    <option value="phd">PhD</option>
                    <option value="diploma">Diploma</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Preferred Country</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <select
                    name="preferredCountry"
                    value={formData.preferredCountry}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 appearance-none"
                  >
                    <option value="">Select preferred country</option>
                    <option value="uk">United Kingdom</option>
                    <option value="usa">United States</option>
                    <option value="canada">Canada</option>
                    <option value="australia">Australia</option>
                    <option value="germany">Germany</option>
                    <option value="ireland">Ireland</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Target Intake Year</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <select
                    name="intakeYear"
                    value={formData.intakeYear}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 appearance-none"
                  >
                    <option value="">Select intake year</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-foreground mb-6">Schedule Consultation</h2>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Preferred Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Preferred Time</label>
                <div className="grid grid-cols-3 gap-3">
                  {["10:00 AM", "2:00 PM", "5:00 PM"].map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setFormData({ ...formData, time })}
                      className={`py-3 rounded-xl border transition-colors ${
                        formData.time === time
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-border hover:border-primary/50 text-foreground"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
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
