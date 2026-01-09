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
  Globe,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { fadeInUp, staggerContainer } from "@/lib/motion"
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

  const y = useTransform(scrollYProgress, [0, 1], [0, 120])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <div className="min-h-screen">

      {/* HERO */}
      <div
        ref={heroRef}
        className="relative h-[45vh] min-h-[320px] bg-gradient-to-br from-primary/20 via-purple-200/10 to-background flex items-end"
      >
        <motion.div style={{ opacity }} className="w-full pb-16">
          <div className="container mx-auto px-4">
            <motion.div variants={staggerContainer} initial="hidden" animate="visible">
              <motion.div
                variants={fadeInUp}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-4"
              >
                <Globe className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">
                  Study Destination
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-4xl md:text-5xl font-extrabold mb-4"
              >
                Study in{" "}
                <span className="text-primary">{country.country_name}</span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-lg text-muted-foreground max-w-2xl"
              >
                Explore top universities, tuition fees, living costs, and career
                opportunities in {country.country_name}.
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* STATS */}
      <section className="py-12 -mt-12 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-purple-50 border">
              <div className="flex items-center gap-3 mb-2">
                <Building2 className="w-6 h-6 text-purple-600" />
                <span className="text-sm text-muted-foreground">Universities</span>
              </div>
              <h3 className="text-2xl font-bold">
                {country.universities_count} Universities
              </h3>
            </div>

            <div className="p-6 rounded-2xl bg-blue-50 border">
              <div className="flex items-center gap-3 mb-2">
                <Briefcase className="w-6 h-6 text-blue-600" />
                <span className="text-sm text-muted-foreground">Employability</span>
              </div>
              <h3 className="text-2xl font-bold">
                {country.employability}
              </h3>
            </div>

            <div className="p-6 rounded-2xl bg-orange-50 border">
              <div className="flex items-center gap-3 mb-2">
                <DollarSign className="w-6 h-6 text-orange-600" />
                <span className="text-sm text-muted-foreground">Average Tuition Fees</span>
              </div>
              <h3 className="text-2xl font-bold">
                {country.average_tuition_fees}
              </h3>
            </div>

            <div className="p-6 rounded-2xl bg-pink-50 border">
              <div className="flex items-center gap-3 mb-2">
                <DollarSign className="w-6 h-6 text-pink-600" />
                <span className="text-sm text-muted-foreground">Cost of Living (Annual)</span>
              </div>
              <h3 className="text-2xl font-bold">
                {country.annual_cost_of_living}
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* POPULAR COURSES */}
      <section className="py-14">
        <div className="container mx-auto px-4">
          <div className="bg-green-50 rounded-2xl p-8 border">
            <h3 className="text-lg font-semibold mb-4">
              Most Popular Courses
            </h3>

            <div className="flex flex-wrap gap-3">
              {[
                "Engineering & Technology",
                "Computer Science & IT",
                "Business & Management",
                "Data Science & Analytics",
                "Environmental Studies",
                "Life Sciences & Health",
                "Creative Design & Architecture",
              ].map((course) => (
                <span
                  key={course}
                  className="px-4 py-2 rounded-lg border bg-white text-sm hover:bg-primary/10 transition cursor-pointer"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-white">
            <div>
              <h3 className="text-2xl font-bold">
                Find the Course That Fits You Best
              </h3>
              <p className="text-white/90 mt-1">
                Set filters like country, field & budget — and explore.
              </p>
            </div>

            <Button variant="secondary" size="lg">
              Explore Courses Now
            </Button>
          </div>
        </div>
      </section>

      {/* UNIVERSITIES */}
      <section className="py-20">
        <div className="container mx-auto px-4">

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-12"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-3">
              Top Universities in {country.country_name}
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-muted-foreground">
              Globally recognized institutions
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {universities.map((uni) => (
              <motion.div key={uni.id} variants={fadeInUp}>
                <Link href={`/universities/${uni.slug}`}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    className="group p-6 rounded-2xl bg-white border shadow-sm hover:shadow-xl transition-all"
                  >
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
                        Rank #{uni.ranking}
                      </span>

                      <span className="text-primary flex items-center gap-1">
                        View <ArrowRight className="w-4 h-4" />
                      </span>
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

      {/* FLOATING CTA */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40"
      >
        <Button size="lg" className="rounded-full px-8 shadow-lg" asChild>
          <Link href="/get-started">
            Apply Now to {country.country_name}
          </Link>
        </Button>
      </motion.div>
    </div>
  )
}
