// "use client"

// import { motion, useScroll, useTransform } from "framer-motion"
// import { useRef } from "react"
// import { Search, FileText, Send, Plane, CheckCircle } from "lucide-react"
// import { fadeInUp, staggerContainer } from "@/lib/motion"

// const steps = [
//   {
//     icon: Search,
//     title: "Discover",
//     description:
//       "Explore universities and courses that match your interests, budget, and career goals using our AI-powered search.",
//   },
//   {
//     icon: FileText,
//     title: "Prepare",
//     description:
//       "Get personalized guidance on documents, SOPs, and test preparation with our expert counselors and AI tools.",
//   },
//   {
//     icon: Send,
//     title: "Apply",
//     description:
//       "Submit applications to your chosen universities with our end-to-end application support and tracking.",
//   },
//   {
//     icon: CheckCircle,
//     title: "Get Accepted",
//     description: "Receive your offer letters and choose the best option for your future with our expert advice.",
//   },
//   {
//     icon: Plane,
//     title: "Fly Abroad",
//     description:
//       "Complete visa formalities and pre-departure preparations. We'll be with you until you land at your destination.",
//   },
// ]

// export function HowItWorks() {
//   const containerRef = useRef<HTMLDivElement>(null)
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start end", "end start"],
//   })

//   const lineHeight = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"])

//   return (
//     <section ref={containerRef} className="py-24 relative overflow-hidden">
//       <div className="container mx-auto px-4">
//         {/* Section Header */}
//         <motion.div
//           variants={staggerContainer}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//           className="text-center mb-16"
//         >
//           <motion.span
//             variants={fadeInUp}
//             className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
//           >
//             Simple Process
//           </motion.span>
//           <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
//             How It Works
//           </motion.h2>
//           <motion.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-2xl mx-auto">
//             Your journey to studying abroad is just five simple steps away
//           </motion.p>
//         </motion.div>

//         {/* Timeline */}
//         <div className="relative max-w-4xl mx-auto">
//           {/* Animated Line */}
//           <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-1/2">
//             <motion.div className="absolute top-0 left-0 w-full bg-primary origin-top" style={{ height: lineHeight }} />
//           </div>

//           {/* Steps */}
//           <motion.div
//             variants={staggerContainer}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, margin: "-100px" }}
//             className="space-y-12"
//           >
//             {steps.map((step, index) => (
//               <motion.div
//                 key={step.title}
//                 variants={fadeInUp}
//                 className={`relative flex items-center gap-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
//               >
//                 {/* Content */}
//                 <div
//                   className={`flex-1 pl-20 md:pl-0 ${index % 2 === 0 ? "md:text-right md:pr-16" : "md:text-left md:pl-16"}`}
//                 >
//                   <motion.div
//                     whileHover={{ scale: 1.02 }}
//                     className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all"
//                   >
//                     <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
//                     <p className="text-muted-foreground">{step.description}</p>
//                   </motion.div>
//                 </div>

//                 {/* Icon */}
//                 <motion.div
//                   whileHover={{ scale: 1.1, rotate: 5 }}
//                   className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg z-10"
//                 >
//                   <step.icon className="w-7 h-7" />
//                 </motion.div>

//                 {/* Empty space for alignment */}
//                 <div className="hidden md:block flex-1" />
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   )
// }




"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Search, FileText, Send, Plane, CheckCircle } from "lucide-react"
import { fadeInUp, staggerContainer } from "@/lib/motion"

const steps = [
  {
    icon: Search,
    title: "Discover",
    color: "from-purple-500 to-pink-500",
    bg: "bg-purple-50",
    description:
      "Explore universities and courses that match your interests, budget, and career goals using our AI-powered search.",
  },
  {
    icon: FileText,
    title: "Prepare",
    color: "from-blue-500 to-cyan-500",
    bg: "bg-blue-50",
    description:
      "Get personalized guidance on documents, SOPs, and test preparation with our expert counselors and AI tools.",
  },
  {
    icon: Send,
    title: "Apply",
    color: "from-orange-500 to-yellow-500",
    bg: "bg-orange-50",
    description:
      "Submit applications to your chosen universities with our end-to-end application support and tracking.",
  },
  {
    icon: CheckCircle,
    title: "Get Accepted",
    color: "from-green-500 to-emerald-500",
    bg: "bg-green-50",
    description:
      "Receive your offer letters and choose the best option for your future with our expert advice.",
  },
  {
    icon: Plane,
    title: "Fly Abroad",
    color: "from-indigo-500 to-violet-500",
    bg: "bg-indigo-50",
    description:
      "Complete visa formalities and pre-departure preparations. We'll be with you until you land.",
  },
]

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"])

  return (
    <section ref={containerRef} className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">

        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
          >
            Simple Process
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            How It Works
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your journey to studying abroad is just five simple steps away
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">

          {/* Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[3px] bg-gradient-to-b from-primary/20 to-primary/40 md:-translate-x-1/2 rounded-full">
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary to-primary/60 origin-top rounded-full shadow-lg"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Steps */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-14"
          >
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                variants={fadeInUp}
                className={`relative flex items-center gap-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Card */}
                <div
                  className={`flex-1 pl-20 md:pl-0 ${
                    index % 2 === 0 ? "md:text-right md:pr-16" : "md:text-left md:pl-16"
                  }`}
                >
                  <motion.div
                    whileHover={{ y: -4, scale: 1.02 }}
                    className={`p-6 rounded-2xl border ${step.bg} hover:shadow-xl transition-all backdrop-blur`}
                  >
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </motion.div>
                </div>

                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 8 }}
                  className={`absolute left-0 md:left-1/2 md:-translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-br ${step.color} text-white flex items-center justify-center shadow-xl z-10`}
                >
                  <step.icon className="w-7 h-7" />
                </motion.div>

                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
