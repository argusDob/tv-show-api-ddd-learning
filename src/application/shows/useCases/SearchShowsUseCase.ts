import { Show } from "@/domain/entities/show";
import { IshowRepository } from "@/domain/repositories/iShowRepository";

export const searchShowsUsecase = (repository: IshowRepository): (term: string) => Promise<Show[]> => {
  return async (term: string) => {
    return await repository.search(term)
  }
}
