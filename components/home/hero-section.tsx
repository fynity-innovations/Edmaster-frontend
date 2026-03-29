"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, GraduationCap, Globe, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import Link from "next/link";
import { GlobeVisualization } from "@/components/home/globe-visualization";

const words = ["Future", "Dreams", "Career", "Journey"];

export function HeroSection() {
  const [activeWord, setActiveWord] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWord((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/30" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-1/2 -right-1/2 w-full h-full rounded-full bg-gradient-to-br from-primary/10 to-accent/5 blur-3xl"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-1/2 -left-1/2 w-full h-full rounded-full bg-gradient-to-tr from-primary/5 to-accent/10 blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], rotate: [90, 0, 90] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10 py-12">
        {/* Two-column layout: text left, globe right */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">

          {/* ── Left: text content ────────────────────────────────────── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex-1 text-center lg:text-left max-w-2xl mx-auto lg:mx-0"
          >
            {/* Badge */}
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI-Powered Study Abroad Platform</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6"
            >
              <span className="text-foreground">Shape Your</span>
              <br />
              <span className="relative inline-block min-w-[6rem]">
                <motion.span
                  key={activeWord}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="text-primary"
                >
                  {words[activeWord]}
                </motion.span>
              </span>
              <span className="text-foreground"> Abroad</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10 mx-auto lg:mx-0"
            >
              Discover world-class universities, find perfect courses, and navigate your study abroad journey with our
              AI-powered guidance system.
            </motion.p>

            {/* CTA */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-14"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 rounded-xl"
                  asChild
                >
                  <Link href="/courses">
                    Start Your Journey
                    <motion.span
                      className="ml-2 inline-block"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      →
                    </motion.span>
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-3 gap-6 max-w-sm mx-auto lg:mx-0"
            >
              {[
                { icon: GraduationCap, label: "Universities", value: "500+" },
                { icon: Globe,         label: "Countries",    value: "50+"  },
                { icon: Users,         label: "Students",     value: "100K+" },
              ].map((stat) => (
                <motion.div key={stat.label} variants={fadeInUp} className="text-center lg:text-left">
                  <div className="w-12 h-12 mx-auto lg:mx-0 mb-3 rounded-xl bg-primary/10 flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: interactive globe ──────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            className="flex-1 w-full max-w-[560px] mx-auto lg:mx-0"
          >
            <GlobeVisualization />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
