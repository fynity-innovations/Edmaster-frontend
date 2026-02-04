import { notFound } from "next/navigation"
import type { Metadata } from "next"

// 🔥 IMPORTANT: dynamic rendering (prevents 75MB deploy error)
export const dynamic = "force-dynamic"
export const revalidate = 0

import coursesData from "@/data/courses_final.json"
import universitiesData from "@/data/universities.json"

import type { Course, UniversityJSON } from "@/lib/types"
import { CourseContent } from "@/components/course/course-content"

const courses = coursesData as Course[]
const universities = universitiesData as UniversityJSON[]

interface PageProps {
  params: Promise<{ slug: string }>
}

/**
 * SEO Metadata
 */
export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { slug } = await params

  const course = courses.find((c) => c.course_id === slug)
  if (!course) {
    return { title: "Course Not Found" }
  }

  return {
    title: `${course.course_title} at ${course.university_name}`,
    description: `Study ${course.course_title} in ${course.city}, ${course.country_name}.`,
  }
}

/**
 * Course Page
 */
export default async function CoursePage({ params }: PageProps) {
  const { slug } = await params

  const course = courses.find((c) => c.course_id === slug)
  if (!course) {
    notFound()
  }

  const university = universities.find(
    (u) => u.university_id === course.university_id
  )

  return <CourseContent course={course} university={university} />
}
