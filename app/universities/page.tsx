"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Search, Filter, ArrowRight, MapPin, Trophy, Users, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { fadeInUp, staggerContainer, cardHover } from "@/lib/motion"
import { SkeletonCard } from "@/components/ui/skeleton-card"
import universities from "@/data/universities.json"
import countries from "@/data/countries.json"

export default function UniversitiesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const filteredUniversities = useMemo(() => {
    setIsLoading(true)
    const timer = setTimeout(() => setIsLoading(false), 300)

    let result = universities

    if (searchQuery) {
      result = result.filter(
        (uni) =>
          uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          uni.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
          uni.country.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (selectedCountry) {
      result = result.filter((uni) => uni.countrySlug === selectedCountry)
    }

    return result
  }, [searchQuery, selectedCountry])

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="text-center mb-12">
          <motion.span
            variants={fadeInUp}
            className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
          >
            Partner Universities
          </motion.span>
          <motion.h1 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            World-Class Universities
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore top-ranked institutions from around the world and find your perfect match
          </motion.p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col md:flex-row gap-4 mb-8"
        >
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search universities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-card border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-foreground"
            />
          </div>

          {/* Filter Button */}
          <Button
            variant="outline"
            className={`gap-2 bg-transparent ${showFilters ? "border-primary text-primary" : ""}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-4 h-4" />
            Filters
            {selectedCountry && (
              <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                1
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
              <div className="p-6 rounded-2xl bg-card border border-border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground">Filter by Country</h3>
                  {selectedCountry && (
                    <button onClick={() => setSelectedCountry(null)} className="text-sm text-primary hover:underline">
                      Clear filters
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {countries.map((country) => (
                    <motion.button
                      key={country.slug}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedCountry(selectedCountry === country.slug ? null : country.slug)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
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
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active Filters */}
        {selectedCountry && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mb-6"
          >
            <span className="text-sm text-muted-foreground">Filtering by:</span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedCountry(null)}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
            >
              {countries.find((c) => c.slug === selectedCountry)?.name}
              <X className="w-3 h-3" />
            </motion.button>
          </motion.div>
        )}

        {/* Results Count */}
        <motion.p variants={fadeInUp} initial="hidden" animate="visible" className="text-sm text-muted-foreground mb-6">
          Showing {filteredUniversities.length} universities
        </motion.p>

        {/* Universities Grid */}
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
              {filteredUniversities.map((uni) => (
                <motion.div
                  key={uni.id}
                  variants={fadeInUp}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <Link href={`/universities/${uni.slug}`}>
                    <motion.div
                      initial="rest"
                      whileHover="hover"
                      variants={cardHover}
                      className="group rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/50 transition-all h-full"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <motion.img
                          src={uni.image || "/placeholder.svg"}
                          alt={uni.name}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.4 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                        <motion.div
                          className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium"
                          initial={{ scale: 1 }}
                          whileHover={{ scale: 1.1 }}
                        >
                          <Trophy className="w-3 h-3 inline mr-1" />#{uni.ranking}
                        </motion.div>
                      </div>

                      <div className="p-6">
                        <div className="flex items-start gap-3 mb-4">
                          <img
                            src={uni.logo || "/placeholder.svg"}
                            alt=""
                            className="w-12 h-12 rounded-xl object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                              {uni.name}
                            </h3>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <MapPin className="w-3 h-3 flex-shrink-0" />
                              <span className="truncate">
                                {uni.city}, {uni.country}
                              </span>
                            </div>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{uni.shortDescription}</p>

                        <div className="flex items-center justify-between text-sm border-t border-border pt-4">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Users className="w-4 h-4" />
                            <span>{uni.internationalStudents} intl.</span>
                          </div>
                          <span className="text-primary font-medium flex items-center gap-1">
                            View Details
                            <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Empty State */}
        {!isLoading && filteredUniversities.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <p className="text-lg text-muted-foreground mb-4">No universities found matching your criteria.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("")
                setSelectedCountry(null)
              }}
              className="bg-transparent"
            >
              Clear all filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
