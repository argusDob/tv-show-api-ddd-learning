import { filterCrimeShowsUseCase } from "@/application/useCases/filters/filterCrimeShowsUseCase"
import { filterPopularShowsUseCase } from "@/application/useCases/filters/filterPopularShowsUseCase"
import { filterShowsUseCase } from "@/application/useCases/filters/filterShowsUseCase"
import { getShowsUseCase } from "@/application/useCases/shows/getShowsUseCase"
import { ShowRepository } from "@/infrastructure/shows/repositories/showRepository"
import { searchShowsUsecase } from "@/application/useCases/shows/searchShowsUseCase"
import {getShowsById} from "@/application/useCases/shows/getShowByIdUseCase"
import { LocalStorageFavouriteRepository } from "@/infrastructure/favourites/repositories/LocalStorageFavouriteRepository"
import { addFavouritesUseCase } from "@/application/useCases/favourites/addFavouritesUseCase"
import { findAllFavouritesUseCase } from "@/application/useCases/favourites/findAllFavouritesUseCase"
import { getGenresUseCase } from "@/application/useCases/genres/getGenresUseCase"

export const setupUseCases = () => {
  const repository = new ShowRepository()
  const favouriteRepository = LocalStorageFavouriteRepository()


  return {
    getShows: getShowsUseCase(repository),
    searchShows: searchShowsUsecase(repository),
    getShowById: getShowsById(repository),
    filterCrime: filterCrimeShowsUseCase,
    filterPopular: filterPopularShowsUseCase,
    filterShows: filterShowsUseCase,
    addFavourites: addFavouritesUseCase(favouriteRepository),
    findAllFavourites: findAllFavouritesUseCase(favouriteRepository),
    getGenresUseCase: getGenresUseCase,
  }
}
