"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
  ArrowRight,
  Mic,
  Users,
  Award,
  Clock,
  BookOpen,
  MessageCircle,
  Briefcase,
  GraduationCap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { fadeInUp, staggerContainer } from "@/lib/motion"

export default function SpokenEnglishPage() {
  return (
    <div className="min-h-screen pt-28 pb-24">

      {/* ================= HERO ================= */}
      <section className="relative py-24 bg-gradient-to-br from-purple-100 via-pink-50 to-blue-50">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-extrabold mb-6"
            >
              Speak With <span className="text-primary">Confidence</span> 🚀
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-muted-foreground mb-10"
            >
              Build fluency, pronunciation, and confidence with our expert-led
              Spoken English program designed for students, professionals, and
              test aspirants.
            </motion.p>

            <motion.div variants={fadeInUp}>
              <Button size="lg" className="px-8 rounded-full" asChild>
                <Link href="/get-started">
                  Register Now <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================= WHY JOIN ================= */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12">
            Why Join Our <span className="text-primary">Spoken English</span> Course?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Mic,
                title: "Live Interactive Sessions",
                desc: "Practice speaking in real-time with certified trainers and instant feedback.",
                bg: "bg-purple-50",
              },
              {
                icon: Clock,
                title: "Flexible Learning Options",
                desc: "Attend online, offline, or hybrid classes at your convenience.",
                bg: "bg-blue-50",
              },
              {
                icon: Award,
                title: "6-Month Validity",
                desc: "Revisit sessions, access recordings, and strengthen your skills anytime.",
                bg: "bg-green-50",
              },
              {
                icon: Users,
                title: "Personalised Learning",
                desc: "Customized lessons based on your strengths and goals.",
                bg: "bg-yellow-50",
              },
              {
                icon: BookOpen,
                title: "Diverse Course Content",
                desc: "Grammar, vocabulary, conversations, presentations, and more.",
                bg: "bg-pink-50",
              },
              {
                icon: MessageCircle,
                title: "Practical Role Plays",
                desc: "Hands-on activities to apply English in real-life situations.",
                bg: "bg-orange-50",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={`p-6 rounded-2xl border ${item.bg}`}
              >
                <item.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= COURSE HIGHLIGHTS ================= */}
      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold mb-14">Course Highlights</h2>

          {[
            {
              num: "01",
              title: "Grammar & Sentence Structure",
              desc: "Master grammar basics and construct correct sentences.",
              color: "bg-purple-100 text-purple-700",
            },
            {
              num: "02",
              title: "Vocabulary Expansion",
              desc: "Learn words, phrases, and idioms to speak naturally.",
              color: "bg-blue-100 text-blue-700",
            },
            {
              num: "03",
              title: "Conversation Practice",
              desc: "Guided speaking sessions with real-life dialogues.",
              color: "bg-orange-100 text-orange-700",
            },
            {
              num: "04",
              title: "Interview Preparation",
              desc: "Answer confidently and professionally in interviews.",
              color: "bg-green-100 text-green-700",
            },
          ].map((item) => (
            <motion.div
              key={item.num}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex gap-6 items-start mb-8"
            >
              <div className={`w-16 h-16 flex items-center justify-center rounded-full text-2xl font-bold ${item.color}`}>
                {item.num}
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= WHO IS THIS FOR ================= */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12">
            This Program Is Perfect For
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: GraduationCap, text: "Students aiming for academic success" },
              { icon: Briefcase, text: "Professionals improving workplace communication" },
              { icon: Users, text: "Job seekers preparing for interviews" },
              { icon: MessageCircle, text: "Individuals building social confidence" },
              { icon: BookOpen, text: "Test aspirants (IELTS, TOEFL, PTE, Duolingo)" },
              { icon: Mic, text: "Regional-medium students transitioning to English" },
            ].map((item) => (
              <motion.div
                key={item.text}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex items-center gap-4 p-5 rounded-xl border bg-card"
              >
                <item.icon className="w-6 h-6 text-primary" />
                <span>{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA STRIP ================= */}
      <section className="py-16 bg-gradient-to-r from-purple-500 to-indigo-500">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6 text-white">
          <div>
            <h3 className="text-2xl font-bold">
              Speak Like a Pro, Not Like Google Translate 😉
            </h3>
            <p className="text-white/90">
              Sound natural, confident, and global.
            </p>
          </div>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/get-started">Enroll Now</Link>
          </Button>
        </div>
      </section>

      {/* ================= LEARNING MODES ================= */}
      <section className="py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Learn Anytime, Anywhere
          </h2>
          <p className="text-muted-foreground mb-12">
            Choose the learning mode that fits your lifestyle
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Live Online Classes",
                desc: "Real-time interaction from anywhere in the world",
                bg: "bg-purple-50",
              },
              {
                title: "Recorded Lessons",
                desc: "Access missed sessions anytime",
                bg: "bg-blue-50",
              },
              {
                title: "Blended Learning",
                desc: "Live + recorded with personal mentoring",
                bg: "bg-green-50",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={`p-6 rounded-2xl border ${item.bg}`}
              >
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
