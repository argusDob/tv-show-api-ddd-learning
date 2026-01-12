import { Show } from '@/domain/entities/show/show'
import { IshowRepository } from '@/domain/repositories/iShowRepository'

export const getShowsUseCase = (repository: IshowRepository): (page: number) => Promise<Show[]> => {
  return async (page: number) => {
    return await repository.findByPage(page)
  }
}

export interface IGetShowsUseCase {
  (page: number): Promise<Show[]>
}
