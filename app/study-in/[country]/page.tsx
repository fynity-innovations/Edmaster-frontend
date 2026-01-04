import { notFound } from "next/navigation"
import { Suspense } from "react"
import countries from "@/data/countries.json"
import universities from "@/data/universities.json"
import { CountryContent } from "@/components/country/country-content"
import { SkeletonCard } from "@/components/ui/skeleton-card"

interface PageProps {
  params: Promise<{ country: string }>
}

export async function generateStaticParams() {
  return countries.map((country) => ({
    country: country.country_slug,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { country: countrySlug } = await params
  const country = countries.find((c) => c.country_slug === countrySlug)
  if (!country) return { title: "Country Not Found" }

  return {
    title: `Study in ${country.country_name} - StudyGlobal`,
    // description: country.shortDescription,
  }
}

export default async function StudyInCountryPage({ params }: PageProps) {
  const { country: countrySlug } = await params
  const country = countries.find((c) => c.country_slug === countrySlug)
  if (!country) notFound()

  const countryUniversities = universities.filter((u) => u.countrySlug === countrySlug)

  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-24">
          <div className="grid gap-6">
            {[1, 2, 3].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      }
    >
      <CountryContent country={country} universities={countryUniversities} />
    </Suspense>
  )
}
