"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { fadeInUp, staggerContainer } from "@/lib/motion"

interface PrepHeroProps {
  title: string
  highlight?: string
  description: string
  ctaText?: string
  ctaLink?: string
}

export function PrepHero({
  title,
  highlight,
  description,
  ctaText = "Register Now",
  ctaLink = "/get-started",
}: PrepHeroProps) {
  return (
    <section className="py-24 bg-gradient-to-br from-purple-100 via-pink-50 to-blue-50">
      <div className="container mx-auto px-4 text-center max-w-3xl">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible">
          <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-extrabold mb-6">
            {title} {highlight && <span className="text-primary">{highlight}</span>}
          </motion.h1>

          <motion.p variants={fadeInUp} className="text-lg text-muted-foreground mb-10">
            {description}
          </motion.p>

          <motion.div variants={fadeInUp}>
            <Button size="lg" className="rounded-full px-8" asChild>
              <Link href={ctaLink}>
                {ctaText} <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
