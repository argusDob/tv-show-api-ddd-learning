import type { Show } from '@/domain/entities/show'
import { filterCrimeShows } from '@/domain/repositories/utils/showFilter'

/**
 * Use Case: Filter Crime Shows
 * 
 * Application Layer - User action για filtering crime shows
 * Χρησιμοποιεί Domain Service για business logic
 */
export class FilterCrimeShowsUseCase {
  execute(shows: Show[]): Show[] {
    return filterCrimeShows(shows)
  }
}
