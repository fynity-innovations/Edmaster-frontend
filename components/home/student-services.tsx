"use client"

import type React from "react"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, GraduationCap, FileText, Stamp, PenTool, Award, Plane } from "lucide-react"
import { fadeInUp, staggerContainer } from "@/lib/motion"

const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  GraduationCap,
  FileText,
  Stamp,
  PenTool,
  Award,
  Plane,
}

const services = [
  {
    icon: "GraduationCap",
    title: "University Selection",
    description: "Personalized recommendations based on your profile",
  },
  { icon: "FileText", title: "Application Support", description: "End-to-end assistance with your applications" },
  { icon: "Stamp", title: "Visa Assistance", description: "Expert guidance for visa success" },
  { icon: "PenTool", title: "Test Preparation", description: "IELTS, TOEFL, GRE, GMAT prep" },
  { icon: "Award", title: "Scholarships", description: "Find and apply for financial aid" },
  { icon: "Plane", title: "Pre-Departure", description: "Everything you need before you fly" },
]

export function StudentServices() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
          >
            Comprehensive Support
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Services That Make a Difference
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From your first consultation to your departure, we're with you every step of the way
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => {
            const Icon = icons[service.icon]
            return (
              <motion.div
                key={service.title}
                variants={fadeInUp}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all"
              >
                <motion.div
                  className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary transition-colors"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, delay: index * 0.2 }}
                >
                  <Icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                </motion.div>
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground">{service.description}</p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              View All Services
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
