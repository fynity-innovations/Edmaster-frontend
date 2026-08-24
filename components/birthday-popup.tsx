"use client"

/**
 * TEMPORARY — soft-launch birthday greeting for C N Panchal.
 * Shows on every visit (once per browser session) until it is removed by hand:
 * delete this file and its mount in components/layout/conditional-layout.tsx.
 */

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Cake, Sparkles, PartyPopper } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

const STORAGE_KEY = "cnp-birthday-2026-seen"

// Deterministic pseudo-random so server and client markup match.
const rand = (i: number, salt: number) => {
  const x = Math.sin((i + 1) * 12.9898 + salt * 78.233) * 43758.5453
  return x - Math.floor(x)
}

const CONFETTI = Array.from({ length: 42 }, (_, i) => ({
  left: rand(i, 1) * 100,
  delay: rand(i, 2) * 3,
  duration: 3.5 + rand(i, 3) * 3,
  size: 6 + rand(i, 4) * 8,
  rotate: rand(i, 5) * 360,
  round: rand(i, 6) > 0.55,
  color: ["#f43f5e", "#f59e0b", "#10b981", "#3b82f6", "#a855f7", "#eab308"][
    Math.floor(rand(i, 7) * 6)
  ],
}))

export default function BirthdayPopup() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // ?birthday=1 re-shows it even if this session already dismissed it.
    const forced = new URLSearchParams(window.location.search).get("birthday") === "1"

    try {
      if (!forced && sessionStorage.getItem(STORAGE_KEY)) return
    } catch {
      /* private mode — just show it */
    }

    const timer = setTimeout(() => setOpen(true), 700)
    return () => clearTimeout(timer)
  }, [])

  const close = () => {
    setOpen(false)
    try {
      sessionStorage.setItem(STORAGE_KEY, "1")
    } catch {
      /* ignore */
    }
  }

  // Lock background scroll and close on Escape while open.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close()
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener("keydown", onKey)
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="birthday-title"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={close}
            aria-hidden="true"
          />

          {/* Confetti */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            {CONFETTI.map((c, i) => (
              <span
                key={i}
                className="absolute -top-8 block"
                style={{
                  left: `${c.left}%`,
                  width: c.size,
                  height: c.size * (c.round ? 1 : 1.6),
                  background: c.color,
                  borderRadius: c.round ? "9999px" : "2px",
                  opacity: 0.9,
                  animation: `cnp-fall ${c.duration}s linear ${c.delay}s infinite`,
                  transform: `rotate(${c.rotate}deg)`,
                }}
              />
            ))}
          </div>

          {/* Card */}
          <motion.div
            className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white shadow-2xl ring-1 ring-black/5"
            initial={{ opacity: 0, y: 40, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ type: "spring", damping: 22, stiffness: 260 }}
          >
            <button
              onClick={close}
              aria-label="Close birthday greeting"
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/5 hover:bg-black/10 text-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
              {/* Photo */}
              <div className="relative bg-gradient-to-b from-primary/10 to-accent/10 p-5 sm:p-6 flex items-center justify-center">
                <div className="relative w-full max-w-[260px] aspect-[3/4] rounded-2xl overflow-hidden shadow-xl ring-4 ring-white">
                  <Image
                    src="/cn-panchal.jpg"
                    alt="C N Panchal"
                    fill
                    priority
                    sizes="(max-width: 768px) 60vw, 260px"
                    className="object-cover"
                  />
                </div>
                <motion.div
                  className="absolute top-4 left-4 text-3xl"
                  animate={{ rotate: [-8, 8, -8], y: [0, -4, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  aria-hidden="true"
                >
                  🎈
                </motion.div>
              </div>

              {/* Message */}
              <div className="p-6 sm:p-8 md:pl-2 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-wide uppercase">
                  <Cake className="w-3.5 h-3.5" />
                  Happy Birthday
                </div>

                <h2
                  id="birthday-title"
                  className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900 leading-tight"
                >
                  Wishing{" "}
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    C N Panchal
                  </span>{" "}
                  a very Happy Birthday!
                </h2>

                <p className="mt-4 text-gray-600 leading-relaxed">
                  On this special day, the entire EdMaster family comes together to celebrate
                  you. Thank you for the vision, guidance and belief that helps students take
                  their first step towards the world.
                </p>

                <p className="mt-3 text-gray-600 leading-relaxed">
                  Here&apos;s to many more years of health, happiness and success. 🎂
                </p>

                <div className="mt-5 flex items-center justify-center md:justify-start gap-2 text-sm font-medium text-primary">
                  <Sparkles className="w-4 h-4" />
                  With love, Team EdMaster
                </div>

                <Button onClick={close} size="lg" className="mt-6 w-full sm:w-auto gap-2">
                  <PartyPopper className="w-4 h-4" />
                  Celebrate &amp; Continue
                </Button>
              </div>
            </div>
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  )
}
