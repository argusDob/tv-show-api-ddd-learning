import type { Show } from '@/domain/entities/show'
import { filterPopularShows } from '@/domain/repositories/utils/showFilter'

/**
 * Use Case: Filter Popular Shows
 *
 * Application Layer - User action για filtering popular shows
 * Χρησιμοποιεί Domain Service για business logic
 */
export class FilterPopularShowsUseCase {
  execute(shows: Show[]): Show[] {
    return filterPopularShows(shows)
  }
}
