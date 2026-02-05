"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Calculator, 
  Percent, 
  Banknote, 
  Landmark, 
  ArrowRight,
  Clock,
  Briefcase,
  GraduationCap,
  CheckCircle2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
}

export default function EducationLoanPage() {
  // Mock state for the interactive visual
  const [loanAmount, setLoanAmount] = useState([25])
  const [tenure, setTenure] = useState([10])

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* ================= HERO SECTION (Interactive Calculator Theme) ================= */}
      <section className="relative pt-24 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
        {/* Abstract Finance Background */}
        <div className="absolute top-0 right-0 w-3/4 h-full bg-primary/5 -skew-x-12 translate-x-1/4 -z-10" />
        
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            {/* Left: Content */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="flex-1"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-bold mb-6 border border-border">
                <Banknote className="w-4 h-4 text-primary" /> 
                <span>100% Finance Available</span>
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
                Fund Your Global <br />
                <span className="text-primary">Ambitions.</span>
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="text-lg text-muted-foreground mb-8 max-w-xl">
                Don't let finances hold you back. We connect you with trusted banks and NBFCs for quick, collateral-free education loans with the lowest interest rates.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="h-14 px-8 rounded-xl text-lg shadow-xl shadow-primary/20 bg-primary text-primary-foreground hover:bg-primary/90">
                  Check Eligibility
                </Button>
                <Button variant="outline" size="lg" className="h-14 px-8 rounded-xl text-lg gap-2 bg-background hover:bg-secondary">
                   Talk to Loan Expert
                </Button>
              </motion.div>

              <motion.div variants={fadeInUp} className="mt-10 flex gap-8 border-t border-border pt-6">
                 <div>
                    <p className="text-3xl font-bold text-foreground">15+</p>
                    <p className="text-sm text-muted-foreground">Banking Partners</p>
                 </div>
                 <div>
                    <p className="text-3xl font-bold text-foreground">₹50Cr+</p>
                    <p className="text-sm text-muted-foreground">Loans Disbursed</p>
                 </div>
              </motion.div>
            </motion.div>

            {/* Right: Mock Calculator Visual (Distinctive Feature) */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-1 w-full max-w-md lg:max-w-full"
            >
              <div className="relative bg-background rounded-3xl shadow-2xl border border-border p-8 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-primary" />
                
                <div className="flex justify-between items-center mb-8">
                   <h3 className="text-xl font-bold flex items-center gap-2">
                     <Calculator className="w-5 h-5 text-primary" /> EMI Estimator
                   </h3>
                   <span className="text-[10px] font-bold tracking-wider text-muted-foreground bg-secondary px-2 py-1 rounded uppercase">Live Preview</span>
                </div>

                {/* Mock Slider 1 */}
                <div className="mb-8">
                   <div className="flex justify-between mb-4">
                      <label className="text-sm font-medium text-muted-foreground">Loan Amount</label>
                      <span className="text-lg font-bold text-foreground">₹ {loanAmount} Lakhs</span>
                   </div>
                   <Slider 
                      defaultValue={[25]} 
                      max={100} 
                      step={1} 
                      onValueChange={setLoanAmount}
                      className="cursor-pointer py-4" 
                   />
                </div>

                {/* Mock Slider 2 */}
                <div className="mb-8">
                   <div className="flex justify-between mb-4">
                      <label className="text-sm font-medium text-muted-foreground">Duration</label>
                      <span className="text-lg font-bold text-foreground">{tenure} Years</span>
                   </div>
                   <Slider 
                      defaultValue={[10]} 
                      max={15} 
                      step={1} 
                      onValueChange={setTenure}
                      className="cursor-pointer py-4"
                   />
                </div>

                {/* Result Box */}
                <div className="bg-secondary/30 rounded-xl p-6 flex items-center justify-between mb-6 border border-border/50">
                   <div>
                      <p className="text-xs text-muted-foreground mb-1">Est. Monthly EMI</p>
                      <p className="text-2xl font-bold text-primary">₹ {((loanAmount[0] * 100000 * 0.10) / 12).toFixed(0)}*</p>
                   </div>
                   <div className="text-right">
                      <p className="text-xs text-muted-foreground mb-1">Interest Rate</p>
                      <p className="text-lg font-bold">~9-11%</p>
                   </div>
                </div>

                <Button className="w-full h-12 text-lg rounded-xl bg-primary text-primary-foreground hover:bg-primary/90">
                   Apply for this Loan
                </Button>
                
                <p className="text-center text-[10px] text-muted-foreground mt-4">
                   *Indicative figures. Actual rates depend on profile and bank.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ================= LOAN TYPES (Cards with Hover Effects) ================= */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Two Ways to Fund Your Dream</h2>
            <p className="text-muted-foreground">
              Whether you have assets to pledge or not, we have a solution tailored for you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* Card 1: Secured */}
            <motion.div 
               whileHover={{ y: -5 }}
               className="group relative p-1 rounded-[2rem] bg-gradient-to-b from-border to-transparent"
            >
               <div className="bg-background rounded-[1.9rem] p-8 h-full border border-border/50 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                     <Landmark className="w-24 h-24 text-primary" />
                  </div>
                  
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                     <Briefcase className="w-6 h-6" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2">Secured Loan</h3>
                  <p className="text-sm font-semibold text-primary mb-6">(With Collateral)</p>
                  <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
                     Pledge assets like property or fixed deposits to get lower interest rates and higher loan amounts. Ideal for high-tuition universities.
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                     <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="w-4 h-4 text-green-500" /> Lower Interest Rates (8.5% - 10.5%)</li>
                     <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="w-4 h-4 text-green-500" /> No Upper Limit on Amount</li>
                     <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="w-4 h-4 text-green-500" /> Longer Repayment Tenure</li>
                  </ul>

                  <Button variant="outline" className="w-full rounded-xl hover:bg-secondary">Learn More</Button>
               </div>
            </motion.div>

            {/* Card 2: Unsecured */}
            <motion.div 
               whileHover={{ y: -5 }}
               className="group relative p-1 rounded-[2rem] bg-gradient-to-b from-border to-transparent"
            >
               <div className="bg-background rounded-[1.9rem] p-8 h-full border border-border/50 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                     <GraduationCap className="w-24 h-24 text-primary" />
                  </div>
                  
                  <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-foreground mb-6">
                     <Percent className="w-6 h-6" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2">Unsecured Loan</h3>
                  <p className="text-sm font-semibold text-primary mb-6">(Without Collateral)</p>
                  <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
                     Based on your academic profile and co-applicant's income. No property documents needed. Faster processing time.
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                     <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="w-4 h-4 text-green-500" /> Quick Sanction (3-7 Days)</li>
                     <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="w-4 h-4 text-green-500" /> Loans up to ₹50 - ₹75 Lakhs</li>
                     <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="w-4 h-4 text-green-500" /> Minimal Documentation</li>
                  </ul>

                  <Button variant="outline" className="w-full rounded-xl hover:bg-secondary">Learn More</Button>
               </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ================= PROCESS ROADMAP ================= */}
      <section className="py-24 bg-secondary/20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
             <h2 className="text-3xl font-bold">Your Road to Funding</h2>
          </div>

          <div className="relative max-w-5xl mx-auto">
             {/* Vertical Line for Mobile / Horizontal for Desktop logic handled via flex */}
             <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-border md:hidden" />
             
             <div className="space-y-12 md:space-y-0 md:grid md:grid-cols-4 md:gap-8">
                {[
                   { title: "Profile Analysis", desc: "We evaluate your academic profile and financial needs." },
                   { title: "Bank Selection", desc: "We match you with the best lenders offering lowest rates." },
                   { title: "Documentation", desc: "Assistance in gathering and submitting correct documents." },
                   { title: "Sanction Letter", desc: "Receive your loan sanction letter for visa processing." }
                ].map((step, i) => (
                   <motion.div 
                     key={i}
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: i * 0.2 }}
                     className="relative flex md:flex-col items-start md:items-center gap-6 md:gap-6 md:text-center group"
                   >
                      {/* Number Circle */}
                      <div className="shrink-0 w-10 h-10 rounded-full bg-background border-2 border-primary text-primary flex items-center justify-center font-bold relative z-10 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                         {i + 1}
                      </div>
                      
                      {/* Connecting Line (Desktop) */}
                      {i < 3 && (
                        <div className="hidden md:block absolute top-5 left-1/2 w-full h-0.5 bg-border -z-0" />
                      )}

                      <div>
                         <h4 className="font-bold text-lg mb-2">{step.title}</h4>
                         <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                      </div>
                   </motion.div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* ================= DOCUMENTS SECTION (Image Right) ================= */}
      <section className="py-24">
         <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-16">
               <div className="flex-1 space-y-8">
                  <h2 className="text-3xl md:text-4xl font-bold">Documents You'll Need</h2>
                  <p className="text-lg text-muted-foreground">
                     Keep these handy to speed up your application process. We verify everything before submission to avoid rejections.
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                     {[
                        "Admission Letter", "KYC Documents", 
                        "Academic Marksheets", "Income Proof",
                        "ITR Returns (2-3 Years)", "Collateral Docs"
                     ].map((doc, i) => (
                        <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-background border border-border shadow-sm hover:border-primary/50 transition-colors">
                           <div className="w-2 h-2 rounded-full bg-primary" />
                           <span className="font-medium text-sm">{doc}</span>
                        </div>
                     ))}
                  </div>
               </div>

               <div className="flex-1 relative">
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-background aspect-square max-w-md mx-auto">
                     {/* IMAGE SOURCE: Finance / Documents / Study */}
                     <img 
                        src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2072&auto=format&fit=crop" 
                        alt="Financial Planning" 
                        className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                     />
                  </div>
                  {/* Decorative Elements */}
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary rounded-full -z-10" />
                  <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/20 rounded-full -z-10" />
               </div>
            </div>
         </div>
      </section>

      {/* ================= CTA BANNER ================= */}
      <section className="py-20 bg-slate-900 text-white">
         <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left max-w-xl">
               <h2 className="text-3xl font-bold mb-3">Check Your Eligibility in 2 Minutes</h2>
               <p className="text-slate-400">No impact on your credit score. Free assessment by our financial experts.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
               <Button size="lg" className="h-14 px-10 rounded-xl text-lg font-bold bg-primary text-primary-foreground hover:bg-primary/90">
                  Calculate Eligibility
               </Button>
               <Button size="lg" variant="outline" className="h-14 px-10 rounded-xl text-lg border-slate-700 text-white hover:bg-slate-800 hover:text-white bg-transparent">
                  Request Call Back
               </Button>
            </div>
         </div>
      </section>

    </div>
  )
}