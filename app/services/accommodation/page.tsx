"use client"

import { motion } from "framer-motion"
import { 
  Home, 
  MapPin, 
  Wallet, 
  ShieldCheck, 
  Users, 
  ArrowRight,
  Building,
  Key,
  CheckCircle2,
  Search
} from "lucide-react"
import { Button } from "@/components/ui/button"

// --- Animation Variants ---
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
}

export default function AccommodationPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* ================= HERO SECTION (Split Layout with Unique Shape) ================= */}
      <section className="relative pt-24 pb-12 lg:pt-36 lg:pb-24 overflow-hidden">
        {/* Decorative Background Blob */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] -z-10 translate-x-1/3 -translate-y-1/4" />

        <div className="container mx-auto px-4">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
            
            {/* Left: Content */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="flex-1 text-center lg:text-left"
            >
              <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/80 text-foreground text-sm font-medium mb-6 border border-border">
                <Home className="w-4 h-4 text-primary" /> 
                <span>Student Housing Simplified</span>
              </motion.div>
              
              <motion.h1 variants={fadeIn} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
                Find a place you can <br className="hidden lg:block" />
                truly call <span className="text-primary">Home</span>
              </motion.h1>
              
              <motion.p variants={fadeIn} className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                We connect you with verified student housing partners worldwide. Safe, affordable, and close to campus—so you can focus on your studies, not your lease.
              </motion.p>
              
              <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="h-14 px-8 rounded-full text-lg shadow-lg hover:shadow-primary/20 transition-all bg-primary text-primary-foreground hover:bg-primary/90">
                  <Search className="w-5 h-5 mr-2" /> Find Housing
                </Button>
                <Button variant="outline" size="lg" className="h-14 px-8 rounded-full text-lg gap-2 hover:bg-secondary">
                  How it works
                </Button>
              </motion.div>

              <motion.div variants={fadeIn} className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-sm font-medium text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" /> Verified Listings
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" /> Instant Booking
                </div>
              </motion.div>
            </motion.div>

            {/* Right: Image with Unique Shape */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-1 w-full relative"
            >
              {/* IMAGE SOURCE: Cozy student room */}
              <div className="relative z-10 overflow-hidden rounded-[2.5rem] shadow-2xl border border-border aspect-[4/5] max-w-md mx-auto lg:max-w-none bg-slate-100 dark:bg-slate-800">
                <img 
                  src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=2069" 
                  alt="Cozy Student Accommodation" 
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                />
                
                {/* Floating Info Card */}
                <div className="absolute bottom-6 left-6 right-6 bg-background/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-border/50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2.5 rounded-full text-primary">
                      <Key className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Status</p>
                      <p className="text-sm font-bold">Move-in Ready</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">From</p>
                    <p className="text-sm font-bold text-primary">€450<span className="text-xs text-muted-foreground font-normal">/mo</span></p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ================= PARTNERS BANNER ================= */}
      <section className="py-10 border-y border-border/50 bg-secondary/20">
        <div className="container mx-auto px-4">
          <p className="text-center text-xs font-bold text-muted-foreground uppercase tracking-widest mb-6">
            Trusted by Global Housing Partners
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-60 hover:opacity-100 transition-opacity duration-300">
             {/* Text placeholders - replace with SVGs if available */}
             {["Uniplaces", "Casita", "Amber", "LondonNest", "Spotahome"].map((brand) => (
               <span key={brand} className="text-xl md:text-2xl font-bold text-foreground">{brand}</span>
             ))}
          </div>
        </div>
      </section>

      {/* ================= FEATURES (Bento Grid Style) ================= */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">More Than Just a Room</h2>
            <p className="text-muted-foreground text-lg">
              We help you find accommodation that suits your lifestyle, budget, and academic needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            
            {/* Feature 1: Location (Large) */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-2 bg-primary/5 border border-primary/10 rounded-3xl p-8 flex flex-col md:flex-row gap-8 items-center group"
            >
              <div className="flex-1">
                <div className="w-12 h-12 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center mb-6">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Prime Locations</h3>
                <p className="text-muted-foreground mb-4">
                  We prioritize housing near universities or with direct public transport links. Spend less time commuting and more time living.
                </p>
                <div className="flex gap-4">
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium"><CheckCircle2 className="w-4 h-4 text-primary" /> Near Campus</span>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium"><CheckCircle2 className="w-4 h-4 text-primary" /> Safe Zones</span>
                </div>
              </div>
              <div className="w-full md:w-1/3 aspect-square bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-3 rotate-3 group-hover:rotate-0 transition-transform duration-300">
                 <div className="w-full h-full bg-secondary/50 rounded-xl border-2 border-dashed border-border flex items-center justify-center">
                    <MapPin className="w-8 h-8 text-muted-foreground/50" />
                 </div>
              </div>
            </motion.div>

            {/* Feature 2: Budget (Vertical) */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-slate-900 text-white rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden"
            >
              {/* Abstract glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/30 rounded-full blur-[60px] pointer-events-none" />
              
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                  <Wallet className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Budget Friendly</h3>
                <p className="text-slate-400 text-sm">
                  From shared dorms to private studios, options for every budget.
                </p>
              </div>

              <div className="mt-8 space-y-3">
                 <div className="flex justify-between items-center text-sm p-3 bg-white/5 rounded-lg border border-white/10">
                    <span className="text-slate-300">Shared</span>
                    <span className="font-bold text-green-400">$</span>
                 </div>
                 <div className="flex justify-between items-center text-sm p-3 bg-white/5 rounded-lg border border-white/10">
                    <span className="text-slate-300">Private</span>
                    <span className="font-bold text-yellow-400">$$</span>
                 </div>
              </div>
            </motion.div>

            {/* Feature 3: Safety */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-background border border-border rounded-3xl p-8"
            >
              <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center mb-4 text-foreground">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Verified & Safe</h3>
              <p className="text-muted-foreground text-sm">
                Properties with 24/7 security, CCTV, and secure entry systems.
              </p>
            </motion.div>

            {/* Feature 4: Community */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-2 bg-background border border-border rounded-3xl p-8 flex flex-col sm:flex-row gap-6 items-center"
            >
               <div className="flex-1">
                  <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center mb-4 text-foreground">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Student Community</h3>
                  <p className="text-muted-foreground text-sm">
                    Live with students from around the world. Many properties offer gyms, study lounges, and social events.
                  </p>
               </div>
               <div className="flex -space-x-4">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="w-12 h-12 rounded-full border-2 border-background bg-secondary flex items-center justify-center text-xs font-bold text-muted-foreground">
                      U{i}
                    </div>
                  ))}
               </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ================= WHY BOOK WITH US (Checklist) ================= */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            
            <div className="flex-1 space-y-8">
              <h2 className="text-3xl font-bold">The UConneact Advantage</h2>
              <p className="text-lg text-muted-foreground">
                We take the uncertainty out of booking accommodation abroad. No scams, no surprises.
              </p>
              
              <div className="space-y-4">
                {[
                  { title: "100% Verified Listings", desc: "Every property is vetted by our partners." },
                  { title: "Digital Booking Process", desc: "Sign leases and pay deposits securely online." },
                  { title: "Price Match Guarantee", desc: "We ensure you get the best market rates." },
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4 p-5 rounded-xl bg-background border border-border/50 shadow-sm"
                  >
                    <div className="shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-1">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-base">{item.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Abstract Graphic/Image Placeholder */}
            <div className="flex-1 w-full max-w-md">
               <div className="relative aspect-square bg-background rounded-[3rem] border border-border shadow-2xl p-8 flex flex-col gap-4 overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-secondary rounded-full blur-[80px] -z-10" />
                  
                  {/* Mock Cards */}
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-border/50">
                    <div className="w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-lg" />
                    <div className="space-y-2 flex-1">
                      <div className="h-2 w-3/4 bg-slate-200 dark:bg-slate-700 rounded" />
                      <div className="h-2 w-1/2 bg-slate-200 dark:bg-slate-700 rounded" />
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-border/50 opacity-60 scale-95">
                    <div className="w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-lg" />
                    <div className="space-y-2 flex-1">
                      <div className="h-2 w-3/4 bg-slate-200 dark:bg-slate-700 rounded" />
                      <div className="h-2 w-1/2 bg-slate-200 dark:bg-slate-700 rounded" />
                    </div>
                  </div>
                  <div className="mt-auto text-center">
                    <span className="inline-block px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-bold shadow-lg">
                      AI Smart Matching
                    </span>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= CTA FULL WIDTH ================= */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to find your new home?</h2>
          <p className="text-xl text-primary-foreground/90 mb-10">
            Share your destination and preferences. We'll match you with the best available options instantly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="h-14 px-10 rounded-full text-lg font-bold bg-background text-foreground hover:bg-secondary">
              Start Your Search
            </Button>
            <Button size="lg" className="h-14 px-10 rounded-full text-lg border-2 border-primary-foreground bg-transparent hover:bg-primary-foreground/10 text-primary-foreground">
              Talk to an Expert
            </Button>
          </div>
        </div>
      </section>

    </div>
  )
}