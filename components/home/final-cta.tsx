"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { fadeInUp, staggerContainer } from "@/lib/motion"

type Particle = {
  left: string
  top: string
  duration: number
  delay: number
}

export function FinalCTA() {
  const [particles, setParticles] = useState<Particle[]>([])

  // ✅ Generate randomness ONLY on client after mount
  useEffect(() => {
    const generatedParticles: Particle[] = Array.from({ length: 20 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    }))

    setParticles(generatedParticles)
  }, [])

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-accent" />

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary-foreground/20"
            style={{ left: p.left, top: p.top }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/20 text-primary-foreground text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" />
            Start Your Journey Today
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6"
          >
            Ready to Transform Your Future?
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-primary-foreground/80 mb-10"
          >
            Join thousands of students who have achieved their study abroad dreams
            with StudyGlobal. Your journey to world-class education starts here.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/get-started"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary-foreground text-primary font-medium hover:bg-primary-foreground/90 transition-colors"
              >
                Get Free Consultation
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/ai-tools"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-transparent border-2 border-primary-foreground text-primary-foreground font-medium hover:bg-primary-foreground/10 transition-colors"
              >
                Try AI Tools
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
