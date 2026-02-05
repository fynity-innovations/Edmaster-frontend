"use client"

import { motion } from "framer-motion"
import { 
  Shield, 
  Heart, 
  Globe, 
  Check, 
  X, 
  ArrowRight,
  FileHeart,
  Stethoscope,
  PhoneCall
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
}

export default function HealthInsurancePage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* ================= HERO SECTION (Glassmorphism & Soft Gradients) ================= */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Soft Background Blobs */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] -z-10 translate-x-1/3 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[100px] -z-10 -translate-x-1/3 translate-y-1/4" />

        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            
            {/* Left: Text Content */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="flex-1 text-center lg:text-left"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold uppercase tracking-wider mb-6">
                <Shield className="w-3 h-3" /> 100% Visa Compliant
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
                Healthcare that <br />
                travels <span className="text-primary">with you.</span>
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Comprehensive student health insurance that meets university waivers and protects your wallet from medical emergencies abroad.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="h-14 px-8 rounded-full text-lg shadow-lg shadow-primary/20 bg-primary text-primary-foreground hover:bg-primary/90">
                  Calculate Premium
                </Button>
                <div className="flex items-center gap-4 px-4">
                   <div className="flex -space-x-3">
                      {[1,2,3].map(i => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-secondary flex items-center justify-center text-xs font-bold">
                           U{i}
                        </div>
                      ))}
                   </div>
                   <div className="text-left">
                      <p className="text-sm font-bold">Trusted by</p>
                      <p className="text-xs text-muted-foreground">500+ Universities</p>
                   </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right: Modern Image Composition */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="flex-1 w-full relative"
            >
              <div className="relative z-10">
                 {/* Main Image */}
                 <div className="rounded-[3rem] overflow-hidden shadow-2xl border-4 border-background aspect-[4/5] relative">
                    <img 
                      src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop" 
                      alt="Healthcare Professional" 
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    
                    {/* Bottom Content on Image */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                       <p className="font-bold text-lg">24/7 Global Assistance</p>
                       <p className="text-white/80 text-sm">Multilingual support whenever you need it.</p>
                    </div>
                 </div>

                 {/* Floating Element: Instant Claims */}
                 <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-10 -left-10 bg-background/80 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/20 hidden md:flex items-center gap-4"
                 >
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white">
                       <FileHeart className="w-6 h-6" />
                    </div>
                    <div>
                       <p className="text-sm font-bold">Cashless</p>
                       <p className="text-xs text-muted-foreground">Claims Process</p>
                    </div>
                 </motion.div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ================= COMPARISON TABLE (High Value Section) ================= */}
      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Buy Home vs. Buy Abroad</h2>
            <p className="text-muted-foreground">Why buying insurance from your home country is the smarter choice.</p>
          </div>

          <div className="max-w-4xl mx-auto bg-background rounded-3xl shadow-sm border border-border overflow-hidden">
             <div className="grid grid-cols-3 bg-secondary/50 p-6 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                <div className="text-left">Feature</div>
                <div className="text-center text-primary">UConnect Plans</div>
                <div className="text-center">University Plans</div>
             </div>
             
             {[
                { feature: "Cost (Premium)", us: "Low ($400-$700/yr)", them: "High ($1500-$2500/yr)" },
                { feature: "Coverage Area", us: "Worldwide", them: "Campus/Local Only" },
                { feature: "Deductibles", us: "Zero (Usually)", them: "$100 - $500 per visit" },
                { feature: "Home Country Cover", us: "Yes (During breaks)", them: "No" },
                { feature: "University Waiver", us: "Yes (Guaranteed)", them: "N/A" }
             ].map((row, i) => (
                <div key={i} className="grid grid-cols-3 p-6 border-t border-border items-center hover:bg-secondary/10 transition-colors">
                   <div className="font-bold">{row.feature}</div>
                   <div className="text-center font-bold text-green-600 flex justify-center items-center gap-2">
                      <Check className="w-4 h-4" /> {row.us}
                   </div>
                   <div className="text-center text-muted-foreground flex justify-center items-center gap-2">
                      {row.them.includes("No") || row.them.includes("High") ? <X className="w-4 h-4 text-red-400" /> : null} {row.them}
                   </div>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* ================= WHAT WE COVER (Grid) ================= */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
             <div className="max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Complete Medical Protection</h2>
                <p className="text-muted-foreground text-lg">
                  Healthcare costs abroad can bankrupt you without insurance. We ensure you are covered for everything from the flu to surgery.
                </p>
             </div>
             <Button variant="outline" className="rounded-full">Download Policy Wording</Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
             {[
                { title: "In-Patient Care", desc: "Room rent, ICU, nursing, and surgery costs covered up to sum insured.", icon: Stethoscope },
                { title: "Medical Evacuation", desc: "Emergency transport to the nearest hospital or back to home country.", icon: PhoneCall },
                { title: "Pre-existing Conditions", desc: "Coverage for life-threatening emergency situations.", icon: Heart },
                { title: "Sports Injuries", desc: "Cover for injuries from university sports activities.", icon: Shield },
                { title: "Mental Health", desc: "Coverage for counselling and psychiatric treatments.", icon: FileHeart },
                { title: "Study Interruption", desc: "Tuition fee reimbursement if you are hospitalized for 30+ days.", icon: Globe },
             ].map((item, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -5 }}
                  className="p-8 rounded-[2rem] bg-secondary/10 border border-border/50 hover:bg-primary/5 hover:border-primary/20 transition-all"
                >
                   <div className="w-12 h-12 rounded-2xl bg-background flex items-center justify-center text-primary mb-6 shadow-sm">
                      <item.icon className="w-6 h-6" />
                   </div>
                   <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                   <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.desc}
                   </p>
                </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <section className="py-24 bg-background">
         <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            
            <Accordion type="single" collapsible className="w-full space-y-4">
               {[
                  { q: "Will my university accept this insurance?", a: "Yes. Our plans adhere to the strict waiver requirements of major universities in the USA, UK, Canada, Australia, and Germany. If a waiver is rejected, we offer a full refund." },
                  { q: "Is COVID-19 covered?", a: "Yes, all our student travel insurance plans cover COVID-19 hospitalization and treatment expenses just like any other illness." },
                  { q: "How do cashless claims work?", a: "We have a network of 12,000+ hospitals globally. Show your insurance card at the network hospital, and the TPA settles the bill directly." },
                  { q: "Can I extend the policy if I stay longer?", a: "Yes, you can easily extend your policy online before it expires if your course duration increases." }
               ].map((faq, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border border-border rounded-2xl px-6 data-[state=open]:bg-secondary/20 data-[state=open]:border-primary/20 transition-colors">
                     <AccordionTrigger className="text-lg font-medium hover:no-underline py-6">
                        {faq.q}
                     </AccordionTrigger>
                     <AccordionContent className="text-muted-foreground leading-relaxed pb-6 text-base">
                        {faq.a}
                     </AccordionContent>
                  </AccordionItem>
               ))}
            </Accordion>
         </div>
      </section>

      {/* ================= CTA BANNER ================= */}
      <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
         
         <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Secure Your Health & Visa Today</h2>
            <p className="text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
               Get your policy document instantly via email. No medical checkups required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <Button size="lg" variant="secondary" className="h-14 px-10 rounded-full text-lg font-bold">
                  Buy Now
               </Button>
               <Button size="lg" className="h-14 px-10 rounded-full text-lg border-2 border-primary-foreground bg-transparent hover:bg-primary-foreground/10 text-primary-foreground">
                  Talk to Expert
               </Button>
            </div>
         </div>
      </section>

    </div>
  )
}