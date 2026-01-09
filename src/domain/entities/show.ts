export type Show = {
  // Identity
  readonly id: number

  // Core business properties
  readonly name: string
  readonly genres: string[]
  readonly weight: number

  // Display properties
  readonly summary: string
  readonly image: { medium: string }
  readonly status: string
  readonly premiered: string
  readonly averageRating: number

  // Optional properties (only if needed for business logic)
  readonly network?: {
    name: string
    country: { name: string }
  }
  readonly schedule?: {
    days: string[]
    time?: string
  }
  readonly runtime?: number
  readonly type?: string
  readonly officialSite?: string | null
}



export const getRating = (show: Show): number => {
  if (show.weight <= 20) return 1
  if (show.weight <= 40) return 2
  if (show.weight <= 60) return 3
  if (show.weight <= 80) return 4
  return 5
}

export const isCrimeShow = (show: Show): boolean => {
  return show.genres.includes('Crime')
}

export const isPopularShow = (show: Show): boolean => {
  return getRating(show) === 5
}

export const hasGenre = (show: Show, genre: string): boolean => {
  return show.genres.includes(genre)
}

export const matchesRating = (show: Show, rating: number): boolean => {
  return getRating(show) === rating
}
