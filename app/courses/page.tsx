// app/courses/page.tsx (COMPLETE FIXED VERSION)
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
  
  // Read URL parameters from chatbot
  const countryFromChat = searchParams.get('country') || ""
  const durationFromChat = searchParams.get('duration') || ""
  const courseFromChat = searchParams.get('course') || ""
  const levelFromChat = searchParams.get('level') || ""
  
  // --- State ---
  const [searchQuery, setSearchQuery] = useState(courseFromChat)
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])
  const [selectedLevels, setSelectedLevels] = useState<string[]>(levelFromChat ? [levelFromChat] : [])
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
    
    console.log(`Matching: "${courseLower}" with "${selectedLower}"`)
    
    // Extract numbers from both strings
    const courseNumbers = courseLower.match(/\d+/g) || []
    const selectedNumbers = selectedLower.match(/\d+/g) || []
    
    // Case 1: User entered just a number (like "2")
    // This should match any course with that number in duration
    if (selectedNumbers.length > 0 && /^\d+$/.test(selectedLower.trim())) {
      const selectedNum = selectedNumbers[0]
      console.log(`User entered number "${selectedNum}", checking if course contains this number`)
      
      // Only match if the course duration contains exactly this number
      // and doesn't contain other numbers (to avoid matching "2-3 years" when user wants "2 years")
      return courseNumbers.length === 1 && courseNumbers[0] === selectedNum
    }
    
    // Case 2: Exact match
    if (courseLower === selectedLower) {
      console.log("Exact match found")
      return true
    }
    
    // Case 3: Contains match (but only if it doesn't contain other numbers)
    if (courseLower.includes(selectedLower) || selectedLower.includes(courseLower)) {
      // Make sure we're not accidentally matching durations with multiple numbers
      if (selectedNumbers.length > 0) {
        const courseHasMultipleNumbers = courseNumbers.length > 1
        if (courseHasMultipleNumbers) {
          console.log("Course has multiple numbers, skipping match")
          return false
        }
      }
      console.log("Contains match found")
      return true
    }
    
    // Case 4: Number-based matching (exact number match only)
    if (courseNumbers.length > 0 && selectedNumbers.length > 0) {
      // Only match if both have exactly one number and they're the same
      if (courseNumbers.length === 1 && selectedNumbers.length === 1) {
        const numberMatch = courseNumbers[0] === selectedNumbers[0]
        if (numberMatch) {
          console.log("Exact number match found")
          return true
        }
      }
    }
    
    console.log("No match found")
    return false
  }

  // --- 3. SMART FILTER MATCHING ---
  const findBestMatch = (searchTerm: string, options: string[]): string[] => {
    const term = searchTerm.toLowerCase().trim()
    const matches: string[] = []
    
    options.forEach(option => {
      const optionLower = option.toLowerCase()
      
      // Exact match
      if (optionLower === term) {
        matches.push(option)
      }
      // Contains match (but be more strict)
      else if (optionLower.includes(term) || term.includes(optionLower)) {
        // Only add if it's not a partial match that could cause issues
        // For example, don't match "2 years" with "2 years 3 months"
        const optionNumbers = optionLower.match(/\d+/g) || []
        const termNumbers = term.match(/\d+/g) || []
        
        // If both have the same single number, allow the match
        if (optionNumbers.length === 1 && termNumbers.length === 1 && optionNumbers[0] === termNumbers[0]) {
          matches.push(option)
        }
        // If no numbers involved, allow normal contains match
        else if (optionNumbers.length === 0 && termNumbers.length === 0) {
          matches.push(option)
        }
      }
    })
    
    return matches
  }

  // Initialize filters based on chat parameters
  useEffect(() => {
    if (!mounted) return
    
    const newSelectedCountries: string[] = []
    const newSelectedDurations: string[] = []
    const newSelectedLevels: string[] = []
    
    // Smart country matching
    if (countryFromChat) {
      const countryMatches = findBestMatch(countryFromChat, allCountries)
      newSelectedCountries.push(...countryMatches)
    }
    
    // Smart duration matching (FIXED)
    if (durationFromChat) {
      console.log(`Processing duration from chat: "${durationFromChat}"`)
      
      // Normalize the input
      const normalizedInput = durationFromChat.toLowerCase().trim()
      
      // If user entered just a number, find exact matches
      if (/^\d+$/.test(normalizedInput)) {
        const targetNumber = normalizedInput
        console.log(`User entered number: ${targetNumber}`)
        
        // Find durations that contain exactly this number and no other numbers
        const exactMatches = allDurations.filter(duration => {
          const durationLower = duration.toLowerCase()
          const numbers = durationLower.match(/\d+/g) || []
          
          // Must contain exactly one number and it must match the target
          return numbers.length === 1 && numbers[0] === targetNumber
        })
        
        console.log(`Found exact matches: ${exactMatches.join(", ")}`)
        newSelectedDurations.push(...exactMatches)
      } else {
        // For text inputs, use the normal matching but be more strict
        const durationMatches = findBestMatch(durationFromChat, allDurations)
        newSelectedDurations.push(...durationMatches)
      }
    }
    
    // Smart level matching
    if (levelFromChat) {
      const levelMatches = findBestMatch(levelFromChat, availableLevels)
      newSelectedLevels.push(...levelMatches)
    }
    
    setSelectedCountries(newSelectedCountries)
    setSelectedDurations(newSelectedDurations)
    setSelectedLevels(newSelectedLevels)
  }, [countryFromChat, durationFromChat, levelFromChat, allCountries, allDurations, availableLevels, mounted, debugMode])


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

    // Country Filter (case-insensitive)
    if (selectedCountries.length > 0) {
      result = result.filter((course) => {
        if (!course.country_name) return false
        return selectedCountries.some(selected => 
          selected.toLowerCase() === course.country_name.toLowerCase()
        )
      })
    }

    // Level Filter (case-insensitive)
    if (selectedLevels.length > 0) {
      result = result.filter((course) => {
        if (!course.level) return false
        return selectedLevels.some(selected => 
          selected.toLowerCase() === course.level.toLowerCase()
        )
      })
    }

    // Intake Filter (case-insensitive)
    if (selectedIntakes.length > 0) {
      result = result.filter((course) => {
        if (!course.intake) return false
        return selectedIntakes.some(selected => 
          selected.toLowerCase() === course.intake.toLowerCase()
        )
      })
    }

    // FIXED Duration Filter
    if (selectedDurations.length > 0) {
      console.log(`Applying duration filter with: ${selectedDurations.join(", ")}`)
      
      result = result.filter((course) => {
        if (!course.duration) return false
        
        const match = selectedDurations.some(selectedDuration => 
          durationMatches(course.duration, selectedDuration)
        )
        
        if (match) {
          console.log(`Course "${course.course_title}" matches duration filter`)
        }
        
        return match
      })
      
      console.log(`After duration filter: ${result.length} courses remaining`)
    }

    // Budget Filter from AI (maxBudget URL param)
    const maxBudgetParam = searchParams.get('maxBudget')
    if (maxBudgetParam) {
      const maxBudget = parseFloat(maxBudgetParam)
      result = result.filter((course) => {
        const fee = course.tuition_fees || 0
        return fee <= maxBudget
      })
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

    return result
  }, [
    searchQuery, selectedCountries, selectedLevels, 
    selectedIntakes, selectedDurations,
    priceRange, sortBy, courses, searchParams
  ])

  // --- 4. PAGINATION ---
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
  }

  // Check if any filter is active
  const hasActiveFilters = selectedCountries.length > 0 || selectedLevels.length > 0 || selectedIntakes.length > 0 || selectedDurations.length > 0 || priceRange[1] < maxTuition
  const hasChatFilters = countryFromChat || durationFromChat || courseFromChat || levelFromChat

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
              <MapPin className="w-4 h-4" /> Country
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

        {/* Duration Filter */}
        <AccordionItem value="duration" className="border-none">
          <AccordionTrigger className="py-3 hover:no-underline hover:text-primary">
            <span className="flex items-center gap-2 text-sm font-semibold">
              <Hourglass className="w-4 h-4" /> Duration
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

  const renderChatNotification = mounted && hasChatFilters && showChatNotification

  return (
    <div className="min-h-screen pt-24 pb-16 bg-slate-50 dark:bg-black">
      <div className="container mx-auto px-4">
        
        {/* Debug Panel */}
        {mounted && debugMode && (
          <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-yellow-900 dark:text-yellow-100">Debug Information</h3>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setDebugMode(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-2 text-sm">
              <div><strong>URL Parameters:</strong></div>
              <div>Country: "{countryFromChat}"</div>
              <div>Duration: "{durationFromChat}"</div>
              <div>Course: "{courseFromChat}"</div>
              <div>Level: "{levelFromChat}"</div>
              
              <div className="mt-3"><strong>Duration Analysis:</strong></div>
              <div>
                {allDurations.map((duration, index) => {
                  const durationLower = duration.toLowerCase()
                  const numbers = durationLower.match(/\d+/g) || []
                  const isNumericInput = /^\d+$/.test(durationFromChat?.trim() || "")
                  const wouldMatch = selectedDurations.includes(duration)
                  
                  return (
                    <div key={index} className="ml-2 mb-1 text-xs">
                      <div className={wouldMatch ? "text-green-600" : "text-red-600"}>
                        {wouldMatch ? "✓" : "✗"} "{duration}"
                      </div>
                      <div className="ml-4">
                        Numbers: [{numbers.join(", ") || "none"}] | 
                        Numeric Input: {isNumericInput ? "yes" : "no"} | 
                        Would Match: {wouldMatch ? "yes" : "no"}
                      </div>
                    </div>
                  )
                })}
              </div>
              
              <div className="mt-3"><strong>Selected Durations:</strong></div>
              <div>{selectedDurations.join(", ") || "None"}</div>
              
              <div className="mt-3"><strong>Filter Test:</strong></div>
              <div>
                {selectedDurations.map(sel => (
                  <div key={sel} className="ml-2 mb-2">
                    <div><strong>Selected:</strong> "{sel}"</div>
                    <div><strong>Would match courses:</strong></div>
                    {courses
                      .filter(course => durationMatches(course.duration || "", sel))
                      .slice(0, 3)
                      .map(course => <div key={course.course_id} className="ml-4 text-xs">✓ {course.course_title}</div>)}
                    {courses.filter(course => durationMatches(course.duration || "", sel)).length === 0 && (
                      <div className="ml-4 text-xs text-red-600">No courses would match</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Debug Toggle */}
        {mounted && (
          <div className="mb-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setDebugMode(!debugMode)}
              className="gap-2"
            >
              <Bug className="w-4 h-4" />
              {debugMode ? 'Hide' : 'Show'} Debug Info
            </Button>
          </div>
        )}
        
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
                      Courses based on your chat preferences
                    </h3>
                    <p className="text-sm text-blue-700 dark:text-blue-300 mb-2">
                      {courseFromChat && (
                        <span className="font-medium">{courseFromChat}</span>
                      )}{" "}
                      courses
                      {levelFromChat && (
                        <span> (<span className="font-medium">{levelFromChat}</span> level)</span>
                      )}
                      {countryFromChat && (
                        <span> in <span className="font-medium">{countryFromChat}</span></span>
                      )}
                      {durationFromChat && (
                        <span> with <span className="font-medium">{durationFromChat}</span> duration</span>
                      )}
                    </p>
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
                      (from chat)
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
                    ? "No courses match your chat preferences. Try adjusting your search criteria."
                    : "Try adjusting your filters or search query to find the program you are looking for."
                  }
                </p>
                <div className="flex gap-2 justify-center">
                  {hasChatFilters && (
                    <Button onClick={clearChatFilters} variant="outline">Clear Chat Filters</Button>
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