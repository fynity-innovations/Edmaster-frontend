"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type FeaturesVariant =
  | "grid"
  | "horizontal"
  | "blocks"
  | "dashboard"
  | "magazine"

interface FeatureItem {
  icon: any
  title: string
  desc: string
  bg?: string
}

interface FeaturesProps {
  items: FeatureItem[]
  variant?: FeaturesVariant
}

export function Features({ items, variant = "grid" }: FeaturesProps) {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className={cn(layouts[variant])}>
          {items.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={cn(cardStyles[variant], item.bg)}
              >
                <Icon className={cn(iconStyles[variant])} />
                <h3 className={cn(titleStyles[variant])}>{item.title}</h3>
                <p className={cn(descStyles[variant])}>{item.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ================= VARIANTS ================= */

const layouts: Record<FeaturesVariant, string> = {
  grid: "grid md:grid-cols-2 lg:grid-cols-3 gap-6",
  horizontal: "space-y-6 max-w-3xl mx-auto",
  blocks: "grid md:grid-cols-3 gap-6",
  dashboard: "grid md:grid-cols-4 gap-4",
  magazine: "grid md:grid-cols-3 gap-8",
}

const cardStyles: Record<FeaturesVariant, string> = {
  grid: "p-6 border bg-card",
  horizontal: "flex items-center gap-6 p-6 border bg-card",
  blocks: "p-8 bg-white border-l-4 border-primary",
  dashboard: "p-6 bg-card border",
  magazine: "p-8 bg-gradient-to-br from-white to-secondary/30",
}

const iconStyles: Record<FeaturesVariant, string> = {
  grid: "w-7 h-7 text-primary mb-4",
  horizontal: "w-8 h-8 text-primary",
  blocks: "w-8 h-8 text-primary mb-4",
  dashboard: "w-7 h-7 text-primary mb-3",
  magazine: "w-8 h-8 text-primary mb-4",
}

const titleStyles: Record<FeaturesVariant, string> = {
  grid: "font-semibold mb-1",
  horizontal: "font-semibold",
  blocks: "font-semibold mb-1",
  dashboard: "font-semibold text-sm",
  magazine: "font-semibold mb-2",
}

const descStyles: Record<FeaturesVariant, string> = {
  grid: "text-sm text-muted-foreground",
  horizontal: "text-sm text-muted-foreground",
  blocks: "text-sm text-muted-foreground",
  dashboard: "text-xs text-muted-foreground",
  magazine: "text-sm text-muted-foreground",
}
