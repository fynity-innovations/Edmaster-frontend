"use client"

import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/motion"

interface Step {
  number: string
  title: string
  description: string
  color?: string
}

export function HighlightSteps({ steps }: { steps: Step[] }) {
  return (
    <section className="py-24 bg-secondary/20">
      <div className="container mx-auto px-4 max-w-4xl">
        {steps.map((step) => (
          <motion.div
            key={step.number}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex gap-6 items-start mb-10"
          >
            <div
              className={`w-16 h-16 flex items-center justify-center rounded-full text-2xl font-bold ${step.color}`}
            >
              {step.number}
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
