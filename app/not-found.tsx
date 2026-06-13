"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Compass, Home, BookOpen, GraduationCap, Globe } from "lucide-react"

const suggestions = [
  { name: "Find Courses", href: "/courses", icon: BookOpen },
  { name: "Universities", href: "/universities", icon: GraduationCap },
  { name: "Countries", href: "/countries", icon: Globe },
  { name: "Our Services", href: "/services", icon: Compass },
]

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-24 text-foreground">
      {/* atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-32 -top-24 h-[520px] w-[520px] rounded-full bg-primary/10 blur-[130px]" />
        <div className="absolute -right-24 bottom-0 h-[440px] w-[440px] rounded-full bg-accent/10 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
      </div>

      <div className="mx-auto w-full max-w-2xl text-center">
        {/* Giant 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative mx-auto mb-2 select-none"
        >
          <h1 className="bg-gradient-to-b from-primary to-primary/40 bg-clip-text text-[7rem] font-black leading-none tracking-tighter text-transparent sm:text-[10rem]">
            404
          </h1>
          <motion.div
            initial={{ rotate: -8, y: -6 }}
            animate={{ rotate: [-8, 6, -8], y: [-6, 4, -6] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 6, ease: "easeInOut" }}
            className="absolute -right-2 top-2 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-card/80 text-primary shadow-lg backdrop-blur sm:right-8"
          >
            <Compass className="h-8 w-8" />
          </motion.div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="text-2xl font-bold tracking-tight sm:text-3xl"
        >
          This page took a gap year.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="mx-auto mt-3 max-w-md text-muted-foreground"
        >
          We couldn&apos;t find the page you were looking for. It may have moved, or the link might be
          slightly off. Let&apos;s get you back on track.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/90"
          >
            <Home className="h-4 w-4" />
            Back to home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-7 py-3.5 text-sm font-medium text-foreground transition hover:border-primary/30 hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Go back
          </button>
        </motion.div>

        {/* Quick links */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="mt-12"
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            Or explore
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {suggestions.map((s) => {
              const Icon = s.icon
              return (
                <Link
                  key={s.href}
                  href={s.href}
                  className="group flex flex-col items-center gap-2 rounded-2xl border border-border/70 bg-card/70 px-4 py-5 text-sm font-medium text-foreground backdrop-blur transition hover:-translate-y-1 hover:border-primary/40 hover:text-primary"
                >
                  <Icon className="h-5 w-5 text-primary" />
                  {s.name}
                </Link>
              )
            })}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
