import { IFavouriteRepository } from '@/domain/repositories/iFavouriteRepository'
import { Favourite } from '@/domain/entities/favourite/favourite'


export const findAllFavouritesUseCase = (repository: IFavouriteRepository): () => Promise<Favourite[]> => {
  return async () => {
    return await repository.findAll()
  }
}

