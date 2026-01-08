import { Show } from "@/domain/entities/show";
import { IshowRepository } from "@/domain/repositories/iShowRepository";

export class GetShowsUseCase {
  constructor(private repository: IshowRepository) {}

  async execute(page: number): Promise<Show[]> {
    return await this.repository.findByPage(page)
  }
}
