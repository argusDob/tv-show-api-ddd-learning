import { Favourite } from "@/domain/entities/favourite/favourite";
import { IFavouriteRepository } from "@/domain/repositories/IFavouriteRepository";
import { validateFavourite } from "@/domain/repositories/service/favourites";

export function LocalStorageFavouriteRepository(): IFavouriteRepository {
  const findAll = async () : Promise<Favourite[]> => {
    const favourites = localStorage.getItem('favourites')
    return favourites ? JSON.parse(favourites) : []
  }

  const add = async (favourite: Favourite) => {
    const favouritesList = await findAll() as Favourite[]
    validateFavourite(favouritesList, favourite)
    localStorage.setItem('favourites', JSON.stringify(favouritesList))
  }

  const remove = async (favourite: Favourite) => {
    const favouritesFromStorage = await findAll() as Favourite[]
    const index = favouritesFromStorage.findIndex(f => f.showId === favourite.showId)
    if (index !== -1) {
      favouritesFromStorage.splice(index, 1)
      localStorage.setItem('favourites', JSON.stringify(favouritesFromStorage))
    }
  }

  return {
    findAll,
    add,
    remove
  }
}
