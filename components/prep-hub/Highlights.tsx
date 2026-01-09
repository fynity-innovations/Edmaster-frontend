"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type HighlightsVariant =
  | "steps"
  | "timeline"
  | "progress"
  | "cards"
  | "minimal"

interface HighlightItem {
  num?: string
  title: string
  desc: string
  value?: number // for progress
  color?: string
}

interface HighlightsProps {
  items: HighlightItem[]
  variant?: HighlightsVariant
}

export function Highlights({ items, variant = "steps" }: HighlightsProps) {
  return (
    <section className="py-24 bg-secondary/20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className={layouts[variant]}>
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className={cn(cardStyles[variant], item.color)}
            >
              {variant === "steps" && (
                <div className="w-14 h-14 flex items-center justify-center border text-lg font-bold">
                  {item.num}
                </div>
              )}

              {variant === "progress" && (
                <div className="mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span>{item.title}</span>
                    <span>{item.value}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              )}

              <div>
                <h3 className={titleStyles[variant]}>{item.title}</h3>
                <p className={descStyles[variant]}>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ================= VARIANTS ================= */

const layouts: Record<HighlightsVariant, string> = {
  steps: "space-y-8",
  timeline: "space-y-12 border-l pl-8",
  progress: "space-y-6",
  cards: "grid md:grid-cols-2 gap-6",
  minimal: "grid md:grid-cols-3 gap-6",
}

const cardStyles: Record<HighlightsVariant, string> = {
  steps: "flex gap-6 items-start",
  timeline: "relative pl-6",
  progress: "p-4 border bg-card",
  cards: "p-6 border bg-card",
  minimal: "p-6 bg-transparent",
}

const titleStyles: Record<HighlightsVariant, string> = {
  steps: "font-semibold text-lg mb-1",
  timeline: "font-semibold text-lg mb-1",
  progress: "font-semibold mb-1",
  cards: "font-semibold mb-1",
  minimal: "font-semibold",
}

const descStyles: Record<HighlightsVariant, string> = {
  steps: "text-muted-foreground",
  timeline: "text-muted-foreground",
  progress: "text-sm text-muted-foreground",
  cards: "text-sm text-muted-foreground",
  minimal: "text-sm text-muted-foreground",
}
