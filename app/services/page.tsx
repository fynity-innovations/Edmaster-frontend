"use client"

import type React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, GraduationCap, FileText, Stamp, PenTool, Award, Plane, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { fadeInUp, staggerContainer } from "@/lib/motion"
import services from "@/data/services.json"

const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  GraduationCap,
  FileText,
  Stamp,
  PenTool,
  Award,
  Plane,
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="text-center mb-16">
          <motion.span
            variants={fadeInUp}
            className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
          >
            Our Services
          </motion.span>
          <motion.h1 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Comprehensive Study Abroad Support
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From your first consultation to your departure, we provide end-to-end support for your international
            education journey
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {services.map((service, index) => {
            const Icon = icons[service.icon] || GraduationCap
            return (
              <motion.div key={service.id} variants={fadeInUp}>
                <motion.div
                  whileHover={{ y: -10 }}
                  className="group h-full p-8 rounded-3xl bg-card border border-border hover:border-primary/50 hover:shadow-xl transition-all"
                >
                  {/* Icon */}
                  <motion.div
                    className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors"
                    whileHover={{ rotate: 5, scale: 1.05 }}
                  >
                    <Icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors" />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground mb-6">{service.description}</p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="mt-auto">
                    <span className="flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all">
                      Learn More <ArrowRight className="w-4 h-4 ml-1" />
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Process Section */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-16 px-8 rounded-3xl bg-gradient-to-br from-primary/10 via-accent/5 to-background border border-border"
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">How We Work</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our streamlined process ensures you get the best guidance at every step
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto"
          >
            {[
              { step: "01", title: "Free Consultation", desc: "Discuss your goals and get expert advice" },
              { step: "02", title: "Profile Assessment", desc: "We analyze your profile for best matches" },
              { step: "03", title: "Application Process", desc: "End-to-end support for applications" },
              { step: "04", title: "Visa & Departure", desc: "Complete assistance until you fly" },
            ].map((item, index) => (
              <motion.div key={item.step} variants={fadeInUp} className="text-center">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 rounded-full bg-primary text-primary-foreground text-2xl font-bold flex items-center justify-center mx-auto mb-4"
                >
                  {item.step}
                </motion.div>
                <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-foreground mb-4">
            Ready to Start Your Journey?
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Book a free consultation with our expert counselors and take the first step towards your international
            education dream.
          </motion.p>
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button size="lg" className="bg-primary hover:bg-primary/90 px-8" asChild>
                <Link href="/get-started">
                  Book Free Consultation <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button size="lg" variant="outline" className="px-8 bg-transparent" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
