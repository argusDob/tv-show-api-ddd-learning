import { validateShow } from "@/domain/entities/show/show-validation"

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

/**
 * Input data for creating a Show entity.
 * This represents the transformed data structure, not the raw API response.
 */
export type CreateShowData = {
  id: number
  name: string
  genres: string[]
  weight: number
  summary: string
  image: { medium: string }
  status: string
  premiered?: string
  averageRating?: number
  network?: {
    name?: string
    country?: { name?: string }
  }
  schedule?: {
    days?: string[]
    time?: string
  }
  runtime?: number
  type?: string
  officialSite?: string | null
}

/**
 * Creates a Show domain entity from validated data.
 * This function expects already-transformed data, not raw API responses.
 *
 * @param data - The transformed data for creating a Show
 * @returns A new Show entity
 * @throws Error if required fields are missing
 */
export function createShow(data: CreateShowData): Show {
    validateShow(data)

  // Return immutable Show entity
  return {
    id: data.id,
    name: data.name.trim(),
    genres: [...data.genres],
    weight: data.weight,
    summary: data.summary || '',
    image: { medium: data.image.medium },
    status: data.status || '',
    premiered: data.premiered || '',
    averageRating: data.averageRating ?? 0,
    network: data.network
      ? {
          name: data.network.name || '',
          country: {
            name: data.network.country?.name || '',
          },
        }
      : undefined,
    schedule: data.schedule
      ? {
          days: [...(data.schedule.days || [])],
          time: data.schedule.time || '',
        }
      : undefined,
    runtime: data.runtime,
    type: data.type,
    officialSite: data.officialSite ?? null,
  }
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
