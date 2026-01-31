"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
  ArrowRight,
  Cpu,
  Clock,
  BarChart3,
  Globe,
  Check,
  PlayCircle,
  Monitor,
  Zap,
  HelpCircle,
  Calendar,
  MousePointer2,
  Trophy,
  Users,
  BookOpen,
  Mic
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

export default function PteCoachingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-primary/20">

      {/* ================= HERO SECTION (Tech/Structured) ================= */}
      <section className="relative pt-32 pb-24 border-b border-slate-200 bg-white overflow-hidden">
        {/* Tech Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            {/* Left: Content */}
            <motion.div 
              variants={staggerContainer} 
              initial="hidden" 
              animate="visible"
              className="lg:w-1/2"
            >
              <div className="flex items-center gap-2 mb-6">
                <Badge variant="outline" className="border-primary text-primary px-3 py-1 text-xs font-bold uppercase tracking-widest bg-primary/5">
                  AI-Scored Exam
                </Badge>
                <div className="h-px w-12 bg-slate-300" />
                <span className="text-sm font-semibold text-slate-500">Fastest Results</span>
              </div>

              <motion.h1 
                variants={fadeInUp}
                className="text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-tight"
              >
                Crack PTE with <br />
                <span className="text-primary decoration-4 decoration-primary/20 underline-offset-4">
                  Precision & Speed.
                </span>
              </motion.h1>

              <motion.p 
                variants={fadeInUp}
                className="text-xl text-slate-600 mb-8 leading-relaxed max-w-lg"
              >
                Master the algorithm. Our data-driven coaching focuses on the specific metrics the PTE AI evaluates, ensuring you hit your target score of 79+.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <Button size="lg" className="h-14 px-8 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/20" asChild>
                  <Link href="/get-started">
                    Start Free Trial <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-8 rounded-lg border-slate-300 text-slate-700 hover:border-primary hover:text-primary bg-white" asChild>
                  <Link href="#pattern">
                    Exam Pattern
                  </Link>
                </Button>
              </motion.div>

              <motion.div variants={fadeInUp} className="mt-10 flex items-center gap-6 text-sm font-medium text-slate-500">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" /> 5-Week Intensive
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" /> 40+ Mock Tests
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" /> Certified Trainers
                </div>
              </motion.div>
            </motion.div>

            {/* Right: Dashboard/Interface Mockup */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 w-full"
            >
              <div className="relative bg-white border border-slate-200 rounded-2xl shadow-2xl p-2">
                <div className="bg-slate-50 rounded-xl border border-slate-200 p-6">
                  {/* Fake Interface Header */}
                  <div className="flex justify-between items-center mb-8 border-b border-slate-200 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white">
                        <Trophy className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">Score Analysis</h3>
                        <p className="text-xs text-slate-500">Mock Test #4 Results</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-700 border-none">Passed</Badge>
                  </div>

                  {/* Score Bars */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "Speaking", score: 90 },
                      { label: "Writing", score: 86 },
                      { label: "Reading", score: 82 },
                      { label: "Listening", score: 88 },
                    ].map((item, i) => (
                      <div key={i} className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm">
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium text-slate-600">{item.label}</span>
                          <span className="text-sm font-bold text-slate-900">{item.score}</span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: `${(item.score / 90) * 100}%` }}
                            transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                            className="h-full bg-primary rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Decorative floating badge */}
                <div className="absolute -bottom-6 -left-6 bg-slate-900 text-white p-4 rounded-xl shadow-lg flex items-center gap-3">
                  <div className="p-2 bg-primary rounded-lg text-white">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 uppercase font-bold">Overall Score</div>
                    <div className="text-xl font-bold">86 / 90</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= KEY FEATURES (Row Layout) ================= */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why UConnect for PTE?</h2>
            <p className="text-lg text-slate-600">A curriculum designed specifically to hack the computer-based scoring system.</p>
          </div>

          <div className="space-y-6">
            {[
              { 
                icon: Cpu, 
                title: "AI-Algorithm Training", 
                desc: "Learn exactly how the computer grades your pitch, pace, and fluency. We teach you to speak for the machine.",
                color: "text-blue-600"
              },
              { 
                icon: Clock, 
                title: "Rolling Batches", 
                desc: "Start today. Our modular curriculum allows you to join any day of the week without missing a topic.",
                color: "text-indigo-600"
              },
              { 
                icon: Monitor, 
                title: "Real Interface Practice", 
                desc: "Practice on a platform that looks and feels exactly like the real Pearson exam to eliminate test-day anxiety.",
                color: "text-purple-600"
              },
              { 
                icon: Users, 
                title: "Expert Live Coaching", 
                desc: "5 weeks of intensive daily live classes covering all 20 question types with instant doubt resolution.",
                color: "text-teal-600"
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group flex flex-col md:flex-row items-start md:items-center gap-6 p-6 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-primary/50 hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-16 h-16 shrink-0 rounded-lg bg-white border border-slate-200 flex items-center justify-center ${feature.color} shadow-sm group-hover:scale-105 transition-transform`}>
                  <feature.icon className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-slate-600">{feature.desc}</p>
                </div>
                <div className="hidden md:block">
                  <ArrowRight className="w-6 h-6 text-slate-300 group-hover:text-primary transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= EXAM PATTERN (Tabs) ================= */}
      <section id="pattern" className="py-24 bg-slate-100/50 border-y border-slate-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="border-primary/50 text-primary mb-3">Test Structure</Badge>
            <h2 className="text-3xl font-bold text-slate-900">2-Hour Computer Based Exam</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Part 1 */}
            <motion.div whileHover={{ y: -5 }} className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm flex flex-col">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6">
                <Mic className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Speaking & Writing</h3>
              <p className="text-sm font-semibold text-slate-500 mb-6">54 - 67 Minutes</p>
              
              <ul className="space-y-3 flex-1">
                {["Personal Introduction", "Read Aloud", "Repeat Sentence", "Describe Image", "Re-tell Lecture", "Answer Short Question", "Summarize Text", "Essay"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-slate-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Part 2 */}
            <motion.div whileHover={{ y: -5 }} className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm flex flex-col">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Reading</h3>
              <p className="text-sm font-semibold text-slate-500 mb-6">29 - 30 Minutes</p>
              
              <ul className="space-y-3 flex-1">
                {["Fill in the Blanks (R&W)", "Multiple Choice (Multiple)", "Re-order Paragraphs", "Fill in the Blanks (R)", "Multiple Choice (Single)"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-slate-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Part 3 */}
            <motion.div whileHover={{ y: -5 }} className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm flex flex-col">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6">
                <Monitor className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Listening</h3>
              <p className="text-sm font-semibold text-slate-500 mb-6">30 - 43 Minutes</p>
              
              <ul className="space-y-3 flex-1">
                {["Summarize Spoken Text", "Multiple Choice", "Fill in the Blanks", "Highlight Correct Summary", "Select Missing Word", "Highlight Incorrect Words", "Write From Dictation"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-slate-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= PRICING PACKAGES (Clean Cards) ================= */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Choose Your Plan</h2>
            <p className="text-slate-600 mt-2">Transparent pricing. No hidden fees.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            
            {/* Package 1 */}
            <div className="p-8 rounded-xl border border-slate-200 bg-white hover:border-primary/50 transition-all">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-900">Test Series</h3>
                <p className="text-sm text-slate-500 mt-1">For self-paced practice</p>
              </div>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-sm text-slate-700"><Check className="w-4 h-4 text-green-500" /> 14 Timed Mock Tests</div>
                <div className="flex items-center gap-3 text-sm text-slate-700"><Check className="w-4 h-4 text-green-500" /> 300+ Concept Videos</div>
                <div className="flex items-center gap-3 text-sm text-slate-700"><Check className="w-4 h-4 text-green-500" /> AI Score Report</div>
              </div>
              <Button variant="outline" className="w-full border-slate-200 text-slate-700 hover:text-primary hover:border-primary">Select Plan</Button>
            </div>

            {/* Package 2 (Highlighted) */}
            <div className="p-8 rounded-xl border-2 border-primary bg-primary/5 relative">
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">RECOMMENDED</div>
              <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-900">Live Regular</h3>
                <p className="text-sm text-slate-600 mt-1">Expert guidance & practice</p>
              </div>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-sm text-slate-900 font-medium"><Check className="w-4 h-4 text-primary" /> 5 Weeks Live Classes</div>
                <div className="flex items-center gap-3 text-sm text-slate-900 font-medium"><Check className="w-4 h-4 text-primary" /> 40 Timed Mock Tests</div>
                <div className="flex items-center gap-3 text-sm text-slate-900 font-medium"><Check className="w-4 h-4 text-primary" /> Personal Feedback</div>
                <div className="flex items-center gap-3 text-sm text-slate-900 font-medium"><Check className="w-4 h-4 text-primary" /> 6 Months Validity</div>
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Enroll Now</Button>
            </div>

            {/* Package 3 */}
            <div className="p-8 rounded-xl border border-slate-200 bg-white hover:border-primary/50 transition-all">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-900">PTE Core</h3>
                <p className="text-sm text-slate-500 mt-1">Targeted skill improvement</p>
              </div>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-sm text-slate-700"><Check className="w-4 h-4 text-green-500" /> 5 Timed Mock Tests</div>
                <div className="flex items-center gap-3 text-sm text-slate-700"><Check className="w-4 h-4 text-green-500" /> 180+ Practice Questions</div>
                <div className="flex items-center gap-3 text-sm text-slate-700"><Check className="w-4 h-4 text-green-500" /> 300+ Tip Videos</div>
              </div>
              <Button variant="outline" className="w-full border-slate-200 text-slate-700 hover:text-primary hover:border-primary">Select Plan</Button>
            </div>

          </div>
        </div>
      </section>

      {/* ================= SCHEDULE ================= */}
      <section className="py-24 bg-white border-t border-slate-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Live Batch Schedule</h2>
              <p className="text-slate-500 mt-1">Flexible timings to suit your routine.</p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-2">
              <Badge variant="outline" className="border-slate-300 text-slate-600">Mon - Fri</Badge>
              <Badge className="bg-primary">Enroll Anytime</Badge>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="p-6 border border-slate-200 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-slate-100 rounded text-slate-600"><Clock className="w-6 h-6" /></div>
                <div>
                  <div className="font-bold text-slate-900">Morning Batch</div>
                  <div className="text-sm text-slate-500">10:00 AM - 11:15 AM</div>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-primary">Join</Button>
            </div>

            <div className="p-6 border border-slate-200 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-slate-100 rounded text-slate-600"><Clock className="w-6 h-6" /></div>
                <div>
                  <div className="font-bold text-slate-900">Evening Batch</div>
                  <div className="text-sm text-slate-500">08:00 PM - 09:30 PM</div>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-primary">Join</Button>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500">
              <span className="font-bold text-primary">Saturday Special:</span> Doubt Solving & Strategy Sessions (10:00 AM & 08:00 PM)
            </p>
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">FAQs</h2>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {[
              { q: "Is the course suitable for beginners?", a: "Yes, we start from the basics of the exam format and move to advanced strategies." },
              { q: "Can I access recordings?", a: "All live classes are recorded and available in your student dashboard for 6 months." },
              { q: "Do you cover PTE Core?", a: "Yes, our strategies apply to both PTE Academic and PTE Core formats." },
              { q: "How fast can I improve my score?", a: "With our strategies, students often see a 10-point jump within just 2 weeks of practice." },
            ].map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="bg-white rounded-lg border border-slate-200 px-4">
                <AccordionTrigger className="text-left font-semibold py-4 hover:no-underline hover:text-primary transition-colors text-slate-800">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-24 bg-white text-center border-t border-slate-200">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">Ready to Score 79+?</h2>
          <p className="text-slate-600 text-lg mb-8 max-w-xl mx-auto">
            Join the most tech-forward PTE coaching program today.
          </p>
          <Button size="lg" className="h-16 px-12 rounded-lg text-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl">
            Get Started Now
          </Button>
        </div>
      </section>

    </div>
  )
}