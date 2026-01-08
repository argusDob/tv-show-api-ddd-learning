import { GetShowsUseCase } from "@/application/shows/useCases/GetShowsUseCase"
import { FilterCrimeShowsUseCase } from "./FilterCrimeShowsUseCase"
import { FilterPopularShowsUseCase } from "./FilterPopularShowsUseCase"

export class ClearFiltersUseCase {
  constructor(
    private getShowsUseCase: GetShowsUseCase,
    private filterCrimeUseCase: FilterCrimeShowsUseCase,
    private filterPopularUseCase: FilterPopularShowsUseCase
  ) {}

  async execute(page: number) {
    const shows = await this.getShowsUseCase.execute(page)
    const crimeShows = this.filterCrimeUseCase.execute(shows)
    const popularShows = this.filterPopularUseCase.execute(shows)

    return {
      shows,
      crimeShows,
      popularShows
    }
  }
}
