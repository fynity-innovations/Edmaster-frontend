import { notFound } from "next/navigation"
import { Suspense } from "react"
import universities from "@/data/universities.json"
import courses from "@/data/courses.json"
import { UniversityContent } from "@/components/university/university-content"
import { SkeletonCard } from "@/components/ui/skeleton-card"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return universities.map((uni) => ({
    slug: uni.slug,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const university = universities.find((u) => u.slug === slug)
  if (!university) return { title: "University Not Found" }

  return {
    title: `${university.name} - StudyGlobal`,
    description: university.shortDescription,
  }
}

export default async function UniversityPage({ params }: PageProps) {
  const { slug } = await params
  const university = universities.find((u) => u.slug === slug)
  if (!university) notFound()

  const universityCourses = courses.filter((c) => c.universityId === university.id)

  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-24">
          <SkeletonCard />
        </div>
      }
    >
      <UniversityContent university={university} courses={universityCourses} />
    </Suspense>
  )
}
