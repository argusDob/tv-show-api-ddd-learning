import { filterCrimeShowsUseCase } from "@/application/filters/useCases/filterCrimeShowsUseCase"
import { filterPopularShowsUseCase } from "@/application/filters/useCases/filterPopularShowsUseCase"
import { filterShowsUseCase } from "@/application/filters/useCases/filterShowsUseCase"
import { getShowsUseCase } from "@/application/shows/useCases/getShowsUseCase"
import { ShowRepository } from "@/infrastructure/shows/repositories/showRepository"
import { searchShowsUsecase } from "@/application/shows/useCases/searchShowsUsecase"
import {getShowsById} from "@/application/shows/useCases/getShowById"
import { LocalStorageFavouriteRepository } from "@/infrastructure/favourites/repositories/LocalStorageFavouriteRepository"
import { addFavouritesUseCase } from "@/application/favourites/useCases/addFavouritesUseCase"
import { findAllFavouritesUseCase } from "@/application/favourites/useCases/findAllFavouritesUseCase"

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
  }
}
