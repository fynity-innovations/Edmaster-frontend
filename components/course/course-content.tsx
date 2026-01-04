"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import {
  ArrowRight,
  MapPin,
  Clock,
  DollarSign,
  Calendar,
  Languages,
  ChevronDown,
  CheckCircle,
  Briefcase,
  GraduationCap,
  Building2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { fadeInUp, staggerContainer } from "@/lib/motion"
import type { Course, University } from "@/lib/types"

interface CourseContentProps {
  course: Course
  university?: University
}

interface AccordionItemProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

function AccordionItem({ title, children, defaultOpen = false }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-card hover:bg-secondary/50 transition-colors"
      >
        <span className="font-semibold text-foreground">{title}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-4 bg-card border-t border-border">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function CourseContent({ course, university }: CourseContentProps) {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-primary/10 via-accent/5 to-background border border-border mb-12"
        >
          <motion.div
            variants={fadeInUp}
            className={`inline-block px-4 py-2 rounded-full text-sm font-medium mb-4 ${
              course.level === "Master"
                ? "bg-primary/20 text-primary"
                : course.level === "Bachelor"
                  ? "bg-accent/20 text-accent"
                  : "bg-secondary text-secondary-foreground"
            }`}
          >
            {course.level} Program
          </motion.div>

          <motion.h1 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {course.name}
          </motion.h1>

          <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
            {university && (
              <Link
                href={`/universities/${university.slug}`}
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Building2 className="w-4 h-4" />
                {course.universityName}
              </Link>
            )}
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {course.country}
            </span>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-foreground font-medium">{course.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-primary" />
              <span className="text-foreground font-medium">{course.tuition}</span>
            </div>
            <div className="flex items-center gap-2">
              <Languages className="w-5 h-5 text-primary" />
              <span className="text-foreground font-medium">{course.language}</span>
            </div>
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.h2 variants={fadeInUp} className="text-2xl font-bold text-foreground mb-4">
                About This Program
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-muted-foreground leading-relaxed">
                {course.description}
              </motion.p>
            </motion.div>

            {/* Start Dates */}
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.h2 variants={fadeInUp} className="text-2xl font-bold text-foreground mb-4">
                Start Dates
              </motion.h2>
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-3">
                {course.startDates.map((date) => (
                  <div
                    key={date}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary/50 border border-border"
                  >
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="text-foreground">{date}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Accordion Sections */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              <AccordionItem title="Entry Requirements" defaultOpen>
                <ul className="space-y-3">
                  {course.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{req}</span>
                    </li>
                  ))}
                </ul>
              </AccordionItem>

              <AccordionItem title="Career Prospects">
                <div className="flex flex-wrap gap-2">
                  {course.careerProspects.map((career) => (
                    <div
                      key={career}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm"
                    >
                      <Briefcase className="w-3 h-3" />
                      {career}
                    </div>
                  ))}
                </div>
              </AccordionItem>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="sticky top-24 p-6 rounded-2xl bg-card border border-border"
            >
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-primary mb-1">{course.tuition}</div>
                <div className="text-sm text-muted-foreground">Tuition Fee</div>
              </div>

              <div className="space-y-3 mb-6 text-sm">
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-medium text-foreground">{course.duration}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Level</span>
                  <span className="font-medium text-foreground">{course.level}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Language</span>
                  <span className="font-medium text-foreground">{course.language}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-muted-foreground">Next Intake</span>
                  <span className="font-medium text-foreground">{course.startDates[0]}</span>
                </div>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="animate-pulse-glow rounded-xl"
              >
                <Button className="w-full bg-primary hover:bg-primary/90" size="lg" asChild>
                  <Link href="/get-started">
                    Apply Now <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </motion.div>

              <p className="text-xs text-muted-foreground text-center mt-4">
                Free consultation with our expert counselors
              </p>
            </motion.div>

            {/* University Card */}
            {university && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-secondary/50 border border-border"
              >
                <Link href={`/universities/${university.slug}`} className="group">
                  <div className="flex items-center gap-4 mb-4">
                    <img src={university.logo || "/placeholder.svg"} alt="" className="w-12 h-12 rounded-xl" />
                    <div>
                      <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                        {university.name}
                      </h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {university.city}, {university.country}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-primary font-medium">
                    View University Profile <ArrowRight className="ml-1 w-4 h-4" />
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-card border border-border"
            >
              <h3 className="font-bold text-foreground mb-4">Explore More</h3>
              <div className="space-y-2">
                <Link
                  href="/courses"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <GraduationCap className="w-4 h-4" />
                  Browse All Courses
                </Link>
                <Link
                  href="/ai-tools"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Building2 className="w-4 h-4" />
                  Try Course Finder AI
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
