import { Review } from "@/domain/entities/review/review"

export const calculateAverageRating = (reviews: Review[]): number => {
  if (reviews.length === 0) return 0

  const sum = reviews.reduce((acc, review) => acc + review.rating, 0)
  return sum / reviews.length
}
