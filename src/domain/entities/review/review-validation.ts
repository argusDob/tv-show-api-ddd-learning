import {type Review} from '@/domain/entities/review/review'

export const validateReview = (review: Review): void => {

  if(review.rating < 1 || review.rating > 5) {
    throw new Error('Rating must be between 1 and 5')
  }
}
