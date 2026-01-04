"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"
import { fadeInUp, staggerContainer } from "@/lib/motion"
import testimonials from "@/data/testimonials.json"

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)

  const next = () => setActiveIndex((prev) => (prev + 1) % testimonials.length)
  const prev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)

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
            Success Stories
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            What Our Students Say
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real stories from students who achieved their dreams with StudyGlobal
          </motion.p>
        </motion.div>

        {/* Testimonial Slider */}
        <div className="max-w-4xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="bg-card rounded-3xl p-8 md:p-12 border border-border relative"
            >
              <Quote className="absolute top-8 left-8 w-12 h-12 text-primary/20" />

              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <motion.img
                    src={testimonials[activeIndex].image || "/placeholder.svg"}
                    alt={testimonials[activeIndex].name}
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-primary/20"
                    whileHover={{ scale: 1.05 }}
                  />
                </div>

                <div className="flex-1 text-center md:text-left">
                  {/* Stars */}
                  <div className="flex justify-center md:justify-start gap-1 mb-4">
                    {Array.from({ length: testimonials[activeIndex].rating }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <Star className="w-5 h-5 fill-primary text-primary" />
                      </motion.div>
                    ))}
                  </div>

                  <p className="text-lg md:text-xl text-foreground mb-6 leading-relaxed">
                    "{testimonials[activeIndex].quote}"
                  </p>

                  <div>
                    <h4 className="text-lg font-bold text-foreground">{testimonials[activeIndex].name}</h4>
                    <p className="text-muted-foreground">
                      {testimonials[activeIndex].country} → {testimonials[activeIndex].university}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={prev}
              className="p-3 rounded-full bg-card border border-border hover:border-primary/50 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </motion.button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === activeIndex ? "w-6 bg-primary" : "bg-border hover:bg-primary/50"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={next}
              className="p-3 rounded-full bg-card border border-border hover:border-primary/50 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}
