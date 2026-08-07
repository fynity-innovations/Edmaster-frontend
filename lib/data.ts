import countries from "@/data/countries.json"
import universities from "@/data/universities.json"
import type { Country, University, UniversityJSON } from "@/lib/types"

export function getCountryBySlug(slug: string): Country | undefined {
  return countries.find(c => c.country_slug === slug)
}

export function getUniversitiesByCountry(
  countryName: string,
  limit = 6
): University[] {
  return (universities as UniversityJSON[])
    .filter(u => u.country_name === countryName)
    // Unranked universities sort last. Subtracting the raw values would
    // coerce null to 0 and float every unranked university to the top, which
    // now means most of them.
    .sort((a, b) => (a.rankings.world ?? Infinity) - (b.rankings.world ?? Infinity))
    .slice(0, limit)
    .map((u) => ({
        
      // 🔁 MAP JSON → UI MODEL
      id: u.university_id,
      name: u.university_name,
      slug: u.university_slug,
      country: u.country_name,
      countrySlug: countryName.toLowerCase(),
      city: u.location.split(",")[0],
      logo: "",
      image: "",
      ranking: u.rankings.world,
      description: u.description,
      shortDescription: u.description,
      establishedYear: 0,
      studentCount: "",
      internationalStudents: "",
      acceptanceRate: "",
      tuitionRange: "",
      popularCourses: [],
      facilities: [],
      website: ""
    }))
}
