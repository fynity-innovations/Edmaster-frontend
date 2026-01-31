import { notFound } from "next/navigation"
import { Suspense } from "react"
// Use the detailed JSON we generated
import universities from "@/data/universities.json"
import courses from "@/data/courses.json"
import { UniversityContent } from "@/components/university/university-content"
import { SkeletonCard } from "@/components/ui/skeleton-card"

interface PageProps {
  params: Promise<{ slug: string }>
}

/**
 * Fixes the Runtime Error:
 * Maps 'university_slug' from the JSON to the 'slug' parameter 
 * required by the folder structure [slug]
 */
export async function generateStaticParams() {
  return universities.map((uni) => ({
    slug: uni.university_slug,
  }))
}

/**
 * Generates SEO metadata for the university page
 */
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const university = universities.find((u) => u.university_slug === slug)
  
  if (!university) {
    return { title: "University Not Found" }
  }

  return {
    title: `${university.university_name} | StudyGlobal`,
    description: university.description,
  }
}

/**
 * The Main Server Component for the University Detail Page
 */
export default async function UniversityPage({ params }: PageProps) {
  const { slug } = await params

  // Find the university using the slug from the URL
  const university = universities.find((u) => u.university_slug === slug)

  // Trigger 404 if university doesn't exist
  if (!university) {
    notFound()
  }

  // Filter courses associated with this university
  // Note: Ensure courses.json uses 'university_id' or 'universityId'
  const universityCourses = courses.filter(
    (c) => c.universityId === university.university_id
  )

  return (
    <main className="min-h-screen bg-background">
      <Suspense
        fallback={
          <div className="container mx-auto px-4 py-24">
            {/* Loading placeholder */}
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