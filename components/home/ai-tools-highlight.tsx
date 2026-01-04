"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Search, Building2, FileEdit, Shield, Sparkles } from "lucide-react"
import { fadeInUp, staggerContainer } from "@/lib/motion"

const tools = [
  {
    icon: Search,
    name: "Course Finder AI",
    description: "Find your perfect course match using advanced AI algorithms",
    gradient: "from-primary/20 to-accent/10",
  },
  {
    icon: Building2,
    name: "University Recommender",
    description: "Get personalized university suggestions based on your profile",
    gradient: "from-accent/20 to-primary/10",
  },
  {
    icon: FileEdit,
    name: "SOP Generator",
    description: "Create compelling statements of purpose with AI assistance",
    gradient: "from-primary/15 to-accent/15",
  },
  {
    icon: Shield,
    name: "Visa Advisor",
    description: "Navigate visa requirements with intelligent guidance",
    gradient: "from-accent/15 to-primary/20",
  },
]

export function AIToolsHighlight() {
  return (
    <section className="py-2 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4" />
              AI-Powered Tools
            </motion.div>

            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Smart Tools for
              <br />
              <span className="text-primary">Smarter Decisions</span>
            </motion.h2>

            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground mb-8">
              Our AI-powered suite of tools helps you make informed decisions at every step of your study abroad
              journey. From finding the right course to crafting the perfect application.
            </motion.p>

            <motion.div variants={fadeInUp} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/ai-tools"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                Explore All AI Tools
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right - Tool Cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 gap-4"
          >
            {tools.map((tool, index) => (
              <motion.div
                key={tool.name}
                variants={fadeInUp}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`p-6 rounded-2xl bg-gradient-to-br ${tool.gradient} border border-border hover:border-primary/50 transition-all group cursor-pointer`}
              >
                <motion.div
                  className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  whileHover={{ rotate: 5 }}
                >
                  <tool.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                </motion.div>
                <h3 className="text-lg font-bold text-foreground mb-2">{tool.name}</h3>
                <p className="text-sm text-muted-foreground">{tool.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
