import type { Show } from '@/domain/entities/show'
import { filterShows } from '@/domain/repositories/utils/showFilter'

/**
 * Use Case: Filter Shows by Criteria
 *
 * Application Layer - User action για filtering shows με genre/rating
 * Χρησιμοποιεί Domain Service για business logic
 */
export class FilterShowsUseCase {
  execute(
    shows: Show[],
    criteria: { genre?: string | null; rating?: number | null }
  ): Show[] {
    return filterShows(shows, criteria)
  }
}
