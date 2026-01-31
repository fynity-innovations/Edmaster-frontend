"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { 
  Search, 
  ArrowRight, 
  Globe, 
  GraduationCap, 
  Briefcase 
} from "lucide-react"
import { fadeInUp, staggerContainer } from "@/lib/motion"
import countries from "@/data/countries.json"

export default function CountriesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchFocused, setSearchFocused] = useState(false)

  const filteredCountries = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) return countries

    return countries.filter((country) =>
      country.country_name?.toLowerCase().includes(query)
    )
  }, [searchQuery])

  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <motion.div 
          variants={staggerContainer} 
          initial="hidden" 
          animate="visible" 
          className="text-center mb-12"
        >
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredCountries.map((country) => (
            <motion.div key={country.country_id} variants={fadeInUp}>
              <Link href={`/study-in/${country.country_slug}`}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="group relative rounded-2xl bg-card border border-border p-6 transition-all hover:border-primary/50 hover:shadow-xl overflow-hidden h-full"
                >
                  {/* Accent Glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />

                  {/* Card Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="shrink-0">
                      <img
                        src={`https://flagcdn.com/w40/${country.country_code.toLowerCase()}.png`}
                        alt={country.country_name}
                        className="w-10 h-7 rounded object-cover shadow-sm border border-border/50"
                      />
                    </div>

                    <div>
                      <h3 className="text-lg font-bold group-hover:text-primary transition">
                        Study in {country.country_name}
                      </h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Globe className="w-4 h-4" />
                        <span>International destination</span>
                      </div>
                    </div>
                  </div>

                  {/* Stats Section */}
                  <div className="grid grid-cols-3 gap-4 text-center mb-6">
                    <div>
                      <GraduationCap className="w-5 h-5 mx-auto mb-1 text-primary" />
                      <div className="font-semibold text-sm text-foreground">
                        {country.universities_count}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Universities
                      </div>
                    </div>

                    <div>
                      <Briefcase className="w-5 h-5 mx-auto mb-1 text-primary" />
                      <div className="font-semibold text-sm text-foreground">
                        {country.employability}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Employability
                      </div>
                    </div>

                    <div>
                      <span className="block text-primary font-bold text-lg leading-5 mb-1">€</span>
                      <div className="font-semibold text-sm text-foreground">
                        {country.average_tuition_fees}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Tuition
                      </div>
                    </div>
                  </div>

                  {/* Bottom CTA */}
                  <div className="flex items-center justify-between mt-auto pt-2 border-t border-border/50">
                    <span className="text-sm text-muted-foreground">
                      View programs
                    </span>
                    <span className="flex items-center gap-2 text-primary font-medium text-sm">
                      Explore
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                    </span>
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