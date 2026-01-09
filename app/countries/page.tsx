"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Search, ArrowRight, Users, Building2, DollarSign } from "lucide-react"
import { fadeInUp, staggerContainer, cardHover } from "@/lib/motion"
import countries from "@/data/countries.json"

export default function CountriesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchFocused, setSearchFocused] = useState(false)

  const filteredCountries = useMemo(() => {
    if (!searchQuery) return countries
    return countries.filter(
      (country) =>
        country.country_name.toLowerCase().includes(searchQuery.toLowerCase()) 
        // country.description.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [searchQuery])

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="text-center mb-12">
          <motion.span
            variants={fadeInUp}
            className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
          >
            Explore Destinations
          </motion.span>
          <motion.h1 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Study Abroad Destinations
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover top countries for international education and find your perfect study destination
          </motion.p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className={`max-w-xl mx-auto mb-12 transition-all duration-300 ${searchFocused ? "scale-105" : ""}`}
        >
          <div
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl bg-card border-2 transition-all duration-300 ${
              searchFocused ? "border-primary shadow-lg shadow-primary/10" : "border-border"
            }`}
          >
            <Search className="w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search countries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </div>
        </motion.div>

        {/* Countries Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredCountries.map((country) => (
            <motion.div key={country.country_id} variants={fadeInUp} layout>
              <Link href={`/study-in/${country.country_slug}`}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="group relative p-6 rounded-2xl border bg-white/60 backdrop-blur-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  {/* Gradient Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple-200/20 opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Header */}
                  <div className="relative z-10 flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      🌍
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                        {country.country_name}
                      </h2>
                      <p className="text-xs text-muted-foreground">Study Destination</p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="relative z-10 grid grid-cols-3 gap-4 mb-6">
                    <div className="flex flex-col items-center gap-1">
                      <Building2 className="w-5 h-5 text-primary" />
                      <span className="text-sm font-semibold">
                        {country.universities_count}
                      </span>
                      <span className="text-xs text-muted-foreground">Universities</span>
                    </div>

                    <div className="flex flex-col items-center gap-1">
                      <Users className="w-5 h-5 text-primary" />
                      <span className="text-sm font-semibold">
                        {country.employability}
                      </span>
                      <span className="text-xs text-muted-foreground">Employability</span>
                    </div>

                    <div className="flex flex-col items-center gap-1">
                      <DollarSign className="w-5 h-5 text-primary" />
                      <span className="text-sm font-semibold">
                        {country.average_tuition_fees}
                      </span>
                      <span className="text-xs text-muted-foreground">Tuition</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="text-primary font-medium">
                      Explore {country.country_name}
                    </span>
                    <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredCountries.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <p className="text-lg text-muted-foreground">No countries found matching your search.</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
