import type { Show } from '../entities/show/show'

export interface IshowRepository {
  findByPage(page: number): Promise<Show[]>
  search(query: string): Promise<Show[]>
  findById(id: number): Promise<Show | null>
}
