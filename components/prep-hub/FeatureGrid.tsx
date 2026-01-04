"use client"

import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/motion"

interface Feature {
  title: string
  description: string
  icon: React.ElementType
  bg?: string
}

export function FeatureGrid({ features }: { features: Feature[] }) {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item) => (
            <motion.div
              key={item.title}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={`p-6 rounded-2xl border ${item.bg ?? "bg-card"}`}
            >
              <item.icon className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
