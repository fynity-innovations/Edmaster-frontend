"use client"

import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/motion"

interface Audience {
  icon: React.ElementType
  text: string
}

export function AudienceGrid({ items }: { items: Audience[] }) {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-6">
        {items.map((item) => (
          <motion.div
            key={item.text}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex items-center gap-4 p-5 rounded-xl border bg-card"
          >
            <item.icon className="w-6 h-6 text-primary" />
            <span>{item.text}</span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
