export interface Country {
  country_id: number
  country_name: string
  country_slug: string
  universities_count: number
  average_tuition_fees: string
  annual_cost_of_living: string
  employability: string
  country_code: string
}

export interface University {
  id: string
  name: string
  slug: string
  country: string
  countrySlug: string
  city: string
  logo: string
  image: string
  ranking: number
  description: string
  shortDescription: string
  establishedYear: number
  studentCount: string
  internationalStudents: string
  acceptanceRate: string
  tuitionRange: string
  popularCourses: string[]
  facilities: string[]
  website: string
}

export interface UniversityJSON {
  university_id: string
  university_name: string
  university_slug: string
  country_name: string
  location: string
  rankings: {
    world: number
  }
  description: string
}

export interface Course {
  course_id: string
  course_title: string
  university_name: string
  country_name: string
  city: string
  duration: string // e.g., "2 Years"
  currency: string // e.g., "Euros"
  tuition_fees: number
  application_fees: number
  intake: string // e.g., "Fall 2026"
  percentage: number
  university_website: string
  level: string // e.g., "Master", "Bachelor"
  program_duration: string
  location: string
  ielts_score: string
  toefl_score: string
  min_education: string
  required_percentage: number
  logo: string | null
  category?: string
  university_id: string
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
}

export interface AITool {
  id: string
  name: string
  description: string
  icon: string
  features: string[]
  comingSoon?: boolean
}

export interface Testimonial {
  id: string
  name: string
  country: string
  university: string
  image: string
  quote: string
  rating: number
}
