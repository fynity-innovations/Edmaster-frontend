"use client"

import Link from "next/link"
import { motion, type Variants } from "framer-motion"
import {
  ArrowRight,
  ArrowUpRight,
  MessageCircle,
  ShieldCheck,
  Home,
  Plane,
  Banknote,
  Lock,
  Sparkles,
} from "lucide-react"

const services = [
  {
    name: "Education Counselling",
    href: "/services/counselling",
    icon: MessageCircle,
    blurb: "1:1 guidance from certified counsellors to map universities, courses, and timelines.",
    tag: "Most popular",
  },
  {
    name: "Health Insurance",
    href: "/services/health-insurance",
    icon: ShieldCheck,
    blurb: "Compliant student health cover for your destination, sorted before you fly.",
  },
  {
    name: "Accommodation Support",
    href: "/services/accommodation",
    icon: Home,
    blurb: "Verified student housing near campus, booked without the guesswork.",
  },
  {
    name: "Pre-departure Orientation",
    href: "/services/orientation",
    icon: Plane,
    blurb: "Travel, culture, banking, and packing — everything to settle in fast.",
  },
  {
    name: "Education Loan",
    href: "/services/loan",
    icon: Banknote,
    blurb: "Collateral and non-collateral loan options matched to your offer letter.",
  },
  {
    name: "Block Account for Germany",
    href: "/services/block-account",
    icon: Lock,
    blurb: "Open your German blocked account quickly to clear your student visa.",
  },
]

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      {/* ===================== HERO ===================== */}
      <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-20">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -right-40 -top-24 h-[560px] w-[560px] rounded-full bg-primary/10 blur-[130px]" />
          <div className="absolute -left-32 top-1/3 h-[420px] w-[420px] rounded-full bg-accent/10 blur-[120px]" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={container} className="max-w-3xl">
            <motion.span
              variants={item}
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
            >
              <Sparkles className="h-4 w-4" />
              End-to-end student support
            </motion.span>

            <motion.h1
              variants={item}
              className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl"
            >
              Everything you need,
              <br />
              <span className="text-primary">from offer to arrival.</span>
            </motion.h1>

            <motion.p variants={item} className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              One team for the whole journey — counselling, insurance, housing, loans, and the
              paperwork that gets you on the plane. Pick what you need and we&apos;ll handle the rest.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ===================== SERVICE GRID ===================== */}
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={container}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {services.map((service) => {
              const Icon = service.icon
              return (
                <motion.div key={service.href} variants={item}>
                  <Link
                    href={service.href}
                    className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-border/70 bg-card/80 p-7 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[0_24px_60px_-20px_rgba(88,28,135,0.4)]"
                  >
                    {/* corner glow on hover */}
                    <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

                    <div className="relative mb-6 flex items-center justify-between">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                        <Icon className="h-7 w-7" />
                      </div>
                      {service.tag && (
                        <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                          {service.tag}
                        </span>
                      )}
                    </div>

                    <h3 className="relative text-xl font-bold tracking-tight transition-colors group-hover:text-primary">
                      {service.name}
                    </h3>
                    <p className="relative mt-2 flex-1 text-sm leading-6 text-muted-foreground">
                      {service.blurb}
                    </p>

                    <span className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                      Learn more
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>

          {/* ===================== CTA ===================== */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative mt-16 overflow-hidden rounded-[32px] border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-card p-10 text-center shadow-sm lg:p-14"
          >
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
            <h2 className="relative text-2xl font-bold tracking-tight md:text-3xl">
              Not sure where to start?
            </h2>
            <p className="relative mx-auto mt-3 max-w-xl text-muted-foreground">
              Book a free consultation and we&apos;ll build a plan around your profile, budget, and target intake.
            </p>
            <Link
              href="/get-started"
              className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/90"
            >
              Book a free consultation
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
