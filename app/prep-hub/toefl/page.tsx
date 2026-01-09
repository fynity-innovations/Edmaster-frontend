"use client"

import { Hero, Features, Highlights, Audience, CTA, LearningModes } from "@/components/prep-hub"
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
  Laptop,
} from "lucide-react"

export default function TOEFLPage() {
  return (
    <>
      {/* HERO */}
      <Hero
        title="Master"
        highlight="TOEFL"
        description="Score high on the TOEFL iBT with expert-led training, smart strategies, and real exam practice."
      />

      {/* WHY JOIN */}
      <Features
        items={[
          {
            icon: BookOpen,
            title: "All 4 Skills Covered",
            desc: "Reading, Listening, Speaking, and Writing modules in depth.",
            bg: "bg-blue-50",
          },
          {
            icon: Laptop,
            title: "TOEFL iBT Focused",
            desc: "Practice in a real computer-based test environment.",
            bg: "bg-purple-50",
          },
          {
            icon: Clock,
            title: "Flexible Schedules",
            desc: "Morning, evening, and weekend batches.",
            bg: "bg-green-50",
          },
          {
            icon: Award,
            title: "Certified TOEFL Trainers",
            desc: "Learn from experts with international training experience.",
            bg: "bg-orange-50",
          },
          {
            icon: Mic,
            title: "Speaking Practice",
            desc: "Independent & integrated speaking tasks with feedback.",
            bg: "bg-pink-50",
          },
          {
            icon: PenTool,
            title: "Writing Evaluation",
            desc: "Detailed corrections for integrated and academic essays.",
            bg: "bg-yellow-50",
          },
        ]}
      />

      {/* COURSE HIGHLIGHTS */}
      <Highlights
        items={[
          {
            num: "01",
            title: "Reading Techniques",
            desc: "Understand academic passages quickly and accurately.",
            color: "bg-blue-100 text-blue-700",
          },
          {
            num: "02",
            title: "Listening Skills",
            desc: "Master lectures, conversations, and note-taking.",
            color: "bg-purple-100 text-purple-700",
          },
          {
            num: "03",
            title: "Integrated Speaking",
            desc: "Respond fluently to academic prompts.",
            color: "bg-orange-100 text-orange-700",
          },
          {
            num: "04",
            title: "Academic Writing",
            desc: "Structure essays to meet TOEFL scoring criteria.",
            color: "bg-green-100 text-green-700",
          },
        ]}
      />

      {/* WHO IS THIS FOR */}
      <Audience
        items={[
          { icon: GraduationCap, text: "Students applying to US & Canadian universities" },
          { icon: Briefcase, text: "Professionals planning overseas careers" },
          { icon: Globe, text: "Candidates applying for study visas" },
          { icon: Users, text: "First-time and repeat TOEFL takers" },
        ]}
      />

      {/* CTA */}
      <CTA
        title="Ace the TOEFL with Confidence 🎯"
        subtitle="Expert strategies, mock tests, and real improvement."
      />

      {/* LEARNING MODES */}
      <LearningModes
        items={[
          {
            title: "Live Online Classes",
            desc: "Interactive TOEFL-focused sessions.",
            bg: "bg-blue-50",
          },
          {
            title: "Recorded Lessons",
            desc: "Revise anytime at your own pace.",
            bg: "bg-purple-50",
          },
          {
            title: "Blended Learning",
            desc: "Live + recordings + personal mentoring.",
            bg: "bg-green-50",
          },
        ]}
      />
    </>
  )
}
