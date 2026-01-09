import { filterCrimeShowsUseCase } from "@/application/filters/useCases/filterCrimeShowsUseCase"
import { filterPopularShowsUseCase } from "@/application/filters/useCases/filterPopularShowsUseCase"
import { filterShowsUseCase } from "@/application/filters/useCases/filterShowsUseCase"
import { getShowsUseCase } from "@/application/shows/useCases/getShowsUseCase"
import { ShowRepository } from "@/infrastructure/show/repositories/showRepository"
import { searchShowsUsecase } from "@/application/shows/useCases/searchShowsUsecase"
import {getShowsById} from "@/application/shows/useCases/getShowById"

export const setupUseCases = () => {
  const repository = new ShowRepository()

  return {
    getShows: getShowsUseCase(repository),
    searchShows: searchShowsUsecase(repository),
    getShowById: getShowsById(repository),
    filterCrime: filterCrimeShowsUseCase,
    filterPopular: filterPopularShowsUseCase,
    filterShows: filterShowsUseCase,
  }
}
