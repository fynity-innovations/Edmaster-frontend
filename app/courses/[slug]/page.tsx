import { notFound } from "next/navigation"
import { Suspense } from "react"
import type { Metadata } from "next"

// Data Imports
import coursesData from "@/data/courses_final.json"
import universitiesData from "@/data/universities.json" // Optional if you have it
import type { Course, UniversityJSON } from "@/lib/types"

// Component Imports
import { CourseContent } from "@/components/course/course-content"
import { SkeletonCard } from "@/components/ui/skeleton-card"

// Cast Data
const courses = coursesData as unknown as Course[]
// Assuming you have a University type, otherwise use any[] or define it
const universities = (universitiesData || []) as unknown as UniversityJSON[]

interface PageProps {
  params: Promise<{ slug: string }>
}

// 1. Generate Static Paths (SSG)
export async function generateStaticParams() {
  return courses.map((course) => ({
    slug: course.course_id, // We use ID as the slug based on your routing
  }))
}

// 2. Generate Metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const course = courses.find((c) => c.course_id === slug)

  if (!course) return { title: "Course Not Found" }

  return {
    title: `${course.course_title} at ${course.university_name}`,
    description: `Study ${course.course_title} in ${course.city}, ${course.country_name}. Duration: ${course.duration}.`,
  }
}

// 3. Main Page Component
export default async function CoursePage({ params }: PageProps) {
  const { slug } = await params

  // Find Course by ID
  const course = courses.find((c) => c.course_id === slug)

  if (!course) {
    notFound()
  }

  // Find associated University (optional, passes undefined if not found)
  const university = universities.find((u) => u.university_id === course.university_id)

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