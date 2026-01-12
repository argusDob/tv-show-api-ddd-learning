// src/domain/services/showFilter.ts

import type { Show } from "@/domain/entities/show/show"
import { isCrimeShow, isPopularShow, hasGenre, matchesRating } from "@/domain/entities/show/show"

/**
 * Domain Service: ShowFilter
 *
 * Business logic that doesn't belong to a single Entity.
 * Performs operations on collections of Shows.
 */
export const filterCrimeShows = (shows: Show[]): Show[] => {
  return shows.filter(isCrimeShow)
}

export const filterPopularShows = (shows: Show[]): Show[] => {
  return shows.filter(isPopularShow)
}

export const filterShows = (
  shows: Show[],
  criteria: { genre?: string | null; rating?: number | null }
): Show[] => {
  return shows.filter(show => {
    const matchesGenre = !criteria.genre || hasGenre(show, criteria.genre)
    const matchesRatingFilter = !criteria.rating || matchesRating(show, criteria.rating)
    return matchesGenre && matchesRatingFilter
  })
}
