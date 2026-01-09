"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type CTAVariant = "bold" | "soft" | "minimal"

interface CTAProps {
  title: string
  subtitle: string
  buttonText?: string
  variant?: CTAVariant
}

export function CTA({
  title,
  subtitle,
  buttonText = "Get Started",
  variant = "bold",
}: CTAProps) {
  return (
    <section className={cn("py-16", variantStyles[variant].section)}>
      <div
        className={cn(
          "container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6",
          variantStyles[variant].container
        )}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className={cn("text-2xl font-bold", variantStyles[variant].title)}>
            {title}
          </h3>
          <p className={cn("mt-1", variantStyles[variant].subtitle)}>
            {subtitle}
          </p>
        </motion.div>

        <Button
          size="lg"
          className={variantStyles[variant].button}
          asChild
        >
          <Link href="/get-started">
            {buttonText} <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </Button>
      </div>
    </section>
  )
}

/* ================= VARIANTS ================= */

const variantStyles: Record<CTAVariant, any> = {
  bold: {
    section: "bg-primary text-primary-foreground",
    container: "",
    title: "",
    subtitle: "text-primary-foreground/80",
    button: "bg-white text-primary hover:bg-white/90 rounded-none px-10",
  },

  soft: {
    section: "bg-secondary/30",
    container: "max-w-4xl",
    title: "",
    subtitle: "text-muted-foreground",
    button: "rounded-full px-8",
  },

  minimal: {
    section: "bg-transparent",
    container: "border-t pt-12 max-w-4xl",
    title: "",
    subtitle: "text-muted-foreground",
    button: "rounded-none px-10",
  },
}
