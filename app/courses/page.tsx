// app/courses/page.tsx (CORRECTED VERSION)
"use client"

import { useState, useMemo, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { 
  Search, Filter, ArrowRight, MapPin, 
  Clock, Calendar, X, ChevronDown, 
  Loader2, School, GraduationCap, Hourglass, Trash2, Info, Bug
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
  duration: string
  tuition_fees: number
  currency: string
  intake: string
}

const ITEMS_PER_PAGE = 9

export default function CoursesPage() {
  const searchParams = useSearchParams()
  
  // Read ALL URL parameters (can have multiple countries/intakes)
  const countriesFromURL = searchParams.getAll('country')
  const intakesFromURL = searchParams.getAll('intake')
  const durationFromURL = searchParams.get('duration') || ""
  const courseFromURL = searchParams.get('course') || ""
  const levelFromURL = searchParams.get('level') || ""
  const maxBudgetParam = searchParams.get('maxBudget')
  const searchFromURL = searchParams.get('search') || ""
  
  // --- State ---
  const [searchQuery, setSearchQuery] = useState(searchFromURL || courseFromURL)
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])
  const [selectedLevels, setSelectedLevels] = useState<string[]>([])
  const [selectedIntakes, setSelectedIntakes] = useState<string[]>([])
  const [selectedDurations, setSelectedDurations] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000])
  const [mounted, setMounted] = useState(false)
  const [debugMode, setDebugMode] = useState(false)

  // UI States
  const [accordionValue, setAccordionValue] = useState<string[]>(["country", "level", "duration", "intake"])
  const [sortBy, setSortBy] = useState<"name" | "tuition_low" | "tuition_high">("name")
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE)
  const [isLoading, setIsLoading] = useState(true)
  const [showChatNotification, setShowChatNotification] = useState(true)
  
  const loadMoreRef = useRef<HTMLDivElement>(null)

  // Set mounted state to true after component mounts
  useEffect(() => {
    setMounted(true)
  }, [])

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
  const { 
    availableLevels, 
    availableIntakes, 
    availableDurations,
    maxTuition,
    allCountries,
    allDurations,
    allCourses
  } = useMemo(() => {
    const levels = new Set<string>()
    const intakes = new Set<string>()
    const durs = new Set<string>()
    const countries = new Set<string>()
    const courseNames = new Set<string>()
    let maxPrice = 0

    courses.forEach((c) => {
      if (c.level) levels.add(c.level)
      if (c.intake) intakes.add(c.intake)
      if (c.duration) durs.add(c.duration)
      if (c.country_name) countries.add(c.country_name)
      if (c.course_title) courseNames.add(c.course_title)
      if (c.tuition_fees && c.tuition_fees > maxPrice) maxPrice = c.tuition_fees
    })

    return {
      availableLevels: Array.from(levels).sort(),
      availableIntakes: Array.from(intakes).sort(),
      availableDurations: Array.from(durs).sort(),
      allCountries: Array.from(countries).sort(),
      allDurations: Array.from(durs).sort(),
      allCourses: Array.from(courseNames).sort(),
      maxTuition: maxPrice > 0 ? maxPrice : 100000
    }
  }, [courses])

  // Set initial price range when maxTuition is calculated
  useEffect(() => {
    if (mounted) {
      setPriceRange([0, maxTuition])
    }
  }, [maxTuition, mounted])

  // --- 3. FIXED DURATION MATCHING ---
  const durationMatches = (courseDuration: string, selectedDuration: string): boolean => {
    if (!courseDuration || !selectedDuration) return false
    
    const courseLower = courseDuration.toLowerCase().trim()
    const selectedLower = selectedDuration.toLowerCase().trim()
    
    // Extract numbers from both strings
    const courseNumbers = courseLower.match(/\d+/g) || []
    const selectedNumbers = selectedLower.match(/\d+/g) || []
    
    // Case 1: Exact match
    if (courseLower === selectedLower) {
      return true
    }
    
    // Case 2: Contains match
    if (courseLower.includes(selectedLower) || selectedLower.includes(courseLower)) {
      if (selectedNumbers.length > 0) {
        const courseHasMultipleNumbers = courseNumbers.length > 1
        if (courseHasMultipleNumbers) {
          return false
        }
      }
      return true
    }
    
    // Case 3: Number-based matching
    if (courseNumbers.length === 1 && selectedNumbers.length === 1) {
      return courseNumbers[0] === selectedNumbers[0]
    }
    
    return false
  }

  // --- 4. SMART FILTER MATCHING ---
  const findBestMatch = (searchTerm: string, options: string[]): string[] => {
    const term = searchTerm.toLowerCase().trim()
    const matches: string[] = []
    
    options.forEach(option => {
      const optionLower = option.toLowerCase()
      
      if (optionLower === term) {
        matches.push(option)
      } else if (optionLower.includes(term) || term.includes(optionLower)) {
        const optionNumbers = optionLower.match(/\d+/g) || []
        const termNumbers = term.match(/\d+/g) || []
        
        if (optionNumbers.length === 1 && termNumbers.length === 1 && optionNumbers[0] === termNumbers[0]) {
          matches.push(option)
        } else if (optionNumbers.length === 0 && termNumbers.length === 0) {
          matches.push(option)
        }
      }
    })
    
    return matches
  }

  // --- 5. Initialize filters from URL parameters ---
  // Add this near your other state declarations:
  const initializedRef = useRef(false)

  // Replace the initialization useEffect with this:
  useEffect(() => {
    if (!mounted || initializedRef.current) return
    
    console.log('Initializing filters from URL...')
    console.log('Countries from URL:', countriesFromURL)
    console.log('Intakes from URL:', intakesFromURL)
    console.log('Level from URL:', levelFromURL)
    console.log('Duration from URL:', durationFromURL)
    console.log('Max Budget from URL:', maxBudgetParam)
    
    // Set countries
    if (countriesFromURL.length > 0) {
      setSelectedCountries(countriesFromURL)
      console.log('✓ Set countries:', countriesFromURL)
    }
    
    // Set intakes
    if (intakesFromURL.length > 0) {
      setSelectedIntakes(intakesFromURL)
      console.log('✓ Set intakes:', intakesFromURL)
    }
    
    // Set level
    if (levelFromURL) {
      const levelMatches = findBestMatch(levelFromURL, availableLevels)
      if (levelMatches.length > 0) {
        setSelectedLevels(levelMatches)
        console.log('✓ Set levels:', levelMatches)
      }
    }
    
    // Set duration
    if (durationFromURL) {
      const durationMatches = findBestMatch(durationFromURL, allDurations)
      if (durationMatches.length > 0) {
        setSelectedDurations(durationMatches)
        console.log('✓ Set durations:', durationMatches)
      }
    }
    
    // Mark as initialized
    initializedRef.current = true
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted])

  // --- 6. FILTERING LOGIC ---
  const filteredCourses = useMemo(() => {
    let result = courses

    console.log('Starting filter with', result.length, 'courses')

    // Text Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase().trim()
      result = result.filter((course) => {
        const title = (course.course_title || "").toLowerCase()
        const uni = (course.university_name || "").toLowerCase()
        const country = (course.country_name || "").toLowerCase()
        return title.includes(query) || uni.includes(query) || country.includes(query)
      })
      console.log(`After search query "${searchQuery}": ${result.length} courses`)
    }

    // Country Filter
    if (selectedCountries.length > 0) {
      result = result.filter((course) => {
        if (!course.country_name) return false
        return selectedCountries.some(selected => 
          selected.toLowerCase() === course.country_name.toLowerCase()
        )
      })
      console.log(`After country filter: ${result.length} courses`)
    }

    // Level Filter
    if (selectedLevels.length > 0) {
      result = result.filter((course) => {
        if (!course.level) return false
        return selectedLevels.some(selected => 
          selected.toLowerCase() === course.level.toLowerCase()
        )
      })
      console.log(`After level filter: ${result.length} courses`)
    }

    // Intake Filter
    if (selectedIntakes.length > 0) {
      result = result.filter((course) => {
        if (!course.intake) return false
        return selectedIntakes.some(selected => 
          selected.toLowerCase() === course.intake.toLowerCase()
        )
      })
      console.log(`After intake filter: ${result.length} courses`)
    }

    // Duration Filter
    if (selectedDurations.length > 0) {
      result = result.filter((course) => {
        if (!course.duration) return false
        return selectedDurations.some(selectedDuration => 
          durationMatches(course.duration, selectedDuration)
        )
      })
      console.log(`After duration filter: ${result.length} courses`)
    }

    // Budget Filter from AI (maxBudget URL param)
    if (maxBudgetParam) {
      const maxBudget = parseFloat(maxBudgetParam)
      result = result.filter((course) => {
        const fee = course.tuition_fees || 0
        return fee <= maxBudget
      })
      console.log(`After budget filter (max $${maxBudget}): ${result.length} courses`)
    }

    // Price Range Filter (from slider)
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

    console.log(`Final filtered courses: ${result.length}`)
    return result
  }, [
    searchQuery, selectedCountries, selectedLevels, 
    selectedIntakes, selectedDurations,
    priceRange, sortBy, courses, maxBudgetParam
  ])

  // --- 7. PAGINATION ---
  const visibleCourses = useMemo(() => {
    return filteredCourses.slice(0, visibleCount)
  }, [filteredCourses, visibleCount])

  useEffect(() => {
    if (mounted) {
      setVisibleCount(ITEMS_PER_PAGE)
      setIsLoading(true)
      const timer = setTimeout(() => setIsLoading(false), 500)
      return () => clearTimeout(timer)
    }
  }, [
    searchQuery, selectedCountries, selectedLevels, 
    selectedIntakes, selectedDurations, 
    priceRange, sortBy, mounted
  ])

  useEffect(() => {
    if (!mounted) return;
    
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
  }, [visibleCount, filteredCourses.length, mounted])

  // --- HELPERS ---
  const formatCurrency = (amount: number, currency: string) => {
    const val = amount || 0;
    const symbol = currency === "Euros" ? "€" : currency === "USD" ? "$" : currency || "$"
    const formattedValue = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `${symbol}${formattedValue}`
  }

  const toggleFilter = (item: string, currentList: string[], setter: (val: string[]) => void) => {
    setter(currentList.includes(item) ? currentList.filter(i => i !== item) : [...currentList, item])
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCountries([])
    setSelectedLevels([])
    setSelectedIntakes([])
    setSelectedDurations([])
    setPriceRange([0, maxTuition])
  }

  const clearChatFilters = () => {
    setSearchQuery("")
    setSelectedCountries([])
    setSelectedDurations([])
    setSelectedLevels([])
    setSelectedIntakes([])
  }

  // Check if any filter is active
  const hasActiveFilters = selectedCountries.length > 0 || selectedLevels.length > 0 || selectedIntakes.length > 0 || selectedDurations.length > 0 || priceRange[1] < maxTuition
  const hasChatFilters = countriesFromURL.length > 0 || intakesFromURL.length > 0 || durationFromURL || courseFromURL || levelFromURL || maxBudgetParam

  // --- REUSABLE FILTER COMPONENT ---
  const FilterContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className="space-y-6">
      
      {/* Mobile-only Clear Filter Button */}
      {isMobile && hasActiveFilters && (
        <Button 
          variant="destructive" 
          size="sm" 
          onClick={clearFilters} 
          className="w-full mb-4 gap-2"
        >
          <Trash2 className="w-4 h-4" /> Clear All Filters
        </Button>
      )}

      {/* Price Range Slider */}
      <div className="px-1">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <span className="text-sm">Tuition Range</span>
        </h3>
        <Slider
          // defaultValue={[0, maxTuition]}
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
      <Accordion 
        type="multiple" 
        value={accordionValue} 
        onValueChange={setAccordionValue} 
        className="w-full"
      >
        
        {/* Country Filter */}
        <AccordionItem value="country" className="border-none">
          <AccordionTrigger className="py-3 hover:no-underline hover:text-primary">
            <span className="flex items-center gap-2 text-sm font-semibold">
              <MapPin className="w-4 h-4" /> Country ({selectedCountries.length})
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-2 scrollbar-thin pt-2">
              {allCountries.map((c) => (
                <label key={c} className="flex items-center gap-2.5 text-sm cursor-pointer hover:text-primary transition-colors">
                  <Checkbox 
                    checked={selectedCountries.includes(c)}
                    onCheckedChange={() => toggleFilter(c, selectedCountries, setSelectedCountries)}
                    className="rounded-[4px] w-4 h-4"
                  />
                  <span className="text-muted-foreground">{c}</span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Level Filter */}
        <AccordionItem value="level" className="border-none">
          <AccordionTrigger className="py-3 hover:no-underline hover:text-primary">
            <span className="flex items-center gap-2 text-sm font-semibold">
              <GraduationCap className="w-4 h-4" /> Program Level ({selectedLevels.length})
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

        {/* Duration Filter */}
        <AccordionItem value="duration" className="border-none">
          <AccordionTrigger className="py-3 hover:no-underline hover:text-primary">
            <span className="flex items-center gap-2 text-sm font-semibold">
              <Hourglass className="w-4 h-4" /> Duration ({selectedDurations.length})
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-2 scrollbar-thin pt-2">
              {allDurations.map((dur) => (
                <label key={dur} className="flex items-center gap-2.5 text-sm cursor-pointer hover:text-primary transition-colors">
                  <Checkbox 
                    checked={selectedDurations.includes(dur)}
                    onCheckedChange={() => toggleFilter(dur, selectedDurations, setSelectedDurations)}
                    className="rounded-[4px] w-4 h-4"
                  />
                  <span className="text-muted-foreground">{dur}</span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Intake Filter */}
        <AccordionItem value="intake" className="border-none">
          <AccordionTrigger className="py-3 hover:no-underline hover:text-primary">
            <span className="flex items-center gap-2 text-sm font-semibold">
              <Calendar className="w-4 h-4" /> Intake ({selectedIntakes.length})
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

  const renderChatNotification = mounted && hasChatFilters && showChatNotification

  return (
    <div className="min-h-screen pt-24 pb-16 bg-slate-50 dark:bg-black">
      <div className="container mx-auto px-4">
        
        {/* Chatbot Recommendation Notification */}
        <AnimatePresence>
          {renderChatNotification && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-lg"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center flex-shrink-0">
                    <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                      AI-Filtered Course Recommendations
                    </h3>
                    <div className="text-sm text-blue-700 dark:text-blue-300 mb-2 flex flex-wrap gap-2">
                      {selectedCountries.length > 0 && (
                        <span className="bg-blue-100 dark:bg-blue-800 px-2 py-0.5 rounded">
                          📍 {selectedCountries.join(", ")}
                        </span>
                      )}
                      {selectedLevels.length > 0 && (
                        <span className="bg-blue-100 dark:bg-blue-800 px-2 py-0.5 rounded">
                          🎓 {selectedLevels.join(", ")}
                        </span>
                      )}
                      {selectedIntakes.length > 0 && (
                        <span className="bg-blue-100 dark:bg-blue-800 px-2 py-0.5 rounded">
                          📅 {selectedIntakes.join(", ")}
                        </span>
                      )}
                      {maxBudgetParam && (
                        <span className="bg-blue-100 dark:bg-blue-800 px-2 py-0.5 rounded">
                          💰 Up to ${parseInt(maxBudgetParam).toLocaleString()}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-blue-600 dark:text-blue-400">
                      Found {filteredCourses.length} matching courses
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={clearChatFilters}
                    className="text-xs"
                  >
                    Clear
                  </Button>
                  <button
                    onClick={() => setShowChatNotification(false)}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
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
            {hasActiveFilters && (
              <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-border">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-semibold">Active Filters</span>
                  <button onClick={clearFilters} className="text-xs text-red-500 hover:underline">Clear All</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[...selectedCountries, ...selectedLevels, ...selectedIntakes, ...selectedDurations].map(f => (
                    <Badge key={f} variant="secondary" className="text-[10px] h-6 px-2 gap-1">
                      {f} <X className="w-3 h-3 cursor-pointer" onClick={() => {
                        if(selectedCountries.includes(f)) toggleFilter(f, selectedCountries, setSelectedCountries)
                        else if(selectedLevels.includes(f)) toggleFilter(f, selectedLevels, setSelectedLevels)
                        else if(selectedIntakes.includes(f)) toggleFilter(f, selectedIntakes, setSelectedIntakes)
                        else toggleFilter(f, selectedDurations, setSelectedDurations)
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
                      {hasActiveFilters && (
                          <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 flex items-center justify-center rounded-full bg-primary text-primary-foreground">
                            {selectedCountries.length + selectedLevels.length + selectedIntakes.length + selectedDurations.length}
                          </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[280px] sm:w-[320px] overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle>Filter Courses</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6 pl-4 pr-3">
                        <FilterContent isMobile={true} />
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
                  {hasChatFilters && (
                    <span className="text-blue-600 dark:text-blue-400 ml-1">
                      (AI filtered)
                    </span>
                  )}
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
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">No courses found</h3>
                <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                  {hasChatFilters 
                    ? "No courses match your AI-generated preferences. Try adjusting your search criteria."
                    : "Try adjusting your filters or search query to find the program you are looking for."
                  }
                </p>
                <div className="flex gap-2 justify-center">
                  {hasChatFilters && (
                    <Button onClick={clearChatFilters} variant="outline">Clear AI Filters</Button>
                  )}
                  <Button onClick={clearFilters} variant="outline">Clear All Filters</Button>
                </div>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  )
}