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
  FileText,
  HelpCircle,
  PlayCircle,
  Phone,
  Star,
  Zap,
  Calendar,
  ShieldCheck,
  Languages,
  XCircle
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function IeltsCoachingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-slate-50">
        {/* Soft Background Gradients */}
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-sky-100/50 rounded-full blur-[120px] -z-10 -translate-x-1/4 -translate-y-1/4" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-100/50 rounded-full blur-[120px] -z-10 translate-x-1/4 translate-y-1/4" />

        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            
            {/* Left Content */}
            <motion.div 
              variants={staggerContainer} 
              initial="hidden" 
              animate="visible"
              className="lg:w-1/2 text-center lg:text-left"
            >
              <motion.div variants={fadeInUp} className="inline-flex flex-wrap justify-center lg:justify-start gap-2 mb-6">
                <Badge variant="secondary" className="bg-sky-50 text-sky-700 hover:bg-sky-100 border-sky-200 px-4 py-1.5 text-sm font-semibold rounded-full uppercase tracking-wider">
                  <Globe className="w-3.5 h-3.5 mr-2" />
                  Online IELTS Coaching
                </Badge>
                <Badge variant="outline" className="border-green-600/30 text-green-700 bg-green-50 px-3 py-1.5 text-sm font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 mr-2" />
                  7-Day Money Back Guarantee
                </Badge>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 leading-[1.15]"
              >
                Comprehensive, <br />
                End-to-End <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-600">IELTS Prep.</span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0"
              >
                Join expert-led live classes, access 300+ videos, and practice with 60+ mock tests.
                <span className="font-semibold text-slate-900"> Start any day with our Rolling Batches.</span>
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="h-14 px-8 rounded-xl text-base font-bold bg-sky-600 hover:bg-sky-700 text-white shadow-lg shadow-sky-900/10" asChild>
                  <Link href="/get-started">
                    Start Free Trial <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-8 rounded-xl text-base font-bold border-slate-200 text-slate-700 hover:bg-white hover:text-sky-700 hover:border-sky-200 bg-white" asChild>
                  <Link href="#schedule">
                    View Schedule
                  </Link>
                </Button>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div variants={fadeInUp} className="mt-10 pt-8 border-t border-slate-200 flex flex-wrap justify-center lg:justify-start gap-8">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-green-100 rounded-lg text-green-700"><Languages className="w-5 h-5" /></div>
                  <div className="text-sm font-medium text-slate-600">
                    <span className="block text-slate-900 font-bold">English & Hindi</span>
                    Regional Batches
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-purple-100 rounded-lg text-purple-700"><Video className="w-5 h-5" /></div>
                  <div className="text-sm font-medium text-slate-600">
                    <span className="block text-slate-900 font-bold">Rolling Batches</span>
                    Join Anytime
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Visual */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 relative"
            >
              <div className="relative z-10 bg-white rounded-[2rem] shadow-2xl shadow-indigo-900/10 p-8 border border-slate-100 max-w-md mx-auto">
                <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-100">
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">Live Class Now</h3>
                    <p className="text-sm text-slate-500 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> Writing Task 2
                    </p>
                  </div>
                  <Badge className="bg-indigo-600">Join</Badge>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-xs font-bold text-slate-400 uppercase mb-1">Your Progress</div>
                    <div className="flex justify-between items-end">
                      <div className="text-2xl font-bold text-slate-900">Band 6.5</div>
                      <div className="text-sm text-green-600 font-medium">Goal: 8.0</div>
                    </div>
                    <div className="mt-2 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full w-[65%] bg-sky-500 rounded-full" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-orange-50 border border-orange-100 text-center">
                      <div className="text-2xl font-bold text-orange-700">40+</div>
                      <div className="text-xs text-orange-600 font-medium">Sectional Tests</div>
                    </div>
                    <div className="p-4 rounded-xl bg-purple-50 border border-purple-100 text-center">
                      <div className="text-2xl font-bold text-purple-700">300+</div>
                      <div className="text-xs text-purple-600 font-medium">Video Lessons</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -z-10 top-[-20px] right-[-20px] w-32 h-32 bg-yellow-400/20 rounded-full blur-2xl" />
              <div className="absolute -z-10 bottom-[-20px] left-[-20px] w-40 h-40 bg-sky-400/20 rounded-full blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= COURSE HIGHLIGHTS ================= */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Learners Choose UConnect?</h2>
            <p className="text-lg text-slate-600">A structured approach to help you master every module of IELTS.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: BookOpen, 
                title: "Comprehensive Material", 
                desc: "Detailed modules for Listening, Reading, Writing & Speaking with step-by-step guidance.",
                bg: "bg-blue-50", color: "text-blue-600"
              },
              { 
                icon: Mic, 
                title: "Real-Time Practice", 
                desc: "Practice real IELTS questions live and receive instant feedback from certified instructors.",
                bg: "bg-purple-50", color: "text-purple-600"
              },
              { 
                icon: HelpCircle, 
                title: "Weekly Doubt Solving", 
                desc: "Dedicated Saturday sessions to clear all your queries and strengthen weak areas.",
                bg: "bg-orange-50", color: "text-orange-600"
              },
              { 
                icon: Calendar, 
                title: "6-Month Access", 
                desc: "Unlimited access to live classes and recordings for 6 months. Repeat sessions as needed.",
                bg: "bg-green-50", color: "text-green-600"
              },
              { 
                icon: FileText, 
                title: "In-Depth Analysis", 
                desc: "Simulate exam environment with 22+ mock tests and get detailed performance reports.",
                bg: "bg-pink-50", color: "text-pink-600"
              },
              { 
                icon: Users, 
                title: "1-on-1 Speaking", 
                desc: "Personalized speaking interviews to improve fluency, coherence, and pronunciation.",
                bg: "bg-indigo-50", color: "text-indigo-600"
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white"
              >
                <div className={`w-14 h-14 rounded-xl ${item.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <item.icon className={`w-7 h-7 ${item.color}`} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WEEKLY SCHEDULE (Timeline) ================= */}
      <section id="schedule" className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-sky-600 font-bold uppercase tracking-wider text-sm">Class Routine</span>
            <h2 className="text-3xl font-bold text-slate-900 mt-2">Your Weekly Learning Plan</h2>
            <p className="text-slate-600 mt-4">Structured daily modules to ensure comprehensive coverage.</p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {/* Mon-Thu */}
            <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-100 rounded-lg text-blue-700"><Calendar className="w-5 h-5" /></div>
                <h3 className="text-xl font-bold text-slate-900">Mon - Thu</h3>
              </div>
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
                  <div>
                    <h4 className="font-semibold text-slate-900">Core Modules</h4>
                    <p className="text-sm text-slate-600">Listening, Reading, Writing Task 1 & 2</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
                  <div>
                    <h4 className="font-semibold text-slate-900">Format</h4>
                    <p className="text-sm text-slate-600">2 Modules per day (120 mins duration)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Friday */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-100 rounded-lg text-purple-700"><Mic className="w-5 h-5" /></div>
                <h3 className="text-xl font-bold text-slate-900">Friday</h3>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-900">Speaking & Vocab</h4>
                <p className="text-sm text-slate-600">Dedicated focus on lexical resource and speaking topics.</p>
              </div>
            </div>

            {/* Saturday */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-orange-100 rounded-lg text-orange-700"><HelpCircle className="w-5 h-5" /></div>
                <h3 className="text-xl font-bold text-slate-900">Saturday</h3>
              </div>
              <div className="space-y-4">
                <ul className="text-sm text-slate-600 space-y-2">
                  <li>• Doubt Solving</li>
                  <li>• Foundation Batch</li>
                  <li>• Grammar Live Lecture</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PRICING / PACKAGES ================= */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Choose Your Package</h2>
            <p className="text-slate-600">Transparent pricing for comprehensive learning. No hidden costs.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* Live Classes Package */}
            <div className="relative p-8 rounded-3xl border-2 border-sky-600 bg-slate-50 shadow-xl">
              <div className="absolute top-0 right-0 bg-sky-600 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl uppercase">Most Popular</div>
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-slate-900">Live Classes Package</h3>
                <p className="text-slate-600 mt-2">Complete end-to-end preparation with expert guidance.</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                {[
                  "Live Lectures (120 Min/Day)",
                  "40 Untimed Sectional Tests",
                  "22 Timed Mock Tests",
                  "300+ Grammar & Vocab Videos",
                  "Instant Results (Listening/Reading)",
                  "Complimentary Grammar E-Book",
                  "6 Months Validity"
                ].map((feat, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
              <Button size="lg" className="w-full bg-sky-600 hover:bg-sky-700 text-white rounded-xl h-12">
                Enroll Now
              </Button>
            </div>

            {/* Test Series Package */}
            <div className="p-8 rounded-3xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-slate-900">Test Series Package</h3>
                <p className="text-slate-600 mt-2">Self-paced practice for confident test takers.</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                {[
                  "No Live Lectures",
                  "22 Untimed Sectional Tests",
                  "5 Timed Mock Tests",
                  "300+ Grammar & Vocab Videos",
                  "Instant Results (Listening/Reading)",
                  "Writing & Speaking Assessment",
                  "6 Months Validity"
                ].map((feat, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700">
                    {feat.includes("No") ? (
                      <XCircle className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                    ) : (
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    )}
                    <span className={feat.includes("No") ? "text-slate-400" : ""}>{feat}</span>
                  </li>
                ))}
              </ul>
              <Button size="lg" variant="outline" className="w-full border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl h-12">
                View Details
              </Button>
            </div>

          </div>
        </div>
      </section>

      {/* ================= COMPLIMENTARY ADD-ONS ================= */}
      <section className="py-20 bg-indigo-900 text-white overflow-hidden relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-sky-500/20 rounded-full blur-[80px]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <Badge className="bg-indigo-700 text-indigo-100 hover:bg-indigo-600 border-none mb-4">Bonus Content</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Complimentary Grammar & Vocabulary</h2>
              <p className="text-indigo-100 text-lg leading-relaxed mb-8">
                Build proficiency and greater fluency with every module. We focus on function, not just structure.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="p-1 bg-indigo-800 rounded text-sky-400"><CheckCircle2 className="w-4 h-4" /></div>
                  <span>Lexical Resource related to IELTS Topics</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="p-1 bg-indigo-800 rounded text-sky-400"><CheckCircle2 className="w-4 h-4" /></div>
                  <span>Detailed revision of Grammatical Concepts</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="p-1 bg-indigo-800 rounded text-sky-400"><CheckCircle2 className="w-4 h-4" /></div>
                  <span>Premium E-Book for reference</span>
                </li>
              </ul>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/10 w-full max-w-sm text-center">
                <BookOpen className="w-16 h-16 text-sky-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Weekend Special</h3>
                <p className="text-sm text-indigo-200 mb-6">Live Grammar & Vocab Lecture every Saturday Morning (10:00 AM)</p>
                <Button className="w-full bg-white text-indigo-900 hover:bg-indigo-50 font-bold">Claim Free Access</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Frequently Asked Questions</h2>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            {[
              { q: "Can I switch between batch timings?", a: "Yes! If the current timing doesn't suit you, you can easily switch between Morning, Afternoon, or Evening batches." },
              { q: "What if I miss a live class?", a: "No worries. All live classes are recorded and uploaded to your dashboard. You can watch them anytime." },
              { q: "Is there a money-back guarantee?", a: "Yes, we offer a 7-day money-back guarantee if you are not satisfied with the course quality." },
              { q: "Is this for Academic or General Training?", a: "We cover both! We have specialized modules and mock tests tailored for both IELTS Academic and General Training." },
              { q: "How do I clear my doubts?", a: "We have dedicated Doubt Solving sessions every Saturday, plus you can ask questions during live classes." },
            ].map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="bg-white rounded-xl border border-slate-200 px-2 shadow-sm">
                <AccordionTrigger className="text-left font-semibold text-lg py-5 px-4 hover:no-underline hover:text-sky-700 transition-colors text-slate-800">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 px-4 pb-5 text-base leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ================= CTA BAR ================= */}
      <section className="py-24 bg-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Tired of 'Almost There'?</h2>
          <p className="text-slate-600 text-xl mb-10 max-w-2xl mx-auto">
            Stop guessing and start scoring. Get the expert guidance you need to hit Band 8+.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="h-16 px-10 rounded-xl text-lg bg-sky-600 hover:bg-sky-700 text-white font-bold shadow-xl" asChild>
              <Link href="/get-started">Enroll Now</Link>
            </Button>
            <Button size="lg" variant="outline" className="h-16 px-10 rounded-xl text-lg border-slate-200 text-slate-700 hover:bg-slate-50" asChild>
              <Link href="/contact">
                <Phone className="w-5 h-5 mr-2" />
                Talk to Counselor
              </Link>
            </Button>
          </div>
        </div>
      </section>

    </div>
  )
}