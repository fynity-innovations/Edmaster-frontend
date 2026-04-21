"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Search,
  Building2,
  FileEdit,
  Shield,
  Calculator,
  MessageSquare,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { fadeInUp, staggerContainer } from "@/lib/motion"
import aiTools from "@/data/ai-tools.json"

const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  Search,
  Building2,
  FileEdit,
  Shield,
  Calculator,
  MessageSquare,
}

export default function AIToolsPage() {
  const router = useRouter()
  const [activeTool, setActiveTool] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleToolClick = (toolId: string, comingSoon?: boolean, href?: string) => {
    if (comingSoon) return
    if (href) { router.push(href); return }
    setActiveTool(toolId)
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 1500)
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="text-center mb-16">
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
          >
            <Sparkles className="w-4 h-4" />
            AI-Powered Tools
          </motion.div>
          <motion.h1 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Smart Tools for Your Journey
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Leverage artificial intelligence to make informed decisions at every step of your study abroad journey
          </motion.p>
        </motion.div>

        {/* Tools Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {aiTools.map((tool) => {
            const Icon = icons[tool.icon] || Search
            const isActive = activeTool === tool.id
            const isComingSoon = tool.comingSoon
            const toolHref = (tool as any).href

            return (
              <motion.div key={tool.id} variants={fadeInUp}>
                <motion.div
                  whileHover={!isComingSoon ? { y: -10, scale: 1.02 } : {}}
                  onClick={() => handleToolClick(tool.id, isComingSoon, toolHref)}
                  className={`group relative h-full p-8 rounded-3xl border transition-all cursor-pointer overflow-hidden ${
                    isComingSoon
                      ? "bg-secondary/50 border-border opacity-70 cursor-not-allowed"
                      : isActive
                        ? "bg-primary/5 border-primary shadow-xl"
                        : "bg-card border-border hover:border-primary/50 hover:shadow-xl"
                  }`}
                >
                  {/* Coming Soon Badge */}
                  {isComingSoon && (
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">
                      Coming Soon
                    </div>
                  )}

                  {/* Gradient Border Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    style={{
                      background: "linear-gradient(135deg, rgba(139,30,30,0.1), rgba(177,18,38,0.1))",
                    }}
                  />

                  {/* Icon */}
                  <motion.div
                    className={`relative w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors ${
                      isActive ? "bg-primary text-primary-foreground" : "bg-primary/10 group-hover:bg-primary"
                    }`}
                    animate={isActive ? { rotate: [0, 5, -5, 0] } : {}}
                    transition={{ repeat: isActive ? Number.POSITIVE_INFINITY : 0, duration: 2 }}
                  >
                    {isLoading && isActive ? (
                      <Loader2 className="w-8 h-8 animate-spin text-primary-foreground" />
                    ) : (
                      <Icon
                        className={`w-8 h-8 transition-colors ${
                          isActive ? "text-primary-foreground" : "text-primary group-hover:text-primary-foreground"
                        }`}
                      />
                    )}
                  </motion.div>

                  {/* Title */}
                  <h3
                    className={`text-xl font-bold mb-3 transition-colors ${
                      isActive ? "text-primary" : "text-foreground group-hover:text-primary"
                    }`}
                  >
                    {tool.name}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground mb-6">{tool.description}</p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {tool.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  {!isComingSoon && (
                    <div className="flex items-center text-primary font-medium text-sm">
                      <span>{isActive ? "Tool Active" : "Launch Tool"}</span>
                      <motion.div
                        className="ml-2"
                        animate={isActive ? {} : { x: [0, 5, 0] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Demo Section */}
        <AnimatePresence>
          {activeTool && !isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-16"
            >
              <ToolDemo toolId={activeTool} onClose={() => setActiveTool(null)} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA Section */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative p-12 rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-accent overflow-hidden"
        >
          {/* Floating particles */}
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-primary-foreground/20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}

          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-primary-foreground mb-4">
              Need Personalized Guidance?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-primary-foreground/80 mb-8">
              While our AI tools provide instant insights, our expert counselors offer personalized guidance tailored to
              your unique situation.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button
                  size="lg"
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-8"
                  asChild
                >
                  <Link href="/get-started">Book Free Consultation</Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground text-primary-foreground bg-transparent hover:bg-primary-foreground/10 px-8"
                  asChild
                >
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// Tool Demo Component
function ToolDemo({ toolId, onClose }: { toolId: string; onClose: () => void }) {
  const [input, setInput] = useState("")
  const [results, setResults] = useState<string[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = () => {
    if (!input.trim()) return
    setIsSearching(true)
    setTimeout(() => {
      setResults([
        "Based on your interests, here are some recommendations:",
        "1. MSc Computer Science - University of Oxford",
        "2. MBA - MIT Sloan School of Management",
        "3. Master of Data Science - University of Melbourne",
        "Click on any result to learn more about the program.",
      ])
      setIsSearching(false)
    }, 1500)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8 rounded-3xl bg-card border border-primary/50 shadow-xl"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-foreground">AI Tool Demo</h3>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
          Close
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your query (e.g., 'Computer Science programs in UK')"
            className="flex-1 px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <Button onClick={handleSearch} className="bg-primary hover:bg-primary/90" disabled={isSearching}>
            {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
          </Button>
        </div>

        <AnimatePresence>
          {results.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-secondary/50"
            >
              {results.map((result, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`text-sm ${index === 0 ? "text-foreground font-medium mb-2" : "text-muted-foreground"}`}
                >
                  {result}
                </motion.p>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
