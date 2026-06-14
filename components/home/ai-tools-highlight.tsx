"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Search, ClipboardCheck, FileEdit, Shield, Sparkles } from "lucide-react"
import { fadeInUp, staggerContainer } from "@/lib/motion"

type Tool = {
  icon: typeof Search
  name: string
  description: string
  gradient: string
  href?: string
  comingSoon?: boolean
}

const tools: Tool[] = [
  {
    icon: Search,
    name: "Course Finder AI",
    description: "Find your perfect course match using advanced AI algorithms",
    href: "/courses",
    gradient: "from-primary/20 to-accent/10",
  },
  {
    icon: ClipboardCheck,
    name: "Profile Evaluation",
    description: "Get a personalized assessment and smart course filters from your academic profile",
    href: "/ai-tools/profile-evaluation",
    gradient: "from-accent/20 to-primary/10",
  },
  {
    icon: FileEdit,
    name: "SOP Generator",
    description: "Create compelling statements of purpose with AI assistance",
    href: "/ai-tools/sop-generator",
    gradient: "from-primary/15 to-accent/15",
  },
  {
    icon: Shield,
    name: "Visa Advisor",
    description: "Navigate visa requirements with intelligent guidance",
    comingSoon: true,
    gradient: "from-accent/15 to-primary/20",
  },
]

export function AIToolsHighlight() {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
            {tools.map((tool) => {
              const Icon = tool.icon
              const body = (
                <div
                  className={`relative h-full p-6 rounded-2xl bg-gradient-to-br ${tool.gradient} border transition-all group ${
                    tool.comingSoon
                      ? "border-border opacity-75"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  {tool.comingSoon && (
                    <span className="absolute right-4 top-4 rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium text-secondary-foreground">
                      Coming Soon
                    </span>
                  )}
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary">
                    <Icon className="h-7 w-7 text-primary transition-colors group-hover:text-primary-foreground" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-foreground transition-colors group-hover:text-primary">
                    {tool.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{tool.description}</p>
                </div>
              )

              return (
                <motion.div
                  key={tool.name}
                  variants={fadeInUp}
                  whileHover={tool.comingSoon ? {} : { y: -5, scale: 1.02 }}
                  className="h-full"
                >
                  {tool.comingSoon ? (
                    <div className="h-full cursor-not-allowed">{body}</div>
                  ) : (
                    <Link href={tool.href!} className="block h-full">
                      {body}
                    </Link>
                  )}
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
