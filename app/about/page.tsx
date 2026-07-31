"use client"

import Link from "next/link"
import { motion, type Variants } from "framer-motion"
import {
  ArrowRight,
  Sparkles,
  Compass,
  ShieldCheck,
  HeartHandshake,
  Target,
  Globe,
  GraduationCap,
  Users,
  Clock,
  Award,
  Route,
} from "lucide-react"

const stats = [
  { value: "35+", label: "Countries served" },
  { value: "10,000+", label: "Students enrolled" },
  { value: "350+", label: "Partner universities" },
  { value: "13,000+", label: "Immigration cases" },
]

const values = [
  {
    icon: Compass,
    title: "Guidance, not guesswork",
    text: "Every recommendation is grounded in your profile, budget, and goals — never a one-size-fits-all template.",
  },
  {
    icon: ShieldCheck,
    title: "Honest and transparent",
    text: "Clear information on costs, deadlines, and requirements so you can make confident decisions.",
  },
  {
    icon: HeartHandshake,
    title: "With you end to end",
    text: "From shortlisting universities to landing in your new city, we stay with you at every step.",
  },
  {
    icon: Target,
    title: "Outcomes that matter",
    text: "We measure success by admits, visas approved, and students who thrive abroad — not clicks.",
  },
]

const differentiators = [
  {
    icon: Users,
    title: "Expert consultants",
    text: "Experienced advisors who simplify the entire process — from course and country selection to visa filing.",
  },
  {
    icon: Clock,
    title: "24/7 support",
    text: "Round-the-clock help for the challenges that come with planning a move abroad, wherever you are in the world.",
  },
  {
    icon: Award,
    title: "A proven track record",
    text: "13,000+ immigration cases handled by UConnect International, with a strong record of visas approved.",
  },
  {
    icon: Route,
    title: "Support at every stage",
    text: "Career counselling, university and course selection, application help, pre-departure briefings, and continued support once you've landed.",
  },
]

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      {/* ===================== HERO ===================== */}
      <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-20">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -right-40 -top-28 h-[560px] w-[560px] rounded-full bg-primary/10 blur-[130px]" />
          <div className="absolute -left-28 top-1/3 h-[420px] w-[420px] rounded-full bg-accent/10 blur-[120px]" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={container} className="max-w-3xl">
            <motion.span
              variants={item}
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
            >
              <Sparkles className="h-4 w-4" />
              About EdMaster
            </motion.span>

            <motion.h1
              variants={item}
              className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl"
            >
              Making a world-class education
              <br />
              <span className="text-primary">reachable for every student.</span>
            </motion.h1>

            <motion.p variants={item} className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              EdMaster is the study-abroad platform of{" "}
              <a
                href="https://www.uconnectinternational.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary underline-offset-4 hover:underline"
              >
                UConnect International
              </a>
              , helping students discover, compare, and apply to university programs around the world. We
              pair smart technology with human expertise so the path from ambition to admission feels
              clear, fair, and achievable.
            </motion.p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={container}
            className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4"
          >
            {stats.map((s) => (
              <motion.div
                key={s.label}
                variants={item}
                className="rounded-3xl border border-border/70 bg-card/80 px-6 py-7 text-center shadow-sm backdrop-blur"
              >
                <p className="text-3xl font-bold tracking-tight text-primary">{s.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===================== MISSION ===================== */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Our mission</h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                Studying abroad changes lives, but the process is often confusing, expensive, and full of
                conflicting advice. EdMaster was built by UConnect International — an education and
                immigration consultancy helping students study abroad since 1999 — to give students a
                single, trustworthy place to understand their options and act on them.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Our AI assistant turns your academic background and preferences into a focused shortlist of
                courses and universities. From there, UConnect International&apos;s counsellors help you
                refine it, prepare strong applications, and handle everything from scholarships and loans to
                visas and accommodation.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-[32px] border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-card p-8 shadow-sm lg:p-10"
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
              <Globe className="h-10 w-10 text-primary" />
              <p className="relative mt-6 text-xl font-semibold leading-relaxed">
                &ldquo;The right guidance at the right moment can be the difference between a dream deferred
                and a degree earned.&rdquo;
              </p>
              <p className="relative mt-4 text-sm font-medium text-muted-foreground">— The EdMaster team</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===================== VALUES ===================== */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">What we stand for</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A few principles guide every recommendation we make and every student we work with.
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={container}
            className="grid gap-5 sm:grid-cols-2"
          >
            {values.map((v) => {
              const Icon = v.icon
              return (
                <motion.div
                  key={v.title}
                  variants={item}
                  className="group rounded-[28px] border border-border/70 bg-card/80 p-7 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_24px_60px_-20px_rgba(88,28,135,0.35)]"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight">{v.title}</h3>
                  <p className="mt-2 leading-7 text-muted-foreground">{v.text}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ===================== WHY CHOOSE US ===================== */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Why students choose us</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              EdMaster runs on the same expertise that has guided students through UConnect
              International since 1999 — 10,000+ students placed and 13,000+ immigration cases handled
              across 35+ countries.
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={container}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {differentiators.map((d) => {
              const Icon = d.icon
              return (
                <motion.div
                  key={d.title}
                  variants={item}
                  className="group rounded-[28px] border border-border/70 bg-card/80 p-7 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_24px_60px_-20px_rgba(88,28,135,0.35)]"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-lg font-bold tracking-tight">{d.title}</h3>
                  <p className="mt-2 leading-7 text-muted-foreground">{d.text}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ===================== CTA ===================== */}
      <section className="pb-24 pt-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-[32px] border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-card p-10 text-center shadow-sm lg:p-14"
          >
            <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
            <GraduationCap className="relative mx-auto h-10 w-10 text-primary" />
            <h2 className="relative mt-5 text-2xl font-bold tracking-tight md:text-3xl">
              Ready to find your program?
            </h2>
            <p className="relative mx-auto mt-3 max-w-xl text-muted-foreground">
              Tell us about your goals and let our AI build a personalized shortlist — then talk to a
              counsellor to make it happen.
            </p>
            <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/ai-tools/profile-evaluation"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/90"
              >
                Evaluate my profile
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/get-started"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-8 py-4 text-sm font-medium text-foreground transition hover:border-primary/30 hover:text-primary"
              >
                Talk to a counsellor
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
