"use client"

import { motion } from "framer-motion"
import { TrendingUp, Award, Users, Globe, Star, Clock } from "lucide-react"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { fadeInUp, staggerContainer } from "@/lib/motion"

const metrics = [
  {
    icon: Users,
    value: "1000+",
    label: "Students Placed",
    description: "Successfully helped students achieve their dreams",
  },
  {
    icon: Globe,
    value: "50+",
    label: "Countries",
    description: "Destinations across the globe",
  },
  {
    icon: Award,
    value: "500+",
    label: "Partner Universities",
    description: "Top-ranked institutions worldwide",
  },
  {
    icon: Star,
    value: "98%",
    label: "Visa Success Rate",
    description: "Industry-leading approval rate",
  },
  {
    icon: TrendingUp,
    value: "$50M+",
    label: "Scholarships Secured",
    description: "Financial aid for our students",
  },
  {
    icon: Clock,
    value: "24/7",
    label: "Support Available",
    description: "Always here when you need us",
  },
]

export function TrustMetrics() {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              variants={fadeInUp}
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-12 h-12 mb-4 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <metric.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                <AnimatedCounter value={metric.value} />
              </div>
              <div className="text-sm font-medium text-foreground mb-1">{metric.label}</div>
              <div className="text-xs text-muted-foreground">{metric.description}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
