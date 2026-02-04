import { notFound } from "next/navigation"
import { Suspense } from "react"
import type { Metadata } from "next"

// 🔥 CRITICAL FIX
export const dynamic = "force-dynamic"
export const revalidate = 0

// Data Imports (OK for dynamic pages)
import coursesData from "@/data/courses_final.json"
import universitiesData from "@/data/universities.json"

import type { Course, UniversityJSON } from "@/lib/types"
import { CourseContent } from "@/components/course/course-content"
import { SkeletonCard } from "@/components/ui/skeleton-card"

// Cast Data
const courses = coursesData as unknown as Course[]
const universities = (universitiesData || []) as unknown as UniversityJSON[]

interface PageProps {
  params: { slug: string }
}

/**
 * SEO Metadata (runs at request time)
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const course = courses.find((c) => c.course_id === params.slug)

  if (!course) {
    return { title: "Course Not Found" }
  }

  return {
    title: `${course.course_title} at ${course.university_name}`,
    description: `Study ${course.course_title} in ${course.city}, ${course.country_name}. Duration: ${course.duration}.`,
  }
}

/**
 * Course Detail Page (FULLY DYNAMIC)
 */
export default async function CoursePage({ params }: PageProps) {
  const course = courses.find((c) => c.course_id === params.slug)

  if (!course) {
    notFound()
  }

  const university = universities.find(
    (u) => u.university_id === course.university_id
  )

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
