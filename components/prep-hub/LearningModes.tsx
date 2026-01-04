"use client"

import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/motion"

interface Mode {
  title: string
  description: string
  bg?: string
}

export function LearningModes({ modes }: { modes: Mode[] }) {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-12">Learn Anytime, Anywhere</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {modes.map((mode) => (
            <motion.div
              key={mode.title}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={`p-6 rounded-2xl border ${mode.bg ?? "bg-card"}`}
            >
              <h3 className="font-semibold mb-2">{mode.title}</h3>
              <p className="text-sm text-muted-foreground">{mode.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
