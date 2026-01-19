import type { Show } from '@/domain/entities/show/show'
import { filterPopularShows } from '@/domain/repositories/service/showFilter'

/**
 * Use Case: Filter Popular Shows
 *
 * Application Layer - User action for filtering popular shows
 * Uses Domain Service for business logic
 */

export const filterPopularShowsUseCase = (shows: Show[]): Show[] => {
  return filterPopularShows(shows)
}

export interface IFilterPopularShowsUseCase {
  (shows: Show[]): Show[]
}
