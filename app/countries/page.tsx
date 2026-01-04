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
                  initial="rest"
                  whileHover="hover"
                  variants={cardHover}
                  className="group rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/50 transition-all"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <motion.img
                      src={ "/placeholder.svg"}
                      alt={country.country_name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                    {/* <div className="absolute top-4 left-4 text-5xl">{country.flag}</div> */}
                    <motion.div
                      className="absolute inset-0 border-4 border-primary rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={{ scale: 0.95 }}
                      whileHover={{ scale: 1 }}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      Study in {country.country_name}
                    </h2>
                    {/* <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{country.shortDescription}</p> */}

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <div className="w-10 h-10 mx-auto mb-1 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Building2 className="w-5 h-5 text-primary" />
                        </div>
                        <div className="text-sm font-semibold text-foreground">{country.universities_count}</div>
                        <div className="text-xs text-muted-foreground">Universities</div>
                      </div>
                      <div className="text-center">
                        <div className="w-10 h-10 mx-auto mb-1 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Users className="w-5 h-5 text-primary" />
                        </div>
                        <div className="text-sm font-semibold text-foreground">{country.employability}</div>
                        <div className="text-xs text-muted-foreground">Employability</div>
                      </div>
                      <div className="text-center">
                        <div className="w-10 h-10 mx-auto mb-1 rounded-lg bg-primary/10 flex items-center justify-center">
                          <DollarSign className="w-5 h-5 text-primary" />
                        </div>
                        <div className="text-xs font-semibold text-foreground line-clamp-1">
                          {country.average_tuition_fees}
                        </div>
                        <div className="text-xs text-muted-foreground">Tuition</div>
                      </div>
                    </div>

                    {/* Explore Link */}
                    <div className="flex items-center text-primary font-medium">
                      <span>Explore {country.country_name}</span>
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
