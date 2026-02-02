"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
  ArrowRight,
  Globe,
  BookOpen,
  Video,
  Clock,
  CheckCircle2,
  Users,
  Award,
  Mic,
  HelpCircle,
  Calendar,
  Languages,
  Beer, // A subtle nod to culture
  MapPin,
  Star,
  GraduationCap,
  MessageCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { fadeInUp, staggerContainer } from "@/lib/motion"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function GermanCoachingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-primary/20">

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-slate-50/50 border-b border-slate-200">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-50" />
        
        {/* Soft Background Gradients */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-red-100/30 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/3" />
        <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-slate-100/50 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            
            {/* Left Content */}
            <motion.div 
              variants={staggerContainer} 
              initial="hidden" 
              animate="visible"
              className="lg:w-1/2 text-center lg:text-left"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 mb-6 bg-white border border-slate-200 rounded-full px-1 py-1 pr-4 shadow-sm">
                <Badge className="bg-primary text-primary-foreground rounded-full px-3">Hallo!</Badge>
                <span className="text-sm font-medium text-slate-600">Master German from Home</span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]"
              >
                Learn German. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-slate-800 relative inline-block">
                  Open New Doors.
                </span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-xl text-slate-600 mb-10 leading-relaxed max-w-lg mx-auto lg:mx-0"
              >
                From "Guten Tag" to career fluency. Join our certified trainers for a structured 11-week journey to A1 proficiency and beyond.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="h-14 px-8 rounded-xl text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20" asChild>
                  <Link href="/get-started">
                    Start Learning <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-8 rounded-xl text-lg font-bold border-slate-300 text-slate-700 hover:border-primary hover:text-primary hover:bg-white" asChild>
                  <Link href="#levels">
                    View Levels
                  </Link>
                </Button>
              </motion.div>

              <motion.div variants={fadeInUp} className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-sm font-semibold text-slate-500">
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" /> Career in Germany
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-slate-600" /> Study Abroad
                </div>
              </motion.div>
            </motion.div>

            {/* Right Visual (Course Card) */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 relative w-full"
            >
              <div className="relative z-10 bg-white rounded-[2rem] shadow-2xl shadow-primary/10 p-8 border border-slate-100 max-w-md mx-auto">
                <div className="bg-slate-50 rounded-2xl p-6 mb-8 text-center border border-slate-100 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-full blur-xl" />
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-3xl">🇩🇪</div>
                  <h3 className="text-xl font-bold text-slate-900">German A1 Course</h3>
                  <p className="text-primary font-semibold mt-1">Beginner Level</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-white hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-slate-500" />
                      <span className="font-medium text-slate-700">Duration</span>
                    </div>
                    <span className="font-bold text-slate-900">11 Weeks</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-white hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <Video className="w-5 h-5 text-slate-500" />
                      <span className="font-medium text-slate-700">Live Classes</span>
                    </div>
                    <span className="font-bold text-slate-900">Daily 45 Mins</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-white hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-5 h-5 text-slate-500" />
                      <span className="font-medium text-slate-700">Validity</span>
                    </div>
                    <span className="font-bold text-slate-900">6 Months</span>
                  </div>
                </div>
                
                <div className="mt-8 text-center">
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-2">Next Batch Starts</p>
                  <p className="text-lg font-bold text-primary">Monday, 10:00 AM</p>
                </div>
              </div>
              
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= CEFR LEVELS GRID (Colored Cards) ================= */}
      <section id="levels" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">German Proficiency Levels</h2>
            <p className="text-lg text-slate-600">From A1 (Beginner) to C2 (Mastery). Find your path to fluency.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { level: "A1", title: "Beginner", desc: "Use familiar greetings, introduce yourself, and write in simple German.", bg: "bg-slate-50", text: "text-slate-700", border: "border-slate-200" },
              { level: "A2", title: "Elementary", desc: "Understand complex phrases, simple texts, and everyday conversations.", bg: "bg-primary/5", text: "text-primary", border: "border-primary/20" },
              { level: "B1", title: "Intermediate", desc: "Handle travel situations, work topics, and write connected text.", bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-100" },
              { level: "B2", title: "Upper Intermediate", desc: "Understand technical discussions and interact with native speakers fluently.", bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-100" },
              { level: "C1", title: "Advanced", desc: "Understand implicit meanings and express ideas fluently and spontaneously.", bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-100" },
              { level: "C2", title: "Proficient", desc: "Mastery level. Understand everything heard or read with ease.", bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-100" }
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className={`group p-8 rounded-2xl border ${item.border} ${item.bg} hover:shadow-md transition-all`}
              >
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline" className={`bg-white border-white/50 ${item.text} text-sm font-bold px-3 py-1 shadow-sm`}>
                    {item.level}
                  </Badge>
                  <Star className={`w-5 h-5 ${item.text} opacity-50 group-hover:opacity-100 transition-opacity`} />
                </div>
                <h3 className={`text-xl font-bold ${item.text} mb-2`}>{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= COURSE TIMINGS ================= */}
      <section className="py-24 bg-slate-50/50 border-y border-slate-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-bold uppercase tracking-wider text-sm">Class Schedule</span>
            <h2 className="text-3xl font-bold text-slate-900 mt-2">Live Batch Timings</h2>
            <p className="text-slate-600 mt-4">Flexible slots for students and working professionals.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* Weekday Schedule */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Monday - Friday</h3>
                  <p className="text-slate-500 text-sm">Regular Classes</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <span className="font-medium text-slate-700">A1 Basic</span>
                  <div className="text-right">
                    <div className="font-bold text-slate-900">10:00 AM - 10:45 AM</div>
                    <div className="text-xs text-slate-500">OR 07:00 PM - 07:45 PM</div>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <span className="font-medium text-slate-700">A1 Advance</span>
                  <div className="text-right">
                    <div className="font-bold text-slate-900">10:45 AM - 11:30 AM</div>
                    <div className="text-xs text-slate-500">OR 07:45 PM - 08:30 PM</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Weekend Schedule */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Saturday Special</h3>
                  <p className="text-slate-500 text-sm">Doubt Solving</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <span className="font-medium text-slate-700">Morning Session</span>
                  <span className="font-bold text-slate-900">10:00 AM - 11:00 AM</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <span className="font-medium text-slate-700">Evening Session</span>
                  <span className="font-bold text-slate-900">07:00 PM - 08:00 PM</span>
                </div>
                <p className="text-xs text-slate-500 italic mt-2">*Open for all batches to clear queries.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= CURRICULUM HIGHLIGHTS ================= */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">What We Cover</h2>
            <p className="text-slate-600 mt-2">A holistic approach to reading, writing, listening, and speaking.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: BookOpen, title: "Language Basics", desc: "Fundamental vocabulary and phrases for daily use.", color: "text-blue-600", bg: "bg-blue-50" },
              { icon: Mic, title: "Pronunciation", desc: "Develop an authentic accent with intonation practice.", color: "text-primary", bg: "bg-primary/5" },
              { icon: MessageCircle, title: "Social Phrases", desc: "Essential greetings and polite expressions.", color: "text-amber-600", bg: "bg-amber-50" },
              { icon: Users, title: "Speaking Practice", desc: "Role-playing and interactive conversation sessions.", color: "text-green-600", bg: "bg-green-50" },
              { icon: Award, title: "Grammar Rules", desc: "Sentence structure, verb conjugations, and tenses.", color: "text-purple-600", bg: "bg-purple-50" },
              { icon: Globe, title: "Listening", desc: "Train your ear with videos, audio recordings, and more.", color: "text-indigo-600", bg: "bg-indigo-50" },
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className={`p-6 rounded-2xl border border-slate-100 ${item.bg} hover:shadow-md transition-all`}
              >
                <div className={`w-10 h-10 rounded-lg bg-white flex items-center justify-center ${item.color} mb-4 shadow-sm`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {[
              { q: "What is the duration of the German course?", a: "The A1 level course is designed to be completed in 11 weeks." },
              { q: "Are the classes live or pre-recorded?", a: "All classes are live and interactive, ensuring real-time engagement with instructors." },
              { q: "What if I miss a class?", a: "You can watch the recorded session or join a different batch to catch up." },
              { q: "Can I switch batches?", a: "Yes, our flexible system allows you to switch between morning and evening batches." },
              { q: "Will I get a certificate?", a: "Yes, you receive a certificate validating your proficiency upon successful completion." },
            ].map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="bg-white rounded-xl border border-slate-200 px-4 shadow-sm">
                <AccordionTrigger className="text-left font-semibold text-lg py-5 hover:no-underline hover:text-primary transition-colors text-slate-800">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 pb-5 text-base leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-24 bg-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-900/5 opacity-50" />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl font-bold mb-6 text-slate-900">Interessiert?</h2>
          <p className="text-slate-600 text-xl mb-10 max-w-xl mx-auto">
            German's tough. But so are you. Let's master it together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="h-16 px-10 rounded-xl text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-xl" asChild>
              <Link href="/get-started">Enroll Now</Link>
            </Button>
            <Button size="lg" variant="outline" className="h-16 px-10 rounded-xl text-lg border-slate-300 text-slate-700 hover:bg-white hover:text-primary shadow-sm" asChild>
              <Link href="/contact">
                Talk to Counselor
              </Link>
            </Button>
          </div>
        </div>
      </section>

    </div>
  )
}