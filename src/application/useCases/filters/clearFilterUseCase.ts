import { IGetShowsUseCase } from "@/application/useCases/shows/getShowsUseCase"
import { IFilterCrimeShowsUseCase } from "@/application/useCases/filters/filterCrimeShowsUseCase"
import { IFilterPopularShowsUseCase } from "@/application/useCases/filters/filterPopularShowsUseCase"


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
