import type { Show } from '@/domain/entities/show'
import { filterShows } from '@/domain/repositories/utils/showFilter'

/**
 * Use Case: Filter Shows by Criteria
 *
 * Application Layer - User action for filtering shows by genre/rating
 * Uses Domain Service for business logic
 */



export const filterShowsUseCase = (shows: Show[], criteria: { genre?: string | null; rating?: number | null }): Show[] => {
  return filterShows(shows, criteria)
}
