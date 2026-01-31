"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, MapPin, Trophy, GraduationCap, Star } from "lucide-react"
import { fadeInUp, staggerContainer } from "@/lib/motion"
import { Badge } from "@/components/ui/badge"
import universities from "@/data/universities.json" // Make sure this path points to your NEW detailed JSON

export function FeaturedUniversities() {
  // Sort universities by ranking to show the best ones first
  const topUniversities = universities
    .sort((a, b) => (a.rankings?.world || 9999) - (b.rankings?.world || 9999))
    .slice(0, 3)

  return (
    <section className="py-24 bg-secondary/20 overflow-hidden">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold uppercase tracking-wider mb-4 border border-primary/20"
          >
            Partner Network
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-black text-foreground mb-4">
            World-Class Institutions
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We partner with {universities.length}+ top-ranked universities to provide you with the best education opportunities globally.
          </motion.p>
        </motion.div>

        {/* University Marquee (Infinite Scroll) */}
        <div className="relative w-full mb-20 mask-linear-fade">
           {/* Fading edges for marquee */}
           <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-secondary/20 to-transparent z-10 pointer-events-none" />
           <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-secondary/20 to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex gap-6 w-max"
            animate={{ x: [0, -2000] }} // Adjust based on content width
            transition={{ duration: 40, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            {[...universities, ...universities].slice(0, 20).map((uni, index) => (
              <Link key={`${uni.university_id}-${index}`} href={`/universities/${uni.university_slug}`}>
                <motion.div
                  whileHover={{ scale: 1.05, borderColor: "hsl(var(--primary))" }}
                  className="flex-shrink-0 w-[320px] p-5 rounded-2xl bg-card border border-border hover:shadow-lg transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-white border border-border p-2 flex items-center justify-center shrink-0">
                      {/* Fallback for Logo */}
                      {uni.logo_url ? (
                        <img src={uni.logo_url} alt={uni.university_name} className="w-full h-full object-contain" />
                      ) : (
                        <GraduationCap className="w-8 h-8 text-primary/40" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-foreground truncate group-hover:text-primary transition-colors">
                        {uni.university_name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground mt-1">
                        <MapPin className="w-3 h-3" />
                        {uni.location}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-primary mt-1">
                        <Trophy className="w-3 h-3" />
                        Rank #{uni.rankings?.world}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </div>

        {/* Featured Cards Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {topUniversities.map((uni) => (
            <motion.div key={uni.university_id} variants={fadeInUp}>
              <Link href={`/universities/${uni.university_slug}`}>
                <div className="group h-full rounded-3xl overflow-hidden bg-card border border-border hover:border-primary/50 hover:shadow-2xl transition-all duration-500">
                  
                  {/* Image Area */}
                  <div className="relative h-56 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                    <img
                      src={uni.images?.[0] || "/placeholder.svg"}
                      alt={uni.university_name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Floating Badges */}
                    <div className="absolute top-4 left-4 z-20 flex gap-2">
                       {uni.badge && (
                          <Badge className="bg-white/90 text-black backdrop-blur-md border-none font-bold">
                            {uni.badge}
                          </Badge>
                       )}
                    </div>
                    <div className="absolute top-4 right-4 z-20">
                      <Badge className="bg-black/60 text-white backdrop-blur-md border-white/20">
                        <Star className="w-3 h-3 mr-1 text-yellow-400 fill-yellow-400" /> #{uni.rankings?.world}
                      </Badge>
                    </div>

                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
                       <h3 className="text-xl font-bold text-white mb-1 line-clamp-1 group-hover:text-primary-foreground transition-colors">
                          {uni.university_name}
                       </h3>
                       <div className="flex items-center text-white/80 text-sm gap-2">
                          <MapPin className="w-4 h-4" /> {uni.location}
                       </div>
                    </div>
                  </div>

                  {/* Body Area */}
                  <div className="p-6">
                    <div className="flex justify-between items-center text-sm mb-4 bg-secondary/30 p-3 rounded-xl">
                       <div className="flex flex-col">
                          <span className="text-muted-foreground text-xs uppercase font-bold">Programs</span>
                          <span className="font-bold">{uni.programs_count}+</span>
                       </div>
                       <div className="w-px h-8 bg-border" />
                       <div className="flex flex-col">
                          <span className="text-muted-foreground text-xs uppercase font-bold">Avg Fee</span>
                          <span className="font-bold">{uni.average_tuition_fees?.split(' ')[0] || 'TBA'}</span>
                       </div>
                       <div className="w-px h-8 bg-border" />
                       <div className="flex flex-col text-right">
                          <span className="text-muted-foreground text-xs uppercase font-bold">Intake</span>
                          <span className="font-bold text-primary">{uni.intakes?.[0] || 'Rolling'}</span>
                       </div>
                    </div>

                    <div className="flex items-center justify-between mt-6">
                      <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                        View Details
                      </span>
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link href="/universities">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-foreground text-background font-bold text-lg hover:bg-primary hover:text-white transition-all shadow-xl"
            >
              Explore All Universities
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>

      </div>
    </section>
  )
}