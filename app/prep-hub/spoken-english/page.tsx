"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
  ArrowRight,
  Mic,
  Users,
  Award,
  Clock,
  BookOpen,
  Briefcase,
  GraduationCap,
  CheckCircle2,
  Globe,
  HelpCircle,
  Phone,
  Star,
  Sun,
  Sunset,
  Moon
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

export default function SpokenEnglishPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-primary/20">

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-slate-50/50 border-b border-slate-200">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-50" />
        
        {/* Soft Primary Gradient */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] -z-10 translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-100/40 rounded-full blur-[100px] -z-10 -translate-x-1/3 translate-y-1/3" />

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
                <Badge className="bg-primary text-primary-foreground rounded-full px-3">Rank #1</Badge>
                <span className="text-sm font-medium text-slate-600">Rated Corporate Training</span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.15]"
              >
                Speak with <span className="text-primary">Confidence.</span> <br />
                Lead with Impact.
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0"
              >
                Join the premier communication program designed for professionals and students. Master fluency, accent, and public speaking.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="h-14 px-8 rounded-xl text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20" asChild>
                  <Link href="/get-started">
                    Start Free Trial <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-8 rounded-xl text-lg font-bold border-slate-300 text-slate-700 hover:border-primary hover:text-primary bg-white" asChild>
                  <Link href="#curriculum">
                    Download Syllabus
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Right Visual */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 relative w-full"
            >
              <div className="relative z-10 bg-white rounded-[2rem] shadow-2xl shadow-primary/10 p-8 border border-slate-100 max-w-md mx-auto transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center gap-4 mb-6 border-b border-slate-100 pb-4">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <Mic className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">Live Practice Session</h3>
                    <p className="text-sm text-slate-500">Connecting to Native Trainer...</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-3 bg-slate-100 rounded-full w-3/4" />
                  <div className="h-3 bg-slate-100 rounded-full w-full" />
                  <div className="h-3 bg-slate-100 rounded-full w-5/6" />
                </div>
                <div className="mt-8 flex justify-between items-center bg-green-50 p-4 rounded-xl border border-green-100">
                  <span className="text-green-800 font-semibold">Fluency Score</span>
                  <span className="text-green-700 font-bold text-xl">94/100</span>
                </div>
              </div>
              
              {/* Decorative blobs */}
              <div className="absolute -z-10 top-10 -right-10 w-32 h-32 bg-amber-100 rounded-full blur-2xl" />
              <div className="absolute -z-10 -bottom-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES GRID (Pastel Cards) ================= */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Professionals Choose Us</h2>
            <p className="text-lg text-slate-600">A comprehensive learning ecosystem designed for real-world results.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: Mic, 
                title: "Live Interactive Speaking", 
                desc: "Don't just listen. Speak. Engage in daily live discussions led by certified trainers.",
                bg: "bg-primary/5", text: "text-primary", border: "border-primary/20"
              },
              { 
                icon: Briefcase, 
                title: "Business Communication", 
                desc: "Specialized modules for email writing, presentations, meetings, and negotiation skills.",
                bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-100"
              },
              { 
                icon: Users, 
                title: "1-on-1 Mentorship", 
                desc: "Personalized feedback sessions to correct your grammar, accent, and pronunciation.",
                bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-100"
              },
              { 
                icon: Clock, 
                title: "Flexible Scheduling", 
                desc: "Morning, evening, and weekend batches available to suit your work-life balance.",
                bg: "bg-teal-50", text: "text-teal-700", border: "border-teal-100"
              },
              { 
                icon: Award, 
                title: "Certification", 
                desc: "Earn a recognized certificate upon completion to add value to your professional profile.",
                bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-100"
              },
              { 
                icon: Globe, 
                title: "Global Community", 
                desc: "Practice with peers from around the world in our moderated discussion rooms.",
                bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-100"
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`group p-8 rounded-2xl ${item.bg} border ${item.border} hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
              >
                <div className={`w-14 h-14 rounded-xl bg-white flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform`}>
                  <item.icon className={`w-7 h-7 ${item.text}`} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CURRICULUM ================= */}
      <section id="curriculum" className="py-24 bg-slate-50/50 border-y border-slate-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Left Header */}
            <div className="lg:w-1/3">
              <span className="text-primary font-bold uppercase tracking-wider text-sm">Course Content</span>
              <h2 className="text-4xl font-extrabold text-slate-900 mt-3 mb-6">What You Will Learn</h2>
              <p className="text-slate-600 mb-8 text-lg">
                Our curriculum is crafted by linguistic experts to bridge the gap between basic grammar and professional fluency.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:border-primary/50 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">01</div>
                  <div>
                    <div className="font-bold text-slate-900">Foundation</div>
                    <div className="text-sm text-slate-500">Weeks 1-4</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:border-purple-300 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 font-bold text-lg">02</div>
                  <div>
                    <div className="font-bold text-slate-900">Intermediate</div>
                    <div className="text-sm text-slate-500">Weeks 5-8</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:border-green-300 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600 font-bold text-lg">03</div>
                  <div>
                    <div className="font-bold text-slate-900">Advanced Business</div>
                    <div className="text-sm text-slate-500">Weeks 9-12</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right List (Colored Cards) */}
            <div className="lg:w-2/3 grid sm:grid-cols-2 gap-6">
              {[
                { title: "Fluency & Pronunciation", items: ["Accent Neutralization", "Voice Modulation", "Sentence Flow"], color: "border-primary", bg: "bg-primary/5" },
                { title: "Corporate Communication", items: ["Effective Email Writing", "Client Interaction", "Negotiation Skills"], color: "border-purple-500", bg: "bg-purple-50/50" },
                { title: "Public Speaking", items: ["Presentation Skills", "Storytelling", "Group Discussions"], color: "border-orange-500", bg: "bg-orange-50/50" },
                { title: "Interview Readiness", items: ["Mock Interviews", "Resume Building", "Salary Negotiation"], color: "border-green-500", bg: "bg-green-50/50" },
              ].map((module, i) => (
                <div 
                  key={i}
                  className={`p-8 rounded-2xl ${module.bg} border border-slate-100 border-t-4 ${module.color} hover:shadow-md transition-all`}
                >
                  <h3 className="text-xl font-bold text-slate-900 mb-6">{module.title}</h3>
                  <ul className="space-y-4">
                    {module.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-slate-600 font-medium">
                        <CheckCircle2 className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= BATCH TIMINGS ================= */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Batch Schedule</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Morning Batch */}
            <motion.div whileHover={{ y: -5 }} className="p-6 rounded-2xl bg-amber-50 border border-amber-100 text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
                <Sun className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">Morning Batch</h3>
              <div className="text-2xl font-bold text-amber-700 my-2">09:45 AM</div>
              <p className="text-sm text-slate-600 mb-4">Perfect for students & homemakers</p>
              <Badge className="bg-amber-200 text-amber-800 hover:bg-amber-300 border-none">Fast Filling</Badge>
            </motion.div>

             {/* Afternoon Batch */}
             <motion.div whileHover={{ y: -5 }} className="p-6 rounded-2xl bg-sky-50 border border-sky-100 text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-sky-100 text-sky-600 flex items-center justify-center mb-4">
                <Sunset className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">Afternoon Batch</h3>
              <div className="text-2xl font-bold text-sky-700 my-2">02:00 PM</div>
              <p className="text-sm text-slate-600 mb-4">Ideal for flexible schedules</p>
              <Badge className="bg-sky-200 text-sky-800 hover:bg-sky-300 border-none">Available</Badge>
            </motion.div>

             {/* Evening Batch */}
             <motion.div whileHover={{ y: -5 }} className="p-6 rounded-2xl bg-primary/5 border border-primary/20 text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Moon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">Evening Batch</h3>
              <div className="text-2xl font-bold text-primary my-2">07:30 PM</div>
              <p className="text-sm text-slate-600 mb-4">Designed for working professionals</p>
              <Badge className="bg-primary/20 text-primary hover:bg-primary/30 border-none">Popular</Badge>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= TARGET AUDIENCE ================= */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">Who Should Enroll?</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
             {[
               { icon: GraduationCap, title: "Students", desc: "For higher studies & exams", bg: "bg-blue-50", text: "text-blue-600" },
               { icon: Briefcase, title: "Professionals", desc: "For career growth & promotion", bg: "bg-purple-50", text: "text-purple-600" },
               { icon: Users, title: "Job Seekers", desc: "For interview success", bg: "bg-orange-50", text: "text-orange-600" },
               { icon: Globe, title: "Test Aspirants", desc: "IELTS / TOEFL / PTE", bg: "bg-teal-50", text: "text-teal-600" },
             ].map((persona, i) => (
                <div 
                  key={i}
                  className="flex flex-col items-center p-8 rounded-2xl bg-white border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className={`w-16 h-16 rounded-full ${persona.bg} flex items-center justify-center ${persona.text} mb-6`}>
                    <persona.icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 mb-2">{persona.title}</h3>
                  <p className="text-slate-500 text-sm">{persona.desc}</p>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Frequently Asked Questions</h2>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            {[
              { q: "What is the duration of the course?", a: "Our standard course is 3 months long, with 3 classes per week. We also offer a 1-month crash course." },
              { q: "Do you provide a certificate?", a: "Yes, you will receive an ISO-certified certificate of completion after passing the final assessment." },
              { q: "Are the classes live or recorded?", a: "We offer both! You can choose Live Interactive batches for real-time practice or Recorded courses for self-paced learning." },
              { q: "Can I pay in installments?", a: "Yes, we offer flexible EMI options for all our premium courses." },
            ].map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="bg-slate-50 rounded-xl border border-slate-200 px-2">
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
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-primary/10 opacity-50" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Transform Your Career?</h2>
          <p className="text-slate-300 text-xl mb-10 max-w-2xl mx-auto">
            Don't let language barriers hold you back. Join 10,000+ professionals who have upgraded their lives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="h-16 px-10 rounded-xl text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-xl" asChild>
              <Link href="/get-started">Get Started for Free</Link>
            </Button>
            <Button size="lg" variant="outline" className="h-16 px-10 rounded-xl text-lg border-white/20 text-white bg-white/10 hover:text-white" asChild>
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