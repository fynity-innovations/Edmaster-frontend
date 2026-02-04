"use client"

import { useState, useMemo, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { 
  Search, Filter, ArrowRight, MapPin, BookOpen, 
  Clock, Calendar, X, ChevronDown, 
  Loader2, School, GraduationCap
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
import { Slider } from "@/components/ui/slider"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose
} from "@/components/ui/sheet"
import { fadeInUp, staggerContainer } from "@/lib/motion"
import coursesData from "@/data/courses_final.json" 
import countries from "@/data/countries.json"

// --- Types ---
interface Course {
  course_id: string
  course_title: string
  university_name: string
  country_name: string
  city: string
  level: string 
  category?: string 
  duration: string
  tuition_fees: number
  currency: string
  intake: string
}

const ITEMS_PER_PAGE = 9

export default function CoursesPage() {
  // --- State ---
  const [searchQuery, setSearchQuery] = useState("")
  
  // Filter States
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])
  const [selectedLevels, setSelectedLevels] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedIntakes, setSelectedIntakes] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000])

  // Sorting & UI States
  const [sortBy, setSortBy] = useState<"name" | "tuition_low" | "tuition_high">("name")
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE)
  const [isLoading, setIsLoading] = useState(true)
  
  const loadMoreRef = useRef<HTMLDivElement>(null)

  // --- 1. DATA PROCESSING ---
  const courses = useMemo(() => {
    const rawData = coursesData as unknown as Course[];
    const uniqueMap = new Map();
    rawData.forEach(course => {
      if (course.course_id && !uniqueMap.has(course.course_id)) {
        uniqueMap.set(course.course_id, course);
      }
    });
    return Array.from(uniqueMap.values());
  }, []);

  // --- 2. EXTRACT OPTIONS & RANGES ---
  const { availableLevels, availableCategories, availableIntakes, maxTuition } = useMemo(() => {
    const cats = new Set<string>()
    const levels = new Set<string>()
    const intakes = new Set<string>()
    let maxPrice = 0

    courses.forEach((c) => {
      if (c.category) cats.add(c.category)
      if (c.level) levels.add(c.level)
      if (c.intake) intakes.add(c.intake)
      if (c.tuition_fees && c.tuition_fees > maxPrice) maxPrice = c.tuition_fees
    })

    return {
      availableCategories: Array.from(cats).sort(),
      availableLevels: Array.from(levels).sort(),
      availableIntakes: Array.from(intakes).sort(),
      maxTuition: maxPrice > 0 ? maxPrice : 100000
    }
  }, [courses])

  // Set initial price range when maxTuition is calculated
  useEffect(() => {
    setPriceRange([0, maxTuition])
  }, [maxTuition])

  // --- 3. FILTERING LOGIC ---
  const filteredCourses = useMemo(() => {
    let result = courses

    // Text Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase().trim()
      result = result.filter((course) => {
        const title = (course.course_title || "").toLowerCase()
        const uni = (course.university_name || "").toLowerCase()
        const country = (course.country_name || "").toLowerCase()
        return title.includes(query) || uni.includes(query) || country.includes(query)
      })
    }

    // Checkbox Filters
    if (selectedCountries.length > 0) {
      result = result.filter((course) => 
        course.country_name && selectedCountries.includes(course.country_name)
      )
    }
    if (selectedLevels.length > 0) {
      result = result.filter((course) => 
        course.level && selectedLevels.includes(course.level)
      )
    }
    if (selectedCategories.length > 0) {
      result = result.filter((course) => 
        course.category && selectedCategories.includes(course.category)
      )
    }
    if (selectedIntakes.length > 0) {
      result = result.filter((course) => 
        course.intake && selectedIntakes.includes(course.intake)
      )
    }

    // Price Range Filter
    result = result.filter((course) => {
      const fee = course.tuition_fees || 0
      return fee >= priceRange[0] && fee <= priceRange[1]
    })

    // Sorting
    result = [...result].sort((a, b) => {
      if (sortBy === "name") {
        const nameA = a.course_title || ""
        const nameB = b.course_title || ""
        return nameA.localeCompare(nameB)
      }
      if (sortBy === "tuition_low") return (a.tuition_fees || 0) - (b.tuition_fees || 0)
      if (sortBy === "tuition_high") return (b.tuition_fees || 0) - (a.tuition_fees || 0)
      return 0
    })

    return result
  }, [searchQuery, selectedCountries, selectedLevels, selectedCategories, selectedIntakes, priceRange, sortBy, courses])

  // --- 4. PAGINATION ---
  const visibleCourses = useMemo(() => {
    return filteredCourses.slice(0, visibleCount)
  }, [filteredCourses, visibleCount])

  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE)
    setIsLoading(true)
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [searchQuery, selectedCountries, selectedLevels, selectedCategories, selectedIntakes, priceRange, sortBy])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < filteredCourses.length) {
          setIsLoading(true)
          setTimeout(() => {
            setVisibleCount((prev) => prev + ITEMS_PER_PAGE)
            setIsLoading(false)
          }, 600)
        }
      },
      { threshold: 0.1 }
    )
    if (loadMoreRef.current) observer.observe(loadMoreRef.current)
    return () => observer.disconnect()
  }, [visibleCount, filteredCourses.length])

  // --- HELPERS ---
  const formatCurrency = (amount: number, currency: string) => {
    const val = amount || 0;
    const symbol = currency === "Euros" ? "€" : currency === "USD" ? "$" : currency || "$"
    return `${symbol}${val.toLocaleString()}`
  }

  const toggleFilter = (item: string, currentList: string[], setter: (val: string[]) => void) => {
    setter(currentList.includes(item) ? currentList.filter(i => i !== item) : [...currentList, item])
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCountries([])
    setSelectedLevels([])
    setSelectedCategories([])
    setSelectedIntakes([])
    setPriceRange([0, maxTuition])
  }

  // --- REUSABLE FILTER COMPONENT (SIDEBAR/SHEET) ---
  const FilterContent = () => (
    <div className="space-y-6">
      
      {/* Price Range Slider */}
      <div className="px-1">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <span className="text-sm">Tuition Range</span>
        </h3>
        <Slider
          defaultValue={[0, maxTuition]}
          value={priceRange}
          max={maxTuition}
          step={1000}
          onValueChange={(val: number[]) => setPriceRange([val[0], val[1]])}
          className="my-6"
        />
        <div className="flex items-center justify-between text-xs text-muted-foreground font-medium">
          <div className="bg-white dark:bg-slate-800 border px-2 py-1 rounded">
             {formatCurrency(priceRange[0], "USD")}
          </div>
          <div className="bg-white dark:bg-slate-800 border px-2 py-1 rounded">
             {formatCurrency(priceRange[1], "USD")}
          </div>
        </div>
      </div>

      <div className="h-px bg-border" />

      {/* Accordion for Checkbox Groups */}
      <Accordion type="multiple" defaultValue={["country", "level"]} className="w-full">
        
        {/* Country Filter */}
        <AccordionItem value="country" className="border-none">
          <AccordionTrigger className="py-3 hover:no-underline hover:text-primary">
            <span className="flex items-center gap-2 text-sm font-semibold">
              <MapPin className="w-4 h-4" /> Country
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-2 scrollbar-thin pt-2">
              {countries.map((c) => (
                <label key={c.country_id} className="flex items-center gap-2.5 text-sm cursor-pointer hover:text-primary transition-colors">
                  <Checkbox 
                    checked={selectedCountries.includes(c.country_name)}
                    onCheckedChange={() => toggleFilter(c.country_name, selectedCountries, setSelectedCountries)}
                    className="rounded-[4px] w-4 h-4"
                  />
                  <span className="text-muted-foreground">{c.country_name}</span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Level Filter */}
        <AccordionItem value="level" className="border-none">
          <AccordionTrigger className="py-3 hover:no-underline hover:text-primary">
            <span className="flex items-center gap-2 text-sm font-semibold">
              <GraduationCap className="w-4 h-4" /> Program Level
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-2">
              {availableLevels.map((lvl) => (
                <label key={lvl} className="flex items-center gap-2.5 text-sm cursor-pointer hover:text-primary transition-colors">
                  <Checkbox 
                    checked={selectedLevels.includes(lvl)}
                    onCheckedChange={() => toggleFilter(lvl, selectedLevels, setSelectedLevels)}
                    className="rounded-[4px] w-4 h-4"
                  />
                  <span className="text-muted-foreground">{lvl}</span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Category Filter */}
        <AccordionItem value="category" className="border-none">
          <AccordionTrigger className="py-3 hover:no-underline hover:text-primary">
            <span className="flex items-center gap-2 text-sm font-semibold">
              <BookOpen className="w-4 h-4" /> Discipline
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-2 scrollbar-thin pt-2">
              {availableCategories.map((cat) => (
                <label key={cat} className="flex items-center gap-2.5 text-sm cursor-pointer hover:text-primary transition-colors">
                  <Checkbox 
                    checked={selectedCategories.includes(cat)}
                    onCheckedChange={() => toggleFilter(cat, selectedCategories, setSelectedCategories)}
                    className="rounded-[4px] w-4 h-4"
                  />
                  <span className="text-muted-foreground">{cat}</span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Intake Filter */}
        <AccordionItem value="intake" className="border-none">
          <AccordionTrigger className="py-3 hover:no-underline hover:text-primary">
            <span className="flex items-center gap-2 text-sm font-semibold">
              <Calendar className="w-4 h-4" /> Intake
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-2 scrollbar-thin pt-2">
              {availableIntakes.map((intake) => (
                <label key={intake} className="flex items-center gap-2.5 text-sm cursor-pointer hover:text-primary transition-colors">
                  <Checkbox 
                    checked={selectedIntakes.includes(intake)}
                    onCheckedChange={() => toggleFilter(intake, selectedIntakes, setSelectedIntakes)}
                    className="rounded-[4px] w-4 h-4"
                  />
                  <span className="text-muted-foreground">{intake}</span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )

  return (
    <div className="min-h-screen pt-24 pb-16 bg-slate-50 dark:bg-black">
      <div className="container mx-auto px-4">
        
        {/* --- HEADER --- */}
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="mb-12">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div>
              <motion.span variants={fadeInUp} className="inline-block text-primary font-semibold mb-2">
                Course Catalog
              </motion.span>
              <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
                Find Your Perfect Course
              </motion.h1>
              <motion.p variants={fadeInUp} className="text-muted-foreground mt-2 max-w-xl">
                Explore over {courses.length} courses across various disciplines and top global universities.
              </motion.p>
            </div>
            
            {/* Search Bar */}
            <motion.div variants={fadeInUp} className="w-full md:w-auto relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Search courses, universities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-80 pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-border focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all outline-none"
              />
            </motion.div>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* --- DESKTOP SIDEBAR FILTERS --- */}
          <aside className="w-full lg:w-64 shrink-0 space-y-8 hidden lg:block">
            {/* Active Filters Summary (Desktop) */}
            {(selectedCountries.length > 0 || selectedLevels.length > 0 || selectedCategories.length > 0 || selectedIntakes.length > 0 || priceRange[1] < maxTuition) && (
              <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-border">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-semibold">Active Filters</span>
                  <button onClick={clearFilters} className="text-xs text-red-500 hover:underline">Clear All</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[...selectedCountries, ...selectedLevels, ...selectedCategories, ...selectedIntakes].map(f => (
                    <Badge key={f} variant="secondary" className="text-[10px] h-6 px-2 gap-1">
                      {f} <X className="w-3 h-3 cursor-pointer" onClick={() => {
                        if(selectedCountries.includes(f)) toggleFilter(f, selectedCountries, setSelectedCountries)
                        else if(selectedLevels.includes(f)) toggleFilter(f, selectedLevels, setSelectedLevels)
                        else if(selectedCategories.includes(f)) toggleFilter(f, selectedCategories, setSelectedCategories)
                        else toggleFilter(f, selectedIntakes, setSelectedIntakes)
                      }} />
                    </Badge>
                  ))}
                  
                  {/* Price Badge */}
                  {(priceRange[0] > 0 || priceRange[1] < maxTuition) && (
                    <Badge variant="secondary" className="text-[10px] h-6 px-2 gap-1">
                      {formatCurrency(priceRange[0], 'USD')} - {formatCurrency(priceRange[1], 'USD')}
                      <X className="w-3 h-3 cursor-pointer" onClick={() => setPriceRange([0, maxTuition])} />
                    </Badge>
                  )}
                </div>
              </div>
            )}
            
            <FilterContent />
          </aside>

          {/* --- MAIN CONTENT --- */}
          <div className="flex-1 min-w-0">
            
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 sticky top-20 z-30 bg-slate-50/80 dark:bg-black/80 backdrop-blur-md py-2 -mx-2 px-2 rounded-xl">
              <div className="flex items-center gap-2">
                
                {/* --- MOBILE FILTER SHEET TRIGGER --- */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="lg:hidden">
                      <Filter className="w-4 h-4 mr-2" /> Filters
                      {(selectedCountries.length > 0 || selectedLevels.length > 0 || selectedCategories.length > 0 || selectedIntakes.length > 0) && (
                          <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 flex items-center justify-center rounded-full bg-primary text-primary-foreground">
                            {selectedCountries.length + selectedLevels.length + selectedCategories.length + selectedIntakes.length}
                          </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[260px] sm:w-[320px] overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle>Filter Courses</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6 pl-4 pr-3">
                        <FilterContent />
                    </div>
                    <SheetFooter className="mt-8 border-t pt-4">
                        <SheetClose asChild>
                           <Button className="w-full">Show {filteredCourses.length} Results</Button>
                        </SheetClose>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>

                <span className="text-sm text-muted-foreground font-medium">
                  Showing {filteredCourses.length} results
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground hidden sm:inline">Sort by:</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-9 gap-2">
                      {sortBy === 'name' ? 'Name (A-Z)' : sortBy === 'tuition_low' ? 'Tuition (Low-High)' : 'Tuition (High-Low)'}
                      <ChevronDown className="w-3 h-3 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setSortBy("name")}>Name (A-Z)</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("tuition_low")}>Tuition (Low-High)</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("tuition_high")}>Tuition (High-Low)</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Course Grid */}
            <motion.div layout className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {visibleCourses.map((course) => {
                  return (
                    <motion.div
                      key={course.course_id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link href={`/courses/${course.course_id}`}>
                        <div className="group h-full flex flex-col rounded-2xl bg-white dark:bg-slate-900 border border-border p-5 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                          
                          {/* Card Top: Level & Tuition */}
                          <div className="flex items-center justify-between mb-4">
                            <Badge variant={
                              course.level === "Master" ? "default" : "secondary"
                            } className="uppercase text-[10px] tracking-wider px-2.5">
                              {course.level || "Course"}
                            </Badge>
                            <span className="text-sm font-bold text-primary">
                              {formatCurrency(course.tuition_fees, course.currency)} <span className="text-[10px] text-muted-foreground font-normal">/year</span>
                            </span>
                          </div>

                          {/* Card Content: Title & Uni */}
                          <div className="mb-6 flex-grow">
                            <h3 className="font-bold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                              {course.course_title || "Untitled Course"}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <School className="w-4 h-4 text-primary/70" />
                              <span className="truncate font-medium">{course.university_name || "Unknown University"}</span>
                            </div>
                          </div>

                          {/* Stats Grid */}
                          <div className="grid grid-cols-2 gap-3 mb-4">
                             <div className="flex flex-col gap-1 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-border/50">
                                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                  <Clock className="w-3 h-3" /> Duration
                                </div>
                                <span className="text-xs font-semibold pl-4.5">{course.duration || "N/A"}</span>
                             </div>
                             <div className="flex flex-col gap-1 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-border/50">
                                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                  <Calendar className="w-3 h-3" /> Intake
                                </div>
                                <span className="text-xs font-semibold pl-4.5">{course.intake || "N/A"}</span>
                             </div>
                          </div>

                          {/* Card Footer: Location */}
                          <div className="pt-4 border-t border-border flex items-center justify-between mt-auto">
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <MapPin className="w-3.5 h-3.5" />
                              <span className="truncate max-w-[140px]">{course.city || "Online"}, {course.country_name || ""}</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
                              View Details <ArrowRight className="w-3 h-3" />
                            </div>
                          </div>

                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>

            {/* Loading / Infinite Scroll Sentinel */}
            <div ref={loadMoreRef} className="py-12 flex justify-center w-full">
              {isLoading && visibleCount < filteredCourses.length && (
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  <span className="text-sm font-medium">Loading more courses...</span>
                </div>
              )}
            </div>

            {/* Empty State */}
            {!isLoading && filteredCourses.length === 0 && (
              <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-border border-dashed">
                <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">No courses found</h3>
                <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                  Try adjusting your filters or search query to find the program you are looking for.
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