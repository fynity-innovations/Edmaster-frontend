"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  MapPin,
  Trophy,
  Users,
  Calendar,
  DollarSign,
  Award,
  CheckCircle,
  ExternalLink,
  GraduationCap,
  Building2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { fadeInUp, staggerContainer } from "@/lib/motion"
import type { University, Course } from "@/lib/types"

interface UniversityContentProps {
  university: University
  courses: Course[]
}

const sections = ["Overview", "Programs", "Facilities", "Apply"]

export function UniversityContent({ university, courses }: UniversityContentProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const [activeSection, setActiveSection] = useState("Overview")

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 150])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div ref={heroRef} className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0">
          <img
            src={university.image || "/placeholder.svg"}
            alt={university.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </motion.div>

        <motion.div style={{ opacity }} className="absolute inset-0 flex items-end pb-12">
          <div className="container mx-auto px-4">
            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex items-end gap-6">
              <motion.img
                variants={fadeInUp}
                src={university.logo || "/placeholder.svg"}
                alt=""
                className="w-20 h-20 md:w-24 md:h-24 rounded-2xl border-4 border-background shadow-xl"
              />
              <div className="flex-1">
                <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                    <Trophy className="w-3 h-3 inline mr-1" />#{university.ranking} World Ranking
                  </span>
                </motion.div>
                <motion.h1
                  variants={fadeInUp}
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2"
                >
                  {university.name}
                </motion.h1>
                <motion.div variants={fadeInUp} className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {university.city}, {university.country}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Navigation Tabs */}
      <div className="sticky top-16 z-30 bg-background/95 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-2">
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  activeSection === section
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {section}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { icon: Calendar, label: "Established", value: university.establishedYear.toString() },
              { icon: Users, label: "Students", value: university.studentCount },
              { icon: Award, label: "Intl. Students", value: university.internationalStudents },
              { icon: DollarSign, label: "Tuition", value: university.tuitionRange.split("/")[0] },
            ].map((stat) => (
              <motion.div key={stat.label} variants={fadeInUp} className="text-center p-4 rounded-xl bg-secondary/50">
                <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                <div className="text-xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* About */}
              <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <motion.h2 variants={fadeInUp} className="text-2xl font-bold text-foreground mb-4">
                  About {university.name}
                </motion.h2>
                <motion.p variants={fadeInUp} className="text-muted-foreground leading-relaxed">
                  {university.description}
                </motion.p>
              </motion.div>

              {/* Popular Courses */}
              <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <motion.h2 variants={fadeInUp} className="text-2xl font-bold text-foreground mb-4">
                  Popular Programs
                </motion.h2>
                <motion.div variants={fadeInUp} className="flex flex-wrap gap-2">
                  {university.popularCourses.map((course) => (
                    <span
                      key={course}
                      className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium"
                    >
                      <GraduationCap className="w-4 h-4 inline mr-1" />
                      {course}
                    </span>
                  ))}
                </motion.div>
              </motion.div>

              {/* Facilities */}
              <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <motion.h2 variants={fadeInUp} className="text-2xl font-bold text-foreground mb-4">
                  Campus Facilities
                </motion.h2>
                <motion.div variants={fadeInUp} className="grid sm:grid-cols-2 gap-3">
                  {university.facilities.map((facility) => (
                    <div key={facility} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-foreground">{facility}</span>
                    </div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Available Courses */}
              {courses.length > 0 && (
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <motion.h2 variants={fadeInUp} className="text-2xl font-bold text-foreground mb-4">
                    Available Courses
                  </motion.h2>
                  <motion.div variants={fadeInUp} className="space-y-4">
                    {courses.map((course) => (
                      <Link key={course.id} href={`/courses/${course.slug}`}>
                        <motion.div
                          whileHover={{ x: 5 }}
                          className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-all group"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                                {course.name}
                              </h3>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                                <span>{course.level}</span>
                                <span>{course.duration}</span>
                                <span>{course.tuition}</span>
                              </div>
                            </div>
                            <ArrowRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </motion.div>
                      </Link>
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Apply Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="sticky top-32 p-6 rounded-2xl bg-card border border-border"
              >
                <h3 className="text-lg font-bold text-foreground mb-4">Ready to Apply?</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Acceptance Rate</span>
                    <span className="font-medium text-foreground">{university.acceptanceRate}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Tuition Range</span>
                    <span className="font-medium text-foreground">{university.tuitionRange}</span>
                  </div>
                </div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button className="w-full bg-primary hover:bg-primary/90" asChild>
                    <Link href="/get-started">
                      Apply Now <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </motion.div>
                <div className="mt-4">
                  <a
                    href={university.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 text-sm text-primary hover:underline"
                  >
                    Visit Official Website <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>

              {/* Quick Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-secondary/50"
              >
                <h3 className="text-lg font-bold text-foreground mb-4">Quick Links</h3>
                <div className="space-y-2">
                  <Link
                    href={`/study-in/${university.countrySlug}`}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Building2 className="w-4 h-4" />
                    More Universities in {university.country}
                  </Link>
                  <Link
                    href="/courses"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <GraduationCap className="w-4 h-4" />
                    Browse All Courses
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
