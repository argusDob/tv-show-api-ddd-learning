import { Show, createShow, type CreateShowData } from "@/domain/entities/show/show"
import { createWeight } from "@/domain/value-objects/weight"

/**
 * Type representing the TVMaze API show response structure.
 */
type ApiShowResponse = {
  id: number
  name: string
  genres: string[]
  weight: number
  summary: string | null
  image: { medium: string } | null
  status: string
  premiered: string | null
  rating?: { average: number | null }
  network?: {
    name: string
    country?: { name: string }
  } | null
  schedule?: {
    days: string[]
    time: string | null
  } | null
  runtime: number | null
  type: string | null
  officialSite: string | null
}

/**
 * Maps a TVMaze API show response to a domain Show entity.
 * Handles transformation of API-specific structures (e.g., rating.average → averageRating).
 *
 * @param apiData - Raw show data from TVMaze API
 * @returns A domain Show entity
 */
export const mapApiShowToDomain = (apiData: ApiShowResponse): Show => {
  // Transform API response to domain format
  const domainData: CreateShowData = {
    id: apiData.id,
    name: apiData.name,
    genres: apiData.genres || [],
    weight: createWeight(apiData.weight),
    summary: apiData.summary || '',
    image: {
      medium: apiData.image?.medium || '',
    },
    status: apiData.status,
    premiered: apiData.premiered || undefined,
    averageRating: apiData.rating?.average ?? undefined,
    network: apiData.network
      ? {
          name: apiData.network.name,
          country: apiData.network.country
            ? { name: apiData.network.country.name }
            : undefined,
        }
      : undefined,
    schedule: apiData.schedule
      ? {
          days: apiData.schedule.days || [],
          time: apiData.schedule.time || undefined,
        }
      : undefined,
    runtime: apiData.runtime ?? undefined,
    type: apiData.type || undefined,
    officialSite: apiData.officialSite,
  }

  return createShow(domainData)
}






