"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CTASection({
  title,
  subtitle,
  buttonText,
  buttonLink,
}: {
  title: string
  subtitle: string
  buttonText: string
  buttonLink: string
}) {
  return (
    <section className="py-16 bg-gradient-to-r from-purple-500 to-indigo-500">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6 text-white">
        <div>
          <h3 className="text-2xl font-bold">{title}</h3>
          <p className="text-white/90">{subtitle}</p>
        </div>
        <Button variant="secondary" size="lg" asChild>
          <Link href={buttonLink}>{buttonText}</Link>
        </Button>
      </div>
    </section>
  )
}
