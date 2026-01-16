"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Search, ArrowRight, Users, Building2, DollarSign, TrendingUp } from "lucide-react"
import { fadeInUp, staggerContainer, cardHover } from "@/lib/motion"
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



  // Color gradients for cards
  const gradients = [
    "from-blue-500 to-cyan-500",
    "from-purple-500 to-pink-500",
    "from-amber-500 to-orange-500",
    "from-red-500 to-rose-500",
    "from-indigo-500 to-blue-500",
    "from-emerald-500 to-teal-500"
  ]

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
          {filteredCountries.map((country, index) => (
            <motion.div key={country.country_id} variants={fadeInUp}>
              <Link href={`/study-in/${country.country_slug}`}>
                <div className="group relative h-full rounded-3xl bg-white border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2">
                  {/* Gradient Header */}
                  <div className={`relative bg-gradient-to-br ${gradients[index % gradients.length]} p-6 overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-8 -translate-y-8" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-2xl transform -translate-x-8 translate-y-8" />
                    
                    <div className="relative z-10 flex items-center gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-500">
                        🌍
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white drop-shadow-lg">
                          {country.country_name}
                        </h2>
                        <p className="text-sm text-white/90 font-medium">Study Destination</p>
                      </div>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="p-6 space-y-4">
                    <div className="grid grid-cols-3 gap-3">
                      <div className="flex flex-col items-center p-3 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 group-hover:from-blue-100 group-hover:to-cyan-100 transition-all duration-300">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mb-2 shadow-sm">
                          <Building2 className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="text-xl font-bold text-gray-900">
                          {country.universities_count}
                        </span>
                        <span className="text-xs text-gray-600 font-medium">Universities</span>
                      </div>

                      <div className="flex flex-col items-center p-3 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 group-hover:from-purple-100 group-hover:to-pink-100 transition-all duration-300">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mb-2 shadow-sm">
                          <TrendingUp className="w-5 h-5 text-purple-600" />
                        </div>
                        <span className="text-xl font-bold text-gray-900">
                          {country.employability}
                        </span>
                        <span className="text-xs text-gray-600 font-medium">Employment</span>
                      </div>

                      <div className="flex flex-col items-center p-3 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 group-hover:from-emerald-100 group-hover:to-teal-100 transition-all duration-300">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mb-2 shadow-sm">
                          <DollarSign className="w-5 h-5 text-emerald-600" />
                        </div>
                        <span className="text-sm font-bold text-gray-900">
                          {country.average_tuition_fees}
                        </span>
                        <span className="text-xs text-gray-600 font-medium">Avg. Fee</span>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <button className={`w-full mt-4 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 group/btn`}>
                      <span>Explore {country.country_name}</span>
                      <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  {/* Decorative corner accent */}
                  <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${gradients[index % gradients.length]} opacity-20 rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform duration-500`} />
                </div>
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