"use client"

import { useState, useMemo, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { 
  Search, Filter, ArrowRight, MapPin, GraduationCap, 
  Briefcase, Wallet, X, SlidersHorizontal, ChevronDown, 
  Check, ArrowUpDown, Loader2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { fadeInUp, staggerContainer } from "@/lib/motion"
import { SkeletonCard } from "@/components/ui/skeleton-card"
import universities from "@/data/universities.json"
import countries from "@/data/countries.json"

const ITEMS_PER_PAGE = 9

export default function UniversitiesPage() {
  // --- State ---
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])
  const [selectedBadges, setSelectedBadges] = useState<string[]>([])
  const [minPrograms, setMinPrograms] = useState<number | null>(null)
  const [sortBy, setSortBy] = useState<"name" | "programs" | "tuition">("name")
  
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE)
  const [isLoading, setIsLoading] = useState(true)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  
  const loadMoreRef = useRef<HTMLDivElement>(null)

  // --- Derived Data ---
  // Extract unique badges for filter options
  const availableBadges = useMemo(() => {
    const badges = new Set<string>()
    universities.forEach(u => {
      if (u.badge) badges.add(u.badge)
    })
    return Array.from(badges)
  }, [])

  // --- Filtering Logic ---
  const filteredUniversities = useMemo(() => {
    let result = universities

    // 1. Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (uni) =>
          uni.university_name.toLowerCase().includes(query) ||
          uni.location.toLowerCase().includes(query) ||
          uni.country_name.toLowerCase().includes(query)
      )
    }

    // 2. Country Filter (Multi-select)
    if (selectedCountries.length > 0) {
      result = result.filter((uni) => selectedCountries.includes(uni.country_name))
    }

    // 3. Badge Filter
    if (selectedBadges.length > 0) {
      result = result.filter((uni) => uni.badge && selectedBadges.includes(uni.badge))
    }

    // 4. Programs Filter
    if (minPrograms !== null) {
      result = result.filter((uni) => uni.programs_count >= minPrograms)
    }

    // 5. Sorting
    result = [...result].sort((a, b) => {
      if (sortBy === "name") return a.university_name.localeCompare(b.university_name)
      if (sortBy === "programs") return b.programs_count - a.programs_count
      // Simple string comparison for tuition as placeholder
      if (sortBy === "tuition") return (a.average_tuition_fees || "").localeCompare(b.average_tuition_fees || "")
      return 0
    })

    return result
  }, [searchQuery, selectedCountries, selectedBadges, minPrograms, sortBy])

  // --- Pagination Logic (Infinite Scroll) ---
  const visibleUniversities = useMemo(() => {
    return filteredUniversities.slice(0, visibleCount)
  }, [filteredUniversities, visibleCount])

  // Reset pagination when filters change
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE)
    setIsLoading(true)
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [searchQuery, selectedCountries, selectedBadges, minPrograms, sortBy])

  // Infinite Scroll Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < filteredUniversities.length) {
          setIsLoading(true)
          setTimeout(() => {
            setVisibleCount((prev) => prev + ITEMS_PER_PAGE)
            setIsLoading(false)
          }, 600) // Artificial delay for smooth UX
        }
      },
      { threshold: 0.1 }
    )

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current)
    }

    return () => observer.disconnect()
  }, [visibleCount, filteredUniversities.length])

  // --- Handlers ---
  const toggleCountry = (country: string) => {
    setSelectedCountries(prev => 
      prev.includes(country) ? prev.filter(c => c !== country) : [...prev, country]
    )
  }

  const toggleBadge = (badge: string) => {
    setSelectedBadges(prev => 
      prev.includes(badge) ? prev.filter(b => b !== badge) : [...prev, badge]
    )
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCountries([])
    setSelectedBadges([])
    setMinPrograms(null)
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-slate-50 dark:bg-black">
      <div className="container mx-auto px-4">
        
        {/* --- HEADER --- */}
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="mb-12">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div>
              <motion.span variants={fadeInUp} className="inline-block text-primary font-semibold mb-2">
                Explore Education
              </motion.span>
              <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
                Global Universities
              </motion.h1>
              <motion.p variants={fadeInUp} className="text-muted-foreground mt-2 max-w-xl">
                Browse through our curated list of {universities.length} partner institutions.
              </motion.p>
            </div>
            
            {/* Search Bar */}
            <motion.div variants={fadeInUp} className="w-full md:w-auto relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Search universities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-80 pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-border focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all outline-none"
              />
            </motion.div>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* --- SIDEBAR FILTERS (Desktop) --- */}
          <aside className={`w-full lg:w-64 shrink-0 space-y-8 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
            
            {/* Active Filters Summary */}
            {(selectedCountries.length > 0 || selectedBadges.length > 0 || minPrograms) && (
              <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-border">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-semibold">Active Filters</span>
                  <button onClick={clearFilters} className="text-xs text-red-500 hover:underline">Clear All</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedCountries.map(c => (
                    <Badge key={c} variant="secondary" className="text-[10px] h-6 px-2 gap-1" onClick={() => toggleCountry(c)}>
                      {c} <X className="w-3 h-3 cursor-pointer" />
                    </Badge>
                  ))}
                  {selectedBadges.map(b => (
                    <Badge key={b} variant="secondary" className="text-[10px] h-6 px-2 gap-1" onClick={() => toggleBadge(b)}>
                      {b} <X className="w-3 h-3 cursor-pointer" />
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Filter Groups */}
            <div className="space-y-6">
              {/* Country Filter */}
              <div>
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Country
                </h3>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-2 scrollbar-thin">
                  {countries.map((country) => (
                    <label key={country.country_id} className="flex items-center gap-2.5 text-sm cursor-pointer hover:text-primary transition-colors">
                      <Checkbox 
                        checked={selectedCountries.includes(country.country_name)}
                        onCheckedChange={() => toggleCountry(country.country_name)}
                        className="rounded-[4px] w-4 h-4"
                      />
                      <span className="text-muted-foreground">{country.country_name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="h-px bg-border" />

              {/* Badges Filter */}
              <div>
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" /> Categories
                </h3>
                <div className="space-y-2">
                  {availableBadges.map((badge) => (
                    <label key={badge} className="flex items-center gap-2.5 text-sm cursor-pointer hover:text-primary transition-colors">
                      <Checkbox 
                        checked={selectedBadges.includes(badge)}
                        onCheckedChange={() => toggleBadge(badge)}
                         className="rounded-[4px] w-4 h-4"
                      />
                      <span className="text-muted-foreground">{badge}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="h-px bg-border" />

               {/* Programs Count Filter */}
               <div>
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Briefcase className="w-4 h-4" /> Program Size
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[10, 20, 50].map((num) => (
                     <button
                        key={num}
                        onClick={() => setMinPrograms(minPrograms === num ? null : num)}
                        className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${
                          minPrograms === num 
                          ? "bg-primary text-primary-foreground border-primary" 
                          : "bg-background border-border hover:border-primary/50"
                        }`}
                     >
                        {num}+ Courses
                     </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* --- MAIN GRID AREA --- */}
          <div className="flex-1 min-w-0">
            
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 sticky top-20 z-30 bg-slate-50/80 dark:bg-black/80 backdrop-blur-md py-2 -mx-2 px-2 rounded-xl">
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="lg:hidden"
                  onClick={() => setShowMobileFilters(!showMobileFilters)}
                >
                  <Filter className="w-4 h-4 mr-2" /> Filters
                </Button>
                <span className="text-sm text-muted-foreground font-medium">
                  Showing {filteredUniversities.length} results
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground hidden sm:inline">Sort by:</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-9 gap-2">
                      {sortBy === 'name' ? 'Name (A-Z)' : sortBy === 'programs' ? 'Programs Count' : 'Tuition Fees'}
                      <ChevronDown className="w-3 h-3 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setSortBy("name")}>Name (A-Z)</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("programs")}>Most Programs</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("tuition")}>Tuition Fees</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Grid */}
            <motion.div
              layout
              className="grid md:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {visibleUniversities.map((uni) => (
                  <motion.div
                    key={uni.university_id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link href={`/universities/${uni.university_slug}`}>
                      <div className="group h-full flex flex-col rounded-2xl bg-white dark:bg-slate-900 border border-border p-5 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                        
                        {/* Card Top */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center border border-border/50 group-hover:scale-105 transition-transform">
                             <GraduationCap className="w-6 h-6 text-primary" />
                          </div>
                          {uni.badge && (
                            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none text-[10px] uppercase font-bold tracking-wider">
                              {uni.badge}
                            </Badge>
                          )}
                        </div>

                        {/* Card Content */}
                        <div className="mb-6 flex-grow">
                          <h3 className="font-bold text-lg text-foreground mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                            {uni.university_name}
                          </h3>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                            <MapPin className="w-3.5 h-3.5" />
                            <span className="truncate">{uni.location}</span>
                          </div>
                          
                          {/* Mini Stats Row */}
                          <div className="flex items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg">
                            <div className="flex items-center gap-1">
                              <Briefcase className="w-3.5 h-3.5" />
                              {uni.programs_count} Programs
                            </div>
                            <div className="w-px h-3 bg-border" />
                            <div className="flex items-center gap-1">
                              <Wallet className="w-3.5 h-3.5" />
                              {uni.average_tuition_fees ? 'Paid' : 'TBA'}
                            </div>
                          </div>
                        </div>

                        {/* Card Footer */}
                        <div className="pt-4 border-t border-border flex items-center justify-between mt-auto">
                          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">View Details</span>
                          <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>

                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Loading / Infinite Scroll Sentinel */}
            <div ref={loadMoreRef} className="py-12 flex justify-center w-full">
              {isLoading && visibleCount < filteredUniversities.length && (
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  <span className="text-sm font-medium">Loading more universities...</span>
                </div>
              )}
            </div>

            {/* Empty State */}
            {!isLoading && filteredUniversities.length === 0 && (
              <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-border border-dashed">
                <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">No universities found</h3>
                <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                  Try adjusting your filters or search query to find what you're looking for.
                </p>
                <Button onClick={clearFilters} variant="outline">Clear Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}