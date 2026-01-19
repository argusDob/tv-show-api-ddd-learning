import {type Comment} from '@/domain/value-objects/comment'
import {validateReview} from '@/domain/entities/review/review-validation'

export type Review = {
  comment: Comment,
  rating: number,
  createdAt: Date,
}


export const createReview = (comment: Comment, rating: number, createdAt: Date): Review => {

  validateReview({comment, rating, createdAt})
  return {
    comment,
    rating,
    createdAt,
  }
}
