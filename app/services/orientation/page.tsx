"use client"

import { motion } from "framer-motion"
import { 
  Plane, 
  Luggage, 
  FileCheck, 
  CreditCard, 
  Globe, 
  Users, 
  ArrowRight,
  CheckCircle2,
  Map,
  BookOpen
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
}

export default function PreDeparturePage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* ================= HERO SECTION (Journey/Flight Theme) ================= */}
      <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/5 rounded-[100%] blur-[120px] -z-10" />
        
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-6 border border-border">
                <Plane className="w-4 h-4 text-primary" /> 
                <span>Final Step Before You Fly</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
                Ready for <span className="text-primary">Takeoff?</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                Studying abroad is more than just booking a flight. Our Pre-Departure Orientation ensures you land with confidence, fully prepared for life in a new country.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
                <Button size="lg" className="h-14 px-8 rounded-full text-lg shadow-lg hover:shadow-primary/20 bg-primary text-primary-foreground">
                  Get Your Checklist
                </Button>
                <Button variant="outline" size="lg" className="h-14 px-8 rounded-full text-lg gap-2">
                   Join Next Session <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>

            {/* Hero Image Block - Wide Cinematic Style */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-16 w-full relative"
            >
              <div className="relative rounded-[2rem] overflow-hidden border border-border shadow-2xl aspect-[16/9] md:aspect-[21/9]">
                 {/* IMAGE SOURCE: Airport/Travel context */}
                 <img 
                   src="/airport_departure.jpg" 
                   alt="Student at airport ready for departure" 
                   className="object-cover w-full h-full"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                 
                 {/* Floating Info Overlay */}
                 <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 flex gap-4">
                    <div className="bg-background/80 backdrop-blur-md p-4 rounded-xl border border-border/50 shadow-lg">
                       <p className="text-xs text-muted-foreground uppercase font-bold">Next Session</p>
                       <p className="text-sm font-bold flex items-center gap-2">
                         <Map className="w-4 h-4 text-primary" /> Virtual & In-Person
                       </p>
                    </div>
                 </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ================= WHAT WE COVER (Grid with Icons) ================= */}
      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid lg:grid-cols-3 gap-8"
          >
            {/* Section Header */}
            <div className="lg:col-span-1 pr-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">The Ultimate Preparation Checklist</h2>
              <p className="text-muted-foreground mb-8 text-lg">
                We don't just hand you a ticket. We prepare you for the cultural, academic, and logistical shift of moving abroad.
              </p>
              <Button variant="ghost" className="text-primary hover:text-primary hover:bg-primary/10 pl-0 text-lg">
                Download Full PDF Guide <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>

            {/* Grid Items */}
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
              {[
                { 
                  icon: Luggage, 
                  title: "Smart Packing", 
                  desc: "What to carry, luggage limits, and banned items list for your specific country." 
                },
                { 
                  icon: FileCheck, 
                  title: "Documentation", 
                  desc: "Organizing immigration papers, university letters, and insurance copies." 
                },
                { 
                  icon: CreditCard, 
                  title: "Banking & Forex", 
                  desc: "Setting up bank accounts, carrying currency, and understanding living costs." 
                },
                { 
                  icon: Globe, 
                  title: "Cultural Adaptation", 
                  desc: "Understanding local customs, laws, and how to blend in smoothly." 
                }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={scaleIn}
                  className="bg-background p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= ACADEMIC & LIFESTYLE (Side-by-Side) ================= */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          
          {/* Row 1 */}
          <div className="flex flex-col md:flex-row items-center gap-12 mb-20">
             <motion.div 
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6 }}
               className="flex-1 w-full"
             >
                <div className="bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-[2rem] p-1 aspect-video flex items-center justify-center shadow-lg">
                   <div className="bg-background w-full h-full rounded-[1.8rem] flex flex-col items-center justify-center p-8 text-center border border-border/50">
                      <BookOpen className="w-16 h-16 text-primary mb-6" />
                      <h3 className="text-2xl font-bold mb-2">Academic Expectations</h3>
                      <p className="text-muted-foreground">Mastering the grading system, plagiarism rules, and classroom etiquette before day one.</p>
                   </div>
                </div>
             </motion.div>
             <div className="flex-1">
                <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-2">Academic Success</h3>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Hit the Ground Running</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Education systems abroad differ significantly from India. We brief you on assignment structures, research methodologies, and professor expectations so you aren't caught off guard.
                </p>
                <ul className="space-y-3">
                   {["Understanding Credit Systems", "Library & Digital Resources", "Time Management Tips"].map((li, i) => (
                     <li key={i} className="flex items-center gap-3 font-medium">
                        <CheckCircle2 className="w-5 h-5 text-green-500" /> {li}
                     </li>
                   ))}
                </ul>
             </div>
          </div>

          {/* Row 2 */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-12">
             <motion.div 
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6 }}
               className="flex-1 w-full"
             >
                <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-[2rem] p-1 aspect-video flex items-center justify-center shadow-lg">
                   <div className="bg-background w-full h-full rounded-[1.8rem] flex flex-col items-center justify-center p-8 text-center border border-border/50">
                      <Users className="w-16 h-16 text-primary mb-6" />
                      <h3 className="text-2xl font-bold mb-2">Networking & Social Life</h3>
                      <p className="text-muted-foreground">Building a support system, finding part-time work, and making friends globally.</p>
                   </div>
                </div>
             </motion.div>
             <div className="flex-1">
                <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-2">Life Abroad</h3>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Thrive Beyond the Campus</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Surviving is easy; thriving takes preparation. We connect you with alumni and current students so you have a friend before you even land.
                </p>
                <ul className="space-y-3">
                   {["Part-time Job Rules", "Public Transport Hacks", "Safety Protocols"].map((li, i) => (
                     <li key={i} className="flex items-center gap-3 font-medium">
                        <CheckCircle2 className="w-5 h-5 text-green-500" /> {li}
                     </li>
                   ))}
                </ul>
             </div>
          </div>

        </div>
      </section>

      {/* ================= ALUMNI NETWORK BANNER ================= */}
      <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
        {/* Abstract Pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "30px 30px" }}></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
           <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
           >
             <h2 className="text-3xl md:text-5xl font-bold mb-6">Join the UConnect Network</h2>
             <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-10">
               Connect with 5,000+ alumni already studying in the UK, USA, Canada, Australia, and Europe.
             </p>
             <Button size="lg" variant="secondary" className="h-14 px-10 rounded-full text-lg font-bold">
                Join Alumni Group
             </Button>
           </motion.div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-24">
         <div className="container mx-auto px-4">
            <Card className="bg-secondary/10 border-border overflow-hidden rounded-[2.5rem]">
               <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                     <div className="flex-1 p-10 md:p-16 flex flex-col justify-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Don't leave anything to chance.</h2>
                        <p className="text-lg text-muted-foreground mb-8">
                           Our sessions are free for UConnect students. Book your slot for the upcoming pre-departure briefing.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                           <Button size="lg" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90">Register Now</Button>
                           <Button size="lg" variant="outline" className="rounded-full bg-background hover:bg-secondary">View Schedule</Button>
                        </div>
                     </div>
                     <div className="flex-1 bg-slate-200 dark:bg-slate-800 relative min-h-[300px]">
                        <img 
                          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" 
                          alt="Group of students planning" 
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                     </div>
                  </div>
               </CardContent>
            </Card>
         </div>
      </section>

    </div>
  )
}