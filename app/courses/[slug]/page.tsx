import { notFound } from "next/navigation"
import { Suspense } from "react"
import courses from "@/data/courses.json"
import universities from "@/data/universities.json"
import { CourseContent } from "@/components/course/course-content"
import { SkeletonCard } from "@/components/ui/skeleton-card"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return courses.map((course) => ({
    slug: course.slug,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const course = courses.find((c) => c.slug === slug)
  if (!course) return { title: "Course Not Found" }

  return {
    title: `${course.name} at ${course.universityName} - StudyGlobal`,
    description: course.description,
  }
}

export default async function CoursePage({ params }: PageProps) {
  const { slug } = await params
  const course = courses.find((c) => c.slug === slug)
  if (!course) notFound()

  const university = universities.find((u) => u.id === course.universityId)

  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-24">
          <SkeletonCard />
        </div>
      }
    >
      <CourseContent course={course} university={university} />
    </Suspense>
  )
}
