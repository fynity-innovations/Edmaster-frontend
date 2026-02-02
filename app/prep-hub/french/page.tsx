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
  Star,
  Coffee,
  MapPin
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

export default function FrenchCoachingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-primary/20">

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-slate-50/50 border-b border-slate-200">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-50" />
        
        {/* Soft French Flag Gradient */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/60 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-red-100/40 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

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
                <Badge className="bg-primary text-primary-foreground rounded-full px-3">Bonjour!</Badge>
                <span className="text-sm font-medium text-slate-600">Master French from Home</span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]"
              >
                Learn French. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-red-600 relative inline-block">
                  Live & Interactive.
                </span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-xl text-slate-600 mb-10 leading-relaxed max-w-lg mx-auto lg:mx-0"
              >
                From "Bonjour" to fluent conversations. Join our C1-certified trainers for a structured journey through DELF A1, A2, and beyond.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="h-14 px-8 rounded-xl text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20" asChild>
                  <Link href="/get-started">
                    Start Learning <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-8 rounded-xl text-lg font-bold border-slate-300 text-slate-700 hover:border-primary hover:text-primary hover:bg-white" asChild>
                  <Link href="#levels">
                    Check My Level
                  </Link>
                </Button>
              </motion.div>

              <motion.div variants={fadeInUp} className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-sm font-semibold text-slate-500">
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-blue-600" /> Global Certification
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-red-500" /> Live Interaction
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
              <div className="relative z-10 bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 p-8 border border-slate-100 max-w-md mx-auto">
                <div className="bg-indigo-50 rounded-2xl p-6 mb-8 text-center border border-indigo-100">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-3xl">🇫🇷</div>
                  <h3 className="text-xl font-bold text-slate-900">French DELF A1</h3>
                  <p className="text-indigo-600 font-semibold mt-1">Beginner Level</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-slate-500" />
                      <span className="font-medium text-slate-700">Duration</span>
                    </div>
                    <span className="font-bold text-slate-900">12 Weeks</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                    <div className="flex items-center gap-3">
                      <Video className="w-5 h-5 text-slate-500" />
                      <span className="font-medium text-slate-700">Live Classes</span>
                    </div>
                    <span className="font-bold text-slate-900">Daily 1 Hr</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-5 h-5 text-slate-500" />
                      <span className="font-medium text-slate-700">Exercises</span>
                    </div>
                    <span className="font-bold text-slate-900">800+ Qs</span>
                  </div>
                </div>
                
                <div className="mt-8 text-center">
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-2">Next Batch Starts</p>
                  <p className="text-lg font-bold text-primary">Monday, 05:45 PM</p>
                </div>
              </div>
              
              {/* Floating Element */}
             
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= CEFR LEVELS GRID (Colored Cards) ================= */}
      <section id="levels" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Discover Your Level</h2>
            <p className="text-lg text-slate-600">From absolute beginner to mastery. Where do you stand?</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { level: "A1", title: "Beginner", desc: "Understand familiar words and simple phrases for basic needs.", bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-100" },
              { level: "A2", title: "Elementary", desc: "Communicate in simple, routine tasks requiring a direct exchange of information.", bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-100" },
              { level: "B1", title: "Intermediate", desc: "Deal with most situations likely to arise while travelling in French areas.", bg: "bg-violet-50", text: "text-violet-700", border: "border-violet-100" },
              { level: "B2", title: "Upper Intermediate", desc: "Interact with a degree of fluency and spontaneity with native speakers.", bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-100" },
              { level: "C1", title: "Advanced", desc: "Express ideas fluently and spontaneously without obvious searching for expressions.", bg: "bg-fuchsia-50", text: "text-fuchsia-700", border: "border-fuchsia-100" },
              { level: "C2", title: "Master", desc: "Differentiate finer shades of meaning even in more complex situations.", bg: "bg-pink-50", text: "text-pink-700", border: "border-pink-100" }
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

      {/* ================= BATCH COMPARISON TABLE ================= */}
      <section className="py-24 bg-slate-50/50 border-y border-slate-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-bold uppercase tracking-wider text-sm">Live Batches</span>
            <h2 className="text-3xl font-bold text-slate-900 mt-2">Select Your Course</h2>
          </div>

          <div className="overflow-x-auto pb-4">
            <div className="min-w-[800px] bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="grid grid-cols-4 bg-slate-100 p-6 border-b border-slate-200 font-bold text-slate-700 text-sm uppercase tracking-wide">
                <div className="pl-4">Features</div>
                <div className="text-center text-blue-700">Basic French</div>
                <div className="text-center text-indigo-700">DELF A1</div>
                <div className="text-center text-purple-700">DELF A2</div>
              </div>
              
              {[
                { feature: "Duration", basic: "3 Weeks", a1: "12 Weeks", a2: "12 Weeks" },
                { feature: "Session Length", basic: "60 Mins", a1: "60 Mins", a2: "60 Mins" },
                { feature: "Practice Qs", basic: "-", a1: "800+ Exercises", a2: "400+ Exercises" },
                { feature: "Validity", basic: "1.5 Months", a1: "6 Months", a2: "6 Months" },
                { feature: "Recordings", basic: "Yes", a1: "Yes", a2: "Yes" },
                { feature: "Trainer Level", basic: "C1 Certified", a1: "C1 Certified", a2: "C1 Certified" },
              ].map((row, i) => (
                <div key={i} className="grid grid-cols-4 p-5 border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <div className="pl-4 font-medium text-slate-900">{row.feature}</div>
                  <div className="text-center text-slate-600">{row.basic}</div>
                  <div className="text-center text-slate-900 font-semibold bg-indigo-50/50 -my-5 py-5 border-x border-slate-100">{row.a1}</div>
                  <div className="text-center text-slate-600">{row.a2}</div>
                </div>
              ))}
              
              <div className="grid grid-cols-4 p-6 bg-slate-50 gap-4">
                <div></div>
                <div className="text-center"><Button variant="outline" className="w-full border-blue-200 text-blue-700 hover:bg-blue-50">Select</Button></div>
                <div className="text-center"><Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-md">Select</Button></div>
                <div className="text-center"><Button variant="outline" className="w-full border-purple-200 text-purple-700 hover:bg-purple-50">Select</Button></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= BASIC CURRICULUM (Timeline) ================= */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">18-Day Basic Curriculum</h2>
            <p className="text-slate-600 mt-2">A sneak peek into your first 3 weeks of learning.</p>
          </div>

          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
            {[
              { week: "Week 1", title: "Foundations", desc: "Alphabet, Colors, Days, Essential Expressions, Greetings.", color: "bg-blue-500" },
              { week: "Week 2", title: "People & Numbers", desc: "Family vocabulary, Friends, Numbers, Dates, Telling Time.", color: "bg-white border-4 border-indigo-500 text-indigo-500" },
              { week: "Week 3", title: "Grammar & Conversation", desc: "Verbs (Être, Avoir), Asking Questions, Routine Activities, Self Intro.", color: "bg-red-500" },
            ].map((week, i) => (
              <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${i === 1 ? 'bg-white' : 'bg-primary text-white'} border-4 border-white shadow-lg shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10`}>
                  <span className={`font-bold text-xs ${i === 1 ? 'text-primary' : 'text-white'}`}>{i + 1}</span>
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg text-slate-900">{week.title}</h3>
                    <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded">{week.week}</span>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">{week.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FEATURES GRID (Colored Cards) ================= */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Learners Love UConnect</h2>
            <p className="text-lg text-slate-600">More than just a language class. A complete cultural immersion.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: Mic, 
                title: "Live Interactive Classes", 
                desc: "Speak from day one. Our classes focus on conversation and pronunciation practice.",
                bg: "bg-rose-50", text: "text-rose-600" 
              },
              { 
                icon: Clock, 
                title: "Flexible Timings", 
                desc: "Morning, Evening, and Weekend batches available to suit your schedule.",
                bg: "bg-amber-50", text: "text-amber-600" 
              },
              { 
                icon: HelpCircle, 
                title: "Weekend Doubt Solving", 
                desc: "Dedicated Saturday sessions to clear queries and reinforce learning.",
                bg: "bg-cyan-50", text: "text-cyan-600" 
              },
              { 
                icon: Award, 
                title: "6-Month Validity", 
                desc: "Access recordings and repeat modules for up to 6 months at no extra cost.",
                bg: "bg-purple-50", text: "text-purple-600" 
              },
              { 
                icon: BookOpen, 
                title: "Comprehensive Material", 
                desc: "Get worksheets, vocabulary lists, and grammar guides curated by experts.",
                bg: "bg-emerald-50", text: "text-emerald-600" 
              },
              { 
                icon: Users, 
                title: "Small Batch Size", 
                desc: "Ensuring personalized attention and feedback for every student.",
                bg: "bg-blue-50", text: "text-blue-600" 
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className={`p-8 rounded-2xl ${item.bg} border border-transparent hover:border-${item.text.split('-')[1]}-200 transition-all`}
              >
                <div className={`w-12 h-12 bg-white rounded-xl flex items-center justify-center ${item.text} mb-6 shadow-sm`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="py-24 bg-slate-50/50 border-t border-slate-200">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {[
              { q: "What is the duration of the course?", a: "The course is designed to be completed in six months, with flexible scheduling options to accommodate your needs." },
              { q: "Are the classes live or pre-recorded?", a: "All classes are live and interactive, allowing you to engage directly with instructors and fellow students." },
              { q: "Can I switch batches?", a: "Yes, you can switch batches as per your schedule. Our flexible system allows you to join classes that fit your availability." },
              { q: "Is there a money-back guarantee?", a: "Yes, we offer a 7-day money-back guarantee if you are not satisfied with the course after the first week." },
              { q: "Can I get a certificate?", a: "Yes, upon successful completion, you will receive a certificate validating your proficiency in French." },
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
        <div className="absolute inset-0 bg-primary/5 opacity-50" />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl font-bold mb-6 text-slate-900">Ready to say "Oui"?</h2>
          <p className="text-slate-600 text-xl mb-10 max-w-xl mx-auto">
            Join thousands of learners mastering French for travel, career, and culture.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="h-16 px-10 rounded-xl text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-xl" asChild>
              <Link href="/get-started">Join Free Demo</Link>
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