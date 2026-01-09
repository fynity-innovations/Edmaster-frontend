"use client"

import { Hero } from "@/components/prep-hub/Hero"
import { Features } from "@/components/prep-hub/Features"
import { Highlights } from "@/components/prep-hub/Highlights"
import { CTA } from "@/components/prep-hub/CTA"
import {
  BookOpen,
  Headphones,
  Mic,
  PenTool,
  Clock,
  Award,
  GraduationCap,
  Briefcase,
  Globe,
  Users,
} from "lucide-react"

export default function IELTSPage() {
  return (
    <>
      {/* HERO */}
      <Hero
        title="Crack"
        highlight="IELTS"
        description="Achieve your target IELTS band score with expert guidance, real mock tests, and proven strategies."
        variant="professional"
      />

      {/* FEATURES */}
      <Features
        variant="grid"
        items={[
          {
            icon: BookOpen,
            title: "All 4 Modules Covered",
            desc: "Listening, Reading, Writing, and Speaking in depth.",
          },
          {
            icon: Award,
            title: "Certified Trainers",
            desc: "Learn from experts with real IELTS success records.",
          },
          {
            icon: Clock,
            title: "Flexible Batches",
            desc: "Morning, evening & weekend options.",
          },
          {
            icon: Globe,
            title: "Mock Tests",
            desc: "Real exam pattern tests with band analysis.",
          },
          {
            icon: Mic,
            title: "Speaking Practice",
            desc: "1-on-1 sessions with exam-style questions.",
          },
          {
            icon: PenTool,
            title: "Writing Feedback",
            desc: "Task 1 & 2 corrections by experts.",
          },
        ]}
      />

      {/* HIGHLIGHTS */}
      <Highlights
        variant="steps"
        items={[
          {
            num: "01",
            title: "Listening Skills",
            desc: "Understand accents, traps & question patterns.",
          },
          {
            num: "02",
            title: "Reading Strategies",
            desc: "Skimming, scanning & time management.",
          },
          {
            num: "03",
            title: "Writing Task 1 & 2",
            desc: "Band-descriptor based answer structures.",
          },
          {
            num: "04",
            title: "Speaking Fluency",
            desc: "Confidence for all 3 speaking parts.",
          },
        ]}
      />

      {/* CTA */}
      <CTA
        title="Target Your Dream IELTS Band 🎯"
        subtitle="Expert strategies, real mock tests, real improvement."
        variant="bold"
      />
    </>
  )
}
