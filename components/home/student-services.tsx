"use client"

import type React from "react"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, MessageCircle, ShieldCheck, Home, Plane, Banknote, Lock } from "lucide-react"
import { fadeInUp, staggerContainer } from "@/lib/motion"

const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  MessageCircle,
  ShieldCheck,
  Home,
  Plane,
  Banknote,
  Lock,
}

const services = [
  {
    icon: "MessageCircle",
    title: "Education Counselling",
    description: "1:1 guidance from certified counsellors",
    href: "/services/counselling",
  },
  {
    icon: "ShieldCheck",
    title: "Health Insurance",
    description: "Compliant student health cover for your destination",
    href: "/services/health-insurance",
  },
  {
    icon: "Home",
    title: "Accommodation Support",
    description: "Verified student housing near campus",
    href: "/services/accommodation",
  },
  {
    icon: "Plane",
    title: "Pre-departure Orientation",
    description: "Everything you need before you fly",
    href: "/services/orientation",
  },
  {
    icon: "Banknote",
    title: "Education Loan",
    description: "Collateral & non-collateral options for your offer",
    href: "/services/loan",
  },
  {
    icon: "Lock",
    title: "Block Account (Germany)",
    description: "Open your German blocked account quickly",
    href: "/services/block-account",
  },
]

export function StudentServices() {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <motion.div key={service.title} variants={fadeInUp} whileHover={{ y: -5, scale: 1.02 }}>
                <Link
                  href={service.href}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg"
                >
                  <motion.div
                    className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, delay: index * 0.2 }}
                  >
                    <Icon className="h-7 w-7 text-primary transition-colors group-hover:text-primary-foreground" />
                  </motion.div>
                  <h3 className="mb-2 text-xl font-bold text-foreground transition-colors group-hover:text-primary">
                    {service.title}
                  </h3>
                  <p className="flex-1 text-muted-foreground">{service.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    Learn more
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
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
