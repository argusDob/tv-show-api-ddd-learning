

import { IFavouriteRepository } from '@/domain/repositories/IFavouriteRepository'
import { Favourite } from '@/domain/entities/favourite/favourite'


export const addFavouritesUseCase = (repository: IFavouriteRepository): (favourite: Favourite ) => Promise<void> => {
  return async (favourite: Favourite) => {
    return await repository.add(favourite)
  }
}

export interface IAddFavourites {
  (favourite: Favourite): Promise<Favourite | null>
}
