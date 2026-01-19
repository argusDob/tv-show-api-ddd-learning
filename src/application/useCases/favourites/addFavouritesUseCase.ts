import { IFavouriteRepository } from '@/domain/repositories/iFavouriteRepository'
import { createFavourite } from '@/domain/entities/favourite/favourite'

/**
 * Use Case: Add Show to Favourites
 *
 * Application Layer - User action for adding a show to favourites
 */
export const addFavouritesUseCase = (
  repository: IFavouriteRepository
): (showId: number) => Promise<void> => {
  return async (showId: number) => {
    const favourite = createFavourite(showId)
    return await repository.add(favourite)
  }
}

export interface IAddFavourites {
  (showId: number): Promise<void>
}
