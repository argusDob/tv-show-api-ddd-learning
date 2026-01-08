import { Show } from "@/domain/entities/show";
import { IshowRepository } from "@/domain/repositories/iShowRepository";

export class SearchShowsUseCase {
  constructor(private repository: IshowRepository) {}

  async execute(term: string): Promise<Show[]> {
    console.log('term', term)
    return await this.repository.search(term)
  }
}
