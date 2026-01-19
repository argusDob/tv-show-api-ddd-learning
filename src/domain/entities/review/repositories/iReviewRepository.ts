import type { Review } from '@/domain/entities/review/review'

export interface iReviewRepository {
  findAll(): Promise<Review[]>
  add(review: Review): Promise<void>
}
