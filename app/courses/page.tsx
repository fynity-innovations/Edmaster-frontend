"use client"

import { useState, useMemo, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { 
  Search, Filter, ArrowRight, MapPin, 
  Clock, Calendar, X, ChevronDown, 
  Loader2, School, GraduationCap, Hourglass, Trash2, Info
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

// ─── Season → month keywords mapping for intake matching ─────────────────────
const INTAKE_SEASON_MAP: Record<string, string[]> = {
  'fall':   ['september', 'october', 'fall', 'autumn', 'sep', 'oct'],
  'spring': ['january', 'february', 'march', 'spring', 'jan', 'feb', 'mar'],
  'summer': ['june', 'july', 'august', 'summer', 'jun', 'jul', 'aug'],
  'winter': ['november', 'december', 'winter', 'nov', 'dec'],
}

// ─── Parse duration string → years (supports decimals like 1.5, 3.8) ─────────
function parseDurationToYears(d: string): number | null {
  if (!d) return null
  const s = d.toLowerCase().trim()
  const yr = s.match(/(\d+(?:\.\d+)?)\s*years?/)
  if (yr) return parseFloat(yr[1])
  const mo = s.match(/(\d+(?:\.\d+)?)\s*months?/)
  if (mo) return parseFloat(mo[1]) / 12
  const rng = s.match(/(\d+(?:\.\d+)?)\s*(?:-|to)\s*(\d+(?:\.\d+)?)\s*years?/)
  if (rng) return (parseFloat(rng[1]) + parseFloat(rng[2])) / 2
  const num = s.match(/\d+(?:\.\d+)?/)
  if (num) return parseFloat(num[0])
  return null
}

// ─── FIX 2: Smart intake matching — handles "Fall 2026" vs "September 2026" ──
function intakeMatches(courseIntake: string, selectedIntake: string): boolean {
  if (!courseIntake || !selectedIntake) return false
  const ci = courseIntake.toLowerCase().trim()
  const si = selectedIntake.toLowerCase().trim()

  // Direct match
  if (ci === si || ci.includes(si) || si.includes(ci)) return true

  // Extract year from both
  const ciYear = ci.match(/\d{4}/)?.[0]
  const siYear = si.match(/\d{4}/)?.[0]

  // If years don't match (and both have years), skip
  if (ciYear && siYear && ciYear !== siYear) return false

  // Season matching
  for (const [season, keywords] of Object.entries(INTAKE_SEASON_MAP)) {
    const siHasSeason = si.includes(season) || keywords.some(k => si.includes(k))
    const ciHasSeason = ci.includes(season) || keywords.some(k => ci.includes(k))
    if (siHasSeason && ciHasSeason) return true
  }

  return false
}

export default function CoursesPage() {
  const searchParams = useSearchParams()
  
  // Read ALL URL parameters
  const countriesFromURL  = searchParams.getAll('country')
  const intakesFromURL    = searchParams.getAll('intake')
  const durationFromURL   = searchParams.get('duration') || ""
  const courseFromURL     = searchParams.get('course') || ""
  const levelFromURL      = searchParams.get('level') || ""
  const maxBudgetParam    = searchParams.get('maxBudget')
  const searchFromURL     = searchParams.get('search') || ""
  const durationMinParam  = searchParams.get('durationMin')
  const durationMaxParam  = searchParams.get('durationMax')
  
  // --- State ---
  const [searchQuery, setSearchQuery]             = useState(searchFromURL || courseFromURL)
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])
  const [selectedLevels, setSelectedLevels]       = useState<string[]>([])
  const [selectedIntakes, setSelectedIntakes]     = useState<string[]>([])
  const [selectedDurations, setSelectedDurations] = useState<string[]>([])
  const [mounted, setMounted]                     = useState(false)
  const [priceRange, setPriceRange]               = useState<[number, number]>([0, 100000])
  const priceRangeReady                           = useRef(false)

  // UI States
  const [accordionValue, setAccordionValue] = useState<string[]>(["country", "level", "duration", "intake"])
  const [sortBy, setSortBy]                 = useState<"name" | "tuition_low" | "tuition_high">("name")
  const [visibleCount, setVisibleCount]     = useState(ITEMS_PER_PAGE)
  const [isLoading, setIsLoading]           = useState(true)
  const [showChatNotification, setShowChatNotification] = useState(true)
  
  const loadMoreRef    = useRef<HTMLDivElement>(null)
  // FIX 1: separate ref so we can re-run init when data is ready
  const initializedRef = useRef(false)

  useEffect(() => { setMounted(true) }, [])

  // --- 1. DATA PROCESSING ---
  const courses = useMemo(() => {
    const rawData = coursesData as unknown as Course[]
    const uniqueMap = new Map()
    rawData.forEach(course => {
      if (course.course_id && !uniqueMap.has(course.course_id)) {
        uniqueMap.set(course.course_id, course)
      }
    })
    return Array.from(uniqueMap.values())
  }, [])

  // --- 2. EXTRACT OPTIONS & RANGES ---
  const { availableLevels, availableIntakes, maxTuition, allCountries, allDurations } = useMemo(() => {
    const levels = new Set<string>(), intakes = new Set<string>(),
          durs   = new Set<string>(), ctrs    = new Set<string>()
    let maxPrice = 0
    courses.forEach((c) => {
      if (c.level)        levels.add(c.level)
      if (c.intake)       intakes.add(c.intake)
      if (c.duration)     durs.add(c.duration)
      if (c.country_name) ctrs.add(c.country_name)
      if (c.tuition_fees && c.tuition_fees > maxPrice) maxPrice = c.tuition_fees
    })
    return {
      availableLevels:    Array.from(levels).sort(),
      availableIntakes:   Array.from(intakes).sort(),
      allCountries:       Array.from(ctrs).sort(),
      allDurations:       Array.from(durs).sort(),
      maxTuition:         maxPrice > 0 ? maxPrice : 100000,
    }
  }, [courses])

  // Set price range from maxTuition once, only when no AI budget param
  useEffect(() => {
    if (mounted && !priceRangeReady.current && !maxBudgetParam) {
      setPriceRange([0, maxTuition])
      priceRangeReady.current = true
    }
  }, [maxTuition, mounted, maxBudgetParam])

  // --- 3. DURATION MATCHING (string-based, for sidebar checkboxes) ---
  const durationMatches = (courseDuration: string, selectedDuration: string): boolean => {
    if (!courseDuration || !selectedDuration) return false
    const cl = courseDuration.toLowerCase().trim()
    const sl = selectedDuration.toLowerCase().trim()
    if (cl === sl) return true
    const cNums = cl.match(/\d+/g) || []
    const sNums = sl.match(/\d+/g) || []
    if (cl.includes(sl) || sl.includes(cl)) {
      if (sNums.length > 0 && cNums.length > 1) return false
      return true
    }
    if (cNums.length === 1 && sNums.length === 1) return cNums[0] === sNums[0]
    return false
  }

  // --- 4. SMART FILTER MATCHING ---
  const findBestMatch = (searchTerm: string, options: string[]): string[] => {
    const term = searchTerm.toLowerCase().trim()
    const matches: string[] = []
    options.forEach(option => {
      const ol = option.toLowerCase()
      if (ol === term) { matches.push(option); return }
      if (ol.includes(term) || term.includes(ol)) {
        const oNums = ol.match(/\d+/g) || []
        const tNums = term.match(/\d+/g) || []
        if (oNums.length === 1 && tNums.length === 1 && oNums[0] === tNums[0]) matches.push(option)
        else if (oNums.length === 0 && tNums.length === 0) matches.push(option)
      }
    })
    return matches
  }

  // ─── FIX 1: Initialize filters from URL — wait until data is ready ──────────
  useEffect(() => {
    if (!mounted || initializedRef.current) return
    // Wait until options are populated from data
    if (availableLevels.length === 0 || allDurations.length === 0) return

    if (countriesFromURL.length > 0) setSelectedCountries(countriesFromURL)

    // FIX 2: Use smart intake matching against available intakes in data
    if (intakesFromURL.length > 0) {
      if (intakesFromURL.includes("Any Intake")) {
        // "Any Intake" = no intake filter, show everything
        setSelectedIntakes([])
      } else {
        const matchedIntakes: string[] = []
        intakesFromURL.forEach(urlIntake => {
          availableIntakes.forEach(dataIntake => {
            if (intakeMatches(dataIntake, urlIntake) && !matchedIntakes.includes(dataIntake)) {
              matchedIntakes.push(dataIntake)
            }
          })
        })
        setSelectedIntakes(matchedIntakes)
      }
    }

    if (levelFromURL) {
      const lm = findBestMatch(levelFromURL, availableLevels)
      if (lm.length > 0) setSelectedLevels(lm)
    }

    if (durationFromURL) {
      const dm = findBestMatch(durationFromURL, allDurations)
      if (dm.length > 0) setSelectedDurations(dm)
    }

    initializedRef.current = true
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, availableLevels, allDurations, availableIntakes])
  // ^^^^^ FIX 1: Added availableLevels, allDurations, availableIntakes as deps

  // --- 5. FILTERING LOGIC ---
  const filteredCourses = useMemo(() => {
    let result = courses
    console.log('Starting filter with', result.length, 'courses')

    // Text Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase().trim()
      result = result.filter((c) => {
        const title = (c.course_title || "").toLowerCase()
        const uni   = (c.university_name || "").toLowerCase()
        const cntry = (c.country_name || "").toLowerCase()
        return title.includes(query) || uni.includes(query) || cntry.includes(query)
      })
      console.log(`After search query "${searchQuery}": ${result.length} courses`)
    }

    // Country Filter
    if (selectedCountries.length > 0) {
      result = result.filter((c) =>
        c.country_name && selectedCountries.some(s => s.toLowerCase() === c.country_name.toLowerCase())
      )
      console.log(`After country filter [${selectedCountries.join(', ')}]: ${result.length} courses`)
    }

    // Level Filter
    if (selectedLevels.length > 0) {
      result = result.filter((c) =>
        c.level && selectedLevels.some(s => s.toLowerCase() === c.level.toLowerCase())
      )
      console.log(`After level filter [${selectedLevels.join(', ')}]: ${result.length} courses`)
    }

    // FIX 2: Intake Filter — uses smart season/month matching
    if (selectedIntakes.length > 0) {
      result = result.filter((c) =>
        c.intake && selectedIntakes.some(s => intakeMatches(c.intake, s))
      )
      console.log(`After intake filter [${selectedIntakes.join(', ')}]: ${result.length} courses`)
    }

    // Duration Filter
    if (durationMinParam && durationMaxParam) {
      const dMin = parseFloat(durationMinParam)
      const dMax = parseFloat(durationMaxParam)
      result = result.filter((c) => {
        if (!c.duration) return true
        const yrs = parseDurationToYears(c.duration)
        if (yrs === null) return true
        return yrs >= dMin && yrs <= dMax
      })
      console.log(`After numeric duration filter (${dMin}–${dMax}y): ${result.length} courses`)
    } else if (selectedDurations.length > 0) {
      result = result.filter((c) =>
        c.duration && selectedDurations.some(sd => durationMatches(c.duration, sd))
      )
      console.log(`After string duration filter: ${result.length} courses`)
    }

    // FIX 3: Budget — if AI budget is too restrictive, log a warning & relax
    if (maxBudgetParam) {
      const maxBudget = parseFloat(maxBudgetParam)
      const beforeBudget = result.length
      const budgetFiltered = result.filter((c) => (c.tuition_fees || 0) <= maxBudget)
      console.log(`After AI budget filter (max $${maxBudget}): ${budgetFiltered.length} courses (was ${beforeBudget})`)

      // If budget filter wipes everything, ignore it and keep results
      if (budgetFiltered.length === 0 && beforeBudget > 0) {
        console.warn(`Budget $${maxBudget} too restrictive — ignoring budget filter to show results`)
        // Don't apply budget filter, keep result as-is
      } else {
        result = budgetFiltered
      }
    } else {
      result = result.filter((c) => {
        const fee = c.tuition_fees || 0
        return fee >= priceRange[0] && fee <= priceRange[1]
      })
    }

    // Sorting
    result = [...result].sort((a, b) => {
      if (sortBy === "name")         return (a.course_title || "").localeCompare(b.course_title || "")
      if (sortBy === "tuition_low")  return (a.tuition_fees || 0) - (b.tuition_fees || 0)
      if (sortBy === "tuition_high") return (b.tuition_fees || 0) - (a.tuition_fees || 0)
      return 0
    })

    console.log(`Final filtered courses: ${result.length}`)
    return result
  }, [
    searchQuery, selectedCountries, selectedLevels,
    selectedIntakes, selectedDurations,
    priceRange, sortBy, courses,
    maxBudgetParam, durationMinParam, durationMaxParam
  ])

  // --- 6. PAGINATION ---
  const visibleCourses = useMemo(() => filteredCourses.slice(0, visibleCount), [filteredCourses, visibleCount])

  useEffect(() => {
    if (mounted) {
      setVisibleCount(ITEMS_PER_PAGE)
      setIsLoading(true)
      const timer = setTimeout(() => setIsLoading(false), 500)
      return () => clearTimeout(timer)
    }
  }, [searchQuery, selectedCountries, selectedLevels, selectedIntakes, selectedDurations, priceRange, sortBy, mounted])

  useEffect(() => {
    if (!mounted) return
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && visibleCount < filteredCourses.length) {
        setIsLoading(true)
        setTimeout(() => { setVisibleCount(p => p + ITEMS_PER_PAGE); setIsLoading(false) }, 600)
      }
    }, { threshold: 0.1 })
    if (loadMoreRef.current) observer.observe(loadMoreRef.current)
    return () => observer.disconnect()
  }, [visibleCount, filteredCourses.length, mounted])

  // --- HELPERS ---
  const formatCurrency = (amount: number, currency: string) => {
    const val    = amount || 0
    const symbol = currency === "Euros" ? "€" : currency === "USD" ? "$" : currency || "$"
    return `${symbol}${val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
  }

  const toggleFilter = (item: string, list: string[], setter: (v: string[]) => void) =>
    setter(list.includes(item) ? list.filter(i => i !== item) : [...list, item])

  const clearFilters = () => {
    setSearchQuery(""); setSelectedCountries([]); setSelectedLevels([])
    setSelectedIntakes([]); setSelectedDurations([]); setPriceRange([0, maxTuition])
  }

  const clearChatFilters = () => {
    setSearchQuery(""); setSelectedCountries([]); setSelectedDurations([])
    setSelectedLevels([]); setSelectedIntakes([])
  }

  const hasActiveFilters = selectedCountries.length > 0 || selectedLevels.length > 0 ||
    selectedIntakes.length > 0 || selectedDurations.length > 0 ||
    (!maxBudgetParam && priceRange[1] < maxTuition)

  const hasChatFilters = countriesFromURL.length > 0 || intakesFromURL.length > 0 ||
    durationFromURL || courseFromURL || levelFromURL || maxBudgetParam ||
    durationMinParam || durationMaxParam

  // --- REUSABLE FILTER COMPONENT ---
  const FilterContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className="space-y-6">
      
      {isMobile && hasActiveFilters && (
        <Button variant="destructive" size="sm" onClick={clearFilters} className="w-full mb-4 gap-2">
          <Trash2 className="w-4 h-4" /> Clear All Filters
        </Button>
      )}

      {/* Price Range Slider — hidden when AI budget param present */}
      {!maxBudgetParam ? (
        <div className="px-1">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <span className="text-sm">Tuition Range</span>
          </h3>
          <Slider
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
      ) : (
        <div className="px-1">
          <h3 className="font-semibold mb-2 text-sm">Tuition Range</h3>
          <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <span className="text-sm text-blue-700 dark:text-blue-300">
              💰 AI budget: up to ${parseInt(maxBudgetParam).toLocaleString()}
            </span>
          </div>
        </div>
      )}

      <div className="h-px bg-border" />

      <Accordion type="multiple" value={accordionValue} onValueChange={setAccordionValue} className="w-full">

        {/* Country */}
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
                  <Checkbox checked={selectedCountries.includes(c)}
                    onCheckedChange={() => toggleFilter(c, selectedCountries, setSelectedCountries)}
                    className="rounded-[4px] w-4 h-4" />
                  <span className="text-muted-foreground">{c}</span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Level */}
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
                  <Checkbox checked={selectedLevels.includes(lvl)}
                    onCheckedChange={() => toggleFilter(lvl, selectedLevels, setSelectedLevels)}
                    className="rounded-[4px] w-4 h-4" />
                  <span className="text-muted-foreground">{lvl}</span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Duration */}
        <AccordionItem value="duration" className="border-none">
          <AccordionTrigger className="py-3 hover:no-underline hover:text-primary">
            <span className="flex items-center gap-2 text-sm font-semibold">
              <Hourglass className="w-4 h-4" /> Duration ({selectedDurations.length})
            </span>
          </AccordionTrigger>
          <AccordionContent>
            {durationMinParam && durationMaxParam && (
              <div className="mb-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-xs text-blue-700 dark:text-blue-300 font-medium">
                  ⏱ AI range: {durationMinParam}–{durationMaxParam} years
                </p>
              </div>
            )}
            <div className="space-y-2 max-h-48 overflow-y-auto pr-2 scrollbar-thin pt-2">
              {allDurations.map((dur) => (
                <label key={dur} className="flex items-center gap-2.5 text-sm cursor-pointer hover:text-primary transition-colors">
                  <Checkbox checked={selectedDurations.includes(dur)}
                    onCheckedChange={() => toggleFilter(dur, selectedDurations, setSelectedDurations)}
                    className="rounded-[4px] w-4 h-4" />
                  <span className="text-muted-foreground">{dur}</span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Intake */}
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
                  <Checkbox checked={selectedIntakes.includes(intake)}
                    onCheckedChange={() => toggleFilter(intake, selectedIntakes, setSelectedIntakes)}
                    className="rounded-[4px] w-4 h-4" />
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
              initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
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
                        <span className="bg-blue-100 dark:bg-blue-800 px-2 py-0.5 rounded">📍 {selectedCountries.join(", ")}</span>
                      )}
                      {selectedLevels.length > 0 && (
                        <span className="bg-blue-100 dark:bg-blue-800 px-2 py-0.5 rounded">🎓 {selectedLevels.join(", ")}</span>
                      )}
                      {selectedIntakes.length > 0 && (
                        <span className="bg-blue-100 dark:bg-blue-800 px-2 py-0.5 rounded">📅 {selectedIntakes.join(", ")}</span>
                      )}
                      {(durationMinParam && durationMaxParam) && (
                        <span className="bg-blue-100 dark:bg-blue-800 px-2 py-0.5 rounded">⏱ {durationMinParam}–{durationMaxParam}y</span>
                      )}
                      {maxBudgetParam && (
                        <span className="bg-blue-100 dark:bg-blue-800 px-2 py-0.5 rounded">💰 Up to ${parseInt(maxBudgetParam).toLocaleString()}</span>
                      )}
                    </div>
                    <p className="text-xs text-blue-600 dark:text-blue-400">
                      Found {filteredCourses.length} matching courses
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={clearChatFilters} className="text-xs">Clear</Button>
                  <button onClick={() => setShowChatNotification(false)}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200">
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
            <motion.div variants={fadeInUp} className="w-full md:w-auto relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input
                type="text" placeholder="Search courses, universities..."
                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-80 pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-border focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all outline-none"
              />
            </motion.div>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* --- DESKTOP SIDEBAR FILTERS --- */}
          <aside className="w-full lg:w-64 shrink-0 space-y-8 hidden lg:block">
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
                        if (selectedCountries.includes(f)) toggleFilter(f, selectedCountries, setSelectedCountries)
                        else if (selectedLevels.includes(f)) toggleFilter(f, selectedLevels, setSelectedLevels)
                        else if (selectedIntakes.includes(f)) toggleFilter(f, selectedIntakes, setSelectedIntakes)
                        else toggleFilter(f, selectedDurations, setSelectedDurations)
                      }} />
                    </Badge>
                  ))}
                  {!maxBudgetParam && (priceRange[0] > 0 || priceRange[1] < maxTuition) && (
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
                    <SheetHeader><SheetTitle>Filter Courses</SheetTitle></SheetHeader>
                    <div className="mt-6 pl-4 pr-3"><FilterContent isMobile={true} /></div>
                    <SheetFooter className="mt-8 border-t pt-4">
                      <SheetClose asChild>
                        <Button className="w-full">Show {filteredCourses.length} Results</Button>
                      </SheetClose>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
                <span className="text-sm text-muted-foreground font-medium">
                  Showing {filteredCourses.length} results
                  {hasChatFilters && <span className="text-blue-600 dark:text-blue-400 ml-1">(AI filtered)</span>}
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
                {visibleCourses.map((course) => (
                  <motion.div key={course.course_id} layout
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2 }}
                  >
                    <Link href={`/courses/${course.course_id}`}>
                      <div className="group h-full flex flex-col rounded-2xl bg-white dark:bg-slate-900 border border-border p-5 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                          <Badge variant={course.level === "Master" ? "default" : "secondary"}
                            className="uppercase text-[10px] tracking-wider px-2.5">
                            {course.level || "Course"}
                          </Badge>
                          <span className="text-sm font-bold text-primary">
                            {formatCurrency(course.tuition_fees, course.currency)}{" "}
                            <span className="text-[10px] text-muted-foreground font-normal">/year</span>
                          </span>
                        </div>
                        <div className="mb-6 flex-grow">
                          <h3 className="font-bold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                            {course.course_title || "Untitled Course"}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <School className="w-4 h-4 text-primary/70" />
                            <span className="truncate font-medium">{course.university_name || "Unknown University"}</span>
                          </div>
                        </div>
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
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Infinite Scroll Sentinel */}
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
                    : "Try adjusting your filters or search query to find the program you are looking for."}
                </p>
                <div className="flex gap-2 justify-center">
                  {hasChatFilters && <Button onClick={clearChatFilters} variant="outline">Clear AI Filters</Button>}
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