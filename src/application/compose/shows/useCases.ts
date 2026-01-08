import { FilterCrimeShowsUseCase } from "@/application/filters/useCases/FilterCrimeShowsUseCase"
import { FilterPopularShowsUseCase } from "@/application/filters/useCases/FilterPopularShowsUseCase"
import { FilterShowsUseCase } from "@/application/filters/useCases/FilterShowsUseCase"
import { GetShowsUseCase } from "@/application/shows/useCases/GetShowsUseCase"
import { ShowRepository } from "@/infrastructure/show/repositories/showRepository"
import { SearchShowsUseCase } from "@/application/shows/useCases/SearchShowsUseCase"
export const setupUseCases = () => {
  const repository = new ShowRepository()

  return {
    getShows: new GetShowsUseCase(repository),
    searchShows: new SearchShowsUseCase(repository),
    getShowById: new GetShowsUseCase(repository),
    filterCrime: new FilterCrimeShowsUseCase(),
    filterPopular: new FilterPopularShowsUseCase(),
    filterShows: new FilterShowsUseCase(),
  }
}
