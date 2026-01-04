"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, MapPin, Trophy } from "lucide-react"
import { fadeInUp, staggerContainer } from "@/lib/motion"
import universities from "@/data/universities.json"

export function FeaturedUniversities() {
  return (
    <section className="py-24 bg-secondary/20">
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
            Partner Universities
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            World-Class Universities
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Access top-ranked institutions from around the world
          </motion.p>
        </motion.div>

        {/* University Marquee */}
        <div className="relative overflow-hidden mb-12">
          <motion.div
            className="flex gap-6"
            animate={{ x: [0, -1920] }}
            transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            {[...universities, ...universities].map((uni, index) => (
              <motion.div
                key={`${uni.id}-${index}`}
                whileHover={{ scale: 1.05 }}
                className="flex-shrink-0 w-[300px] p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-all"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={uni.logo || "/placeholder.svg"}
                    alt={uni.name}
                    className="w-16 h-16 rounded-lg object-cover grayscale hover:grayscale-0 transition-all"
                  />
                  <div>
                    <h3 className="font-semibold text-foreground line-clamp-1">{uni.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      {uni.city}, {uni.country}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-primary">
                      <Trophy className="w-3 h-3" />
                      Rank #{uni.ranking}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Featured University Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {universities.slice(0, 3).map((uni) => (
            <motion.div key={uni.id} variants={fadeInUp}>
              <Link href={`/universities/${uni.slug}`}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="group rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/50 transition-all"
                >
                  <div className="relative h-48 overflow-hidden">
                    <motion.img
                      src={uni.image || "/placeholder.svg"}
                      alt={uni.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                    />
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                      #{uni.ranking} World
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <img src={uni.logo || "/placeholder.svg"} alt="" className="w-10 h-10 rounded-lg" />
                      <div>
                        <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                          {uni.name}
                        </h3>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          {uni.city}, {uni.country}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{uni.shortDescription}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Est. <span className="font-semibold text-foreground">{uni.establishedYear}</span>
                      </span>
                      <span className="text-primary font-medium flex items-center gap-1">
                        Learn More <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
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
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/universities"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Explore All Universities
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
