// src/domain/services/showFilter.ts

import type { Show } from "@/domain/entities/show"
import { isCrimeShow, isPopularShow, hasGenre, matchesRating } from "@/domain/entities/show"

/**
 * Domain Service: ShowFilter
 *
 * Business logic που δεν ανήκει σε ένα Entity.
 * Κάνει operations σε collections of Shows.
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
