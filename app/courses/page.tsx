"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Search, Filter, ArrowRight, Clock, MapPin, GraduationCap, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { fadeInUp, staggerContainer } from "@/lib/motion"
import { SkeletonCard } from "@/components/ui/skeleton-card"
import courses from "@/data/courses.json"
import countries from "@/data/countries.json"

const levels = ["Bachelor", "Master", "PhD", "Diploma"]
const categories = ["Technology", "Business", "Engineering"]

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const activeFiltersCount = [selectedCountry, selectedLevel, selectedCategory].filter(Boolean).length

  const filteredCourses = useMemo(() => {
    setIsLoading(true)
    const timer = setTimeout(() => setIsLoading(false), 300)

    let result = courses

    if (searchQuery) {
      result = result.filter(
        (course) =>
          course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.universityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.country.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (selectedCountry) {
      result = result.filter((course) => course.country.toLowerCase().replace(/\s+/g, "-") === selectedCountry)
    }

    if (selectedLevel) {
      result = result.filter((course) => course.level === selectedLevel)
    }

    if (selectedCategory) {
      result = result.filter((course) => course.category === selectedCategory)
    }

    return result
  }, [searchQuery, selectedCountry, selectedLevel, selectedCategory])

  const clearFilters = () => {
    setSelectedCountry(null)
    setSelectedLevel(null)
    setSelectedCategory(null)
    setSearchQuery("")
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="text-center mb-12">
          <motion.span
            variants={fadeInUp}
            className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
          >
            Course Catalog
          </motion.span>
          <motion.h1 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Find Your Perfect Course
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse through thousands of courses from top universities worldwide
          </motion.p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col md:flex-row gap-4 mb-8"
        >
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search courses, universities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-card border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-foreground"
            />
          </div>
          <Button
            variant="outline"
            className={`gap-2 bg-transparent ${showFilters ? "border-primary text-primary" : ""}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-4 h-4" />
            Filters
            {activeFiltersCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </Button>
        </motion.div>

        {/* Filter Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-8"
            >
              <div className="p-6 rounded-2xl bg-card border border-border space-y-6">
                {/* Country Filter */}
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Country</h3>
                  <div className="flex flex-wrap gap-2">
                    {countries.map((country) => (
                      <motion.button
                        key={country.slug}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedCountry(selectedCountry === country.slug ? null : country.slug)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                          selectedCountry === country.slug
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                        }`}
                      >
                        {country.flag} {country.name}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Level Filter */}
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Program Level</h3>
                  <div className="flex flex-wrap gap-2">
                    {levels.map((level) => (
                      <motion.button
                        key={level}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedLevel(selectedLevel === level ? null : level)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                          selectedLevel === level
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                        }`}
                      >
                        {level}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Category Filter */}
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Category</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <motion.button
                        key={category}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                          selectedCategory === category
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                        }`}
                      >
                        {category}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {activeFiltersCount > 0 && (
                  <button onClick={clearFilters} className="text-sm text-primary hover:underline">
                    Clear all filters
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active Filters */}
        {activeFiltersCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-center gap-2 mb-6"
          >
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {selectedCountry && (
              <button
                onClick={() => setSelectedCountry(null)}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
              >
                {countries.find((c) => c.slug === selectedCountry)?.name}
                <X className="w-3 h-3" />
              </button>
            )}
            {selectedLevel && (
              <button
                onClick={() => setSelectedLevel(null)}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
              >
                {selectedLevel}
                <X className="w-3 h-3" />
              </button>
            )}
            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory(null)}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
              >
                {selectedCategory}
                <X className="w-3 h-3" />
              </button>
            )}
          </motion.div>
        )}

        {/* Results */}
        <motion.p variants={fadeInUp} initial="hidden" animate="visible" className="text-sm text-muted-foreground mb-6">
          Showing {filteredCourses.length} courses
        </motion.p>

        {/* Courses Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            layout
          >
            <AnimatePresence>
              {filteredCourses.map((course) => (
                <motion.div
                  key={course.id}
                  variants={fadeInUp}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <Link href={`/courses/${course.slug}`}>
                    <motion.div
                      whileHover={{ y: -5 }}
                      className="group h-full rounded-2xl bg-card border border-border hover:border-primary/50 overflow-hidden transition-all"
                    >
                      {/* Header */}
                      <div className="p-6 border-b border-border">
                        <div className="flex items-start justify-between mb-3">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              course.level === "Master"
                                ? "bg-primary/10 text-primary"
                                : course.level === "Bachelor"
                                  ? "bg-accent/10 text-accent"
                                  : "bg-secondary text-secondary-foreground"
                            }`}
                          >
                            {course.level}
                          </span>
                          <span className="text-lg font-bold text-primary">{course.tuition}</span>
                        </div>
                        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                          {course.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">{course.universityName}</p>
                      </div>

                      {/* Details */}
                      <div className="p-6 space-y-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4 text-primary" />
                          {course.country}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4 text-primary" />
                          {course.duration}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <GraduationCap className="w-4 h-4 text-primary" />
                          {course.language}
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="px-6 pb-6">
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          whileHover={{ opacity: 1, y: 0 }}
                          className="flex items-center justify-between text-primary font-medium"
                        >
                          <span>View Details</span>
                          <ArrowRight className="w-4 h-4" />
                        </motion.div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Empty State */}
        {!isLoading && filteredCourses.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <GraduationCap className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg text-muted-foreground mb-4">No courses found matching your criteria.</p>
            <Button variant="outline" onClick={clearFilters} className="bg-transparent">
              Clear all filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
