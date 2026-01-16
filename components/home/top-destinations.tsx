"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Globe, GraduationCap, Briefcase } from "lucide-react"
import { fadeInUp, staggerContainer } from "@/lib/motion"
import countries from "@/data/countries.json"

export function TopDestinations() {
  return (
    <section className="py-14 bg-secondary/20">
      <div className="container mx-auto px-4">

        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
          >
            Popular Destinations
          </motion.span>

          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
          >
            Top Study Destinations
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Explore the world's most popular countries for international education
          </motion.p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {countries.slice(0, 6).map((country) => (
            <motion.div key={country.country_id} variants={fadeInUp}>
              <Link href={`/study-in/${country.country_slug}`}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="group relative rounded-2xl bg-card border border-border p-6 transition-all hover:border-primary/50 hover:shadow-xl overflow-hidden"
                >
                  {/* Accent Glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-primary/5 via-transparent to-transparent" />

                  {/* Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div>
                      <img
                        src={`https://flagcdn.com/w40/${country.country_code.toLowerCase()}.png`}
                        alt={country.country_name}
                        className="w-10 h-8 rounded"
                      />
                    </div>


                    <div>
                      <h3 className="text-lg font-bold group-hover:text-primary transition">
                        Study in {country.country_name}
                      </h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Globe className="w-4 h-4" />
                        International destination
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 text-center mb-6">
                    <div>
                      <GraduationCap className="w-5 h-5 mx-auto mb-1 text-primary" />
                      <div className="font-semibold text-sm">
                        {country.universities_count}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Universities
                      </div>
                    </div>

                    <div>
                      <Briefcase className="w-5 h-5 mx-auto mb-1 text-primary" />
                      <div className="font-semibold text-sm">
                        {country.employability}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Employability
                      </div>
                    </div>

                    <div>
                      <span className="block text-primary font-bold">€</span>
                      <div className="font-semibold text-sm">
                        {country.average_tuition_fees}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Tuition
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      View programs
                    </span>

                    <span className="flex items-center gap-2 text-primary font-medium">
                      Explore
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                    </span>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/countries"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition"
          >
            View All Countries
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
