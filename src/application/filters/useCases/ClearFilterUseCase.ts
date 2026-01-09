import { IGetShowsUseCase } from "@/application/shows/useCases/getShowsUseCase"
import { IFilterCrimeShowsUseCase } from "@/application/filters/useCases/filterCrimeShowsUseCase"
import { IFilterPopularShowsUseCase } from "@/application/filters/useCases/filterPopularShowsUseCase"


export const clearFiltersUseCase = (getShowsUseCase: IGetShowsUseCase, filterCrimeUseCase: IFilterCrimeShowsUseCase, filterPopularUseCase: IFilterPopularShowsUseCase) => {
  return async (page: number) => {
    const shows = await getShowsUseCase(page)
    const crimeShows = filterCrimeUseCase(shows)
    const popularShows = filterPopularUseCase(shows)
    return {
      shows,
      crimeShows,
      popularShows
    }
  }
}
