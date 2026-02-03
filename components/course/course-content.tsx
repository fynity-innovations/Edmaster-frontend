"use client"

import { 
  ArrowLeft, MapPin, Clock, Calendar, DollarSign, 
  GraduationCap, Globe, School, CheckCircle2, 
  ExternalLink, Share2, Heart, BookOpen, Building2
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import type { Course, UniversityJSON } from "@/lib/types"

interface CourseContentProps {
  course: Course
  university?: UniversityJSON 
}

export function CourseContent({ course, university }: CourseContentProps) {
  
  const formatMoney = (amount: number) => {
    const symbol = course.currency === "Euros" ? "€" : course.currency === "USD" ? "$" : course.currency || "$"
    return `${symbol}${amount?.toLocaleString() ?? "N/A"}`
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black pb-20">
      
      {/* --- HERO HEADER --- */}
      <div className="bg-white dark:bg-slate-900 border-b border-border pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumb / Back */}
          <Link href="/courses" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Catalog
          </Link>

          <div className="flex flex-col md:flex-row justify-between gap-6 items-start">
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 border-0 uppercase tracking-wider text-[10px]">
                  {course.level}
                </Badge>
                {course.category && (
                   <Badge variant="outline" className="text-muted-foreground">
                     {course.category}
                   </Badge>
                )}
              </div>
              
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
                {course.course_title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-muted-foreground">
                <Link href={university ? `/universities/${university.university_slug}` : "#"} className="flex items-center gap-2 hover:text-primary transition-colors">
                  <School className="w-4 h-4" />
                  <span className="font-medium underline decoration-dotted underline-offset-4">
                    {course.university_name}
                  </span>
                </Link>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{course.city}, {course.country_name}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons (Desktop) */}
            <div className="hidden md:flex gap-3">
              <Button variant="outline" size="icon" className="rounded-full">
                <Share2 className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10">
                <Heart className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
            
            {/* --- MAIN CONTENT COLUMN --- */}
            <div className="lg:col-span-2 space-y-8">
                
                {/* Key Stats Cards */}
                <div className="grid sm:grid-cols-3 gap-4">
                    <Card className="bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-5 flex flex-col gap-1">
                             <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium mb-1">
                                <Clock className="w-4 h-4 text-blue-500" /> Duration
                             </div>
                             <p className="text-xl font-bold">{course.duration}</p>
                             <p className="text-xs text-muted-foreground">Full-time</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-5 flex flex-col gap-1">
                             <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium mb-1">
                                {/* <Wallet className="w-4 h-4 text-green-500" /> Tuition */}Tuition
                             </div>
                             <p className="text-xl font-bold">{formatMoney(course.tuition_fees)}</p>
                             <p className="text-xs text-muted-foreground">Per Academic Year</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-5 flex flex-col gap-1">
                             <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium mb-1">
                                <Calendar className="w-4 h-4 text-orange-500" /> Intake
                             </div>
                             <p className="text-xl font-bold">{course.intake}</p>
                             <p className="text-xs text-muted-foreground">Open for Application</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Tabs Section */}
                <Tabs defaultValue="requirements" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 h-12 mb-6 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                    <TabsTrigger value="overview" className="rounded-lg">Overview</TabsTrigger>
                    <TabsTrigger value="requirements" className="rounded-lg">Requirements</TabsTrigger>
                    <TabsTrigger value="university" className="rounded-lg">University</TabsTrigger>
                  </TabsList>

                  {/* TAB: OVERVIEW (Placeholder if no desc) */}
                  <TabsContent value="overview" className="space-y-6 animate-in fade-in-50">
                    <Card>
                      <CardContent className="p-6 md:p-8 space-y-4">
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                           <BookOpen className="w-5 h-5 text-primary" /> About the Program
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                          This <strong>{course.level}</strong> program in <strong>{course.course_title}</strong> is designed to provide students with comprehensive knowledge and practical skills. 
                          Offered by <strong>{course.university_name}</strong> in {course.city}, this course prepares graduates for dynamic career opportunities in the global market.
                        </p>
                        
                        <div className="grid sm:grid-cols-2 gap-4 mt-4">
                          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                            <h4 className="font-semibold mb-2">Program Highlights</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                               <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" /> Industry-relevant curriculum</li>
                               <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" /> Expert faculty guidance</li>
                               <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" /> Global networking opportunities</li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* TAB: REQUIREMENTS */}
                  <TabsContent value="requirements" className="space-y-6 animate-in fade-in-50">
                    <Card>
                      <CardContent className="p-6 md:p-8">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                           <GraduationCap className="w-5 h-5 text-primary" /> Admission Criteria
                        </h2>
                        
                        <div className="space-y-6">
                            {/* Education */}
                            <div className="flex gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-border/50">
                                <div className="p-2 h-fit bg-white dark:bg-black rounded-lg shadow-sm">
                                  <GraduationCap className="w-6 h-6 text-indigo-500" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground">Academic Qualification</h3>
                                    <p className="text-sm text-muted-foreground mt-1">
                                      Applicants must hold a qualification equivalent to <strong>{course.min_education}</strong>.
                                    </p>
                                    <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-300 text-xs font-medium">
                                       Required Score: {course.required_percentage}%
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            {/* Language */}
                            <div className="flex gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-border/50">
                                <div className="p-2 h-fit bg-white dark:bg-black rounded-lg shadow-sm">
                                  <Globe className="w-6 h-6 text-teal-500" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground">English Proficiency</h3>
                                    <p className="text-sm text-muted-foreground mt-1">
                                      Proof of English language proficiency is required for international students.
                                    </p>
                                    <div className="flex flex-wrap gap-3 mt-3">
                                       <div className="px-3 py-1.5 rounded-md border bg-white dark:bg-black text-sm">
                                          <span className="text-muted-foreground mr-2">IELTS:</span>
                                          <span className="font-bold">{course.ielts_score}</span>
                                       </div>
                                       <div className="px-3 py-1.5 rounded-md border bg-white dark:bg-black text-sm">
                                          <span className="text-muted-foreground mr-2">TOEFL:</span>
                                          <span className="font-bold">{course.toefl_score}</span>
                                       </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* TAB: UNIVERSITY */}
                  <TabsContent value="university" className="space-y-6 animate-in fade-in-50">
                     <Card>
                        <CardContent className="p-6 md:p-8">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-16 h-16 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center border">
                                    <School className="w-8 h-8 text-muted-foreground" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold">{course.university_name}</h2>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                        <MapPin className="w-3.5 h-3.5" />
                                        {course.location}
                                    </div>
                                    {/* {university?.badge && (
                                       <Badge className="mt-2 bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-none">
                                         {university.badge}
                                       </Badge>
                                    )} */}
                                </div>
                            </div>
                            
                            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                                {university?.description || `A leading institution located in ${course.city}, known for its excellence in teaching and research.`}
                            </p>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-center">
                                    <p className="text-xs text-muted-foreground uppercase font-bold">Location</p>
                                    <p className="font-medium">{course.country_name}</p>
                                </div>
                                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-center">
                                    <p className="text-xs text-muted-foreground uppercase font-bold">Type</p>
                                    <p className="font-medium">Public University</p>
                                </div>
                            </div>

                            <Button variant="outline" className="w-full gap-2" asChild>
                                <Link href={course.university_website || "#"} target="_blank">
                                   Visit Website <ExternalLink className="w-4 h-4" />
                                </Link>
                            </Button>
                        </CardContent>
                     </Card>
                  </TabsContent>
                </Tabs>
            </div>

            {/* --- RIGHT SIDEBAR --- */}
            <div className="space-y-6">
                {/* Apply Card */}
                <Card className="border-primary/20 shadow-lg sticky top-24">
                    <div className="h-2 bg-gradient-to-r from-primary to-purple-600 rounded-t-xl" />
                    <CardContent className="p-6">
                        <div className="mb-6 text-center">
                            <h3 className="font-bold text-lg mb-1">Ready to Apply?</h3>
                            <p className="text-sm text-muted-foreground">Start your journey today.</p>
                        </div>
                        
                        <div className="space-y-4 mb-6 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-muted-foreground">Application Fee</span>
                                <span className="font-bold text-foreground">{formatMoney(course.application_fees)}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-muted-foreground">Deadline</span>
                                <span className="font-bold text-orange-600">Open Now</span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Button className="w-full h-12 text-base shadow-md shadow-primary/20" asChild>
                                <Link href="/get-started">Start Application</Link>
                            </Button>
                            <Button variant="outline" className="w-full" asChild>
                                <Link href="/contact">Talk to a Counselor</Link>
                            </Button>
                        </div>

                        <p className="text-xs text-center text-muted-foreground mt-4">
                            Need help? <Link href="/support" className="text-primary hover:underline">Contact Support</Link>
                        </p>
                    </CardContent>
                </Card>

                {/* Need Help Card */}
                <Card className="bg-slate-900 text-white border-none overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <CardContent className="p-6 relative z-10">
                        <h3 className="font-bold text-lg mb-2">Free Consultation</h3>
                        <p className="text-slate-300 text-sm mb-4">
                            Not sure if this course is right for you? Get expert advice from our counselors.
                        </p>
                        <Button variant="secondary" size="sm" className="w-full">
                            Book a Call
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
      </div>
    </div>
  )
}