"use client"

import { motion } from "framer-motion"
import { 
  ArrowRight, 
  MessageCircle, 
  Compass, 
  FileCheck, 
  Send, 
  CheckCircle2, 
  Calendar,
  GraduationCap,
  Globe2,
  Users,
  MapPin
} from "lucide-react"
import { Button } from "@/components/ui/button"

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
}

export default function CounsellingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      
      {/* ================= HERO SECTION (Modern Split) ================= */}
      <section className="relative pt-28 pb-16 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Abstract Background Shape */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/4" />

        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            
            {/* Left Content */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="flex-1 text-center lg:text-left"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/80 text-foreground text-sm font-medium mb-8 border border-border/50 backdrop-blur-sm">
                <Globe2 className="w-4 h-4 text-primary" /> 
                <span>Global Education Experts</span>
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
                Your Future, <br />
                <span className="text-primary relative inline-block">
                  Expertly Guided.
                  <svg className="absolute w-full h-3 -bottom-2 left-0 text-primary opacity-20" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                  </svg>
                </span>
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Navigating universities, courses, and visas can be overwhelming. Let our certified counsellors build your personalized roadmap to global success.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="h-14 px-8 rounded-full text-lg shadow-lg hover:shadow-primary/25 bg-primary text-primary-foreground transition-all">
                  Book Free Session <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button variant="outline" size="lg" className="h-14 px-8 rounded-full text-lg border-2 hover:bg-secondary/50">
                  View Success Stories
                </Button>
              </motion.div>

              <motion.div variants={fadeInUp} className="mt-12 flex items-center justify-center lg:justify-start gap-8 border-t border-border/50 pt-8">
                <div>
                   <p className="text-3xl font-bold text-foreground">10k+</p>
                   <p className="text-sm text-muted-foreground font-medium">Students Placed</p>
                </div>
                <div className="w-px h-10 bg-border" />
                <div>
                   <p className="text-3xl font-bold text-foreground">98%</p>
                   <p className="text-sm text-muted-foreground font-medium">Visa Success Rate</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Image (Collage Style) */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-1 w-full relative"
            >
              <div className="relative z-10">
                 {/* Main Large Image */}
                 <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-background aspect-[4/5] relative z-10">
                    <img 
                      src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop" 
                      alt="Student Counselling Session" 
                      className="object-cover w-full h-full"
                    />
                 </div>

                 {/* Floating Element 1 (Top Left) */}
                 <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-10 -left-10 bg-background p-4 rounded-2xl shadow-xl border border-border max-w-[200px] z-20 hidden md:block"
                 >
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                          <CheckCircle2 className="w-6 h-6" />
                       </div>
                       <div>
                          <p className="text-xs text-muted-foreground font-bold uppercase">Status</p>
                          <p className="text-sm font-bold">Offer Letter Received</p>
                       </div>
                    </div>
                 </motion.div>

                 {/* Floating Element 2 (Bottom Right) */}
                 <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-secondary rounded-full -z-10 blur-3xl opacity-50" />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ================= VALUE PROPOSITION (Bento Grid) ================= */}
      <section className="py-24 bg-secondary/10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">More Than Just Advice</h2>
            <p className="text-lg text-muted-foreground">
              We provide a 360° ecosystem to support your study abroad journey, covering every single aspect from profile building to landing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            
            {/* Feature 1: Profile Building (Large) */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-2 bg-background border border-border rounded-[2rem] p-8 flex flex-col md:flex-row gap-8 items-center shadow-sm"
            >
              <div className="flex-1">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Profile Building</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  We analyze your academic history and extracurriculars to suggest the perfect course and university match. We help you highlight your strengths to admission officers.
                </p>
              </div>
              <div className="w-full md:w-1/3 aspect-square bg-secondary/30 rounded-2xl flex items-center justify-center relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                 <GraduationCap className="w-20 h-20 text-primary/20" />
              </div>
            </motion.div>

            {/* Feature 2: Financial Planning (Vertical) */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-primary text-primary-foreground rounded-[2rem] p-8 flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-[40px] -mr-10 -mt-10" />
              
              <div>
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-6 backdrop-blur-sm">
                  <FileCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Financial Clarity</h3>
                <p className="text-primary-foreground/80 text-sm">
                  Transparent breakdown of tuition, living costs, and ROI.
                </p>
              </div>
              
              <div className="mt-8 pt-8 border-t border-white/20">
                 <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Scholarship Support</span>
                    <span className="text-lg font-bold">Yes</span>
                 </div>
                 <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-white rounded-full" />
                 </div>
              </div>
            </motion.div>

            {/* Feature 3: Strategic Planning */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-background border border-border rounded-[2rem] p-8 shadow-sm"
            >
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-foreground mb-6">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Timeline Strategy</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Never miss a deadline. We create a customized application calendar for your target intakes.
              </p>
            </motion.div>

            {/* Feature 4: Destination Discovery */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-2 bg-slate-900 text-white border border-slate-800 rounded-[2rem] p-8 flex flex-col sm:flex-row gap-8 items-center relative overflow-hidden"
            >
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
               <div className="flex-1 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white mb-6">
                    <Globe2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Global Reach</h3>
                  <p className="text-slate-400 mb-0">
                    Access to 700+ partner universities across USA, UK, Canada, Australia, Ireland, and Europe.
                  </p>
               </div>
               {/* Map graphic placeholder */}
               <div className="relative z-10 flex gap-2">
                  <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-medium border border-white/10">USA</span>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-medium border border-white/10">UK</span>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-medium border border-white/10">Canada</span>
               </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ================= PROCESS (Vertical Roadmap) ================= */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Sticky Title */}
            <div className="lg:w-1/3">
               <div className="sticky top-32">
                  <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">Your Journey to <br /> Admission</h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    Our proven 4-step process ensures nothing falls through the cracks.
                  </p>
                  <Button size="lg" className="rounded-full">Start Now <ArrowRight className="ml-2 w-4 h-4" /></Button>
               </div>
            </div>

            {/* Steps List */}
            <div className="lg:w-2/3 space-y-8">
               {[
                 {
                   step: "01",
                   icon: MessageCircle,
                   title: "Discovery Session",
                   desc: "We sit down (virtually or in-person) to understand your background, budget, and career aspirations. No generic advice—only tailored recommendations."
                 },
                 {
                   step: "02",
                   icon: Compass,
                   title: "University Shortlisting",
                   desc: "We curate a list of 'Ambitious', 'Target', and 'Safe' universities that match your profile, maximizing your chances of acceptance."
                 },
                 {
                   step: "03",
                   icon: FileCheck,
                   title: "Application & Documentation",
                   desc: "From SOP editing to LOR guidance, we help you craft a compelling application that stands out to admissions committees."
                 },
                 {
                   step: "04",
                   icon: Send,
                   title: "Offer & Visa",
                   desc: "Once the offer letter arrives, we guide you through the visa interview process, financial documentation, and pre-departure prep."
                 }
               ].map((item, idx) => (
                 <motion.div 
                   key={idx}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true, margin: "-50px" }}
                   transition={{ delay: idx * 0.1 }}
                   className="group flex gap-6 p-6 md:p-8 rounded-3xl border border-border bg-background hover:border-primary/50 transition-colors"
                 >
                    <div className="shrink-0 flex flex-col items-center gap-2">
                       <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center font-bold text-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          {item.step}
                       </div>
                       <div className="w-px h-full bg-border group-hover:bg-primary/20 transition-colors" />
                    </div>
                    <div className="pb-4">
                       <h3 className="text-xl font-bold mb-3 flex items-center gap-3">
                          {item.title}
                       </h3>
                       <p className="text-muted-foreground leading-relaxed">
                          {item.desc}
                       </p>
                    </div>
                 </motion.div>
               ))}
            </div>

          </div>
        </div>
      </section>

      {/* ================= EXPERT ADVICE CTA (Clean Box) ================= */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-primary text-primary-foreground rounded-[3rem] p-8 md:p-16 text-center relative overflow-hidden">
             {/* Background Patterns */}
             <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2" />
             <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] translate-x-1/2 translate-y-1/2" />
             
             <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Avoid Costly Mistakes.</h2>
                <p className="text-xl text-primary-foreground/90 mb-10 leading-relaxed">
                   A single error in your application or visa documents can lead to rejection. Let our experts handle the details while you focus on your future.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                   <Button size="lg" variant="secondary" className="h-14 px-10 rounded-full text-lg font-bold">
                      Book Free Consultation
                   </Button>
                   <Button size="lg" className="h-14 px-10 rounded-full text-lg border-2 border-primary-foreground bg-transparent hover:bg-primary-foreground/10 text-primary-foreground">
                      Call Us Now
                   </Button>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS (Minimal) ================= */}
      <section className="py-24 bg-secondary/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Trusted by students like you</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "The counsellor helped me pick universities that I didn't even know offered scholarships for my profile. I saved 40% on tuition thanks to their advice!",
                name: "Rohan Mehta",
                uni: "University of Leeds, UK"
              },
              {
                quote: "I was rejected once when I applied on my own. UConneact fixed my SOP and documentation, and I got accepted in the next intake.",
                name: "Sarah Williams",
                uni: "University of Toronto, Canada"
              },
              {
                quote: "The visa mock interviews were a lifesaver. I was so nervous, but my counsellor prepped me for every possible question.",
                name: "Arjun Singh",
                uni: "Monash University, Australia"
              }
            ].map((t, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="bg-background p-8 rounded-3xl border border-border shadow-sm"
              >
                <div className="flex gap-1 mb-6">
                   {[1,2,3,4,5].map(star => <span key={star} className="text-yellow-400 text-lg">★</span>)}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                      {t.name[0]}
                   </div>
                   <div>
                      <p className="font-bold text-sm">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.uni}</p>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}