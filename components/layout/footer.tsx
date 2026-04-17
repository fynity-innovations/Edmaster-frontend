"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { fadeInUp, staggerContainer } from "@/lib/motion"
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Youtube } from "lucide-react"

const footerLinks = {
  destinations: [
    { name: "Study in UK", href: "/study-in/united-kingdom" },
    { name: "Study in USA", href: "/study-in/united-states" },
    { name: "Study in Canada", href: "/study-in/canada" },
    { name: "Study in Australia", href: "/study-in/australia" },
    { name: "Study in Germany", href: "/study-in/germany" },
  ],
  services: [
    { name: "University Selection", href: "/services" },
    { name: "Application Support", href: "/services" },
    { name: "Visa Assistance", href: "/services" },
    { name: "Test Preparation", href: "/services" },
    { name: "Scholarships", href: "/services" },
  ],
  resources: [
    { name: "AI Tools", href: "/ai-tools" },
    { name: "Contact Us", href: "/get-started" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
}

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
]

export function Footer() {
  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {/* Brand Column */}
          <motion.div variants={fadeInUp} className="lg:col-span-1 md:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="font-bold text-2xl">
                <span className="text-primary">Study</span>Global
              </span>
            </Link>
            <p className="text-muted-foreground text-sm mb-6">
              Your trusted partner for international education. Empowering students to achieve their dreams of studying
              abroad.
            </p>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <span>hello@studyglobal.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <span>+1 (800) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>New York, NY 10001</span>
              </div>
            </div>
          </motion.div>

          {/* Destinations */}
          <motion.div variants={fadeInUp}>
            <h4 className="font-semibold text-foreground mb-4">Destinations</h4>
            <ul className="space-y-3">
              {footerLinks.destinations.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={fadeInUp}>
            <h4 className="font-semibold text-foreground mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div variants={fadeInUp}>
            <h4 className="font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

        </motion.div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 pb-20 md:pb-0 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Left — copyright + legal + developer */}
            <div className="flex flex-col items-center md:items-start gap-1">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} EdMaster. All rights reserved.
              </p>
              <p className="text-xs text-muted-foreground">
                Developed by{" "}
                <a
                  href="https://www.fynityinnovations.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-primary hover:underline"
                >
                  Fynity Innovations
                </a>
              </p>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              {footerLinks.legal.map((link) => (
                <Link key={link.name} href={link.href} className="hover:text-primary transition-colors">
                  {link.name}
                </Link>
              ))}
            </div>
            {/* Right — social icons */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
