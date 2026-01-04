"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import {
  ArrowRight,
  MapPin,
  Building2,
  DollarSign,
  Briefcase,
  Trophy,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { fadeInUp, staggerContainer } from "@/lib/motion"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import type { Country, University } from "@/lib/types"

interface CountryContentProps {
  country: Country
  universities: University[]
}

export function CountryContent({ country, universities }: CountryContentProps) {
  const heroRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <div className="min-h-screen">

      {/* HERO */}
      <div
        ref={heroRef}
        className="relative h-[55vh] min-h-[380px] overflow-hidden bg-gradient-to-br from-primary/20 to-background"
      >
        <motion.div style={{ y }} className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </motion.div>

        <motion.div style={{ opacity }} className="absolute inset-0 flex items-end pb-16">
          <div className="container mx-auto px-4">
            <motion.div variants={staggerContainer} initial="hidden" animate="visible">
              <motion.h1
                variants={fadeInUp}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
              >
                Study in {country.country_name}
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-lg text-muted-foreground max-w-2xl"
              >
                Explore top universities, tuition costs, living expenses and career opportunities in{" "}
                {country.country_name}.
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* STATS */}
      <section className="py-12 -mt-10 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              {
                icon: Building2,
                value: country.universities_count.toString(),
                label: "Universities",
              },
              {
                icon: DollarSign,
                value: country.average_tuition_fees,
                label: "Avg Tuition / Year",
              },
              {
                icon: DollarSign,
                value: country.annual_cost_of_living,
                label: "Living Cost",
              },
              {
                icon: Briefcase,
                value: country.employability,
                label: "Employability",
              },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                whileHover={{ y: -6 }}
                className="p-6 rounded-2xl bg-card border text-center"
              >
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold mb-1">
                  <AnimatedCounter value={stat.value} />
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* UNIVERSITIES */}
      <section className="py-16">
        <div className="container mx-auto px-4">

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-12"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-4">
              Top Universities in {country.country_name}
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-muted-foreground">
              World-class institutions offering globally recognised education
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {universities.map((uni) => (
              <motion.div key={uni.id} variants={fadeInUp}>
                <Link href={`/universities/${uni.slug}`}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    className="group rounded-2xl overflow-hidden bg-card border hover:border-primary/50 transition"
                  >
                    <div className="p-6">
                      <h3 className="font-bold text-lg group-hover:text-primary transition">
                        {uni.name}
                      </h3>

                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-2">
                        <MapPin className="w-3 h-3" />
                        {uni.city}
                      </div>

                      <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
                        {uni.shortDescription}
                      </p>

                      <div className="mt-4 flex justify-between text-sm">
                        <span className="flex items-center gap-1">
                          <Trophy className="w-4 h-4 text-primary" />
                          #{uni.ranking}
                        </span>

                        <span className="text-primary flex items-center gap-1">
                          View <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {universities.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No universities available yet.
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40"
      >
        <Button size="lg" className="rounded-full px-8" asChild>
          <Link href="/get-started">
            Apply Now to {country.country_name}
          </Link>
        </Button>
      </motion.div>
    </div>
  )
}
