"use client"

import { motion } from "framer-motion"
import { 
  Lock, 
  Euro, 
  Landmark, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  FileCheck,
  Smartphone
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
}

export default function BlockedAccountPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* ================= HERO SECTION (Trust & Security Theme) ================= */}
      <section className="relative pt-24 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
        {/* Abstract German Flag Colors / Security Background */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-yellow-500/5 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[100px] -z-10 -translate-x-1/3 translate-y-1/4" />

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
                <Euro className="w-4 h-4 text-primary" /> 
                <span>Mandatory for German Student Visa</span>
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
                German Blocked Account <br />
                <span className="text-primary relative inline-block">
                  Made Simple.
                </span>
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Open your **Sperrkonto** instantly from India. 100% digital process, government-approved providers, and immediate confirmation for your visa appointment.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="h-14 px-8 rounded-full text-lg shadow-lg hover:shadow-primary/25 bg-primary text-primary-foreground transition-all">
                  Open Account Now <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button variant="outline" size="lg" className="h-14 px-8 rounded-full text-lg border-2 hover:bg-secondary/50">
                  Compare Providers
                </Button>
              </motion.div>

              <motion.div variants={fadeInUp} className="mt-12 flex items-center justify-center lg:justify-start gap-6 text-sm font-medium text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" /> Federal Foreign Office Approved
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" /> Instant Confirmation
                </div>
              </motion.div>
            </motion.div>

            {/* Right Image (Secure Vault Graphic) */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-1 w-full relative"
            >
              <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-background aspect-square bg-slate-50 dark:bg-slate-900">
                 {/* Use a relevant image */}
                 <img 
                   src="https://images.unsplash.com/photo-1565514020176-db792f4b6d9d?q=80&w=2070&auto=format&fit=crop" 
                   alt="Secure Banking Germany" 
                   className="object-cover w-full h-full"
                 />
                 
                 {/* Floating Overlay */}
                 <div className="absolute bottom-8 left-8 right-8 bg-background/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-border/50">
                    <div className="flex justify-between items-center mb-4">
                       <div>
                          <p className="text-xs font-bold text-muted-foreground uppercase">Current Requirement</p>
                          <p className="text-xl font-bold">€11,208 / year</p>
                       </div>
                       <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                          <Lock className="w-5 h-5" />
                       </div>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                       <div className="h-full bg-green-500 w-full animate-pulse" />
                    </div>
                    <p className="text-xs text-green-600 font-bold mt-2 text-right">Funds Secure</p>
                 </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ================= PARTNERS ================= */}
      <section className="py-12 border-y border-border/50 bg-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-8">
            Official Banking Partners
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
             {/* Text Placeholders for Providers */}
             {["Fintiba", "Coracle", "Expatrio", "Deutsche Bank"].map((brand) => (
               <span key={brand} className="text-2xl font-bold text-foreground">{brand}</span>
             ))}
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS (Timeline) ================= */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-bold mb-4">How it Works</h2>
             <p className="text-muted-foreground">The easiest way to prove your financial stability for your visa.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
             {/* Connector Line */}
             <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-border -z-10" />

             {[
               { icon: Smartphone, title: "Register Online", desc: "Fill a simple form on our partner portal." },
               { icon: FileCheck, title: "Verify ID", desc: "Upload your passport for instant verification." },
               { icon: Landmark, title: "Transfer Funds", desc: "Transfer the required €11,208 via local bank transfer." },
               { icon: CheckCircle2, title: "Get 06 Blocking", desc: "Receive the official confirmation document for your visa." }
             ].map((step, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.1 }}
                 className="bg-background pt-4 text-center group"
               >
                  <div className="w-16 h-16 mx-auto bg-background border-4 border-secondary rounded-full flex items-center justify-center text-primary mb-6 group-hover:border-primary transition-colors relative z-10">
                     <step.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* ================= WHY US (Bento Grid) ================= */}
      <section className="py-24 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
             
             {/* Feature 1 */}
             <div className="bg-background p-8 rounded-3xl border border-border shadow-sm flex flex-col items-start">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center text-green-600 mb-6">
                   <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Fastest Opening</h3>
                <p className="text-muted-foreground text-sm">Account opening in less than 10 minutes. 06 Blocking confirmation usually within 24 hours of transfer.</p>
             </div>

             {/* Feature 2 */}
             <div className="bg-background p-8 rounded-3xl border border-border shadow-sm flex flex-col items-start">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                   <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Government Approved</h3>
                <p className="text-muted-foreground text-sm">All our partners are fully accepted by the German Federal Foreign Office for student visa applications.</p>
             </div>

             {/* Feature 3 */}
             <div className="bg-background p-8 rounded-3xl border border-border shadow-sm flex flex-col items-start">
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl flex items-center justify-center text-yellow-600 mb-6">
                   <Euro className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Health Insurance Combo</h3>
                <p className="text-muted-foreground text-sm">Get your Travel & Public Health Insurance (TK/DAK) bundled for extra discounts and cashbacks.</p>
             </div>

          </div>
        </div>
      </section>

      {/* ================= FAQ ACCORDION ================= */}
      <section className="py-24">
         <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            
            <Accordion type="single" collapsible className="w-full space-y-4">
               {[
                  { q: "What is the current blocked amount?", a: "As of 2024, the required amount is €934 per month, totaling €11,208 for a year." },
                  { q: "How do I access my money?", a: "Once you arrive in Germany and open a current account (Girokonto), the blocked account provider will transfer €934 to it every month." },
                  { q: "What if my visa is rejected?", a: "If your visa is rejected, you can close the blocked account and get a full refund of your deposited money." },
                  { q: "Can I open it before getting an admit?", a: "Yes, you can open the account with just your passport to be ready. You only need the admission letter for the health insurance bundle." }
               ].map((faq, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border border-border rounded-2xl px-6 data-[state=open]:bg-secondary/20 transition-colors">
                     <AccordionTrigger className="text-lg font-medium hover:no-underline py-6 text-left">
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
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
         
         <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Start Your German Journey Today</h2>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
               Open your blocked account, secure your health insurance, and get ready for your visa interview.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <Button size="lg" className="h-14 px-10 rounded-full text-lg font-bold bg-primary text-primary-foreground hover:bg-primary/90">
                  Open Account
               </Button>
               <Button size="lg" variant="outline" className="h-14 px-10 rounded-full text-lg border-slate-700 text-white hover:bg-slate-800 hover:text-white bg-transparent">
                  Talk to Expert
               </Button>
            </div>
         </div>
      </section>

    </div>
  )
}