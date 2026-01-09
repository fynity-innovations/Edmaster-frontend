"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type HeroVariant =
  | "professional"
  | "editorial"
  | "tech"
  | "playful"
  | "industrial"
  | "friendly"

interface HeroProps {
  title: string
  highlight: string
  description: string
  ctaText?: string
  variant?: HeroVariant
}

export function Hero({
  title,
  highlight,
  description,
  ctaText = "Get Started",
  variant = "professional",
}: HeroProps) {
  return (
    <section className={cn("py-28", variantStyles[variant].section)}>
      <div className={cn("container mx-auto px-4", variantStyles[variant].container)}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={variantStyles[variant].content}
        >
          <h1 className={cn("font-extrabold mb-6", variantStyles[variant].title)}>
            {title}{" "}
            <span className={variantStyles[variant].highlight}>{highlight}</span>
          </h1>

          <p className={cn("text-muted-foreground mb-8", variantStyles[variant].desc)}>
            {description}
          </p>

          <Button
            size="lg"
            className={variantStyles[variant].button}
            asChild
          >
            <Link href="/get-started">
              {ctaText} <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

/* ================= VARIANT STYLES ================= */

const variantStyles: Record<HeroVariant, any> = {
  professional: {
    section: "bg-secondary/20",
    container: "text-center max-w-3xl",
    content: "mx-auto",
    title: "text-4xl md:text-5xl",
    highlight: "text-primary",
    desc: "text-lg",
    button: "rounded-none px-10",
  },

  editorial: {
    section: "bg-gradient-to-br from-rose-50 via-purple-50 to-indigo-50",
    container: "grid md:grid-cols-2 gap-12 items-center",
    content: "",
    title: "text-4xl md:text-5xl leading-tight",
    highlight: "block text-primary",
    desc: "text-lg",
    button: "rounded-full px-8",
  },

  tech: {
    section: "bg-gradient-to-r from-slate-900 to-slate-800 text-white",
    container: "max-w-4xl",
    content: "",
    title: "text-4xl md:text-5xl",
    highlight: "text-cyan-400",
    desc: "text-white/80",
    button: "rounded-none px-10 bg-cyan-500 hover:bg-cyan-600",
  },

  playful: {
    section: "bg-gradient-to-r from-green-100 via-teal-50 to-emerald-50",
    container: "grid md:grid-cols-2 gap-12 items-center",
    content: "",
    title: "text-4xl md:text-5xl",
    highlight: "text-green-600",
    desc: "text-lg",
    button: "rounded-full px-8 bg-green-600 hover:bg-green-700",
  },

  industrial: {
    section: "bg-gradient-to-r from-slate-900 via-slate-800 to-gray-900 text-white",
    container: "grid md:grid-cols-2 gap-12 items-center",
    content: "",
    title: "text-4xl md:text-5xl",
    highlight: "block text-blue-400",
    desc: "text-white/80",
    button: "rounded-none px-10 bg-blue-500 hover:bg-blue-600",
  },

  friendly: {
    section: "bg-gradient-to-br from-purple-100 via-pink-50 to-blue-50",
    container: "text-center max-w-3xl",
    content: "mx-auto",
    title: "text-4xl md:text-5xl",
    highlight: "text-primary",
    desc: "text-lg",
    button: "rounded-full px-8",
  },
}
