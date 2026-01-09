"use client"

import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/motion"

export function LearningModes({ items }: any) {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-12">Learn Anytime, Anywhere</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item: any) => (
            <motion.div
              key={item.title}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={`p-6 rounded-2xl border ${item.bg}`}
            >
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
