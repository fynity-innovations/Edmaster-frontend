"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
  ArrowRight,
  BookOpen,
  Mic,
  Users,
  Globe,
  Heart,
  Coffee,
  Briefcase,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { fadeInUp, staggerContainer } from "@/lib/motion"

export default function FrenchPage() {
  return (
    <div className="min-h-screen pt-28 pb-24">

      {/* ================= HERO (EDITORIAL STYLE) ================= */}
      <section className="py-28 bg-gradient-to-br from-rose-50 via-purple-50 to-indigo-50">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.span
              variants={fadeInUp}
              className="inline-block mb-4 px-4 py-1 rounded-full bg-rose-100 text-rose-600 text-sm font-medium"
            >
              French Language Program
            </motion.span>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight"
            >
              Learn French,  
              <span className="block text-primary">Live the Culture 🇫🇷</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-muted-foreground mb-8"
            >
              From everyday conversations to professional fluency, master French
              with immersive, real-life learning.
            </motion.p>

            <motion.div variants={fadeInUp}>
              <Button size="lg" className="rounded-full px-8" asChild>
                <Link href="/get-started">
                  Start Learning <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="hidden md:block"
          >
            <div className="p-10 rounded-3xl bg-white shadow-xl">
              <h3 className="font-bold mb-4">Why Learn French?</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>✔ Spoken in 30+ countries</li>
                <li>✔ Language of culture & art</li>
                <li>✔ Boosts global career</li>
                <li>✔ Travel with confidence</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= LIFESTYLE CARDS ================= */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12">
            French Is More Than a Language
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Coffee,
                title: "Daily Conversations",
                desc: "Speak naturally in cafés, streets, and social settings.",
              },
              {
                icon: Heart,
                title: "Cultural Expression",
                desc: "Understand films, music, and French lifestyle.",
              },
              {
                icon: Briefcase,
                title: "Career Advantage",
                desc: "Work with global companies & embassies.",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="p-8 rounded-2xl border bg-gradient-to-br from-white to-rose-50"
              >
                <item.icon className="w-8 h-8 text-rose-500 mb-4" />
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TIMELINE STYLE LEARNING ================= */}
      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold mb-14">Your Learning Journey</h2>

          {[
            {
              step: "01",
              title: "Basics & Pronunciation",
              desc: "Alphabet, sounds, greetings, and simple phrases.",
            },
            {
              step: "02",
              title: "Daily Conversations",
              desc: "Shopping, travel, food, and casual talk.",
            },
            {
              step: "03",
              title: "Grammar & Structure",
              desc: "Sentence formation & tenses.",
            },
            {
              step: "04",
              title: "Professional French",
              desc: "Emails, interviews, and presentations.",
            },
          ].map((item) => (
            <motion.div
              key={item.step}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex gap-6 items-start mb-10"
            >
              <div className="w-14 h-14 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-bold">
                {item.step}
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= WHO THIS IS FOR ================= */}
      <section className="py-24">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-6">
          {[
            { icon: Users, text: "Students & language lovers" },
            { icon: Globe, text: "Travel enthusiasts" },
            { icon: Briefcase, text: "Professionals & diplomats" },
            { icon: BookOpen, text: "Culture & literature fans" },
          ].map((item) => (
            <motion.div
              key={item.text}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex items-center gap-4 p-6 rounded-xl border bg-card"
            >
              <item.icon className="w-6 h-6 text-rose-500" />
              <span>{item.text}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-16 bg-gradient-to-r from-rose-500 to-purple-600">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6 text-white">
          <div>
            <h3 className="text-2xl font-bold">Start Your French Journey 🇫🇷</h3>
            <p className="text-white/90">
              Speak beautifully. Think globally.
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
