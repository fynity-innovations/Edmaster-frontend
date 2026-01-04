"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { fadeInUp, staggerContainer, cardHover } from "@/lib/motion"
import countries from "@/data/countries.json"

export function TopDestinations() {
  return (
    <section className="py-12 bg-secondary/20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
          >
            Popular Destinations
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Top Study Destinations
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore the world's most popular countries for international education
          </motion.p>
        </motion.div>

        {/* Country Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {countries.slice(0, 6).map((country) => (
            <motion.div key={country.country_id} variants={fadeInUp}>
              <Link href={`/study-in/${country.country_slug}`}>
                <motion.div
                  initial="rest"
                  whileHover="hover"
                  variants={cardHover}
                  className="group relative rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/50 transition-colors"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <motion.img
                      src={"/placeholder.svg"}
                      alt={country.country_name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    {/* <div className="absolute top-4 left-4 text-4xl">{country.flag}</div> */}
                    <motion.div
                      className="absolute inset-0 border-4 border-primary/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={{ scale: 0.9 }}
                      whileHover={{ scale: 1 }}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      Study in {country.country_name}
                    </h3>
                    {/* <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{country.shortDescription}</p> */}

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        <span className="font-semibold text-foreground">{country.universities_count}</span> Universities
                      </span>
                      <span className="text-muted-foreground">
                        <span className="font-semibold text-foreground">{country.employability}</span> Employability
                      </span>
                    </div>

                    {/* Arrow */}
                    <div className="mt-4 flex items-center text-primary font-medium">
                      <span>Explore</span>
                      <motion.div
                        className="ml-2"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/countries"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              View All Countries
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
