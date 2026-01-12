import { IFavouriteRepository } from '@/domain/repositories/IFavouriteRepository'
import { Favourite } from '@/domain/entities/favourite/favourite'


export const findAllFavouritesUseCase = (repository: IFavouriteRepository): Promise<Favourite[]> => {
  return repository.findAll()
}

