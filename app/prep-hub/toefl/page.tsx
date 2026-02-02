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
  Monitor,
  Laptop
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

export default function ToeflCoachingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-primary/20">

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-slate-50">
        {/* Soft Background Gradients */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] -z-10 translate-x-1/4 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-100/40 rounded-full blur-[120px] -z-10 -translate-x-1/4 translate-y-1/4" />

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
                <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20 px-4 py-1.5 text-sm font-semibold rounded-full uppercase tracking-wider">
                  <Globe className="w-3.5 h-3.5 mr-2" />
                  TOEFL iBT Prep
                </Badge>
                <Badge variant="outline" className="border-blue-600/30 text-blue-700 bg-blue-50 px-3 py-1.5 text-sm font-medium">
                  <Monitor className="w-3.5 h-3.5 mr-2" />
                  Live Online Classes
                </Badge>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 leading-[1.15]"
              >
                Ace the TOEFL with <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
                  Expert Strategies.
                </span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0"
              >
                Unlock global opportunities with our 12-week comprehensive program. Master Reading, Listening, Speaking, and Writing with certified trainers.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="h-14 px-8 rounded-xl text-base font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20" asChild>
                  <Link href="/get-started">
                    Book Free Demo <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-8 rounded-xl text-base font-bold border-slate-200 text-slate-700 hover:bg-white hover:text-primary hover:border-primary bg-white" asChild>
                  <Link href="#exam-pattern">
                    View Exam Pattern
                  </Link>
                </Button>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div variants={fadeInUp} className="mt-10 pt-8 border-t border-slate-200 flex flex-wrap justify-center lg:justify-start gap-8">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-100 rounded-lg text-blue-700"><Users className="w-5 h-5" /></div>
                  <div className="text-sm font-medium text-slate-600">
                    <span className="block text-slate-900 font-bold">Small Batches</span>
                    Personal Attention
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary"><Video className="w-5 h-5" /></div>
                  <div className="text-sm font-medium text-slate-600">
                    <span className="block text-slate-900 font-bold">12 Weeks Live</span>
                    Interactive Sessions
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
              <div className="relative z-10 bg-white rounded-[2rem] shadow-2xl shadow-primary/10 p-8 border border-slate-100 max-w-md mx-auto">
                <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-100">
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">Your Goal: 110+</h3>
                    <p className="text-sm text-slate-500">Ivy League Target</p>
                  </div>
                  <Badge className="bg-primary text-primary-foreground">On Track</Badge>
                </div>
                
                <div className="space-y-5">
                  {[
                    { label: "Reading", score: "28/30", color: "bg-primary" },
                    { label: "Listening", score: "29/30", color: "bg-blue-500" },
                    { label: "Speaking", score: "27/30", color: "bg-purple-500" },
                    { label: "Writing", score: "28/30", color: "bg-orange-500" },
                  ].map((skill, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm font-medium mb-2">
                        <span className="text-slate-700">{skill.label}</span>
                        <span className="text-slate-900">{skill.score}</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(parseInt(skill.score) / 30) * 100}%` }}
                          transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                          className={`h-full rounded-full ${skill.color}`} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-4 bg-slate-50 rounded-xl text-center">
                  <p className="text-sm text-slate-500 mb-1">Next Live Class</p>
                  <p className="text-lg font-bold text-slate-900">Today, 06:00 PM</p>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -z-10 top-[-30px] right-[-30px] w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
              <div className="absolute -z-10 bottom-[-20px] left-[-20px] w-32 h-32 bg-blue-400/20 rounded-full blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES GRID ================= */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose UConnect for TOEFL?</h2>
            <p className="text-lg text-slate-600">A structured, expert-led approach to mastering the TOEFL iBT.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: Monitor, 
                title: "Expert-Led Live Sessions", 
                desc: "12 weeks of interactive classes with ETS-certified trainers who know the test inside out.",
                bg: "bg-primary/5", color: "text-primary", border: "border-primary/20"
              },
              { 
                icon: FileText, 
                title: "Realistic Practice Tests", 
                desc: "Experience full-length, timed mock tests that simulate the actual exam environment.",
                bg: "bg-blue-50", color: "text-blue-600", border: "border-blue-100"
              },
              { 
                icon: HelpCircle, 
                title: "Weekly Doubt Solving", 
                desc: "Dedicated Saturday sessions to clear queries and strengthen your weak areas.",
                bg: "bg-purple-50", color: "text-purple-600", border: "border-purple-100"
              },
              { 
                icon: Mic, 
                title: "1-on-1 Speaking", 
                desc: "Individualized practice to improve pronunciation, intonation, and delivery.",
                bg: "bg-orange-50", color: "text-orange-600", border: "border-orange-100"
              },
              { 
                icon: Laptop, 
                title: "Access Anytime", 
                desc: "Missed a class? Watch recordings anytime. Switch batches flexibly within 6 months.",
                bg: "bg-indigo-50", color: "text-indigo-600", border: "border-indigo-100"
              },
              { 
                icon: CheckCircle2, 
                title: "Test Strategies", 
                desc: "Learn proven techniques for time management and structuring high-scoring essays.",
                bg: "bg-green-50", color: "text-green-600", border: "border-green-100"
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`group p-8 rounded-2xl ${item.bg} border ${item.border} hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white`}
              >
                <div className={`w-14 h-14 rounded-xl bg-white flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform`}>
                  <item.icon className={`w-7 h-7 ${item.color}`} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

     {/* ================= EXAM PATTERN TABLE (Responsive) ================= */}
      <section id="exam-pattern" className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-bold uppercase tracking-wider text-sm">Exam Structure</span>
            <h2 className="text-3xl font-bold text-slate-900 mt-2">What Does TOEFL iBT Consist Of?</h2>
            <p className="text-slate-600 mt-4">Understand the format to strategize your preparation better.</p>
          </div>

          {/* Data Definition */}
          {(() => {
            const examData = [
              { section: "Reading", time: "35 mins", qs: "20 Questions", tasks: "Read passages and respond to questions", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
              { section: "Listening", time: "36 mins", qs: "28 Questions", tasks: "Answer questions about lectures/discussions", color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-100" },
              { section: "Speaking", time: "16 mins", qs: "4 Tasks", tasks: "Talk about familiar topics & discuss material", color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-100" },
              { section: "Writing", time: "29 mins", qs: "2 Tasks", tasks: "Read, listen, and type your response", color: "text-primary", bg: "bg-primary/5", border: "border-primary/20" },
            ]

            return (
              <>
                {/* --- MOBILE VIEW (Cards) --- */}
                <div className="grid gap-6 md:hidden">
                  {examData.map((row, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className={`p-6 rounded-2xl border ${row.border} ${row.bg} shadow-sm`}
                    >
                      <div className="flex justify-between items-center mb-4">
                        <h3 className={`text-xl font-bold ${row.color}`}>{row.section}</h3>
                        <Badge variant="outline" className="bg-white/50 border-slate-200 text-slate-700">
                          {row.time}
                        </Badge>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="mt-1 p-1 bg-white rounded-md shadow-sm text-slate-500">
                            <HelpCircle className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Questions</p>
                            <p className="text-slate-900 font-medium">{row.qs}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="mt-1 p-1 bg-white rounded-md shadow-sm text-slate-500">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Tasks</p>
                            <p className="text-slate-700 text-sm leading-relaxed">{row.tasks}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* --- DESKTOP VIEW (Table) --- */}
                <div className="hidden md:block max-w-5xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="grid grid-cols-4 bg-slate-100 p-6 border-b border-slate-200 font-bold text-slate-700 text-sm uppercase tracking-wide">
                    <div>Section</div>
                    <div>Time Limit</div>
                    <div>Questions</div>
                    <div>Tasks</div>
                  </div>
                  {examData.map((row, i) => (
                    <div key={i} className="grid grid-cols-4 p-6 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors items-center">
                      <div className={`font-bold text-lg ${row.color}`}>{row.section}</div>
                      <div className="font-medium text-slate-700">{row.time}</div>
                      <div className="text-slate-600">{row.qs}</div>
                      <div className="text-slate-500 text-sm">{row.tasks}</div>
                    </div>
                  ))}
                </div>
              </>
            )
          })()}
        </div>
      </section>

      {/* ================= BATCH TIMINGS ================= */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Rolling Batch Schedule</h2>
              <p className="text-slate-600">Flexible timings designed for students and working professionals.</p>
            </div>
            <Badge className="bg-green-100 text-green-800 hover:bg-green-200 mt-4 md:mt-0">
              Enroll Any Day
            </Badge>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div whileHover={{ y: -5 }} className="p-8 rounded-2xl bg-primary/5 border border-primary/20 hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-xl text-slate-900">Weekday Batch</h3>
                <div className="p-2 bg-white rounded-lg text-primary"><Calendar className="w-5 h-5" /></div>
              </div>
              <p className="text-sm text-slate-500 font-semibold uppercase tracking-wider mb-2">Monday - Friday</p>
              <div className="text-3xl font-bold text-primary">06:00 PM - 07:00 PM</div>
              <p className="text-slate-600 mt-4 text-sm">Live Online Classes covering all 4 modules.</p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="p-8 rounded-2xl bg-indigo-50 border border-indigo-100 hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-xl text-slate-900">Weekend Special</h3>
                <div className="p-2 bg-white rounded-lg text-indigo-600"><HelpCircle className="w-5 h-5" /></div>
              </div>
              <p className="text-sm text-slate-500 font-semibold uppercase tracking-wider mb-2">Saturday</p>
              <div className="text-3xl font-bold text-indigo-700">06:00 PM - 07:00 PM</div>
              <p className="text-slate-600 mt-4 text-sm">Dedicated Doubt Solving & Strategy Session.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= PRICING / VALUE ================= */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Bang for Your Buck!</h2>
          <p className="text-slate-600 mb-12 text-lg">
            We offer extremely competitive pricing for a comprehensive 12-week program.
          </p>

          <div className="bg-white p-8 rounded-3xl border-2 border-primary shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-primary" />
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <ul className="space-y-4">
                {[
                  "12 Weeks Live Classes",
                  "Expert ETS-Certified Instructors",
                  "Interactive Quizzes",
                  "Real-time Question Solving"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <ul className="space-y-4">
                {[
                  "Class Recordings Available",
                  "6 Month Validity",
                  "Switch Batches Anytime",
                  "Weekly Doubt Solving"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-10 pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-slate-500 text-sm">Course Fee</p>
                <div className="text-3xl font-bold text-slate-900">Affordable & Value-Packed</div>
              </div>
              <Button size="lg" className="h-14 px-10 rounded-xl text-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg">
                Enroll Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Frequently Asked Questions</h2>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            {[
              { q: "What is the duration of the TOEFL coaching?", a: "The program is designed to be completed in 12 weeks with live classes, but you get 6 months of access to all materials." },
              { q: "Are the classes live or pre-recorded?", a: "All classes are LIVE and interactive. However, recordings are available immediately after class if you miss one." },
              { q: "Is there a doubt-solving session?", a: "Yes! Every Saturday is dedicated to doubt solving, where you can clarify queries with expert mentors." },
              { q: "Can I access the course on mobile?", a: "Yes, our platform is mobile-friendly, allowing you to learn anytime, anywhere." },
            ].map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="bg-slate-50 rounded-xl border border-slate-200 px-2 shadow-sm">
                <AccordionTrigger className="text-left font-semibold text-lg py-5 px-4 hover:no-underline hover:text-primary transition-colors text-slate-800">
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
      <section className="py-24 bg-slate-900 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Tired of 'Almost There'?</h2>
          <p className="text-slate-300 text-xl mb-10 max-w-2xl mx-auto">
            Get TOEFL Ready for Real. Join our expert-led prep to sound natural, confident, and truly global.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="h-16 px-10 rounded-xl text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-xl" asChild>
              <Link href="/get-started">Start Preparation</Link>
            </Button>
            <Button size="lg" variant="outline" className="h-16 px-10 rounded-xl text-lg border-white/20 text-white bg-white/10 hover:bg-white/10 hover:text-white" asChild>
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