import type { Show } from '@/domain/entities/show'
import { filterCrimeShows } from '@/domain/repositories/utils/showFilter'

/**
 * Use Case: Filter Crime Shows
 *
 * Application Layer - User action for filtering crime shows
 * Uses Domain Service for business logic
 */

export const filterCrimeShowsUseCase = (shows: Show[]): Show[] => {
  return filterCrimeShows(shows)
}

export interface IFilterCrimeShowsUseCase {
  (shows: Show[]): Show[]
}
