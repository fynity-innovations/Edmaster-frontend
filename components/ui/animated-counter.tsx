"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useInView } from "framer-motion"

interface AnimatedCounterProps {
  value: string
  duration?: number
  className?: string
}

export function AnimatedCounter({ value, duration = 2, className }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [displayValue, setDisplayValue] = useState("0")

  useEffect(() => {
    if (!isInView) return

    // Extract number from string (e.g., "600,000+" -> 600000)
    const numericMatch = value.match(/[\d,]+/)
    if (!numericMatch) {
      setDisplayValue(value)
      return
    }

    const numericString = numericMatch[0].replace(/,/g, "")
    const targetNumber = Number.parseInt(numericString, 10)
    const prefix = value.substring(0, value.indexOf(numericMatch[0]))
    const suffix = value.substring(value.indexOf(numericMatch[0]) + numericMatch[0].length)

    let startTime: number | null = null
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / (duration * 1000), 1)

      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const currentNumber = Math.floor(easeOut * targetNumber)

      // Format with commas
      const formattedNumber = currentNumber.toLocaleString()
      setDisplayValue(`${prefix}${formattedNumber}${suffix}`)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, value, duration])

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      className={className}
    >
      {displayValue}
    </motion.span>
  )
}
