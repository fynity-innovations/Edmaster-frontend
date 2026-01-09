"use client"

import { Hero } from "@/components/prep-hub/Hero"
import { Features } from "@/components/prep-hub/Features"
import { Highlights } from "@/components/prep-hub/Highlights"
import { CTA } from "@/components/prep-hub/CTA"
import {
  Factory,
  Briefcase,
  Globe,
  Users,
  BookOpen,
  Mic,
  ShieldCheck,
} from "lucide-react"

export default function GermanPage() {
  return (
    <>
      {/* HERO */}
      <Hero
        title="Learn German."
        highlight="Build Your Future"
        description="Structured German language training for careers, education, and life in Germany."
        variant="industrial"
      />

      {/* FEATURES */}
      <Features
        variant="blocks"
        items={[
          {
            icon: Factory,
            title: "Industry Focused",
            desc: "German for engineering, healthcare & IT.",
          },
          {
            icon: ShieldCheck,
            title: "Exam Ready",
            desc: "A1 to B2 certification prep.",
          },
          {
            icon: Globe,
            title: "Study in Germany",
            desc: "Language support for public universities.",
          },
          {
            icon: Briefcase,
            title: "Job-Oriented",
            desc: "CVs, interviews & workplace German.",
          },
          {
            icon: Mic,
            title: "Speaking Fluency",
            desc: "Daily drills & pronunciation training.",
          },
          {
            icon: BookOpen,
            title: "Grammar Mastery",
            desc: "Sentence structure & cases.",
          },
        ]}
      />

      {/* HIGHLIGHTS */}
      <Highlights
        variant="progress"
        items={[
          {
            title: "Speaking",
            desc: "Confidence & clarity",
            value: 90,
          },
          {
            title: "Listening",
            desc: "Native comprehension",
            value: 85,
          },
          {
            title: "Grammar",
            desc: "Accuracy & structure",
            value: 95,
          },
          {
            title: "Professional Vocabulary",
            desc: "Workplace readiness",
            value: 88,
          },
        ]}
      />

      {/* CTA */}
      <CTA
        title="Build Your German Career 🇩🇪"
        subtitle="Serious learning. Serious results."
        variant="bold"
      />
    </>
  )
}
