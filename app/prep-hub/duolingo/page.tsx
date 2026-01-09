"use client"

import { motion } from "framer-motion"
import { ArrowRight, Headphones, Mic, Clock, Award, Laptop, Users, Globe } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { fadeInUp, staggerContainer } from "@/lib/motion"

export default function DuolingoPage() {
  return (
    <div className="min-h-screen pt-28 pb-24">

      {/* ================= HERO (SPLIT STYLE) ================= */}
      <section className="py-24 bg-gradient-to-r from-green-100 via-teal-50 to-emerald-50">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-extrabold mb-6">
              Crack the <span className="text-green-600">Duolingo</span> Test 🎯
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground mb-8">
              Fast, flexible, and globally accepted English test preparation with
              smart strategies and real practice.
            </motion.p>

            <motion.div variants={fadeInUp}>
              <Button size="lg" className="rounded-full px-8 bg-green-600 hover:bg-green-700" asChild>
                <Link href="/get-started">
                  Start Duolingo Prep <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="hidden md:block"
          >
            <div className="p-10 rounded-3xl bg-white shadow-xl">
              <h3 className="font-bold mb-4">Why Duolingo?</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>✔ Accepted by 4000+ universities</li>
                <li>✔ 1-hour online test</li>
                <li>✔ Quick results</li>
                <li>✔ Affordable & flexible</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= HORIZONTAL FEATURES ================= */}
      <section className="py-24">
        <div className="container mx-auto px-4 space-y-6">
          {[
            {
              icon: Laptop,
              title: "Adaptive Test Format",
              desc: "Questions adjust to your skill level dynamically.",
            },
            {
              icon: Clock,
              title: "Quick Results",
              desc: "Get your score within 48 hours.",
            },
            {
              icon: Mic,
              title: "Speaking Confidence",
              desc: "Real-time speaking and pronunciation practice.",
            },
            {
              icon: Award,
              title: "Certified Trainers",
              desc: "Learn from Duolingo-focused mentors.",
            },
          ].map((item) => (
            <motion.div
              key={item.title}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex items-center gap-6 p-6 rounded-2xl border bg-card"
            >
              <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center">
                <item.icon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= PROGRESS STYLE HIGHLIGHTS ================= */}
      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold mb-12">
            What You Will Master
          </h2>

          {[
            { title: "Listening", value: 90 },
            { title: "Reading", value: 85 },
            { title: "Speaking", value: 95 },
            { title: "Writing", value: 80 },
          ].map((item) => (
            <motion.div
              key={item.title}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-6"
            >
              <div className="flex justify-between mb-1 text-sm">
                <span>{item.title}</span>
                <span>{item.value}%</span>
              </div>
              <div className="w-full h-3 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-green-500"
                  style={{ width: `${item.value}%` }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= AUDIENCE ================= */}
      <section className="py-24">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-6">
          {[
            { icon: Users, text: "Students applying to US, Canada & Europe" },
            { icon: Globe, text: "Quick test-takers" },
            { icon: Mic, text: "Speaking-focused learners" },
            { icon: Headphones, text: "Listening skill builders" },
          ].map((item) => (
            <motion.div
              key={item.text}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex items-center gap-4 p-6 rounded-xl border bg-card"
            >
              <item.icon className="w-6 h-6 text-green-600" />
              <span>{item.text}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-16 bg-gradient-to-r from-green-500 to-emerald-600">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6 text-white">
          <div>
            <h3 className="text-2xl font-bold">Get Duolingo Ready in Weeks 🚀</h3>
            <p className="text-white/90">
              Smart prep, fast results, real confidence.
            </p>
          </div>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/get-started">Enroll Now</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
