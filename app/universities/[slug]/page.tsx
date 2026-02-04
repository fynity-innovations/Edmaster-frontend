import { notFound } from "next/navigation"
import { Suspense } from "react"
import universities from "@/data/universities.json"
import courses from "@/data/courses.json"
import { UniversityContent } from "@/components/university/university-content"
import { SkeletonCard } from "@/components/ui/skeleton-card"

export const dynamicParams = true
export const revalidate = 86400

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  return universities
    .slice(0, 50)
    .map((uni) => ({
      slug: uni.university_slug,
    }))
}

export async function generateMetadata({ params }: PageProps) {
  const university = universities.find(
    (u) => u.university_slug === params.slug
  )

  if (!university) {
    return { title: "University Not Found" }
  }

  return {
    title: `${university.university_name} | StudyGlobal`,
    description: university.description,
  }
}

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
          <div className="container mx-auto px-4 py-24 space-y-8">
            <div className="h-[40vh] w-full bg-muted animate-pulse rounded-3xl" />
            <SkeletonCard />
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
