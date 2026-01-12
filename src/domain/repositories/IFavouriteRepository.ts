import type { Favourite  } from '@/domain/entities/favourite/favourite'

export interface IFavouriteRepository {
  findAll(): Promise<Favourite[]>
  add(favourite: Favourite): Promise<void>
  remove(favourite: Favourite): Promise<void>
}
