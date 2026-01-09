"use client"

import { Hero, Features, Highlights, Audience, CTA, LearningModes } from "@/components/prep-hub"
import {
  BookOpen,
  Mic,
  PenTool,
  Clock,
  Award,
  GraduationCap,
  Briefcase,
  Globe,
  Laptop,
  Users,
} from "lucide-react"

export default function PTEPage() {
  return (
    <>
      {/* HERO */}
      <Hero
        title="Crack"
        highlight="PTE"
        description="Score high in PTE with AI-based practice, expert mentoring, and real test simulations."
      />

      {/* WHY JOIN */}
      <Features
        items={[
          {
            icon: Laptop,
            title: "Computer-Based Practice",
            desc: "Real PTE-style test environment for confidence.",
            bg: "bg-blue-50",
          },
          {
            icon: Award,
            title: "Certified PTE Trainers",
            desc: "Expert mentors with proven PTE success records.",
            bg: "bg-purple-50",
          },
          {
            icon: Clock,
            title: "Flexible Batches",
            desc: "Morning, evening & weekend classes.",
            bg: "bg-green-50",
          },
          {
            icon: Mic,
            title: "Speaking & Pronunciation",
            desc: "Fluency, clarity & accent training.",
            bg: "bg-pink-50",
          },
          {
            icon: PenTool,
            title: "Writing Evaluation",
            desc: "Templates & scoring-based feedback.",
            bg: "bg-yellow-50",
          },
          {
            icon: BookOpen,
            title: "All Modules Covered",
            desc: "Speaking, Writing, Reading & Listening.",
            bg: "bg-orange-50",
          },
        ]}
      />

      {/* COURSE HIGHLIGHTS */}
      <Highlights
        items={[
          {
            num: "01",
            title: "Speaking Strategies",
            desc: "Read aloud, repeat sentence, describe image & more.",
            color: "bg-blue-100 text-blue-700",
          },
          {
            num: "02",
            title: "Writing Templates",
            desc: "Summarize written text & essays with structure.",
            color: "bg-purple-100 text-purple-700",
          },
          {
            num: "03",
            title: "Reading Techniques",
            desc: "Reorder paragraphs, MCQs & fill in the blanks.",
            color: "bg-orange-100 text-orange-700",
          },
          {
            num: "04",
            title: "Listening Skills",
            desc: "Summarize spoken text, highlight incorrect words.",
            color: "bg-green-100 text-green-700",
          },
        ]}
      />

      {/* WHO IS THIS FOR */}
      <Audience
        items={[
          { icon: GraduationCap, text: "Students planning to study abroad" },
          { icon: Briefcase, text: "Professionals applying for PR or jobs" },
          { icon: Globe, text: "Visa & immigration applicants" },
          { icon: Users, text: "Fast-track English test aspirants" },
        ]}
      />

      {/* CTA */}
      <CTA
        title="Score High in PTE with Confidence 🚀"
        subtitle="Smart strategies, AI-based practice, and expert mentoring."
      />

      {/* LEARNING MODES */}
      <LearningModes
        items={[
          {
            title: "Live Online Classes",
            desc: "Trainer-led interactive sessions.",
            bg: "bg-blue-50",
          },
          {
            title: "Recorded Lessons",
            desc: "Revise anytime, anywhere.",
            bg: "bg-purple-50",
          },
          {
            title: "Blended Learning",
            desc: "Live + recordings + personal guidance.",
            bg: "bg-green-50",
          },
        ]}
      />
    </>
  )
}
