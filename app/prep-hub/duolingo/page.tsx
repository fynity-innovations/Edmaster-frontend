"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
  ArrowRight,
  Globe,
  Clock,
  CheckCircle2,
  Users,
  Award,
  Mic,
  Video,
  PlayCircle,
  HelpCircle,
  Zap,
  Calendar,
  Laptop,
  MessageSquare,
  FileText,
  BarChart,
  Target,
  Layers
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

export default function DuolingoCoachingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-primary/20">

      {/* ================= HERO SECTION (Bento Style) ================= */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Main Hero Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:w-2/3 bg-primary rounded-[2.5rem] p-8 md:p-16 text-primary-foreground relative overflow-hidden flex flex-col justify-center min-h-[500px]"
            >
              {/* Abstract Patterns */}
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-black/10 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/3" />
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-sm font-medium mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                  </span>
                  Acceptance in 4000+ Universities
                </div>
                
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
                  The Smartest Way <br /> to Study Abroad.
                </h1>
                
                <p className="text-xl text-primary-foreground/90 mb-10 max-w-lg leading-relaxed">
                  Forget the stress of IELTS/TOEFL. Master the Duolingo English Test (DET) in just 3 weeks with our AI-driven coaching.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="h-14 px-8 rounded-2xl bg-white text-primary hover:bg-slate-100 font-bold text-lg shadow-xl" asChild>
                    <Link href="/get-started">Start Free Trial</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="h-14 px-8 rounded-2xl border-white/30 text-white hover:bg-white/10 hover:text-white font-medium text-lg" asChild>
                    <Link href="#comparison">Compare Scores</Link>
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Stats & Features */}
            <div className="lg:w-1/3 flex flex-col gap-6">
              
              {/* Stat Card 1 */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm flex-1 flex flex-col justify-center"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                    <Zap className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Fast Track</h3>
                </div>
                <div className="text-4xl font-bold text-slate-900 mb-1">21 Days</div>
                <p className="text-slate-500">From Prep to Certified Result</p>
              </motion.div>

              {/* Stat Card 2 */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-slate-900 text-white rounded-[2rem] p-8 shadow-xl flex-1 flex flex-col justify-center relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Globe className="w-32 h-32" />
                </div>
                <div className="relative z-10">
                  <div className="text-5xl font-bold mb-2 text-primary-foreground">48 Hrs</div>
                  <p className="text-slate-400 font-medium">To get your official score report online.</p>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      {/* ================= SCORE COMPARISON (New Content) ================= */}
      <section id="comparison" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Is DET Easier than IELTS?</h2>
            <p className="text-lg text-slate-600">See how Duolingo scores compare to other standardized tests. It's shorter, cheaper, and faster.</p>
          </div>

          <div className="max-w-4xl mx-auto bg-slate-50 rounded-3xl border border-slate-200 p-8 md:p-12">
            <div className="grid grid-cols-3 gap-4 mb-6 text-center">
              <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Duolingo</div>
              <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">IELTS</div>
              <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">TOEFL</div>
            </div>
            
            <div className="space-y-4">
              {[
                { det: "160", ielts: "9.0", toefl: "120" },
                { det: "145", ielts: "8.0", toefl: "110" },
                { det: "125", ielts: "7.0", toefl: "95" },
                { det: "105", ielts: "6.0", toefl: "80" },
              ].map((row, i) => (
                <div key={i} className="grid grid-cols-3 gap-4 items-center bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:border-primary/30 transition-all">
                  <div className="text-center font-bold text-primary text-xl">{row.det}</div>
                  <div className="text-center font-semibold text-slate-600">{row.ielts}</div>
                  <div className="text-center font-semibold text-slate-600">{row.toefl}</div>
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-slate-400 mt-6">*Approximate score concordance based on official data.</p>
          </div>
        </div>
      </section>

      {/* ================= EXAM STRUCTURE (Detailed) ================= */}
      <section id="exam-pattern" className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="border-primary text-primary mb-3">60 Minutes Total</Badge>
            <h2 className="text-3xl font-bold text-slate-900">Adaptive Test Structure</h2>
            <p className="text-slate-600 mt-4">Unlike fixed exams, DET adapts to your skill level in real-time.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {/* Adaptive Section */}
            <motion.div whileHover={{ y: -5 }} className="bg-white p-10 rounded-[2rem] border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-primary" />
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Adaptive Test</h3>
                  <p className="text-slate-500 font-medium mt-1">45 Minutes • Graded</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-2xl text-primary"><Laptop className="w-8 h-8" /></div>
              </div>
              <ul className="space-y-4">
                {[
                  { title: "Read and Complete", desc: "Fill in missing letters in a text." },
                  { title: "Read and Select", desc: "Identify real English words from a list." },
                  { title: "Listen and Type", desc: "Type the sentence you hear." },
                  { title: "Read Aloud", desc: "Record yourself reading a sentence." }
                ].map((task, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="mt-1"><CheckCircle2 className="w-5 h-5 text-primary" /></div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{task.title}</h4>
                      <p className="text-slate-500 text-xs">{task.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Video Interview */}
            <motion.div whileHover={{ y: -5 }} className="bg-white p-10 rounded-[2rem] border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-slate-900" />
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Video Interview</h3>
                  <p className="text-slate-500 font-medium mt-1">10 Minutes • Ungraded</p>
                </div>
                <div className="p-3 bg-slate-100 rounded-2xl text-slate-900"><Video className="w-8 h-8" /></div>
              </div>
              <ul className="space-y-4">
                {[
                  { title: "Speaking Sample", desc: "Speak on a topic for 1-3 minutes (Recorded)." },
                  { title: "Writing Sample", desc: "Write about a topic for 3-5 minutes." },
                  { title: "Holistic Review", desc: "Sent to universities to showcase your personality." },
                  { title: "Setup Check", desc: "Camera, microphone, and ID verification." }
                ].map((task, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="mt-1"><CheckCircle2 className="w-5 h-5 text-slate-900" /></div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{task.title}</h4>
                      <p className="text-slate-500 text-xs">{task.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= 21-DAY STUDY PLAN (New Content) ================= */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Your 21-Day Success Map</h2>
            <p className="text-lg text-slate-600">A structured day-by-day plan to take you from beginner to 130+ scorer.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { days: "Days 1-5", focus: "Foundation", desc: "Understand question types: Read Aloud, Dictation, Image Description.", icon: Layers },
              { days: "Days 6-10", focus: "Strategy", desc: "Master production skills. Learn templates for Writing and Speaking tasks.", icon: Target },
              { days: "Days 11-15", focus: "Intensive Practice", desc: "Timed sectional tests. Improve typing speed and pronunciation clarity.", icon: Zap },
              { days: "Days 16-21", focus: "Mock Marathon", desc: "Full-length mock tests with analysis. Final review of weak areas.", icon: Award },
            ].map((phase, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-primary/50 transition-all group"
              >
                <div className="w-12 h-12 bg-white rounded-xl border border-slate-100 flex items-center justify-center text-primary mb-4 shadow-sm group-hover:scale-110 transition-transform">
                  <phase.icon className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold text-primary uppercase tracking-wider mb-2">{phase.days}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{phase.focus}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{phase.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PRICING / BATCHES ================= */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Live Batch Schedule</h2>
              <p className="text-slate-400">Join any Monday. Complete cycle in 3 weeks.</p>
            </div>
            <Badge className="bg-primary text-white border-none px-4 py-2 text-sm">New Batch: Coming Monday</Badge>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-primary rounded-xl"><Clock className="w-6 h-6 text-white" /></div>
                <div>
                  <h3 className="text-xl font-bold">Evening Batch</h3>
                  <p className="text-slate-400">07:00 PM - 08:15 PM</p>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-slate-300"><CheckCircle2 className="w-5 h-5 text-primary" /> Live Strategy Sessions</li>
                <li className="flex items-center gap-3 text-slate-300"><CheckCircle2 className="w-5 h-5 text-primary" /> 1-on-1 Speaking Review</li>
                <li className="flex items-center gap-3 text-slate-300"><CheckCircle2 className="w-5 h-5 text-primary" /> 5 Full Mock Tests</li>
              </ul>
              <Button className="w-full bg-primary hover:bg-primary/90 h-12 rounded-xl text-lg">Enroll Now</Button>
            </div>

            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-white/10 rounded-xl"><Laptop className="w-6 h-6 text-white" /></div>
                <div>
                  <h3 className="text-xl font-bold">Self-Paced Course</h3>
                  <p className="text-slate-400">Learn at your own speed</p>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-slate-300"><CheckCircle2 className="w-5 h-5 text-slate-400" /> 50+ Recorded Lessons</li>
                <li className="flex items-center gap-3 text-slate-300"><CheckCircle2 className="w-5 h-5 text-slate-400" /> 10 Full Mock Tests</li>
                <li className="flex items-center gap-3 text-slate-300"><CheckCircle2 className="w-5 h-5 text-slate-400" /> Grammar E-Book</li>
              </ul>
              <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 h-12 rounded-xl text-lg">View Details</Button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {[
              { q: "Is Duolingo accepted for USA Student Visas?", a: "Yes, over 4,000 institutions in the USA, including top universities, accept DET scores for admission." },
              { q: "Can I take the test from home?", a: "Yes, the DET is a 100% online test. You can take it from anywhere with a computer, webcam, and stable internet." },
              { q: "How is it different from IELTS?", a: "DET is adaptive (questions get harder/easier based on answers), shorter (1 hour), and faster (results in 2 days) compared to IELTS." },
              { q: "What is a good score?", a: "A score of 120+ is generally considered competitive and equivalent to an IELTS 7.0 or TOEFL 95." },
            ].map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="bg-slate-50 rounded-xl border border-slate-200 px-4 shadow-sm">
                <AccordionTrigger className="text-left font-semibold text-lg py-5 px-2 hover:no-underline hover:text-primary transition-colors text-slate-800">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 px-2 pb-5 text-base leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ================= CTA BAR ================= */}
      <section className="py-24 bg-primary/5 text-center border-t border-primary/10">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">Ready to Score 130+?</h2>
          <p className="text-slate-600 text-xl mb-10 max-w-2xl mx-auto">
            Don't waste months on prep. Get certified in weeks with our expert guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="h-16 px-12 rounded-2xl text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-xl" asChild>
              <Link href="/get-started">Start Now</Link>
            </Button>
            <Button size="lg" variant="outline" className="h-16 px-12 rounded-2xl text-lg border-slate-300 text-slate-700 hover:bg-white shadow-sm" asChild>
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