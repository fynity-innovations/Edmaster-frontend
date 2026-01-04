export interface Country {
  country_id: number
  country_name: string
  country_slug: string
  universities_count: number
  average_tuition_fees: string
  annual_cost_of_living: string
  employability: string
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

export interface Course {
  id: string
  name: string
  slug: string
  universityId: string
  universityName: string
  country: string
  level: "Bachelor" | "Master" | "PhD" | "Diploma"
  duration: string
  tuition: string
  startDates: string[]
  language: string
  description: string
  requirements: string[]
  careerProspects: string[]
  category: string
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
