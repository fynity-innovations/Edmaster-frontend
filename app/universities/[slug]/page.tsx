import { notFound } from "next/navigation"
import { Suspense } from "react"

import universities from "@/data/universities.json"
import courses from "@/data/courses.json"

import { UniversityContent } from "@/components/university/university-content"
import { SkeletonCard } from "@/components/ui/skeleton-card"

/**
 * 🔥 CRITICAL FIX
 * This completely disables static generation for this route.
 * Prevents Next.js from generating 180+ pages at build time.
 */
export const dynamic = "force-dynamic"
export const revalidate = 0

interface PageProps {
  params: { slug: string }
}

/**
 * SEO Metadata (runs at request time now)
 */
export async function generateMetadata({ params }: PageProps) {
  const university = universities.find(
    (u) => u.university_slug === params.slug
  )

  if (!university) {
    return {
      title: "University Not Found | StudyGlobal",
      description: "The requested university could not be found.",
    }
  }

  return {
    title: `${university.university_name} | StudyGlobal`,
    description: university.description,
  }
}

/**
 * University Detail Page
 * Fully dynamic, Vercel-safe
 */
export default async function UniversityPage({ params }: PageProps) {
  const university = universities.find(
    (u) => u.university_slug === params.slug
  )

  if (!university) {
    notFound()
  }

  const universityCourses = courses.filter(
    (c) => c.universityId === university.university_id
  )

  return (
    <main className="min-h-screen bg-background">
      <Suspense
        fallback={
          <div className="container mx-auto px-4 py-24">
            <div className="space-y-8">
              <div className="h-[40vh] w-full bg-muted animate-pulse rounded-3xl" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-4">
                  <SkeletonCard />
                  <SkeletonCard />
                </div>
                <div className="h-64 bg-muted animate-pulse rounded-3xl" />
              </div>
            </div>
          </div>
        }
      >
        <UniversityContent
          university={university}
          courses={universityCourses}
        />
      </Suspense>
    </main>
  )
}
