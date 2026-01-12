import { Show } from '@/domain/entities/show/show'
import { IshowRepository } from '@/domain/repositories/iShowRepository'


export const getShowsById = (repository: IshowRepository): (id: number) => Promise<Show | null> => {
  return async (id: number) => {
    return await repository.findById(id)
  }
}

export interface IGetShowsById {
  (id: number): Promise<Show | null>
}
