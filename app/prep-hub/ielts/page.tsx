import {
  PrepHero,
  FeatureGrid,
  HighlightSteps,
  AudienceGrid,
  CTASection,
  LearningModes,
} from "@/components/prep-hub"

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
} from "lucide-react"

export default function IELTSPage() {
  return (
    <>
      {/* HERO */}
      <PrepHero
        title="Crack"
        highlight="IELTS"
        description="Achieve your target IELTS band score with expert-led training, real exam practice, and personalised feedback."
        ctaText="Enroll for IELTS"
      />

      {/* WHY JOIN */}
      <FeatureGrid
        features={[
          {
            title: "Complete 4-Module Training",
            description: "Listening, Reading, Writing, and Speaking covered in depth.",
            icon: BookOpen,
            bg: "bg-blue-50",
          },
          {
            title: "Certified IELTS Trainers",
            description: "Learn from mentors with proven IELTS success records.",
            icon: Award,
            bg: "bg-purple-50",
          },
          {
            title: "Flexible Batch Timings",
            description: "Weekday & weekend batches for students and professionals.",
            icon: Clock,
            bg: "bg-green-50",
          },
          {
            title: "Mock Tests & Band Evaluation",
            description: "Regular mock exams with detailed band score feedback.",
            icon: Globe,
            bg: "bg-orange-50",
          },
          {
            title: "Speaking Confidence Building",
            description: "1-on-1 speaking practice with real exam-style questions.",
            icon: Mic,
            bg: "bg-pink-50",
          },
          {
            title: "Writing Task Correction",
            description: "Detailed feedback for Task 1 & Task 2 essays.",
            icon: PenTool,
            bg: "bg-yellow-50",
          },
        ]}
      />

      {/* COURSE HIGHLIGHTS */}
      <HighlightSteps
        steps={[
          {
            number: "01",
            title: "Listening Strategies",
            description: "Understand accents, question patterns, and time management.",
            color: "bg-blue-100 text-blue-700",
          },
          {
            number: "02",
            title: "Reading Techniques",
            description: "Skimming, scanning, and answering complex passages efficiently.",
            color: "bg-purple-100 text-purple-700",
          },
          {
            number: "03",
            title: "Writing Task 1 & 2",
            description: "Structure essays and reports to meet band descriptors.",
            color: "bg-orange-100 text-orange-700",
          },
          {
            number: "04",
            title: "Speaking Practice",
            description: "Fluency, pronunciation, and confidence for all 3 parts.",
            color: "bg-green-100 text-green-700",
          },
        ]}
      />

      {/* WHO IS THIS FOR */}
      <AudienceGrid
        items={[
          { icon: GraduationCap, text: "Students planning to study abroad" },
          { icon: Briefcase, text: "Professionals migrating or working overseas" },
          { icon: Globe, text: "Candidates targeting PR or visas" },
          { icon: Headphones, text: "First-time & repeat IELTS test takers" },
        ]}
      />

      {/* CTA STRIP */}
      <CTASection
        title="Target Your Desired IELTS Band Score 🎯"
        subtitle="Structured preparation, expert guidance, and real exam confidence."
        buttonText="Start IELTS Prep"
        buttonLink="/get-started"
      />

      {/* LEARNING MODES */}
      <LearningModes
        modes={[
          {
            title: "Live Online Classes",
            description: "Trainer-led sessions with interactive practice.",
            bg: "bg-blue-50",
          },
          {
            title: "Recorded Lessons",
            description: "Revise anytime with session recordings.",
            bg: "bg-purple-50",
          },
          {
            title: "Blended Learning",
            description: "Live + recorded + personalised mentoring.",
            bg: "bg-green-50",
          },
        ]}
      />
    </>
  )
}
